import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OAuthService } from 'angular-oauth2-oidc';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpService } from '@freescan/http';

// Core
import { FREESCAN_ENV } from '../+models';

// Services
import { WindowService } from '../+services/window.service';
import { AuthenticationService } from '../+services/authentication.service';
import { SubscriptionService } from '../+services/subscription.service';
import { TierService } from '../+services/tier.service';
import { ArticleService } from '../+services/article.service';
import { FileService } from '../+services/file.service';

// StudioModule is always handy
import { StudioModule } from '../studio.module';

// Components
import { ArticlesComponent } from './articles/articles.component';
import { ArticleComponent } from './article/article.component';
import { LockerComponent } from './locker/locker.component';

// Pipes
import { StudioSanitizeHtmlPipe } from '../+pipes/sanitize-html.pipe';

const MODULES: any = [
    CommonModule,
    HttpModule,
    RouterModule,
    NgxPaginationModule,
    StudioModule,
];

const COMPONENTS: any = [
    ArticlesComponent,
    ArticleComponent,
    LockerComponent,
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
                    provide:  SubscriptionService,
                    useClass: SubscriptionService,
                    deps:     [HttpService, AuthenticationService, FREESCAN_ENV],
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
                {
                    provide:  FileService,
                    useClass: FileService,
                    deps:     [HttpService, FREESCAN_ENV],
                },
            ],
        };
    }
}
