export interface MReview {
    totalCount?: number,
    averageRating?: number,
    productId?: string,
    userId?: string,
    rating?: number,
    content?: string,
    reviewImages?: Image[]
}
export interface Image {
    url?: string
}