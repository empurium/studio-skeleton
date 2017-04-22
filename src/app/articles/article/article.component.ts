import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import * as moment from 'moment';
import { Observable } from 'rxjs';

import { WindowService } from '../../+services/window.service';
import { TierService } from '../../+services/tier.service';
import { ArticleService } from '../../+services/article.service';
import { Tier, ArticleResponse, ArticlesResponse, Article } from '../../+models';

// AddToAny adds some globals
declare global {
    interface Window {
        a2a: any;
        a2a_config: any;
    }
}


@Component({
    selector:    'studio-article',
    templateUrl: 'article.component.html',
    styleUrls:   ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
    public article: Article;
    public recent: Article[];
    public tiers: Tier[];
    public loading: boolean = true;
    private window: Window;

    constructor(private route: ActivatedRoute,
                private tierService: TierService,
                private articleService: ArticleService,
                private windowService: WindowService) {
        this.window = this.windowService.nativeWindow;
    }

    public ngOnInit(): void {
        this.loadTiers();
        this.load();
        this.loadRecent();
    }

    /**
     * Request the tiers for this user so we can decide if we are showing
     * them the full content or a paywall.
     */
    public loadTiers(): void {
        this.tierService.user().subscribe(
            (tiers: Tier[]): Tier[] => this.tiers = tiers,
            (error: any): void => {
                // User may not have any tiers
            },
        );
    }

    /**
     * Load the article based on the slug in the route.
     */
    public load(): void {
        this.route.params
            .switchMap((params: Params) => {
                this.loading = !!params.slug;
                return params.slug ? this.articleService.forSlug(params.slug) : Observable.empty();
            })
            .subscribe((response: ArticleResponse) => {
                this.loading = false;
                this.window.scrollTo(0, 0);
                this.article = response.data;
                this.loadShareButtons();
            });
    }

    /**
     * Request the recent articles to show more for the user.
     */
    public loadRecent(): void {
        this.articleService.all()
            .subscribe((response: ArticlesResponse) => {
                this.loading = false;
                this.recent = response.data;
            });
    }

    /**
     * Load the Share buttons. Delay for innerHTML to inject itself.
     * Unfortunately innerHTML has no event to tell us when the content is loaded.
     * TODO - make this a ShareService and ShareComponent
     */
    public loadShareButtons(): void {
        setTimeout(
            () => {
                this.window.a2a_config = this.window.a2a_config || {};
                this.window.a2a_config.linkname = this.article.title;
                this.window.a2a.init('page');
            },
            1500,
        );
    }

    /**
     * Relative time since the article was posted.
     */
    public published(article: Article): string {
        return moment.utc(article.published_at).fromNow();
    }
}
