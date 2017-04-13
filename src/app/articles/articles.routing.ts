import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArticlesComponent } from './articles/articles.component';
import { ArticleComponent } from './article/article.component';

export const articlesRoutes: Routes = [
    {
        path:      'publications',
        component: ArticlesComponent,
    },
    {
        path:      'publications/:slug',
        component: ArticleComponent,
    },
];


@NgModule({
    imports: [RouterModule.forRoot(articlesRoutes)],
    exports: [RouterModule],
})
export class ArticlesRoutingModule {
}
