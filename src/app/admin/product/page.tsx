"use client";
import ApiProduct from "@/api/product/product-api";
import { MProduct } from "@/models/productmodel";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Table, TableColumnsType } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Product() {
    const [dataProduct, setDataProduct] = useState<MProduct[]>([]);
    useEffect(() => {
        ApiProduct.getAllProduct(1, 20)
            .then((res) => {
                setDataProduct(res.data);
            })
            .catch((error) => console.log(error));
    }, []);
    console.log(dataProduct);

    const columns: TableColumnsType<MProduct> = [
        {
            title: "STT",
            dataIndex: "index",
            key: "index",
        },
        {
            title: "Tên sản phẩm",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Hình ảnh",
            dataIndex: "image",
            key: "image",
            render: (image) => (
                <Image src={image} alt="Product Image" width={60} height={60} />
            ),
        },
        {
            title: "Số lượng",
            dataIndex: "productQuantity",
            key: "productQuantity",
        },
        {
            title: "Giá",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "Thương hiệu",
            dataIndex: "productBrand",
            key: "productBrand",
        },
        {
            title: "Action",
            key: "action",
            render: (_, record: MProduct) => (
                <div className="flex">
                    <Link
                        className="text-xl"
                        href={`/admin/product/update/${record.id}`}
                    >
                        <EditOutlined />
                    </Link>
                    <Button
                        // onClick={() => showDeleteConfirm(record.id)}
                        type="link"
                        className="text-xl"
                        danger
                    >
                        <DeleteOutlined />
                    </Button>
                </div>
            ),
        },
    ] as TableColumnsType<MProduct>;
    return (
        <div className="bg-gray-50 w-full">
            <div className=" bg-white p-3  mb-4 shadow-xl ">
                <h1 className="p-3 text-2xl font-bold">All Product</h1>
                <div className="flex justify-between ">
                    <div className="p-2">
                        {/* <form action="" method="get">
                            <input
                                className="p-2 rounded-lg border border-gray-300"
                                placeholder="Search for category"
                                type="text"
                                name=""
                                id=""
                            />
                        </form> */}
                    </div>
                    <div className="order-last content-center">
                        <a href="/admin/product/add">
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
                                Add product
                            </button>
                        </a>
                    </div>
                </div>
            </div>
            <div className="bg-white  mb-4 shadow-xl">
                <div className="relative overflow-x-auto shadow-md sm:rounded-xl">
                    <Table
                        pagination={{
                            defaultPageSize: 10,
                            showSizeChanger: true,
                            pageSizeOptions: ["10", "20", "30"],
                        }}
                        columns={columns}
                        dataSource={
                            dataProduct.map((item, index) => ({
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
