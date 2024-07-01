export interface MOrder{
    id?:string,
    province: any
    orderType?:string,
    address?:string,
    phone?: string,
    recipientName?: string,
    subTotal?: number,
    total?: number,
    totalDiscount?:number,
    notes?: string,
    items?: MItem[],
    userId?: string,
    dateCreate?:string,
    status?:string,
    transactions?: MTransaction[]
}
export interface MItem{
    productItemId?: string,
    quantity?: number,
    price?: number,
    amountDiscount?: number
}
export interface MTransaction{
    amount?: number,
    type?: string,
    description?: string,
    userId?: string,
    status?: string
}