 export interface MProductImage {
    id?: string;
    url?: string;
}

 export interface MProductItem {
    selected: unknown;
    
    id:string;
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
    supplier?: {id: string, name: string};
    image?:string;
    category:{id: string, name: string};
    categoryId?: string;
    discountId?: string;
    productItems: MProductItem[];
    productSpecifications?:MProductSpecification[];
    rating?:{rate?:number,count?:number};
    productDiscount?:{id?:null,type?:null,value?:number};

}
export interface MProductSpecification{
    id?:string;
    specValue:string;
    specType:string;
}
