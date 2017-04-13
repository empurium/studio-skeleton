import { InjectionToken } from '@angular/core';

export const FREESCAN_ENV: InjectionToken<string> = new InjectionToken('freescan.environment.configuration');

export class Environment {
    public production: boolean;
    public staging: boolean;

    public api: {
        passport: string;
        vinyl: string;
        cashier: string;
        files: string;
        publications: string;
    };

    public passport: {
        login: string;
        clientId: string;
        redirectURI: string;
        scope: string;
    };
}
