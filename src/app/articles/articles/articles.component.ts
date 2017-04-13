import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

import { ArticlesResponse, Article } from '../../+models';
import { ArticleService } from '../../+services/article.service';


@Component({
    selector:    'studio-articles',
    templateUrl: 'articles.component.html',
    styleUrls:   ['./articles.component.scss'],
})
export class ArticlesComponent implements OnInit {
    public articles: Article[];

    constructor(private articleService: ArticleService) {
    }

    public ngOnInit(): void {
        this.articleService.all()
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
}
