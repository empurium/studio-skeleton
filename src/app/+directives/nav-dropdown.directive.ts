import { Directive, HostListener } from '@angular/core';

@Directive({
    selector: '.nav-dropdown',

    host: {
        '[class.open]': '_open',
    },
})
export class NavDropdownDirective {
    private _open: boolean = false;

    /**
     * Checks if the dropdown menu is open or not.
     */
    public isOpen(): boolean {
        return this._open;
    }

    /**
     * Opens the dropdown menu.
     */
    public open(): void {
        this._open = true;
    }

    /**
     * Closes the dropdown menu .
     */
    public close(): void {
        this._open = false;
    }

    /**
     * Toggles the dropdown menu.
     */
    public toggle(): void {
        if (this.isOpen()) {
            this.close();
        } else {
            this.open();
        }
    }
}


/**
 * Allows the dropdown to be toggled via click.
 */
@Directive({
    selector: '.nav-dropdown-toggle',
})
export class NavDropdownToggleDirective {
    constructor(private dropdown: NavDropdownDirective) {
    }

    @HostListener('click', ['$event'])
    public toggleOpen($event: any) {
        $event.preventDefault();
        this.dropdown.toggle();
    }
}

export const NAV_DROPDOWN_DIRECTIVES = [NavDropdownDirective, NavDropdownToggleDirective];
// export const NGB_DROPDOWN_DIRECTIVES = [NgbDropdownToggle, NgbDropdown];
