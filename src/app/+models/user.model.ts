import { Response } from './response.model';

export class User {
    public id: string;
    public email: string;
    public enabled: boolean;
    public roles: string[];
}

export class UserResponse extends Response {
    public data: User;
}
