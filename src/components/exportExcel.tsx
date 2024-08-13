import React from "react";
import { exportToExcel } from "../utils/exportexcel";
import { customNumber, formatDateToRender } from "@/utils/config";
import { Button } from "antd";
const ExportExcel = ({ data }: { data: any }) => {
    const handleExport = () => {
        // Chuẩn bị dữ liệu cho worksheet
        const dailySummaryData = [
            ["Ngày", "Tổng đơn hàng", "Tổng sản phẩm bán ra", "Tổng doanh thu"],
            ...data.dailyOrderSummaries.map(
                (item: {
                    date: string | Date | undefined;
                    totalOrder: any;
                    totalProductSold: any;
                    totalRevenue: any;
                }) => [
                    formatDateToRender(item.date),
                    item.totalOrder,
                    item.totalProductSold,
                    customNumber(item.totalRevenue),
                ]
            ),
        ];

        // Gọi chức năng xuất file Excel
        exportToExcel(dailySummaryData, "Thống kê doanh thu");
    };

    return (
        <div>
            <Button onClick={handleExport}>Xuất File Excel</Button>
        </div>
    );
};

export default ExportExcel;
