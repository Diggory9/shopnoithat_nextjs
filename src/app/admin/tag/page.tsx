"use client";
import ApiTag from "@/api/tag/tag-api";
import { formatDateToRender } from "@/utils/config";
import { Table, TableColumnsType } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Tag() {
    const [dataTag, setDataTag] = useState<any>([]);
    useEffect(() => {
        ApiTag.getAllTag()
            .then((res) => {
                setDataTag(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    console.log(dataTag);

    const columns: TableColumnsType<any> = [
        {
            title: "STT",
            dataIndex: "index",
            key: "index",
        },
        {
            title: "Tiêu đề",
            dataIndex: "tagTitle",
            key: "tagTitle",
        },
        {
            title: "Ngày tạo",
            dataIndex: "dateCreate",
            key: "dateCreate",
        },
    ] as TableColumnsType<any>;
    return (
        <div className="bg-gray-50 w-full">
            <div className=" bg-white p-3  mb-4 shadow-xl">
                <h1 className="p-3 text-2xl font-bold">All Tag</h1>
                <div className="flex justify-between ">
                    <div className="p-2"></div>
                    <div className="order-last content-center">
                        <Link href="/admin/tag/add">
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
                                Add Tag
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="bg-white mb-4 shadow-xl">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <Table
                        pagination={{
                            defaultPageSize: 5,
                            showSizeChanger: true,
                            pageSizeOptions: ["5", "10", "15"],
                        }}
                        dataSource={dataTag.map((item: any, index: any) => ({
                            ...item,
                            index: index + 1,
                            key: item.id,
                            dateCreate: formatDateToRender(item.dateCreate),
                        }))}
                        columns={columns}
                    ></Table>
                </div>
            </div>
        </div>
    );
}
