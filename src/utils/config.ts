// import { MenuItem, ProductSKUOption } from '@/models/productModels';
import { MDiscount } from '@/models/discount';
import dayjs from 'dayjs';

import advancedFormat from 'dayjs/plugin/advancedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localeData from 'dayjs/plugin/localeData';
import weekday from 'dayjs/plugin/weekday';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import weekYear from 'dayjs/plugin/weekYear';
// import { ContentState, convertFromHTML, EditorState } from 'draft-js';
// import draftToHtml from 'draftjs-to-html';
// import htmlToDraft from 'html-to-draftjs';
// import { RawDraftContentState } from 'react-draft-wysiwyg';

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);

export const vietnamesePhoneNumberRegex = /(0|\+84)(\d{9})\b/;

// export const editorToHtml = (rawContentState: RawDraftContentState | null) => {
// 	if (!rawContentState) return '';
// 	return draftToHtml(rawContentState);
// };

// export const htmlToEditor = (html: string) => {
// 	if (!html) return EditorState.createEmpty();
// 	const blocksFromHtml = htmlToDraft(html);
// 	const { contentBlocks, entityMap } = blocksFromHtml;
// 	const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
// 	return EditorState.createWithContent(contentState);
// };


export const checkProductName = (value: string | undefined | null): Promise<void> => {
    return new Promise((resolve, reject) => {
        if (!value || value.trim().length === 0) {
            reject('Hãy nhập tên sản phẩm');
        } else if (value.trim().length <= 5) {
            reject('Tên sản phẩm phải  lớn hơn 5 ký tự');
        } else {
            resolve();
        }
    });
};
export const checkQuantity = (value: number | undefined | null): Promise<void> => {
    return new Promise((resolve, reject) => {
        if (!value || isNaN(value)) {
            reject('Hãy nhập số lượng sản phẩm');
        } else if (value <= 1) {
            reject('Số lượng sản phẩm phải lớn hơn 1');
        } else {
            resolve();
        }
    });
};
export const checkDescription = (value: string | undefined | null): Promise<void> => {
    return new Promise((resolve, reject) => {
        if (!value || value.trim().length === 0) {
            reject('Hãy nhập mô tả sản phẩm');
        } else if (value.trim().length <= 10) {
            reject('Tên sản phẩm phải  lớn hơn 10 ký tự');
        } else {
            resolve();
        }
    });
};
export const checkBrandName = (value: string | undefined | null): Promise<void> => {
    return new Promise((resolve, reject) => {
        if (!value || value.trim().length === 0) {
            reject('Hãy nhập thương hiệu sản phẩm');
        } else if (value.trim().length < 3) {
            reject('Thương hiệu phải có độ dài lớn hơn 3 ký tự');
        } else {
            resolve();
        }
        
    });
};

export const checkCategory = (category: string | undefined | null): Promise<void> => {
    return new Promise((resolve, reject) => {
        // Check if the category is undefined, null, an empty string, or a placeholder value
        if (!category || category.trim().length === 0 || category === 'select') {
            // Reject the promise with an appropriate error message
            reject('Hãy chọn danh mục sản phẩm');
        } else {
            // If the category is valid, resolve the promise
            resolve();
        }
    });
};
export const checkSupplier = (supplier: string | undefined | null): Promise<void> => {
    return new Promise((resolve, reject) => {
        // Check if the supplier is undefined, null, an empty string, or a placeholder value
        if (!supplier || supplier.trim().length === 0 || supplier === 'select') {
            // Reject the promise with an appropriate error message
            reject('Hãy chọn nhà cung cấp');
        } else {
            // If the category is valid, resolve the promise
            resolve();
        }
    });
};
export const customMoney = (money: number|null|undefined) => {
	return (money || 0).toLocaleString('vi-VN', {
		style: 'currency',
		currency: 'VND',
	});
};

export const customNumber = (number: number|undefined) => {
	return number?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

export const compareAlphabet = <T>(array: T[], key: keyof T, direction: 'asc' | 'desc' = 'asc'): T[] => {
	return array.sort((a, b) => (direction === 'asc' ? String(a[key]).localeCompare(String(b[key])) : String(b[key]).localeCompare(String(a[key]))));
};

export const handleFormatterInputNumber = (value: number | undefined) => {
	if (value) {
		return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
	}
	return '0';
};

export const handleParserInputNumber = (value: string | undefined) => {
	if (value) {
		return Number(value.replace(/\./g, ''));
	}
	return 0;
};

export const checkInputMoney = (value: number) => {
	if (!value) {
		return Promise.reject('Hãy nhập giá sản phẩm');
	} else if (value < 1000) {
		return Promise.reject('Giá phải lớn hơn 1000');
	}
	return Promise.resolve();
};
export const checkDiscountCode = (value: string | undefined | null): Promise<void> => {
    return new Promise((resolve, reject) => {
        if (!value || value.trim().length === 0) {
            reject('Hãy mã giảm giá');
        } else if (value.trim().length <= 3) {
            reject('Mã giảm giá phải lớn hơn 3 ký tự');
        } else {
            resolve();
        }
    });
};
export const checkDiscountType = (discount: string | undefined | null): Promise<void> => {
    return new Promise((resolve, reject) => {
        // Check if the discount is undefined, null, an empty string, or a placeholder value
        if (!discount || discount.trim().length === 0 || discount === 'select') {
         
            reject('Hãy chọn kiểu giảm giá');
        } else {
           
            resolve();
        }
    });
};
export const renderDiscountValue = (item: MDiscount) => {
	if (item.type === "PERCENTAGE") {
		return `${item.discountValue}%`;
	} else if (item.type === "FIX-AMOUNT") {
		return customNumber(item.discountValue)+"đ";
	}
	return "";
};
export const objectToQueryString = <T>(object: T): string => {
	return '?' + new URLSearchParams(object as any).toString();
};

export const formatDate = (date?: Date | string | dayjs.Dayjs | null, format?: string) => {
	return dayjs(date || new Date()).format(format || 'YYYY-MM-DD');
};

export const formatDateTime = (date?: Date | string | dayjs.Dayjs | null, format?: string) => {
	return dayjs(date || new Date()).format(format || 'YYYY-MM-DD HH:mm');
};

export const formatDateToRender = (date?: Date | string) => {
	if (!date) return '';
	return formatDate(date, 'DD/MM/YYYY');
};

export const formatDateTimeToRender = (date?: Date | string) => {
	if (!date) return '';
	return formatDate(date, 'DD/MM/YYYY HH:mm');
};

export const changeDateStringToDayjs = (date: string | Date) => {
	return dayjs(date || new Date());
};

export const formatPhonenumber = (phoneNumber: string) => {
	return phoneNumber.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
};

export const checkPhoneNumber = (phoneNumber: string) => {
	if (!vietnamesePhoneNumberRegex.test(phoneNumber)) {
		return Promise.reject('Please enter a valid phone number');
	}
	return Promise.resolve();
};


export const dataURLtoFile = (dataurl: string, filename: string) => {
	const arr = dataurl.split(','),
		mime = arr[0]?.match(/:(.*?);/)?.[1],
		bstr = atob(arr[arr.length - 1]);
	let n = bstr.length;
	const u8arr = new Uint8Array(n);
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}
	return new File([u8arr], filename, { type: mime });
};




