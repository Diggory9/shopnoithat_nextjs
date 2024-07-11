
export const numberFormatLocationVietNam = (number: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
}
export const sumQuantity = (productItems: any) => {
    return productItems.reduce(
        (total: any, item: { quantity: any }) =>
            total + (item.quantity || 0),
        0
    );
};
