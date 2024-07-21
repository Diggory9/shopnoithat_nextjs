export interface OrderInfo {
    id: string,
    orderType: string,
    address: string,
    phone: string,
    recipientName: string,
    subTotal: number,
    total: number,
    totalDiscount: number,
    dateCreate: Date,
    notes: string
};