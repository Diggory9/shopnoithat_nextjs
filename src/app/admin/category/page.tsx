"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";
import { MCategory } from "@/models/categorymodel";
import { Button, Modal, Table, TableColumnsType } from "antd";
import {
    DeleteOutlined,
    EditOutlined,
    ExclamationCircleFilled,
} from "@ant-design/icons";
import ApiCategory from "@/api/category/category-api";
import { useAppSelector } from "@/redux/hooks";
const { confirm } = Modal;
export default function Category() {
    const [dataAllCate, setDataAllCate] = useState<MCategory[]>([]);
    const router = useRouter();
    const auth = useAppSelector((state) => state.authCredentials);
    const token = auth.data?.jwToken;
    //Fetch data categories
    useEffect(() => {
        ApiCategory.getAllCategory()
            .then((res) => setDataAllCate(res.data))
            .catch((error) => console.log(error));
    }, []);

    const showDeleteConfirm = (id: string) => {
        confirm({
            title: "Bạn muốn xóa danh mục này?",
            icon: <ExclamationCircleFilled style={{ color: "red" }} />,
            okText: "Có",
            okType: "danger",
            cancelText: "Không",
            onOk: () => {
                ApiCategory.deleteCategory(id, token || "")
                    .then((res) => {
                        if (res?.ok) {
                            toast.success("Xóa thành công");
                            router.push("/admin/category");
                            setDataAllCate((prevData) =>
                                prevData.filter((cate) => cate.id !== id)
                            );
                        } else {
                            toast.error("Danh mục chứa sản phẩm, xóa thất bại");
                        }
                    })
                    .catch((error) => console.log(error));
            },
            onCancel() {
                console.log("Cancel");
            },
        });
    };
    const columns: TableColumnsType<MCategory> = [
        {
            title: "STT",
            dataIndex: "index",
            key: "index",
        },
        {
            title: "Tên danh mục",
            dataIndex: "name",
            key: "name",
            width: 150,
        },
        {
            title: "Mô tả",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Danh mục cha",
            dataIndex: "categoryParent",
            key: "categoryParent",
            width: 200,
            render: (text, record) =>
                record.categoryParent
                    ? dataAllCate.find((i) => i.id === record.categoryParent)
                          ?.name
                    : "Không có",
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <div className="flex">
                    <Link
                        className="text-xl"
                        href={`/admin/category/update/${record.id}`}
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
    ] as TableColumnsType<MCategory>;
    return (
        <div className="bg-gray-50 w-full">
            <div className=" bg-white p-3 mb-4 shadow-xl ">
                <h1 className="p-3 text-2xl font-bold">Danh mục sản phẩm</h1>
                <Toaster position="top-right" richColors />
                <div className="flex justify-between ">
                    <div className="p-2"></div>
                    <div className="order-last content-center">
                        <Link href="/admin/category/add">
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
                        </Link>
                    </div>
                </div>
            </div>
            <div className="bg-white mb-4 shadow-xl">
                <div className="relative overflow-x-auto shadow-md sm:rounded-xl">
                    <Table
                        pagination={{
                            defaultPageSize: 10,
                            showSizeChanger: true,
                            pageSizeOptions: ["5", "10", "15"],
                        }}
                        columns={columns}
                        dataSource={
                            dataAllCate.map((item, index) => ({
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
