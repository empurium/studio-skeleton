import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullLayoutComponent } from './layouts/full-layout.component';
import { HomeComponent } from './home/home.component';
import { UnavailableComponent } from './unavailable/unavailable.component';

export const freeScanRoutes: Routes = [
    // All routes that appear within the FullLayout
    {
        path:      '',
        component: FullLayoutComponent,
        data:      {
            title: 'Home',
        },
        children:  [
            {
                path:      '',
                component: HomeComponent,
            },

            // 404
            {
                path:      '**',
                component: UnavailableComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(freeScanRoutes)],
    exports: [RouterModule],
})
export class FreeScanRoutingModule {
}
