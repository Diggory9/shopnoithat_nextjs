"use client";
import ApiOrder from "@/api/order/order-api";
import { MOrder } from "@/models/ordermodel";
import { formatDateToRender } from "@/utils/config";
import { Button, Table, TableColumnsType, Tag } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";

export default function Order() {
    const [dataorders, setDataorders] = useState<MOrder[]>([]);

    //Fetch data orders
    useEffect(() => {
        ApiOrder.getOrders(1, 20)
            .then((res) => {
                setDataorders(res.data);
            })
            .catch((error) => console.log(error));
    }, []);

    // Update status order
    const updateOrderStatus = async (id: string, newStatus: string) => {
        ApiOrder.updateStatusOrder(id, newStatus)
            .then((res) => {
                if (res?.ok) {
                    toast.success("Thành công");
                    ApiOrder.getOrders(1, 20)
                        .then((res) => {
                            setDataorders(res.data);
                        })
                        .catch((error) => console.log(error));
                } else {
                    toast.error("Cập nhật thất bại");
                }
            })
            .catch((error) => console.log(error));
    };

    const getStatusTag = (status?: string) => {
        switch (status) {
            case "COMPLETED":
                return <Tag color="success">Hoàn thành</Tag>;
            case "PROCESSING":
                return <Tag color="processing">Đang xử lý</Tag>;
            case "CANCELLED":
                return <Tag color="error">Đã hủy</Tag>;
            case "NEW-ORDER":
                return <Tag color="cyan">Đơn hàng mới</Tag>;
            default:
                return <Tag>{status}</Tag>;
        }
    };
    const columns: TableColumnsType<MOrder> = [
        {
            title: "STT",
            dataIndex: "index",
            key: "index",
        },
        {
            title: "Người nhận",
            dataIndex: "recipientName",
            key: "recipientName",
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "Tổng tiền",
            dataIndex: "total",
            key: "total",
        },
        {
            title: "Ngày tạo",
            dataIndex: "dateCreate",
            key: "dateCreate",
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (status: string) => getStatusTag(status),
        },
        {
            title: "Hành động",
            dataIndex: "status",
            key: "status",
            render: (_: any, record: MOrder) => (
                <select
                    value={record.status}
                    onChange={(e) =>
                        updateOrderStatus(record.id || "", e.target.value)
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                    <option value="NEW-ORDER">NEW-ORDER</option>
                    <option value="PROCESSING">PROCESSING</option>
                    <option value="COMPLETED">COMPLETED</option>
                    <option value="CANCELLED">CANCELLED</option>
                </select>
            ),
        },
        {
            title: "Chi tiết",
            key: "view",
            render: (_: any, record: { key: string }) => (
                <Link href={`/admin/order/detail/${record.key}`}>
                    <Button type="link">Chi tiết</Button>
                </Link>
            ),
        },
    ] as TableColumnsType<MOrder>;
    return (
        <div className="bg-gray-50">
            <div className=" bg-white p-3  mb-4 shadow-xl ">
                <Toaster position="top-right" richColors></Toaster>
                <div className="flex justify-between ">
                    <div className="p-2">
                        <h1 className="p-3 text-2xl font-bold">Đơn hàng</h1>
                    </div>
                    <div className="order-last content-center">
                        {/* <a href="#">
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
                                Add Order
                            </button>
                        </a> */}
                    </div>
                </div>
            </div>
            <div className="bg-white  mb-4 shadow-xl ">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
                    <Table
                        pagination={{
                            defaultPageSize: 10,
                            showSizeChanger: true,
                            pageSizeOptions: ["10", "20", "30"],
                        }}
                        columns={columns}
                        dataSource={
                            dataorders.map((item, index) => ({
                                ...item,
                                key: item.id,
                                index: index + 1,
                                dateCreate: formatDateToRender(item.dateCreate),
                            })) || []
                        }
                    ></Table>
                </div>
            </div>
        </div>
    );
}
