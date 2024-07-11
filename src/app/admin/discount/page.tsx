"use client";
import ApiDiscount from "@/api/discount/discount-api";
import { MDiscount } from "@/models/discount";
import { formatDateToRender } from "@/utils/config";
import { Button, Table, TableColumnsType, Tag } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Discount() {
    const [dataDiscount, setDataDiscount] = useState<MDiscount[]>([]);
    // Fetch data discount
    useEffect(() => {
        ApiDiscount.getAllDiscount(1, 10)
            .then((response) => {
                setDataDiscount(response.data);
            })
            .catch((error) => console.log(error));
    }, []);
    //Update status discount
    const handleUpdateStatus = (id: string, status: string) => {
        ApiDiscount.updateStatusDiscount(id, status)
            .then((response) => {
                if (response?.ok) {
                    toast.success("Cập nhật thành công");
                    ApiDiscount.getAllDiscount(1, 10)
                        .then((response) => {
                            setDataDiscount(response.data);
                        })
                        .catch((error) => console.log(error));
                } else {
                    toast.error("Cập nhật thất bại");
                }
            })
            .catch(() => toast.error("Cập nhật thất bại"));
    };
    const getStatusTag = (status?: string) => {
        switch (status) {
            case "PENDING":
                return <Tag color="processing">Chờ đợi</Tag>;
            case "ACTIVE":
                return <Tag color="success">Hoạt động</Tag>;
            case "PAUSE":
                return <Tag color="warning">Tạm dừng</Tag>;
            case "CANCELLED":
                return <Tag color="error">Đã hủy</Tag>;
            default:
                return <Tag>{status}</Tag>;
        }
    };
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
            render: (status: string) => getStatusTag(status),
        },
        {
            title: "Hành động",
            dataIndex: "status",
            key: "status",
            render: (_: any, record: MDiscount) => (
                <>
                    <Button
                        className="mr-2"
                        onClick={() =>
                            handleUpdateStatus(record.id || "", "pause")
                        }
                        disabled={
                            record.status === "PENDING" ||
                            record.status === "PAUSE"
                        }
                    >
                        Pause
                    </Button>
                    <Button
                        className="mr-2"
                        type="primary"
                        onClick={() =>
                            handleUpdateStatus(record.id || "", "continue")
                        }
                        disabled={record.status === "PENDING"}
                    >
                        Continue
                    </Button>
                    <Button
                        className="mr-2"
                        danger
                        onClick={() =>
                            handleUpdateStatus(record.id || "", "cancel")
                        }
                    >
                        Cancel
                    </Button>
                    <Link
                        className="text-xl"
                        href={`/admin/discount/update/${record.id}`}
                    >
                        <Button>Update Time</Button>
                    </Link>
                </>
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
                                placeholder="Search"
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
