import { Component } from '@angular/core';
import { AuthenticationService } from '@freescan/authentication';

@Component({
    selector:    'freescan-dashboard',
    templateUrl: './full-layout.component.html',
})
export class FullLayoutComponent {
    public disabled: boolean           = false;
    public status: { isopen: boolean } = { isopen: false };

    constructor(private authentication: AuthenticationService) {
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
        return this.authentication.logout();
    }
}
