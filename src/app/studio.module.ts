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
import { FREESCAN_ENV } from './+models';

// Services
import { AuthenticationService } from './+services/authentication.service';
import { RoleService } from './+services/role.service';
import { TierService } from './+services/tier.service';
import { AlertService } from './+services/alert.service';
import { ArticleService } from './+services/article.service';

// Components
import { LoadingComponent } from './loading/loading.component';

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
export class StudioModule {
    public static forRoot(): ModuleWithProviders {
        return {
            ngModule:  StudioModule,
            providers: [
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
