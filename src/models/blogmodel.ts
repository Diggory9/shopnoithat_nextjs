export interface BlogModel {
    id?: string;
    blogImage?: string;
    title?: string;
    content?: string;
    authorId?: string;
    blogGroupId?: string;
    tagsBlog?: [string];
}
