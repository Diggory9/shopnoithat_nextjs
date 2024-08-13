"use client";
import { useAppSelector } from "@/redux/hooks";
import { Button, DatePicker, Input, Table, TableColumnsType } from "antd";
import { useState } from "react";
import { Toaster } from "sonner";
import ApiReport from "@/api/report/report-api";
import dayjs from "dayjs";

export default function Report() {
    const { RangePicker } = DatePicker;
    const auth = useAppSelector((state) => state.authCredentials);
    const token = auth.data?.jwToken || "";
    const [dataProduct, setDataProduct] = useState<any[]>([]);
    const [dateRange, setDateRange] = useState<[string, string]>([
        "2024-07-20",
        "2024-07-30",
    ]);

    const [top, setTop] = useState(1);
    const fetchData = async (
        startDate: string,
        endDate: string,
        topValue: number
    ) => {
        ApiReport.getTopViewProducts(startDate, endDate, top, token)
            .then((res) => {
                setDataProduct(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const handleDateChange = (dates: any, dateStrings: [string, string]) => {
        setDateRange(dateStrings);
    };
    const handleSubmit = () => {
        fetchData(dateRange[0], dateRange[1], top);
        console.log("Value", top);
        console.log("Date:", dateRange);
    };
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        setTop(value > 0 ? value : 1);
    };
    console.log(dataProduct);

    const columns: TableColumnsType<any> = [
        {
            title: "STT",
            dataIndex: "index",
            key: "index",
        },
        {
            title: "Tên sản phẩm",
            dataIndex: "name",
            key: "name",
        },
        // {
        //     title: "Hình ảnh",
        //     dataIndex: "image",
        //     key: "image",
        //     render: (image) => (
        //         <Image src={image} alt="Product Image" width={60} height={60} />
        //     ),
        // },

        {
            title: "Thương hiệu",
            dataIndex: "productBrand",
            key: "productBrand",
        },
        {
            title: "Danh mục",
            dataIndex: "category",
            key: "category",
        },
        {
            title: "Giá",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "Số lượt xem",
            dataIndex: "quantityView",
            key: "quantityView",
        },
    ] as TableColumnsType<any>;
    return (
        <div className="bg-gray-50 w-full">
            <div className="bg-white p-3 mb-4 shadow-xl">
                <h1 className="p-3 text-2xl font-bold">Báo cáo</h1>
                <Toaster position="top-right" richColors />
                <div className="">
                    <RangePicker
                        onChange={handleDateChange}
                        defaultValue={[
                            dayjs(dateRange[0]),
                            dayjs(dateRange[1]),
                        ]}
                    />
                </div>
                <div className="p-2">
                    <span className="pr-4">Số sản phẩm</span>
                    <Input
                        type="number"
                        min={1}
                        style={{ width: 100 }}
                        onChange={handleOnChange}
                    />
                    <Button className="ml-2" onClick={handleSubmit}>
                        Oke
                    </Button>
                </div>
            </div>
            <div className="bg-white mb-4 shadow-xl">
                <div className="relative overflow-x-auto shadow-md sm:rounded-xl">
                    <Table
                        pagination={false}
                        columns={columns}
                        dataSource={
                            dataProduct.map((item, index) => ({
                                ...item,
                                index: index + 1,
                                key: item?.id,
                                name: item?.products?.name,
                                productBrand: item?.products?.productBrand,
                                price: item?.products?.price,
                                category: item?.products?.category?.name,
                            })) || []
                        }
                    />
                </div>
            </div>
        </div>
    );
}
