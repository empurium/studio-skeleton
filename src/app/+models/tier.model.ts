import { Response } from './response.model';

export class TierAuthorization {
    public id: string;
    public reference_id: string;
    public type: string;
}

export class Tier {
    public id: string;
    public reference_id: string;
    public name: string;
    public enabled: boolean;
    public authorizations: {
        data: TierAuthorization[];
    };
}

export class TiersResponse extends Response {
    public data: Tier[];
}
