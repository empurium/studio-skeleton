import { OpaqueToken } from '@angular/core';

export const FREESCAN_ENV: OpaqueToken = new OpaqueToken('freescan.environment.configuration');

export class Environment {
    public production: boolean;

    public api: {
        passport: string;
        cashier: string;
        files: string;
    };

    public passport: {
        login: string;
        clientId: string;
        redirectURI: string;
        scope: string;
    };
}
