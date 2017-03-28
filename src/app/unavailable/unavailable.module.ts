import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UnavailableComponent } from './unavailable.component';


@NgModule({
    imports: [
        // Import this LAST since it is a catch-all
        RouterModule.forChild([
            { path: '**', component: UnavailableComponent },
        ]),
    ],

    exports: [
        RouterModule,
        UnavailableComponent,
    ],

    declarations: [
        UnavailableComponent,
    ],
})
export class UnavailableModule {
}
