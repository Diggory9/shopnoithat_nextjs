export interface CartModel{
    color?:{ colorName?: string, colorCode?:string},
    id?:string,
    image?:ImageModel,
    name?:string,
    discount?:{type?:string,value?:number},
    price?:number,
    quantity?:number,
    quantityInStock?:number,
    
}
export interface ImageModel{
    id?:string,
    url?:string
}
