export class Post {
    Id: number;
    Title: string;
    Content: string;
    CreationDate: string;
    IdAuthor: number;
    Comments: Comment[];
    showComments: boolean = false;
}
