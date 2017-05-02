import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';

import { ArticlesResponse, Article } from '../../+models';
import { ArticleService } from '../../+services/article.service';


@Component({
    selector:    'studio-articles',
    templateUrl: 'articles.component.html',
    styleUrls:   ['./articles.component.scss'],
})
export class ArticlesComponent implements OnInit {
    @Input() public routePrefix: string = '';
    @Input() public limit: number       = 15;
    @Input() public format: string      = 'vertical';
    @Input() public full: boolean       = true;
    public articles: Article[];

    constructor(private articleService: ArticleService) {
    }

    public ngOnInit(): void {
        this.articleService.all(1, this.limit)
            .subscribe(
                (response: ArticlesResponse) => {
                    this.articles = response.data;
                },
                (error: any) => console.error(error),
            );
    }

    /**
     * Relative time since the article was posted.
     */
    public published(article: Article): string {
        return moment.utc(article.published_at).fromNow();
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
}
