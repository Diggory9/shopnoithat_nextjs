export const numberFormatLocationVietNam = (number: number) => {
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(number);
};
export const sumQuantity = (productItems: any) => {
    return productItems.reduce(
        (total: any, item: { quantity: any }) => total + (item.quantity || 0),
        0
    );
};
export const trimAndCleanObjectStrings = (
    obj: Record<string, any>
): Record<string, any> => {
    const cleanedObj: Record<string, any> = {};

    for (const key in obj) {
        if (typeof obj[key] === "string") {
            cleanedObj[key] = obj[key].trim().replace(/\s+/g, " ");
        } else {
            cleanedObj[key] = obj[key];
        }
    }

    return cleanedObj;
};
