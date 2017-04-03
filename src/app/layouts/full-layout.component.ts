import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BootstrapGrowlService, BootstrapAlertType } from 'ng2-bootstrap-growl';

import { AuthenticationService } from '../+services/authentication.service';

@Component({
    selector:    'freescan-dashboard',
    templateUrl: './full-layout.component.html',
    styleUrls:   ['../../scss/style.scss'],
})
export class FullLayoutComponent {
    public disabled: boolean           = false;
    public status: { isopen: boolean } = { isopen: false };

    constructor(private router: Router,
                private growl: BootstrapGrowlService,
                private authentication: AuthenticationService) {
    }

    public toggled(open: boolean): void {
        // Add if needed
    }

    public toggleDropdown($event: MouseEvent): void {
        $event.preventDefault();
        $event.stopPropagation();
        this.status.isopen = !this.status.isopen;
    }

    public authenticated(): boolean {
        return this.authentication.authenticated();
    }

    public login(): void {
        this.authentication.login();
    }

    public logout(): boolean {
        if (this.authentication.logout()) {
            this.growl.addAlert('You are now logged out.', BootstrapAlertType.SUCCESS);
            this.router.navigate(['/']);
            return true;
        }

        return false;
    }
}
