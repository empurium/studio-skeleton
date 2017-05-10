import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';

import { ArticlesResponse, Article } from '../../+models';
import { ArticleService, QueryParams } from '../../+services/article.service';
import { Observable } from 'rxjs/Observable';


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
    public page: number                 = 1;
    public total: number                = 0;
    public loading: boolean             = true;

    constructor(private articleService: ArticleService) {
    }

    public ngOnInit(): void {
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
                },
                (error: any) => console.error(error),
            )
            .map((response: ArticlesResponse) => response.data);
    }

    /**
     * Relative time since the article was posted.
     */
    public published(article: Article): string {
        return moment.utc(article.published_at).format('lll');
    }

    /**
     * Generate the URL of the article based on the given routePrefix / article slug.
     */
    public url(slug: string): string {
        return this.routePrefix ? `${this.routePrefix}/${slug}` : slug;
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
