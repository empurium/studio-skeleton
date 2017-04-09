import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { OAuthService } from 'angular-oauth2-oidc';
import { ModalModule, BsDropdownModule } from 'ngx-bootstrap';
import { ToastModule, ToastOptions } from 'ng2-toastr';
import { DateTimePickerModule } from 'ng-pick-datetime';
import { HttpService } from '@freescan/http';

// Environment
import { ToastConfig } from './configuration';
import { FREESCAN_ENV, Environment } from './+models';

// Services
import { AuthenticationService } from './+services/authentication.service';
import { RoleService } from './+services/role.service';
import { TierService } from './+services/tier.service';
import { AlertService } from './+services/alert.service';
import { ArticleService } from './+services/article.service';

// Components
import { LoadingComponent } from './loading/loading.component';

// Pipes
import { FreeScanSanitizeHtmlPipe } from './+pipes/sanitize-html.pipe';

const MODULES: any = [
    CommonModule,
    HttpModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    ToastModule.forRoot(),
    DateTimePickerModule,
];

const COMPONENTS: any = [
    LoadingComponent,
];

const PIPES: any = [
    FreeScanSanitizeHtmlPipe,
];


@NgModule({
    imports: [
        ...MODULES,
    ],

    exports: [
        ModalModule,
        BsDropdownModule,
        DateTimePickerModule,

        ...COMPONENTS,
        ...PIPES,
    ],

    declarations: [
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
