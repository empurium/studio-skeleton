import { NgModule, ModuleWithProviders} from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { HttpService } from '@freescan/http';
import { DropdownModule } from 'ng2-bootstrap/dropdown';

// Environment
import { FREESCAN_ENV, Environment } from './src/app/+models';

// Routing Module
import { FreeScanRoutingModule } from './src/app/freescan.routing';

// Shared
import { NAV_DROPDOWN_DIRECTIVES } from './src/app/+directives/nav-dropdown.directive';
import { SIDEBAR_TOGGLE_DIRECTIVES } from './src/app/+directives/sidebar.directive';
import { AsideToggleDirective } from './src/app/+directives/aside.directive';

// Components
import { FullLayoutComponent } from './src/app/layouts/full-layout.component';
import { HomeComponent } from './src/app/home/home.component';
import { UnavailableComponent } from './src/app/unavailable/unavailable.component';

// Export everything individually too for consumers
export * from './src';

export const MODULES: any = [
    BrowserModule, // Do not use with Universal
    HttpModule,
    FreeScanRoutingModule,
    DropdownModule.forRoot(),
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
export class FreeScanModule {
    public static forRoot(environment: Environment): ModuleWithProviders {
        return {
            ngModule:  FreeScanModule,
            providers: [
                { provide: FREESCAN_ENV, useValue: environment },
                HttpService,
            ],
        };
    }
}
