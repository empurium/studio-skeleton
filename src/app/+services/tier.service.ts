import { Injectable, Inject } from '@angular/core';
import { HttpService } from '@freescan/http';
import { Observable } from 'rxjs';

import { FREESCAN_ENV, Environment, Tier, TiersResponse } from '../+models';
import { AuthenticationService } from '../+services/authentication.service';


@Injectable()
export class TierService {
    protected tiers: Tier[];
    protected userTiers: Tier[];

    constructor(protected http: HttpService,
                protected authentication: AuthenticationService,
                @Inject(FREESCAN_ENV) protected environment: Environment) {
    }

    /**
     * Return all available tiers for this white label.
     */
    public all(): Observable<Tier[]> {
        if (this.tiers) {
            return Observable.of(this.tiers);
        }

        return this.http
            .hostname(this.environment.api.vinyl)
            .get('tiers')
            .map((response: TiersResponse) => {
                this.tiers = response.data ? response.data : [];
                return this.tiers;
            });
    }

    /**
     * Return the tiers that this user has currently subscribed to.
     */
    public user(): Observable<Tier[]> {
        if (this.userTiers && this.userTiers.length) {
            return Observable.of(this.userTiers);
        }
        if (!this.authentication.userId()) {
            return Observable.of([]);
        }

        return this.http
            .hostname(this.environment.api.vinyl)
            .get(`users/${this.authentication.userId()}/tiers`)
            .map((response: TiersResponse) => {
                this.userTiers = response.data ? response.data : [];
                return this.userTiers;
            });
    }

    /**
     * Return whether or not the current user is in a Tier identifier.
     */
    public has(tierId: string): boolean {
        if (!this.authentication.userId() || !this.userTiers || !this.userTiers.length) {
            return false;
        }

        return this.userTiers
                .map((tier: Tier) => tier.id)
                .indexOf(tierId) >= 0;
    }

    /**
     * Clear the client-side cache.
     */
    public forget(): void {
        this.userTiers = [];
    }
}
