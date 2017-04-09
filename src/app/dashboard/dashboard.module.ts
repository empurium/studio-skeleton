// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap';

// Routing
import { DashboardRoutingModule } from './dashboard.routing';

// Components
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from '../home/home.component';
import { UnavailableComponent } from '../unavailable/unavailable.component';

// Directives
import { SIDEBAR_TOGGLE_DIRECTIVES } from '../+directives/sidebar.directive';

const MODULES: any = [
    CommonModule,
    BsDropdownModule.forRoot(),

    DashboardRoutingModule,
];

const COMPONENTS: any = [
    DashboardComponent,
    HomeComponent,
    UnavailableComponent,
];

const DIRECTIVES: any = [
    SIDEBAR_TOGGLE_DIRECTIVES,
];


@NgModule({
    imports: [
        ...MODULES,
    ],

    exports: [
        ...COMPONENTS,
        ...DIRECTIVES,
    ],

    declarations: [
        ...COMPONENTS,
        ...DIRECTIVES,
    ],
})
export class DashboardModule {
}
