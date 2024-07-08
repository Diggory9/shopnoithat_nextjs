"use client";
import { MDiscount } from "@/models/discount";
import { formatDateToRender, renderDiscountValue } from "@/utils/config";
import { Button, Table, TableColumnsType } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Discount() {
    const [dataDiscount, setDataDiscount] = useState<MDiscount[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const respone = await fetch(
                    `${process.env.API_URL}Discount/list?pageNumber=1&pageSize=20`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                if (!respone.ok) {
                    throw new Error("Network response was not ok");
                }
                const result = await respone.json();
                setDataDiscount(result.data);
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };
        fetchData();
    }, []);
    const columns: TableColumnsType<MDiscount> = [
        {
            title: "STT",
            dataIndex: "index",
            key: "index",
        },
        {
            title: "Mã code",
            dataIndex: "code",
            key: "code",
        },
        {
            title: "Giá trị",
            dataIndex: "discountValue",
            key: "discountValue",
        },
        {
            title: "Giá trị tối thiểu",
            dataIndex: "condition",
            key: "condition",
        },
        {
            title: "Ngày bắt đầu",
            dataIndex: "dateStart",
            key: "dateStart",
        },
        {
            title: "Ngày kết thúc",
            dataIndex: "dateEnd",
            key: "dateEnd",
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
        },
        {
            title: "Hành động",
            key: "action",
            render: (_: any, record: { key: string }) => (
                <Link href={`/admin/user/detail/${record.key}`}>
                    <Button type="link">Chi tiết</Button>
                </Link>
            ),
        },
    ] as TableColumnsType<MDiscount>;
    return (
        <div className="bg-gray-50 w-full">
            <div className=" bg-white p-3  mb-4 shadow-xl">
                <h1 className="p-3 text-2xl font-bold">All Discount</h1>
                <div className="flex justify-between ">
                    <div className="p-2">
                        <form action="" method="get">
                            <input
                                className="p-2 rounded-lg border border-gray-300"
                                placeholder="Search for category"
                                type="text"
                                name=""
                                id=""
                            />
                        </form>
                    </div>
                    <div className="order-last content-center">
                        <a href="/admin/discount/add">
                            <button
                                className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 rounded-lg  px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 inline-flex "
                                type="button"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1"
                                    stroke="currentColor"
                                    className="size-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                    />
                                </svg>
                                Add Discount
                            </button>
                        </a>
                    </div>
                </div>
            </div>
            <div className="bg-white  mb-4 shadow-xl">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <Table
                        pagination={{
                            defaultPageSize: 10,
                            showSizeChanger: true,
                            pageSizeOptions: ["10", "20", "30"],
                        }}
                        columns={columns}
                        dataSource={
                            dataDiscount.map((item, index) => ({
                                ...item,
                                index: index + 1,
                                key: item.id,
                                dateStart: formatDateToRender(item.dateStart),
                                dateEnd: formatDateToRender(item.dateEnd),
                            })) || []
                        }
                    ></Table>
                </div>
            </div>
        </div>
    );
}
