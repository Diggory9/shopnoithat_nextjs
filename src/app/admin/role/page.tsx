"use client";
import ApiRole from "@/api/role/role-api";
import { MRole } from "@/models/role";
import { Button, Table, TableColumnsType } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Role {
    id: string;
    name: string;
}

export default function Role() {
    const [dataRole, setDataRole] = useState<Role[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const respone = await ApiRole.getAllRole();
                if (!respone.ok) {
                    throw new Error("Network response was not ok");
                }
                const result = await respone.json();
                setDataRole(result.data);
            } catch (error) {
                console.error("Fetch error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    const columns: TableColumnsType<MRole> = [
        {
            title: "STT",
            dataIndex: "index",
            key: "index",
        },
        {
            title: "Tên vai trò",
            dataIndex: "name",
            key: "name",
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
    ] as TableColumnsType<MRole>;
    return (
        <div className="bg-gray-50 w-full">
            <div className=" bg-white p-3  mb-4 shadow-xl">
                <h1 className="p-3 text-2xl font-bold">All Role</h1>
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
                        <button
                            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 rounded-lg  px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 inline-flex "
                            type="button"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1"
                                stroke="currentColor"
                                className="size-6"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                />
                            </svg>
                            Add Role
                        </button>
                    </div>
                </div>
            </div>
            <div className="bg-white mb-4 shadow-xl">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <Table
                        dataSource={dataRole.map((item, index) => ({
                            ...item,
                            index: index + 1,
                            key: item.id,
                        }))}
                        columns={columns}
                    ></Table>
                </div>
            </div>
        </div>
    );
}
