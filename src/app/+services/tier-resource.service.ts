import { Injectable, Inject } from '@angular/core';
import { HttpService } from '@freescan/http';
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
    protected tierResources: TierResource[];

    constructor(protected http: HttpService,
                @Inject(FREESCAN_ENV) protected environment: Environment) {
    }

    /**
     * Return the Tier Resources for the comma-separated reference identifiers.
     */
    public for(ids: string): Observable<TierResource[]> {
        if (this.tierResources) {
            return Observable.of(this.tierResources);
        }

        return this.http
            .hostname(this.environment.api.vinyl)
            .query({ reference_ids: ids })
            .get('tier-resources')
            .map((response: TierResourcesResponse) => {
                this.tierResources = response.data ? response.data : [];
                return this.tierResources;
            });
    }

    /**
     * Create a Tier Resource for a given reference identifier.
     */
    public post(tier: Tier, referenceId: string): Observable<TierResource> {
        return this.http
            .hostname(this.environment.api.vinyl)
            .post(`tiers/${tier.id}/resources`, { reference_id: referenceId })
            .map((response: TierResourceResponse) => {
                return response.data;
            })
            .finally(() => this.forget());
    }

    /**
     * Update a Tier Resource to change the Tier ID.
     */
    public patch(tierResource: TierResource, tier: Tier): Observable<TierResourceResponse> {
        return this.http
            .hostname(this.environment.api.vinyl)
            .patch(`tier-resources/${tierResource.id}`, { tier_id: tier.id })
            .finally(() => this.forget());
    }

    /**
     * Delete a given Tier Resource.
     */
    public delete(tierResource: TierResource): Observable<TierResourceResponse> {
        return this.http
            .hostname(this.environment.api.vinyl)
            .delete(`tier-resources/${tierResource.id}`)
            .finally(() => this.forget());
    }

    /**
     * Clear the client-side cache.
     */
    public forget(): void {
        this.tierResources = [];
    }
}
