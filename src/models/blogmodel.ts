export interface BlogModel {
    blogImage?: string,
    title?: string,
    content?: string,
    authorId?: string,
    blogGroupId?: string,
    tagsBlog?: [
        string
    ]
}