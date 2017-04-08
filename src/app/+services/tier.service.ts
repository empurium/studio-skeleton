import { Injectable, Inject } from '@angular/core';
import { HttpService } from '@freescan/http';
import { Observable } from 'rxjs';

import { FREESCAN_ENV, Environment, Tier, TiersResponse } from '../+models';


@Injectable()
export class TierService {
    protected tiers: Tier[];

    constructor(protected http: HttpService,
                @Inject(FREESCAN_ENV) protected environment: Environment) {
    }

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
}
