"use client";
import ApiDiscount from "@/api/discount/discount-api";
import ApiProduct from "@/api/product/product-api";
import { MDiscount } from "@/models/discount";
import { MProduct } from "@/models/productmodel";
import { useAppSelector } from "@/redux/hooks";
import { Button, Select, Table, TableColumnsType, Skeleton } from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";

export default function DiscountProduct() {
    const [dataProduct, setDataProduct] = useState<MProduct[]>([]);
    const [dataDis, setDataDis] = useState<MDiscount[]>([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const auth = useAppSelector((state) => state.authCredentials);
    const token = auth.data?.jwToken || "";

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        setLoading(true);
        Promise.all([
            ApiProduct.getAllProduct(1, 20, token),
            ApiDiscount.getAllDiscount(1, 20, token),
        ])
            .then(([productRes, discountRes]) => {
                setDataProduct(productRes.data);
                setDataDis(discountRes.data);
                console.log("123");
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => setLoading(false));
    };

    const handleApplyDiscount = (productId: string, discountId: string) => {
        ApiProduct.applyDiscount(productId, discountId, token)
            .then((response) => {
                if (response?.ok) {
                    toast.success("Áp dụng giảm giá thành công");

                    fetchData();
                } else {
                    toast.error("Áp dụng giảm giá thất bại");
                }
            })
            .catch(() => toast.error("Failed to apply discount"));
    };
    const handleRemoveDiscount = (id: string) => {
        ApiProduct.removeDiscountProduct(id)
            .then((res) => {
                if (res?.ok) {
                    toast.success("Gỡ thành công");
                    fetchData();
                } else {
                    toast.error("Gỡ thất bại");
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
        {
            title: "Hành động",
            dataIndex: "",
            key: "",
            render: (_: any, record: MProduct) => (
                <Button
                    disabled={!record.productDiscount?.id}
                    type="primary"
                    onClick={() => handleRemoveDiscount(record.id || "")}
                >
                    Gỡ giảm giá
                </Button>
            ),
        },
    ] as TableColumnsType<MProduct>;

    return (
        <div className="bg-gray-50 w-full">
            <div className="bg-white p-3 mb-4 shadow-xl">
                <h1 className="p-3 text-2xl font-bold">Sản phẩm giảm giá</h1>
                <Toaster position="top-right" richColors duration={1000} />
                <div className="flex justify-between">
                    <div className="p-2"></div>
                </div>
            </div>
            <div className="bg-white mb-4 shadow-xl">
                <div className="relative overflow-x-auto shadow-md sm:rounded-xl">
                    {loading ? (
                        <div className="p-4">
                            <Skeleton active paragraph={{ rows: 5 }} />
                        </div>
                    ) : (
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
                                        item?.productDiscount?.type ===
                                            "PERCENTAGE"
                                            ? `${item?.productDiscount?.value}%`
                                            : item?.productDiscount?.value,
                                })) || []
                            }
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
