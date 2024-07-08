export interface CartModel {
    color?: { colorName?: string, colorCode?: string },
    id?: string,
    images?: ImageModel[],
    image?: {
        id?: string,
        url?: string
    }
    name?: string,
    discount?: { type?: string, value?: number },
    price?: number,
    quantity?: number,
    quantityInStock?: number,

}
export interface ImageModel {
    id?: string,
    url?: string
}
