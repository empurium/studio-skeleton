import { Injectable, Inject } from '@angular/core';
import * as _ from 'lodash';
import { HttpService } from '@rndstudio/http';
import { Observable } from 'rxjs/Observable';

import { FREESCAN_ENV, Environment, Article, ArticleResponse, ArticlesResponse } from '../+models';

export interface QueryParams {
    [key: string]: string | number | boolean;
    page?: number;
    limit?: number;
    tiered?: boolean;
}


@Injectable()
export class ArticleService {
    protected slugs: { [key: string]: ArticleResponse } = {};

    protected limit: number  = 15;
    protected omit: string[] = ['id', 'is_published', 'momentPublished'];

    constructor(protected http: HttpService,
                @Inject(FREESCAN_ENV) protected environment: Environment) {
    }

    /**
     * Request the latest articles. Caches on the client.
     * Supports pagination and limit.
     */
    public all(query: QueryParams = {}): Observable<ArticlesResponse> {
        query.page  = query.page || 1;
        query.limit = query.limit || this.limit;

        return this.http
            .hostname(this.environment.api.publications)
            .query(query)
            .get('articles');
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
    public forSlug(slugUri: string): Observable<ArticleResponse> {
        if (this.slugs[slugUri]) {
            return Observable.of(this.slugs[slugUri]);
        }

        return this.http
            .hostname(this.environment.api.publications)
            .query({ slug_uri: slugUri })
            .get('articles')
            .map((response: ArticleResponse): ArticleResponse => {
                this.slugs[slugUri] = response;
                return response;
            });
    }

    /**
     * Create an article.
     */
    public post(article: Article): Observable<ArticleResponse> {
        return this.http
            .hostname(this.environment.api.publications)
            .post('articles', article)
            .finally(() => this.forget());
    }

    /**
     * Update an article.
     */
    public put(article: Article): Observable<ArticleResponse> {
        return this.http
            .hostname(this.environment.api.publications)
            .put(`articles/${article.id}`, _.omit(article, this.omit))
            .finally(() => this.forget());
    }

    /**
     * Delete an article.
     */
    public delete(article: Article): Observable<ArticleResponse> {
        return this.http
            .hostname(this.environment.api.publications)
            .delete(`articles/${article.id}`)
            .finally(() => this.forget());
    }

    /**
     * Forget the client-side cache.
     */
    public forget(): void {
        this.slugs = {};
    }
}
