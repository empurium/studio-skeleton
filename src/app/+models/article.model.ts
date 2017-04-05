import { Response } from './response.model';

export class Article {
    public id: string;
    public title: string;
    public slug_uri: string;
    public preview: string;
    public content: string;
    public person_id: string;
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
