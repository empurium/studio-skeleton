import { Response } from './response.model';
import { Person } from './people.model';

export class Article {
    public id: string;
    public title: string;
    public slug_uri: string;
    public preview: string;
    public content: string;
    public person: { data: Person; };
    public person_id: string;
    public image_url: string;
    public published_at: string;
    public concealed_at: string;
    public is_published: boolean;
}

export class ArticleResponse extends Response {
    public data: Article;
}

export class ArticlesResponse extends Response {
    public data: Article[];
}
