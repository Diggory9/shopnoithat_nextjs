 export interface MProductImage {
    url?: string;
}

 export interface MProductItem {
    selected: unknown;
    
    id?:string;
    quantity?: number;
    color?: {id?:string,colorName?:string,colorCode?:string};
    productImages?: MProductImage[];
}
 export interface MProduct {
    id?:string;
    name?: string;
    description?: string;
    productQuantity?: number;
    productBrand?: string;
    price?: number;
    supplierId?: string;
    image?:string;
    categoryName?:string;
    categoryId?: string;
    discountId?: string;
    productItems?: MProductItem[];
    productSpecifications?:MProductSpecification[];
    rating?:{rate?:number,count?:number};
    productDiscount?:{type?:null,value?:string};

}
export interface MProductSpecification{
    id?:string;
    specValue:string;
    specType:string;
}
