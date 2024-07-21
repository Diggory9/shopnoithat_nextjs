"use client";
import ApiGroupBlog from "@/api/groupblog/groupblog-api";
import { BlogModel } from "@/models/blogmodel";

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
import { toast } from "sonner";
const { confirm } = Modal;

export default function Blog() {
    //const [dataBlogs, setDataBlogs] = useState<GroupBlogModel[]>([]);
    const router = useRouter();

    useEffect(() => {}, []);

    // const showDeleteConfirm = (id: string) => {
    //     confirm({
    //         title: "Bạn muốn xóa blog này?",
    //         icon: <ExclamationCircleFilled style={{ color: "red" }} />,
    //         okText: "Có",
    //         okType: "danger",
    //         cancelText: "Không",
    //         onOk: () => {
    //             ApiGroupBlog.deleteGroupBlog(id)
    //                 .then((res) => {
    //                     if (res?.ok) {
    //                         toast.success("Xóa thành công");
    //                         router.push("/admin/blog");
    //                         setDataBlogs((prevData) =>
    //                             prevData.filter((blog) => blog.id !== id)
    //                         );
    //                     } else {
    //                         toast.error("Xóa thất bại");
    //                     }
    //                 })
    //                 .catch((error) => console.log(error));
    //         },
    //         onCancel() {
    //             console.log("Cancel");
    //         },
    //     });
    // };
    const columns: TableColumnsType<BlogModel> = [
        {
            title: "STT",
            dataIndex: "index",
            key: "index",
        },
        {
            title: "Tên",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Mô tả",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Ngày tạo",
            dataIndex: "dateCreate",
            key: "dateCreate",
        },
        {
            title: "Hành động",
            key: "action",
            render: (_, record) => (
                <div className="flex">
                    <Link className="text-xl" href={`/admin/blog/update/`}>
                        <EditOutlined />
                    </Link>
                    <Button
                        // onClick={() => showDeleteConfirm(record.id || "")}
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
                    <Table columns={columns}></Table>
                </div>
            </div>
        </div>
    );
}
