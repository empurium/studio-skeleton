import { Response } from './response.model';

export class Subscription {
    public id: string;
    public name: string;
}

export class SubscriptionResponse extends Response {
    public data: Subscription[];
}
