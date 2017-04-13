import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import * as moment from 'moment';

import { ArticleResponse, ArticlesResponse, Article } from '../../+models';
import { ArticleService } from '../../+services/article.service';


@Component({
    selector:    'studio-article',
    templateUrl: 'article.component.html',
    styleUrls:   ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
    public article: Article;
    public recent: Article[];
    public loading: boolean = true;

    constructor(private route: ActivatedRoute,
                private articleService: ArticleService) {
    }

    public ngOnInit(): void {
        this.load();
        this.loadRecent();
    }

    /**
     * Load the article based on the slug in the route.
     */
    public load(): void {
        this.route.params
            .switchMap((params: Params) => {
                this.loading = !!params.slug;
                // TODO - use slug...
                // return params.slug ? this.articleService.forSlug(params.slug) : Observable.empty();
                return this.articleService.one(params.slug);
            })
            .subscribe((response: ArticleResponse) => {
                this.loading = false;
                this.article = response.data;
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
     * Relative time since the article was posted.
     */
    public published(article: Article): string {
        return moment.utc(article.published_at).fromNow();
    }
}
