import { Response } from './response.model';

export class Person {
    public id: string;
    public user_id: string;
    public display_name: string;
    public first_name: string;
    public last_name: string;
    public enabled: boolean = true;
    public email: string;
    public gender: string;
    public avatar_url: string;
    public birthed_at: string;
    public biography: string;
}

export class PeopleResponse extends Response {
    public data: Person[];
}
