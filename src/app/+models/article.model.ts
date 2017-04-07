import { Response } from './response.model';

export class Article {
    public id: string;
    public title: string;
    public slug_uri: string;
    public preview: string;
    public content: string;
    public person_id: string = 'cbad5fb0-a7ac-4cd9-a68b-6f1c38e31613'; // TODO remove hardcode
    public image_url: string;
    public published_at: Date;
    public concealed_at: Date;
    public is_published: boolean;
}

export class ArticleResponse extends Response {
    public data: Article;
}

export class ArticlesResponse extends Response {
    public data: Article[];
}
