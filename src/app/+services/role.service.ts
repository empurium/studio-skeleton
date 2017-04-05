import { Injectable, Inject } from '@angular/core';
import { HttpService } from '@freescan/http';
import { Observable } from 'rxjs/Observable';

import { FREESCAN_ENV, Environment, UserResponse } from '../+models';
import { AuthenticationService } from '../+services/authentication.service';


@Injectable()
export class RoleService {
    protected roles: string[];

    constructor(protected http: HttpService,
                protected authentication: AuthenticationService,
                @Inject(FREESCAN_ENV) protected environment: Environment) {
    }

    public all(): Observable<string[]|undefined> {
        if (!this.authentication.authenticated()) {
            return Observable.of(this.roles);
        }

        if (this.roles) {
            return Observable.of(this.roles);
        }

        return this.http
            .hostname(this.environment.api.passport)
            .get(`users/${this.authentication.userId()}`)
            .map((response: UserResponse) => {
                this.roles = response.data.roles;
                return response.data.roles;
            });
    }
}
