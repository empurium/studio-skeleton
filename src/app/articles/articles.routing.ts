import { Routes } from '@angular/router';

import { ArticlesComponent } from './articles/articles.component';
import { ArticleComponent } from './article/article.component';

// Import these as { path: 'your-path', children: ...articlesRoutes }
export const articlesRoutes: Routes = [
    {
        path:      '',
        component: ArticlesComponent,
    },
    {
        path:      ':slug',
        component: ArticleComponent,
    },
];
