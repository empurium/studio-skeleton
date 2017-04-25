import { Injectable, Inject } from '@angular/core';
import { HttpService } from '@freescan/http';
import { Observable } from 'rxjs/Observable';

import { FREESCAN_ENV, Environment, Person, PeopleResponse } from '../+models';


@Injectable()
export class PeopleService {
    protected limit: number = 15;
    protected people: PeopleResponse;

    constructor(protected http: HttpService,
                @Inject(FREESCAN_ENV) protected environment: Environment) {
    }

    /**
     * Request the latest people. Caches on the client.
     * Supports pagination and limit.
     */
    public all(page: number = 1, limit: number = this.limit): Observable<PeopleResponse> {
        if (this.people) {
            return Observable.of(this.people);
        }

        return this.http
            .hostname(this.environment.api.vinyl)
            .query({ page, limit })
            .get('people')
            .map((response: PeopleResponse) => {
                this.people = response;
                return response;
            });
    }

    /**
     * Request a given person. Does not cache on the client.
     */
    public one(id: string): Observable<PeopleResponse> {
        return this.http
            .hostname(this.environment.api.vinyl)
            .get(`people/${id}`);
    }

    /**
     * Create a person.
     */
    public post(person: Person): Observable<PeopleResponse> {
        return this.http
            .hostname(this.environment.api.vinyl)
            .post('people', person)
            .finally(() => this.forget());
    }

    /**
     * Update a person.
     */
    public put(person: Person): Observable<PeopleResponse> {
        return this.http
            .hostname(this.environment.api.vinyl)
            .put(`people/${person.id}`, person)
            .finally(() => this.forget());
    }

    /**
     * Delete a person.
     */
    public delete(person: Person): Observable<PeopleResponse> {
        return this.http
            .hostname(this.environment.api.vinyl)
            .delete(`people/${person.id}`)
            .finally(() => this.forget());
    }

    /**
     * Forget the client-side cache.
     */
    public forget(): void {
        this.people = null;
    }
}
