import { OpaqueToken } from '@angular/core';

export const ENV: OpaqueToken = new OpaqueToken('environment.configuration');

export interface Environment {
    production: boolean;

    api: {
        passport: string;
        cashier: string;
        files: string;
    };

    passport: {
        login: string;
        clientId: string;
        redirectURI: string;
        scope: string;
    };
}
