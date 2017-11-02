import { Injectable, Inject } from '@angular/core';
import { HttpService } from '@rndstudio/http';
import { Observable } from 'rxjs/Observable';

import { FREESCAN_ENV, Environment, File, FileResponse, FilesResponse } from '../+models';


@Injectable()
export class FileService {
    constructor(protected http: HttpService,
                @Inject(FREESCAN_ENV) protected environment: Environment) {
    }

    /**
     * Return the files associated to a given reference identifier.
     */
    public for(referenceId: string): Observable<File[]> {
        return this.http
            .hostname(this.environment.api.vinyl)
            .query({ reference_ids: referenceId })
            .get('files')
            .map((response: FilesResponse) => {
                return response.data ? response.data : [];
            });
    }

    /**
     * Associate a given file to a reference identifier.
     */
    public associate(file: File, referenceId: string): Observable<FileResponse> {
        return this.http
            .hostname(this.environment.api.vinyl)
            .post('files', {
                reference_id:  referenceId,
                display_name:  file.display_name,
                thumbnail_url: file.thumbnail_url,
                url:           file.url,
            });
    }

    /**
     * Delete a file.
     */
    public remove(file: File): Observable<null> {
        return this.http
            .hostname(this.environment.api.vinyl)
            .delete(`files/${file.id}`);
    }
}
