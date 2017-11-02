import { Injectable, Inject } from '@angular/core';
import { HttpService } from '@rndstudio/http';
import { Observable } from 'rxjs';

import { FREESCAN_ENV,
    Environment,
    TierResourceResponse,
    TierResourcesResponse,
    TierResource,
    Tier,
} from '../+models';


@Injectable()
export class TierResourceService {
    constructor(protected http: HttpService,
                @Inject(FREESCAN_ENV) protected environment: Environment) {
    }

    /**
     * Return the Tier Resources for the comma-separated reference identifiers.
     */
    public for(ids: string): Observable<TierResource[]> {
        return this.http
            .hostname(this.environment.api.vinyl)
            .query({ reference_ids: ids })
            .get('tier-resources')
            .map((response: TierResourcesResponse) => response.data);
    }

    /**
     * Create a Tier Resource for a given reference identifier.
     */
    public post(tier: Tier, referenceId: string): Observable<TierResource> {
        return this.http
            .hostname(this.environment.api.vinyl)
            .post(`tiers/${tier.id}/resources`, { reference_id: referenceId })
            .map((response: TierResourceResponse) => response.data);
    }

    /**
     * Update a Tier Resource, typically to change the Tier ID.
     */
    public put(tierResource: TierResource): Observable<TierResourceResponse> {
        return this.http
            .hostname(this.environment.api.vinyl)
            .put(`tier-resources/${tierResource.id}`, tierResource);
    }

    /**
     * Delete a given Tier Resource.
     */
    public delete(tierResource: TierResource): Observable<TierResourceResponse> {
        return this.http
            .hostname(this.environment.api.vinyl)
            .delete(`tier-resources/${tierResource.id}`);
    }
}
