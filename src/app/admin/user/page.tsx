"use client";
import ApiUser from "@/api/user/user-api";
import { MUser } from "@/models/user";
import { Button, Table } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import type { TableColumnsType } from "antd";

export default function User() {
    const [dataUsers, setDataUsers] = useState<MUser[]>([]);
    useEffect(() => {
        ApiUser.getAllUser(1, 10)
            .then((res) => {
                setDataUsers(res.data);
            })
            .catch((error) => console.log(error));
    }, []);

    const columns: TableColumnsType<MUser> = [
        {
            title: "STT",
            dataIndex: "index",
            key: "index",
        },
        {
            title: "Tên người dùng",
            dataIndex: "userName",
            key: "userName",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Số điện thoại",
            dataIndex: "phoneNumber",
            key: "phoneNumber",
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
    ] as TableColumnsType<MUser>;
    return (
        <div className="bg-gray-50 w-full">
            <div className=" bg-white p-3 rounded-xl mb-4 shadow-xl ">
                <Toaster position="top-right" richColors></Toaster>
                <div className="flex justify-between ">
                    <div className="p-2">
                        <h1 className="p-3 text-2xl font-bold">All User</h1>
                    </div>
                    <div className="order-last content-center">
                        <a href="#">
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
                                Add User
                            </button>
                        </a>
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-xl mb-4 shadow-xl ">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
                    <Table
                        // rowKey="key"
                        columns={columns}
                        dataSource={
                            dataUsers?.map((item, index) => ({
                                ...item,
                                index: index + 1,
                                key: item.id,
                            })) || []
                        }
                    />
                </div>
            </div>
        </div>
    );
}
