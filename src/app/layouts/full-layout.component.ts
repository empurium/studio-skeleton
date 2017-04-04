import { Component, ViewEncapsulation, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BootstrapGrowlService, BootstrapAlertType } from 'ng2-bootstrap-growl';

import { AuthenticationService } from '../+services/authentication.service';

export interface Navigation {
    routerLink?: string;
    label: string;
    icon: string;
    href?: string;
    show?: boolean|Function;
    click?: Function;
    classes?: string;
}


@Component({
    selector:    'freescan-dashboard',
    templateUrl: './full-layout.component.html',
    styleUrls:   ['../../scss/style.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class FullLayoutComponent implements OnInit {
    @Input() public navigation: Navigation[] = [];

    constructor(protected router: Router,
                protected growl: BootstrapGrowlService,
                protected authentication: AuthenticationService) {
    }

    /**
     * Attempt to login the user. Essentially checks the URL for an access_token,
     * saves to local storage, and then removes it from the URL.
     * Performed in AppComponent to remove from the URL as early as possible.
     */
    public ngOnInit(): void {
        this.authentication.attemptLogin();
    }

    /**
     * True if the user is logged in.
     */
    public authenticated(): boolean {
        return this.authentication.authenticated();
    }

    /**
     * Begin the login flow.
     */
    public login(): void {
        this.authentication.login();
    }

    /**
     * Log the user out and show a message.
     */
    public logout(): boolean {
        if (this.authentication.logout()) {
            this.growl.addAlert('You are now logged out.', BootstrapAlertType.SUCCESS);
            this.router.navigate(['/']);
            return true;
        }

        return false;
    }

    /**
     * Whether or not to show the current navigation item.
     */
    public show(item: Navigation): boolean {
        if (typeof item.show === 'undefined') {
            return true;
        }
        if (typeof item.show === 'function') {
            return item.show();
        }

        return item.show;
    }
}
