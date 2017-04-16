import { Injectable, Inject } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { JwtHelper } from 'angular2-jwt';

import { FREESCAN_ENV, Environment } from '../+models';

@Injectable()
export class AuthenticationService {
    private jwtHelper: JwtHelper = new JwtHelper();

    constructor(private oAuthService: OAuthService,
                @Inject(FREESCAN_ENV) private environment: Environment) {
        this.configure(this.environment);
    }

    /**
     * Return the raw JWT. Can be used in Authorization headers, or where necessary.
     */
    public token(): string {
        return this.oAuthService.getAccessToken();
    }

    /**
     * Return the decoded JWT object key/value pairs.
     */
    public decodeToken(): any|null {
        return this.token() ? this.jwtHelper.decodeToken(this.token()) : null;
    }

    /**
     * Return the current User ID from the JWT. 'sub' is standard for OAuth2.
     */
    public userId(): string|null {
        let jwt: any = this.decodeToken();
        return jwt && jwt.sub ? jwt.sub : null;
    }

    /**
     * Return whether or not the user is logged in.
     */
    public authenticated(): boolean {
        return this.oAuthService.hasValidAccessToken();
    }

    /**
     * Attempt to parse the token(s) within the URL when the auth-server redirects
     * the user back to the app. This does not send the user to the login page.
     */
    public attemptLogin(): boolean {
        return this.oAuthService.tryLogin({
            // onTokenReceived: (context: Context): boolean => {
            //     return !!context;
            // },
        });
    }

    /**
     * Start the OAuth2 Implicit Grant Flow process.
     */
    public login(): void {
        this.oAuthService.initImplicitFlow();
    }

    /**
     * Remove the OAuth2 info from the client's local storage (typically localStorage).
     * Consumer can check return value and respond accordingly.
     */
    public logout(): boolean {
        if (localStorage) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('expires_at');
            localStorage.removeItem('nonce');
            return true;
        }

        return false;
    }

    /**
     * Get the Identity Claims saved in client's local storage. Null if none.
     */
    public get name(): string|null {
        let claims: any = this.oAuthService.getIdentityClaims();
        if (!claims) {
            return null;
        }

        return claims.given_name;
    }

    /**
     * Configure angular-oauth2-oidc service.
     */
    private configure(environment: Environment): void {
        this.oAuthService.loginUrl    = environment.passport.login;
        this.oAuthService.clientId    = environment.passport.clientId;
        this.oAuthService.redirectUri = environment.passport.redirectURI;

        // Scope for the permissions the client should request
        this.oAuthService.scope = environment.passport.scope;

        // OIDC receives an id_token via OpenId Connect in addition to the OAuth2-based access_token
        this.oAuthService.oidc = false;
    }
}
