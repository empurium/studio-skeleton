import { Injectable, Inject } from '@angular/core';
import { HttpService } from '@freescan/http';
import { Observable } from 'rxjs/Observable';

import { FREESCAN_ENV, Environment, UserResponse } from '../+models';
import { AuthenticationService } from '../+services/authentication.service';


@Injectable()
export class RoleService {
    protected roles: string[] = null;

    constructor(protected http: HttpService,
                protected authentication: AuthenticationService,
                @Inject(FREESCAN_ENV) protected environment: Environment) {
    }

    /**
     * Returns whether or not the current user has the specified role.
     */
    public has(role: string): boolean {
        if (!this.authentication.authenticated()) {
            return false;
        }

        if (!this.roles) {
            return false;
        }

        return this.roles.indexOf('super administrator') > 0 || this.roles.indexOf(role) > 0;
    }

    /**
     * Request the roles for the currently authenticated user, or
     * undefined if the user is not authenticated.
     */
    public all(): Observable<string[]|null> {
        if (!this.authentication.authenticated()) {
            this.forget();
            return Observable.of(this.roles);
        }

        if (this.roles) {
            return Observable.of(this.roles);
        }

        return this.http
            .hostname(this.environment.api.passport)
            .get(`users/${this.authentication.userId()}`)
            .map((response: UserResponse) => {
                this.roles = response.data.roles || [];
                return this.roles;
            });
    }

    /**
     * Forget the client-side cache.
     */
    public forget(): void {
        this.roles = null;
    }
}
