"use client";
import ApiContact from "@/api/contact/contact-api";
import { ContactModel } from "@/models/contactmodel";
import { useAppSelector } from "@/redux/hooks";
import { formatDateToRender } from "@/utils/config";
import { Button, Skeleton, Table, TableColumnsType, Tag } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";

export default function Contact() {
    const [dataContacts, setDataContacts] = useState<ContactModel[]>([]);
    const [loading, setLoading] = useState(false); // Add loading state
    const auth = useAppSelector((state) => state.authCredentials);
    const token = auth.data?.jwToken || "";

    useEffect(() => {
        ApiContact.getContacts(1, 10, token)
            .then((res) => {
                setDataContacts(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [token]);
    const getStatusReply = (isReply: boolean) => {
        return isReply ? (
            <Tag color="success">Đã trả lời</Tag>
        ) : (
            <Tag color="processing">Chưa trả lời </Tag>
        );
    };
    const columns: TableColumnsType<ContactModel> = [
        {
            title: "STT",
            dataIndex: "index",
            key: "index",
        },
        {
            title: "Tên người dùng",
            dataIndex: "fullName",
            key: "fullName",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "Ngày gửi",
            dataIndex: "dateCreate",
            key: "dateCreate",
        },
        {
            title: "Nội dung",
            dataIndex: "contactContent",
            key: "contactContent",
        },
        {
            title: "Trạng thái",
            dataIndex: "isReply",
            key: "isReply",
            render: (isReply) => getStatusReply(isReply),
        },
        {
            title: "Hành động",
            key: "action",
            render: (_: any, record: { key: string }) => (
                <Link href={`/admin/contact/update/${record.key}`}>
                    <Button type="link">Trả lời</Button>
                </Link>
            ),
        },
    ] as TableColumnsType<ContactModel>;
    return (
        <div className="bg-gray-50 w-full">
            <div className="bg-white p-3 rounded-xl mb-4 shadow-xl">
                <Toaster position="top-right" richColors />
                <div className="flex justify-between">
                    <div className="p-2">
                        <h1 className="p-3 text-2xl font-bold">Liên hệ</h1>
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
                                dataContacts.map((item, index) => ({
                                    ...item,
                                    index: index + 1,
                                    dateCreate: formatDateToRender(
                                        item.dateCreate
                                    ),
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
