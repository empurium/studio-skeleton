import { NgModule, ModuleWithProviders} from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { AuthenticationModule } from '@freescan/authentication';
import { HttpService } from '@freescan/http';
import { DropdownModule } from 'ng2-bootstrap/dropdown';

// Environment
import { ENV, Environment } from '@env/environment.interface';

// Routing Module
import { FreeScanRoutingModule } from '@fs/freescan.routing';

// Shared
import { NAV_DROPDOWN_DIRECTIVES } from '@fs/+directives/nav-dropdown.directive';
import { SIDEBAR_TOGGLE_DIRECTIVES } from '@fs/+directives/sidebar.directive';
import { AsideToggleDirective } from '@fs/+directives/aside.directive';

// Components
import { FullLayoutComponent } from '@fs/layouts/full-layout.component';
import { HomeComponent } from '@fs/home/home.component';
import { UnavailableComponent } from '@fs/unavailable/unavailable.component';

// Export everything individually too for consumers
export * from './src';

export const MODULES: any = [
    BrowserModule, // Do not use with Universal
    HttpModule,
    FreeScanRoutingModule,
    DropdownModule.forRoot(),
    AuthenticationModule.forRoot(this.environment.passport),
];
export const DIRECTIVES: any = [
    NAV_DROPDOWN_DIRECTIVES,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective,
];
export const COMPONENTS: any = [
    FullLayoutComponent,
    HomeComponent,
    UnavailableComponent,
];

@NgModule({
    imports: [
        ...MODULES,
    ],

    exports: [
        ...DIRECTIVES,
        ...COMPONENTS,
    ],

    declarations: [
        ...DIRECTIVES,
        ...COMPONENTS,
    ],
})
export default class FreeScanModule {
    public static forRoot(environment: Environment): ModuleWithProviders {
        return {
            ngModule:  FreeScanModule,
            providers: [
                { provide: ENV, useValue: environment },
                HttpService,
            ],
        };
    }
}
