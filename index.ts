import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OAuthService } from 'angular-oauth2-oidc';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastModule, ToastOptions } from 'ng2-toastr';
import { HttpService } from '@freescan/http';

// Environment
import { ToastConfig } from './src/app/configuration';
import { FREESCAN_ENV, Environment } from './src/app/+models';

// Routing Module
import { FreeScanRoutingModule } from './src/app/freescan.routing';

// Services
import { AuthenticationService } from './src/app/+services/authentication.service';
import { RoleService } from './src/app/+services/role.service';
import { TierService } from './src/app/+services/tier.service';
import { AlertService } from './src/app/+services/alert.service';
import { ArticleService } from './src/app/+services/article.service';

// Shared
import { NAV_DROPDOWN_DIRECTIVES } from './src/app/+directives/nav-dropdown.directive';
import { SIDEBAR_TOGGLE_DIRECTIVES } from './src/app/+directives/sidebar.directive';
import { AsideToggleDirective } from './src/app/+directives/aside.directive';

// Components
import { FullLayoutComponent } from './src/app/layouts/full-layout.component';
import { HomeComponent } from './src/app/home/home.component';
import { LoadingComponent } from './src/app/loading/loading.component';
import { UnavailableComponent } from './src/app/unavailable/unavailable.component';

// Pipes
import { FreeScanSanitizeHtmlPipe } from './src/app/+pipes/sanitize-html.pipe';

// Export everything individually too for consumers
export * from './src';

export const MODULES: any = [
    BrowserModule, // Do not use with Universal
    BrowserAnimationsModule,
    HttpModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    ToastModule.forRoot(),
    FreeScanRoutingModule,
];

export const DIRECTIVES: any = [
    NAV_DROPDOWN_DIRECTIVES,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective,
];

export const COMPONENTS: any = [
    FullLayoutComponent,
    HomeComponent,
    LoadingComponent,
    UnavailableComponent,
];

export const PIPES: any = [
    FreeScanSanitizeHtmlPipe,
];


@NgModule({
    imports: [
        ...MODULES,
    ],

    exports: [
        ModalModule,

        ...DIRECTIVES,
        ...COMPONENTS,
    ],

    declarations: [
        ...DIRECTIVES,
        ...COMPONENTS,
        ...PIPES,
    ],
})
export class FreeScanModule {
    public static forRoot(environment: Environment): ModuleWithProviders {
        return {
            ngModule:  FreeScanModule,
            providers: [
                { provide: FREESCAN_ENV, useValue: environment },
                { provide: ToastOptions, useClass: ToastConfig },
                OAuthService,
                HttpService,
                AlertService,
                {
                    provide:  AuthenticationService,
                    useClass: AuthenticationService,
                    deps:     [OAuthService, FREESCAN_ENV],
                },
                {
                    provide:  RoleService,
                    useClass: RoleService,
                    deps:     [HttpService, AuthenticationService, FREESCAN_ENV],
                },
                {
                    provide:  TierService,
                    useClass: TierService,
                    deps:     [HttpService, FREESCAN_ENV],
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
