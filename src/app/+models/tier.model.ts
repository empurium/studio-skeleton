import { Response } from './response.model';

export class Tier {
    public id: string;
    public reference_id: string;
    public name: string;
    public enabled: boolean;
    public authorizations: {
        data: TierAuthorization[];
    };
}

export class TierAuthorization {
    public id: string;
    public reference_id: string;
    public type: string;
}

export class TierResource {
    public id: string;
    public reference_id: string;
    public tier: {
        data: Tier;
    };
}

export class TierResponse extends Response {
    public data: Tier;
}

export class TiersResponse extends Response {
    public data: Tier[];
}

export class TierResourceResponse extends Response {
    public data: TierResource;
}

export class TierResourcesResponse extends Response {
    public data: TierResource[];
}
