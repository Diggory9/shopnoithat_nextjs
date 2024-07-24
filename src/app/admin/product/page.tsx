"use client";
import ApiCategory from "@/api/category/category-api";
import ApiProduct from "@/api/product/product-api";
import { MCategory } from "@/models/categorymodel";
import { MProduct } from "@/models/productmodel";
import { useAppSelector } from "@/redux/hooks";
import { CheckOutlined, CloseOutlined, EditOutlined } from "@ant-design/icons";
import {
    Button,
    Pagination,
    PaginationProps,
    Select,
    Switch,
    Table,
    TableColumnsType,
} from "antd";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";

export default function Product() {
    const [dataProduct, setDataProduct] = useState<MProduct[]>([]);
    const [dataCategory, setDataCategory] = useState<MCategory[]>([]);
    const auth = useAppSelector((state) => state.authCredentials);
    const token = auth.data?.jwToken || "";
    const [pageSize, setPageSize] = useState(10);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalProduct, setTotalProduct] = useState(1);
    const onChange: PaginationProps["onChange"] = (page) => {
        setPageNumber(page);
        //console.log(page);
    };
    // Lấy tất cả sản phẩm và danh mục sản phẩm
    useEffect(() => {
        const fetchProducts = () => {
            ApiProduct.getAllProduct(pageNumber, pageSize)
                .then((res) => {
                    setDataProduct(res.data);
                    setTotalProduct(res.total);
                })
                .catch((error) => console.log(error));
        };
        fetchProducts();
    }, [pageNumber, pageSize]);

    useEffect(() => {
        // fetchProducts();
        ApiCategory.getAllCategory()
            .then((res) => {
                setDataCategory(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    console.log(dataProduct);

    // Lọc sản phẩm theo danh mục sản phẩm
    const filterProductByCategory = (categoryId: string) => {
        if (categoryId == "All") {
            ApiProduct.getAllProduct(pageNumber, pageSize)
                .then((res) => {
                    setDataProduct(res.data);
                })
                .catch((error) => console.log(error));
        } else {
            ApiProduct.getProductPublicByCategory(categoryId, 1, 10)
                .then((res) => {
                    setDataProduct(res.data);
                })
                .catch((error) => console.log(error));
        }
    };
    const handleUpdateStatus = (id: string, isPublished: boolean) => {
        const status = isPublished ? "publish" : "draft";
        ApiProduct.updateStatus(id, token, status)
            .then((res) => {
                if (res?.ok) {
                    toast.success("Cập nhật thành công");
                    // fetchProducts();
                } else {
                    toast.error("Thất bại");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
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
            title: "Trạng thái",
            dataIndex: "isPublished",
            key: "isPublished",
            render: (_, record: MProduct) => (
                <div className="flex">
                    {" "}
                    <Switch
                        onChange={(checked) => {
                            if (checked !== record.isPublished) {
                                handleUpdateStatus(record.id || "", checked);
                            }
                        }}
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                        defaultChecked={record.isPublished}
                    />
                </div>
            ),
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
                </div>
            ),
        },
    ] as TableColumnsType<MProduct>;
    return (
        <div className="bg-gray-50 w-full">
            <div className=" bg-white p-3  mb-4 shadow-xl ">
                <h1 className="p-3 text-2xl font-bold">Danh sách sản phẩm</h1>
                <Toaster position="top-right" richColors duration={1000} />
                <div className="flex justify-between ">
                    <div className="p-2">
                        <Select
                            onChange={filterProductByCategory}
                            defaultValue={"Tất cả sản phẩm"}
                            style={{ width: 200 }}
                            options={[
                                { value: "All", label: "Tất cả sản phẩm" },
                                ...dataCategory.map((item) => ({
                                    value: item.id,
                                    label: item.name,
                                })),
                            ]}
                        ></Select>
                    </div>
                    <div className="order-last content-center">
                        <Link href="/admin/product/add">
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
                        </Link>
                    </div>
                </div>
            </div>
            <div className="bg-white  mb-4 shadow-xl">
                <div className="relative overflow-x-auto shadow-md sm:rounded-xl">
                    <Table
                        pagination={false}
                        columns={columns}
                        dataSource={
                            dataProduct.map((item, index) => ({
                                ...item,
                                index: index + 1,
                                key: item.id,
                            })) || []
                        }
                    ></Table>
                    <div className="flex justify-center py-3">
                        <Pagination
                            onChange={onChange}
                            defaultCurrent={1}
                            total={totalProduct}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
