"use client";
import ApiUser from "@/api/user/user-api";
import { MUser } from "@/models/user";
import { Button, Table, Skeleton } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import type { TableColumnsType } from "antd";
import { useAppSelector } from "@/redux/hooks";

export default function User() {
    const [dataUsers, setDataUsers] = useState<MUser[]>([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const auth = useAppSelector((state) => state.authCredentials);
    const token = auth.data?.jwToken || "";

    useEffect(() => {
        setLoading(true); // Set loading to true before fetching
        ApiUser.getAllUser(1, 10, token)
            .then((res) => {
                setDataUsers(res.data);
                setLoading(false); // Set loading to false after data is fetched
            })
            .catch((error) => {
                console.log(error);
                setLoading(false); // Ensure loading is set to false even if there's an error
            });
    }, [token]);

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
            <div className="bg-white p-3 rounded-xl mb-4 shadow-xl">
                <Toaster position="top-right" richColors />
                <div className="flex justify-between">
                    <div className="p-2">
                        <h1 className="p-3 text-2xl font-bold">Người dùng</h1>
                    </div>
                    <div className="order-last content-center"></div>
                </div>
            </div>
            <div className="bg-white rounded-xl mb-4 shadow-xl">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    {loading ? (
                        <div className="p-4">
                            <Skeleton active paragraph={{ rows: 5 }} />
                        </div>
                    ) : (
                        <Table
                            columns={columns}
                            dataSource={
                                dataUsers.map((item, index) => ({
                                    ...item,
                                    index: index + 1,
                                    key: item.id,
                                })) || []
                            }
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
