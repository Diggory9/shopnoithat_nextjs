"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";
import { MCategory } from "@/models/categorymodel";
import { Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
const { confirm } = Modal;
export default function Category() {
    const [dataCate, setDataCate] = useState<MCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const respone = await fetch(
                    `${process.env.API_URL}Category/list`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                ); // Thay thế bằng URL API thực tế
                if (!respone.ok) {
                    throw new Error("Network response was not ok");
                }
                const result = await respone.json();
                setDataCate(result.data);
            } catch (error) {
                console.error("Fetch error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const showDeleteConfirm = (id: string) => {
        confirm({
            title: "Bạn chắc chắn muốn xóa danh mục này?",
            icon: <ExclamationCircleFilled style={{ color: "red" }} />,
            okText: "Có",
            okType: "danger",
            cancelText: "Không",
            onOk: async () => {
                try {
                    const response = await fetch(
                        `${process.env.API_URL}Category/${id}`,
                        {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }
                    );
                    if (response.ok) {
                        toast.success("Xóa danh mục thành công");
                        router.push("/admin/category");
                        setDataCate(
                            dataCate.filter((category) => category.id !== id)
                        );
                    } else {
                        toast.error("Xóa thất bại");
                    }
                } catch (error) {
                    console.error("Delete error:", error);
                }
            },
            onCancel() {
                console.log("Cancel");
            },
        });
    };
    const filteredCategories = dataCate.filter((category) =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <div className="bg-gray-50 w-full">
            <div className=" bg-white p-3 mb-4 shadow-xl ">
                <h1 className="p-3 text-2xl font-bold">All Category</h1>
                <Toaster position="top-right" richColors />
                <div className="flex justify-between ">
                    <div className="p-2">
                        <form action="" method="get">
                            <input
                                className="p-2 rounded-lg border border-gray-300"
                                placeholder="Search for category"
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </form>
                    </div>
                    <div className="order-last content-center">
                        <a href="/admin/category/add">
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
                                Add category
                            </button>
                        </a>
                    </div>
                </div>
            </div>
            <div className="bg-white mb-4 shadow-xl">
                <div className="relative overflow-x-auto shadow-md sm:rounded-xl">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-white dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="p-4">
                                    <div className="flex items-center"></div>
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Tên
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Mô tả
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Danh mục cha
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCategories.map((item) => (
                                <tr
                                    key={item.id}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                >
                                    <td className="w-4 p-4">
                                        <div className="flex items-center"></div>
                                    </td>
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        {item.name}
                                    </th>
                                    <td className="px-6 py-4">
                                        {item.description}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.categoryParent
                                            ? filteredCategories.map((i) => {
                                                  if (
                                                      i.id ==
                                                      item.categoryParent
                                                  ) {
                                                      return i.name;
                                                  }
                                              })
                                            : "Không có danh mục cha"}
                                    </td>
                                    <td className="flex items-center px-6 py-4">
                                        <Link
                                            href={`/admin/category/update/${item.id}`}
                                        >
                                            <button
                                                className=" text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 rounded-lg  px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 inline-flex "
                                                type="button"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className="size-5"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                                    />
                                                </svg>
                                                Edit
                                            </button>
                                        </Link>
                                        <button
                                            onClick={() =>
                                                showDeleteConfirm(item.id)
                                            }
                                            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300  rounded-lg text-sm px-3 py-1.5  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 inline-flex ms-3"
                                            type="button"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="size-5"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                                                />
                                            </svg>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
