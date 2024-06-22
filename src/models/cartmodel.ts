export interface CartModel{
    color?:ColorModel,
    id?:string,
    images?:ImageModel[],
    name?:string,
    price?:number,
    quantity?:number,
    quantityInStock?:number,
    
}
export interface ImageModel{
    id?:string,
    url?:string
}
export interface ColorModel{
    colorName?: string, colorCode?:string
}
