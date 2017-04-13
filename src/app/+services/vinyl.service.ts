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

        // TODO TEMPORARY: Support unusual studio.staging-720global.freescan.com
        if (domain[1] === 'staging-720global') {
            return 'staging-720global.freescan.com';
        }

        return domain.slice(-2).join('.');
    }

    /**
     * Return the Client ID and Redirect URI for Passport to log into
     * the correct client and location.
     */
    public passport(): PassportData {
        let hostname: string    = window.location.hostname;
        let clientId: string    = '4';
        let redirectURI: string = `http://${hostname}`;

        switch (hostname) {
        // 720 Global
        case '720global.local':
            clientId    = '6';
            redirectURI = `${redirectURI}:5002`;
            break;
        case 'studio.720global.local':
            clientId    = '6';
            redirectURI = `${redirectURI}:5001`;
            break;
        case 'staging-720global.freescan.com':
            clientId = '6';
            break;
        case 'staging-studio.staging-720global.freescan.com':
            clientId = '6';
            break;

        // 360 Global
        case '360global.local':
            clientId    = '8';
            redirectURI = `${redirectURI}:5002`;
            break;
        case 'studio.360global.local':
            clientId    = '8';
            redirectURI = `${redirectURI}:5001`;
            break;
        case 'staging.360global.space':
            clientId = '8';
            break;
        case 'staging-studio.360global.space':
            clientId = '8';
            break;
        }

        return { clientId, redirectURI };
    }

    /**
     * True if the hostname ends with .local.
     */
    private local(domain: string[]): boolean {
        return domain[domain.length - 1] === 'local';
    }
}
