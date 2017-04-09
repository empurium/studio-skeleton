import { Injectable, Inject } from '@angular/core';
import * as _ from 'lodash';
import { HttpService } from '@freescan/http';
import { Observable } from 'rxjs/Observable';

import { FREESCAN_ENV, Environment, Article, ArticleResponse, ArticlesResponse } from '../+models';


@Injectable()
export class ArticleService {
    protected limit: number = 15;
    protected articles: ArticlesResponse;
    protected omit: string[] = ['id', 'is_published', 'momentValue'];

    constructor(protected http: HttpService,
                @Inject(FREESCAN_ENV) protected environment: Environment) {
    }

    /**
     * Request the latest articles. Caches on the client.
     * Supports pagination and limit.
     */
    public all(page: number = 1, limit: number = this.limit): Observable<ArticlesResponse> {
        if (this.articles) {
            return Observable.of(this.articles);
        }

        return this.http
            .hostname(this.environment.api.publications)
            .query({ page, limit })
            .get('articles')
            .map((response: ArticlesResponse) => {
                this.articles = response;
                return response;
            });
    }

    /**
     * Request a given article. Does not cache on the client.
     */
    public one(id: string): Observable<ArticleResponse> {
        return this.http
            .hostname(this.environment.api.publications)
            .get(`articles/${id}`);
    }

    /**
     * Request a given article by slug URI. Does not cache on the client.
     */
    public oneSlug(slugUri: string): Observable<ArticleResponse> {
        return this.http
            .hostname(this.environment.api.publications)
            .query({ slug_uri: slugUri })
            .get('articles');
    }

    /**
     * Create an article.
     */
    public post(article: Article): Observable<ArticleResponse> {
        return this.http
            .hostname(this.environment.api.publications)
            .post('articles', article)
            .finally(() => this.bust());
    }

    /**
     * Update an article.
     */
    public put(article: Article): Observable<ArticleResponse> {
        return this.http
            .hostname(this.environment.api.publications)
            .put(`articles/${article.id}`, _.omit(article, this.omit))
            .finally(() => this.bust());
    }

    /**
     * Delete an article.
     */
    public delete(article: Article): Observable<ArticleResponse> {
        return this.http
            .hostname(this.environment.api.publications)
            .delete(`articles/${article.id}`)
            .finally(() => this.bust());
    }

    /**
     * Bust the client-side cache.
     */
    public bust(): void {
        this.articles = null;
    }
}
