"use client";
import ApiSupplier from "@/api/supplier/supplier-api";
import { MSupplier } from "@/models/suppliermodel";
import {
    DeleteOutlined,
    EditOutlined,
    ExclamationCircleFilled,
} from "@ant-design/icons";
import { Button, Modal, Table, TableColumnsType } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
const { confirm } = Modal;

export default function Supplier() {
    const [dataSup, setDataSup] = useState<MSupplier[]>([]);
    useEffect(() => {
        ApiSupplier.getSuppliers()
            .then((res) => {
                setDataSup(res.data);
            })
            .catch((error) => console.log(error));
    }, []);
    const showDeleteConfirm = (id: string) => {
        confirm({
            title: "Bạn chắc chắn muốn xóa?",
            icon: <ExclamationCircleFilled style={{ color: "red" }} />,
            okText: "Có",
            okType: "danger",
            cancelText: "Không",
            onOk: () => {
                ApiSupplier.deleteSupplier(id)
                    .then(() => {
                        toast.success("Xóa thành công");
                        setDataSup(
                            dataSup.filter((supplier) => supplier.id !== id)
                        );
                    })
                    .catch(() => toast.error("Xóa thất bại"));
            },
            onCancel() {
                console.log("Cancel");
            },
        });
    };
    const columns: TableColumnsType<MSupplier> = [
        {
            title: "STT",
            dataIndex: "index",
            key: "index",
        },
        {
            title: "Tên nhà cung cấp",
            dataIndex: "supplierName",
            key: "supplierName",
        },
        {
            title: "Người liên hệ",
            dataIndex: "contactPerson",
            key: "contactPerson",
        },
        {
            title: "Số điện thoại",
            dataIndex: "contactPhone",
            key: "contactPhone",
        },
        {
            title: "Địa chỉ",
            dataIndex: "address",
            key: "address",
        },
        {
            title: "Chú thích",
            dataIndex: "notes",
            key: "notes",
        },

        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <div className="flex">
                    <Link
                        className="text-xl"
                        href={`/admin/supplier/update/${record.id}`}
                    >
                        <EditOutlined />
                    </Link>
                    <Button
                        onClick={() => showDeleteConfirm(record.id)}
                        type="link"
                        className="text-xl"
                        danger
                    >
                        <DeleteOutlined />
                    </Button>
                </div>
            ),
        },
    ] as TableColumnsType<MSupplier>;
    return (
        <div className="bg-gray-50 w-full">
            <div className=" bg-white p-3  mb-4 shadow-xl">
                <h1 className="p-3 text-2xl font-bold">Nhà cung cấp</h1>
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
                        <a href="/admin/supplier/add">
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
                                Thêm mới
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
                            pageSizeOptions: ["5", "10", "15"],
                        }}
                        columns={columns}
                        dataSource={
                            dataSup.map((item, index) => ({
                                ...item,
                                index: index + 1,
                                key: item.id,
                            })) || []
                        }
                    ></Table>
                </div>
            </div>
        </div>
    );
}
