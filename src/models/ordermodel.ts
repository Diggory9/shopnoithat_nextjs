export interface MOrder {
    id?: string,
    orderId?: string,
    province: any
    orderType?: string,
    address?: string,
    phone?: string,
    recipientName?: string,
    subTotal?: number,
    total?: number,
    totalDiscount?: number,
    notes?: string,
    orderItems?: MItem[],
    userId?: string,
    dateCreate?: string,
    status?: string,
    transactions?: MTransaction[]
}
export interface MItem {
    productItemId?: string,
    quantity?: number,
    price?: number,
    amountDiscount?: number,
    product?: {
        productId?: string,
        productName?: string,
        colorItem?: {
            id?: string,
            colorName?: string,
            colorCode?: string,
        },
        image?: string,
    }
}
export interface MTransaction {
    amount?: number,
    type?: string,
    description?: string,
    userId?: string,
    status?: string
}
export interface OrderData {
    key: string | number;
    stt: number;
    orderNumber: string;
    recipientName: string;
    total: number;
    status: string;
}