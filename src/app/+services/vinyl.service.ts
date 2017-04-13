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
     * True if the hostname ends with .local.
     */
    private local(domain: string[]): boolean {
        return domain[domain.length - 1] === 'local';
    }
}
