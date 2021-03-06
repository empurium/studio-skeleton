import { Component, ViewContainerRef, ViewEncapsulation, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Angulartics2GoogleAnalytics } from 'angulartics2';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { AuthenticationService } from '../+services/authentication.service';
import { WindowService } from '../+services/window.service';
import { AlertService } from '../+services/alert.service';
import { RoleService } from '../+services/role.service';

export interface Navigation {
    routerLink?: string;
    label: string;
    icon: string;
    exactActive?: boolean;
    href?: string;
    show?: boolean | Function;
    click?: Function;
    classes?: string;
}


@Component({
    selector:      'studio-dashboard',
    templateUrl:   './dashboard.component.html',
    styleUrls:     ['../../scss/style.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent {
    @Input() public navigation: Navigation[] = [];
    @Input() public layout: string           = 'dashboard';
    @Input() public studioUrl: string        = '';
    private window: Window;

    constructor(protected router: Router,
                protected toastr: ToastsManager,
                protected vcr: ViewContainerRef,
                protected alerts: AlertService,
                protected authentication: AuthenticationService,
                protected windowService: WindowService,
                protected angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics,
                protected roles: RoleService) {
        this.window = this.windowService.nativeWindow;
        this.toastr.setRootViewContainerRef(this.vcr);
    }

    /**
     * Attempt to login the user. Essentially checks the URL for an access_token,
     * saves to local storage, and then removes it from the URL.
     * Performed in AppComponent to remove from the URL as early as possible.
     */
    public attemptLogin(): boolean {
        return this.authentication.attemptLogin((context: any) => {
            if (context && context.state) {
                this.window.location.href = context.state;
            }
        });
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
            this.alerts.info('Logged out.', null);
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

    /**
     * Returns whether the consumer requested a given layout.
     */
    public needsLayout(layout: string): boolean {
        return this.layout === layout;
    }
}
