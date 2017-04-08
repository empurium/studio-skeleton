import { Component, ViewContainerRef, ViewEncapsulation, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { AuthenticationService } from '../+services/authentication.service';
import { RoleService } from '../+services/role.service';

export interface Navigation {
    routerLink?: string;
    label: string;
    icon: string;
    href?: string;
    show?: boolean | Function;
    click?: Function;
    classes?: string;
}


@Component({
    selector:      'freescan-dashboard',
    templateUrl:   './full-layout.component.html',
    styleUrls:     ['../../scss/style.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class FullLayoutComponent {
    @Input() public navigation: Navigation[] = [];

    constructor(protected router: Router,
                protected toastr: ToastsManager,
                protected vcr: ViewContainerRef,
                protected authentication: AuthenticationService,
                protected roles: RoleService) {
        this.toastr.setRootViewContainerRef(this.vcr);
    }

    /**
     * Attempt to login the user. Essentially checks the URL for an access_token,
     * saves to local storage, and then removes it from the URL.
     * Performed in AppComponent to remove from the URL as early as possible.
     */
    public attemptLogin(): boolean {
        return this.authentication.attemptLogin();
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
