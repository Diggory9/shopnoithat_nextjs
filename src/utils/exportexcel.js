import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const exportToExcel = (data, fileName) => {
    // Tạo một workbook mới
    const wb = XLSX.utils.book_new();

    // Chuyển đổi dữ liệu thành worksheet
    const ws = XLSX.utils.json_to_sheet(data);

    // Thêm worksheet vào workbook
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    // Xuất workbook ra file Excel
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

    // Lưu file với tên đã cung cấp
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, `${fileName}.xlsx`);
};
