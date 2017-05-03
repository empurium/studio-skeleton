import { Component } from '@angular/core';

import { AuthenticationService } from '../../+services/authentication.service';


@Component({
    selector:    'studio-locker',
    templateUrl: 'locker.component.html',
    styleUrls:   ['./locker.component.scss'],
})
export class LockerComponent {
    constructor(private authentication: AuthenticationService) {
    }

    /**
     * Begin the login flow.
     */
    public login(): void {
        this.authentication.login();
    }
}
