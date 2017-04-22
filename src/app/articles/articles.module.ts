import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OAuthService } from 'angular-oauth2-oidc';
import { HttpService } from '@freescan/http';

// Core
import { FREESCAN_ENV } from '../+models';

// Services
import { WindowService } from '../+services/window.service';
import { AuthenticationService } from '../+services/authentication.service';
import { TierService } from '../+services/tier.service';
import { ArticleService } from '../+services/article.service';

// Components
import { ArticlesComponent } from './articles/articles.component';
import { ArticleComponent } from './article/article.component';

// Pipes
import { StudioSanitizeHtmlPipe } from '../+pipes/sanitize-html.pipe';

const MODULES: any = [
    CommonModule,
    HttpModule,
    RouterModule,
];

const COMPONENTS: any = [
    ArticlesComponent,
    ArticleComponent,
];

const PIPES: any = [
    StudioSanitizeHtmlPipe,
];


@NgModule({
    imports: [
        ...MODULES,
    ],

    exports: [
        ...COMPONENTS,
        ...PIPES,
    ],

    declarations: [
        ...COMPONENTS,
        ...PIPES,
    ],
})
export class ArticlesModule {
    public static forRoot(): ModuleWithProviders {
        return {
            ngModule:  ArticlesModule,
            providers: [
                WindowService,
                OAuthService,
                HttpService,
                {
                    provide:  AuthenticationService,
                    useClass: AuthenticationService,
                    deps:     [OAuthService, FREESCAN_ENV],
                },
                {
                    provide:  TierService,
                    useClass: TierService,
                    deps:     [HttpService, AuthenticationService, FREESCAN_ENV],
                },
                {
                    provide:  ArticleService,
                    useClass: ArticleService,
                    deps:     [HttpService, FREESCAN_ENV],
                },
            ],
        };
    }
}
