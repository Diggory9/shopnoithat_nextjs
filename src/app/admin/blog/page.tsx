"use client";
import ApiBlog from "@/api/blog/blog-api";
import ApiGroupBlog from "@/api/groupblog/groupblog-api";
import { BlogModel } from "@/models/blogmodel";
import { useAppSelector } from "@/redux/hooks";

import { formatDateToRender } from "@/utils/config";
import {
    DeleteOutlined,
    EditOutlined,
    ExclamationCircleFilled,
} from "@ant-design/icons";
import { Button, Modal, Table, TableColumnsType } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
const { confirm } = Modal;

export default function Blog() {
    const router = useRouter();
    const [dataBlogs, setDataBlogs] = useState<BlogModel[]>([]);
    const auth = useAppSelector((state) => state.authCredentials);
    const token = auth.data?.jwToken || "";
    useEffect(() => {
        ApiBlog.getAllBlog(1, 20, token)
            .then((res) => {
                setDataBlogs(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    console.log(dataBlogs);

    const showDeleteConfirm = (id: string) => {
        confirm({
            title: "Bạn muốn xóa blog này?",
            icon: <ExclamationCircleFilled style={{ color: "red" }} />,
            okText: "Có",
            okType: "danger",
            cancelText: "Không",
            onOk: () => {
                ApiBlog.deleteBlog({ id: id, accessToken: token })
                    .then((res) => {
                        if (res?.ok) {
                            toast.success("Xóa thành công");
                            router.push("/admin/blog");
                            setDataBlogs((prevData) =>
                                prevData.filter((blog) => blog.id !== id)
                            );
                        } else {
                            toast.error("Xóa thất bại");
                        }
                    })
                    .catch((error) => console.log(error));
            },
            onCancel() {
                console.log("Cancel");
            },
        });
    };
    const columns: TableColumnsType<BlogModel> = [
        {
            title: "STT",
            dataIndex: "index",
            key: "index",
        },
        {
            title: "Nhóm",
            dataIndex: "blogGroupName",
            key: "blogGroupName",
        },
        {
            title: "Tiêu đề",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Người tạo",
            dataIndex: "authorName",
            key: "authorName",
        },
        {
            title: "Tag",
            dataIndex: "tags",
            key: "tags",
        },
        {
            title: "Hành động",
            key: "action",
            render: (_, record: BlogModel) => (
                <div className="flex">
                    <Link
                        className="text-xl"
                        href={`/admin/blog/update/${record.id}`}
                    >
                        <EditOutlined />
                    </Link>
                    <Button
                        onClick={() => showDeleteConfirm(record.id || "")}
                        type="link"
                        className="text-xl"
                        danger
                    >
                        <DeleteOutlined />
                    </Button>
                </div>
            ),
        },
        {
            title: "Chi tiết",
            key: "detail",
        },
    ] as TableColumnsType<BlogModel>;
    return (
        <div className="bg-gray-50 w-full">
            <div className=" bg-white p-3 mb-4 shadow-xl ">
                <h1 className="p-3 text-2xl font-bold">Quản lý blog</h1>
                <Toaster position="top-right" richColors />
                <div className="flex justify-between ">
                    <div className="p-2"></div>
                    <div className="order-last content-center">
                        <Link href="/admin/blog/add">
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
                                Add blog
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="bg-white mb-4 shadow-xl">
                <div className="relative overflow-x-auto shadow-md sm:rounded-xl">
                    <Table
                        columns={columns}
                        dataSource={dataBlogs.map((item, index) => ({
                            ...item,
                            key: item.id,
                            index: index + 1,
                        }))}
                    ></Table>
                </div>
            </div>
        </div>
    );
}
