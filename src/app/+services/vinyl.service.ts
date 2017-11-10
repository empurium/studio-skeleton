export interface PassportData {
    clientId: string;
    redirectURI: string;
}

export class VinylService {
    /**
     * Return the domain portion from window.location.hostname. Excludes the subdomain.
     * We do not care about www, or any other subdomain.
     * We are only interested in this portion: www.[company.com].
     */
    public domain(): string {
        let domain: string[] = window.location.hostname.split('.');

        // Support publication.studio.local and studio.company.local
        if (this.local(domain)) {
            return domain[0] === 'publication'
                ? domain.slice(-3).join('.')
                : domain.slice(-2).join('.');
        }

        return domain.slice(-2).join('.');
    }

    /**
     * Return the Client ID and Redirect URI for Passport to log into
     * the correct client and location.
     *
     * Used by the Publication Studio dashboard environment configuration.
     */
    public passport(): PassportData {
        let hostname: string    = window.location.hostname;
        let clientId: string    = '4';
        let redirectURI: string = `http://${hostname}`;

        switch (hostname) {
            // Publication Studio
            case 'publication.studio.test':
                clientId    = '4';
                redirectURI = `${redirectURI}:5001`;
                break;
            case 'staging.publication.studio':
                clientId    = '4';
                break;
            case 'publication.studio':
                clientId    = '1';
                redirectURI = `https://${hostname}`;
                break;

            // 720 Global
            case 'studio.720global.test':
                clientId    = '8';
                redirectURI = `${redirectURI}:5001`;
                break;
            case 'staging-studio.720global.com':
                clientId = '8';
                break;
            case 'studio.720global.com':
                clientId    = '4';
                redirectURI = `https://${hostname}`;
                break;

            // 360 Global
            case 'studio.360global.test':
                clientId    = '12';
                redirectURI = `${redirectURI}:5001`;
                break;
            case 'staging-studio.360global.space':
                clientId = '12';
                break;
            case 'studio.360global.space':
                clientId    = '6';
                redirectURI = `https://${hostname}`;
                break;
        }

        return { clientId, redirectURI };
    }

    /**
     * True if the hostname ends with .test.
     */
    private local(domain: string[]): boolean {
        return domain[domain.length - 1] === 'test';
    }
}
