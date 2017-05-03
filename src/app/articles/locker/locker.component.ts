import { Component } from '@angular/core';

import { AuthenticationService } from '../../+services/authentication.service';
import { WindowService } from '../../+services/window.service';


@Component({
    selector:    'studio-locker',
    templateUrl: 'locker.component.html',
    styleUrls:   ['./locker.component.scss'],
})
export class LockerComponent {
    private window: Window;

    constructor(public authentication: AuthenticationService,
                private windowService: WindowService) {
        this.window = this.windowService.nativeWindow;
    }

    /**
     * Begin the login flow.
     */
    public login(): void {
        let state: string = this.window.location ? this.window.location.href : null;
        this.authentication.login(state);
    }
}
