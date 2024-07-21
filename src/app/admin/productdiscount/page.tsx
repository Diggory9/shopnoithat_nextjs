"use client";
import ApiDiscount from "@/api/discount/discount-api";
import ApiProduct from "@/api/product/product-api";
import { MDiscount } from "@/models/discount";
import { MProduct } from "@/models/productmodel";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Select, Table, TableColumnsType } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function DiscountProduct() {
    const [dataProduct, setDataProduct] = useState<MProduct[]>([]);
    const [dataDis, setDataDis] = useState<MDiscount[]>([]);
    useEffect(() => {
        ApiProduct.getAllProduct(1, 20)
            .then((res) => {
                setDataProduct(res.data);
            })
            .catch((error) => console.log(error));
        ApiDiscount.getAllDiscount(1, 10)
            .then((res) => {
                setDataDis(res.data);
            })
            .catch((error) => console.log(error));
    }, []);
    const handleApplyDiscount = (productId: string, discountId: string) => {
        ApiProduct.applyDiscount(productId, discountId)
            .then((response) => {
                if (response?.ok) {
                    toast.success("Áp dụng giảm giá thành công");

                    ApiProduct.getAllProduct(1, 20)
                        .then((res) => {
                            setDataProduct(res.data);
                        })
                        .catch((error) => console.log(error));
                } else {
                    toast.error("Áp dụng giảm giá thất bại");
                }
            })
            .catch(() => toast.error("Failed to apply discount"));
    };
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
            title: "Giá trị",
            dataIndex: "discountValue",
            key: "discountValue",
        },
        {
            title: "Giảm giá",
            key: "action",
            render: (_, record: MProduct) => (
                <Select
                    style={{ width: 150 }}
                    options={dataDis?.map((item) => ({
                        value: item.id,
                        label: item.code,
                        disabled: item.status !== "ACTIVE",
                    }))}
                    value={record.productDiscount?.id || undefined}
                    onChange={(value) =>
                        handleApplyDiscount(record?.id || "", value || "")
                    }
                ></Select>
            ),
        },
    ] as TableColumnsType<MProduct>;
    return (
        <div className="bg-gray-50 w-full">
            <div className=" bg-white p-3  mb-4 shadow-xl ">
                <h1 className="p-3 text-2xl font-bold">Sản phẩm giảm giá</h1>
                <div className="flex justify-between ">
                    <div className="p-2"></div>
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
                            dataProduct?.map((item, index) => ({
                                ...item,
                                index: index + 1,
                                key: item.id,
                                discountValue:
                                    item?.productDiscount &&
                                    item?.productDiscount?.type === "PERCENTAGE"
                                        ? `${item?.productDiscount?.value}%`
                                        : item?.productDiscount?.value,
                            })) || []
                        }
                    ></Table>
                </div>
            </div>
        </div>
    );
}
