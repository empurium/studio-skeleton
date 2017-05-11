import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';

import { ArticlesResponse, Article, Tier, TierResource } from '../../+models';
import { WindowService } from '../../+services/window.service';
import { TierService } from '../../+services/tier.service';
import { TierResourceService } from '../../+services/tier-resource.service';
import { ArticleService, QueryParams } from '../../+services/article.service';


@Component({
    selector:    'studio-articles',
    templateUrl: 'articles.component.html',
    styleUrls:   ['./articles.component.scss'],
})
export class ArticlesComponent implements OnInit {
    @Input() public tiered: boolean;
    @Input() public routePrefix: string = '';
    @Input() public pagination: boolean = true;
    @Input() public format: string      = 'vertical';
    @Input() public limit: number       = 15;
    @Input() public columns: number     = 3;
    public articles: Observable<Article[]>;
    public articlesPaid: string[]       = [];
    public userTiers: Tier[]            = [];
    public page: number                 = 1;
    public total: number                = 0;
    public loading: boolean             = true;
    private window: Window;

    constructor(private windowService: WindowService,
                private tierService: TierService,
                private tierResourceService: TierResourceService,
                private articleService: ArticleService) {
        this.window = this.windowService.nativeWindow;
    }

    public ngOnInit(): void {
        this.loadTiers();
        this.load();
    }

    /**
     * Get the articles for the given page.
     */
    public load(page: number = this.page): void {
        this.page    = page;
        this.loading = true;

        let query: QueryParams = { page, limit: this.limit };
        if (this.tiered) {
            query.tiered = this.tiered;
        }

        this.articles = this.articleService
            .all(query)
            .do(
                (response: ArticlesResponse) => {
                    this.loading = false;
                    this.total   = +_.get(response, 'meta.pagination.total');
                    this.tierResources(response.data ? response.data : []);
                },
                (error: any) => {
                    if (error && error.status === 404) {
                        this.loading = false;
                    }
                },
            )
            .map((response: ArticlesResponse) => response.data);
    }

    /**
     * Request the tiers for this user so we can decide if we are showing
     * them the full content or a paywall.
     */
    public loadTiers(): void {
        this.tierService.user().subscribe(
            (tiers: Tier[]): Tier[] => this.userTiers = tiers,
            (error: any): void => {
                // User may not have any tiers
            },
        );
    }

    /**
     * Request the Tier Resources for a list of article identifiers.
     */
    public tierResources(articles: Article[]): void {
        let articleIds: string = articles.map((article: Article) => article.id).toString();
        if (!articleIds) {
            return;
        }

        this.tierResourceService
            .for(articleIds)
            .subscribe(
                (tierResources: TierResource[]) => {
                    this.articlesPaid = tierResources.map(
                        (tierResource: TierResource) => tierResource.reference_id,
                    );
                },
            );
    }

    /**
     * Relative time since the article was posted.
     */
    public published(article: Article): string {
        return moment.utc(article.published_at).format('lll');
    }

    /**
     * Generate the URL of the article based on the given routePrefix / article slug.
     * Shows the Sales Modal on the page they are on if the article is Tiered.
     */
    public url(article: Article): string {
        if (this.paid(article)) {
            return './';
        }

        return this.routePrefix ? `${this.routePrefix}/${article.slug_uri}` : article.slug_uri;
    }

    /**
     * Generates the query params of the URL if needed.
     */
    public queryParams(article: Article): any {
        if (this.paid(article)) {
            return { module: 'billing', step: 'intro' };
        }
    }

    /**
     * Return whether or not the article is in a Tier.
     * TODO - Only give access if a user has the correct Tier!
     */
    public paid(article: Article): boolean {
        if (this.userTiers && this.userTiers.length > 0) {
            return false; // TODO - THIS IS BAD
        }

        return this.articlesPaid.indexOf(article.id) >= 0;
    }

    /**
     * Returns true if the consumer specified the given format.
     */
    public needsFormat(format: string): boolean {
        return this.format === format;
    }

    /**
     * Retrieve the author.
     */
    public author(article: Article): string {
        let author: any = _.get(article, 'person.data.display_name');
        return author ? `by ${author}` : '';
    }

    /**
     * Return a col-sm-X class name depending on the number of requested columns.
     */
    public columnClass(): string {
        return `col-md-${12 / this.columns}`;
    }
}
