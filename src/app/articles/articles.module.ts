import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OAuthService } from 'angular-oauth2-oidc';
import { HttpService } from '@freescan/http';

// Environment
import { FREESCAN_ENV } from '../+models';

// Services
import { AuthenticationService } from '../+services/authentication.service';
import { ArticleService } from '../+services/article.service';

// Components
import { ArticlesComponent } from './articles.component';

// Pipes
import { StudioSanitizeHtmlPipe } from '../+pipes/sanitize-html.pipe';

const MODULES: any = [
    CommonModule,
    HttpModule,
    RouterModule,
];

const COMPONENTS: any = [
    ArticlesComponent,
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
                OAuthService,
                HttpService,
                {
                    provide:  AuthenticationService,
                    useClass: AuthenticationService,
                    deps:     [OAuthService, FREESCAN_ENV],
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
