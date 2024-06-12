 export interface MProductImages {
    url: string;
}

 export interface MProductItem {
    productImages: MProductImages[];
}
 export interface MProduct {
    name: string;
    description: string;
    productQuantity: number;
    productBrand: string;
    price: number;
    productImages: MProductImages[];
    productItems: MProductItem[];
}
