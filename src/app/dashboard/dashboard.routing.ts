import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from '../home/home.component';

const dashboardRoutes: Routes = [
    // All routes that appear within the DashboardComponent
    {
        path:      '',
        component: DashboardComponent,
        data:      {
            title: 'Home',
        },
        children:  [
            {
                path:      '',
                component: HomeComponent,
            },
        ],
    },
];


@NgModule({
    imports: [RouterModule.forRoot(dashboardRoutes)],
    exports: [RouterModule],
})
export class DashboardRoutingModule {
}
