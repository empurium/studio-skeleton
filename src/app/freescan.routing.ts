import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullLayoutComponent } from './layouts/full-layout.component';
import { HomeComponent } from './home/home.component';

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
        ],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(freeScanRoutes)],
    exports: [RouterModule],
})
export class FreeScanRoutingModule {
}
