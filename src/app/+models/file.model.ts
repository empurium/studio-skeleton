import { Response } from './response.model';

export class File {
    public id?: string;
    public reference_id?: string;
    public thumbnail_url?: string;
    public display_name: string;
    public url: string;
}

export class FileResponse extends Response {
    public data: File;
}

export class FilesResponse extends Response {
    public data: File[];
}
