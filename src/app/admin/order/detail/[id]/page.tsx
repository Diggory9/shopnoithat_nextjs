"use client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MOrder } from "@/models/ordermodel";
import { formatDateToRender } from "@/utils/config";

export default function OrderDetail({ params }: { params: { id: string } }) {
    const [order, setOrder] = useState<MOrder | null>(null);

    const fetchOrderDetails = async (orderId: string) => {
        try {
            const response = await fetch(
                `${process.env.API_URL}Order/${params.id}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const data = await response.json();
            console.log(data);

            setOrder(data.data);
        } catch (error) {
            console.error("Error fetching order details:", error);
        }
    };

    useEffect(() => {
        if (params.id) {
            fetchOrderDetails(params.id as string);
        }
    }, [params.id]);

    // if (!order) {
    //     return <div>Loading...</div>;
    // }

    return (
        <div className="bg-gray-50 w-full p-5">
            <div className="bg-white p-5 rounded-xl mb-4 shadow-xl">
                <h1 className="text-2xl font-bold mb-4">Chi tiết đơn hàng</h1>
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2 mb-4 md:mb-0">
                        <div className="mb-4 p-5 border rounded-lg bg-gray-100">
                            <h2 className="text-xl font-semibold mb-3">
                                Thông tin người nhận
                            </h2>
                            <p className="mb-2">
                                <strong>Tên:</strong> {order?.recipientName}
                            </p>
                            <p className="mb-2">
                                <strong>Điện thoại:</strong> {order?.phone}
                            </p>
                            <p className="mb-2">
                                <strong>Địa chỉ:</strong> {order?.address}
                            </p>
                            <p className="mb-2">
                                <strong>Loại đơn hàng:</strong>{" "}
                                {order?.orderType}
                            </p>
                            <p className="mb-2">
                                <strong>Tổng tiền:</strong> {order?.total}
                            </p>
                            <p className="mb-2">
                                <strong>Giảm giá:</strong>{" "}
                                {order?.totalDiscount}
                            </p>
                            <p className="mb-2">
                                <strong>Trạng thái:</strong> {order?.status}
                            </p>
                            <p className="mb-2">
                                <strong>Ngày tạo:</strong>{" "}
                                {formatDateToRender(order?.dateCreate)}
                            </p>
                            <p>
                                <strong>Ghi chú:</strong> {order?.notes}
                            </p>
                        </div>
                    </div>
                    <div className="md:w-1/2">
                        <div className="mb-4 p-5 border rounded-lg bg-gray-100">
                            <h2 className="text-xl font-semibold mb-3">
                                Sản phẩm
                            </h2>
                            {order?.orderItems?.map((item, index) => (
                                <div
                                    key={index}
                                    className="mb-2 p-3 border rounded-lg bg-white shadow-sm"
                                >
                                    <p className="mb-1">
                                        <strong>Tên sản phẩm:</strong>{" "}
                                        {item?.product?.productName}
                                    </p>
                                    <p className="mb-1">
                                        <strong>Màu sắc:</strong>{" "}
                                        {item?.product?.colorItem?.colorName}
                                    </p>
                                    <p className="mb-1">
                                        <strong>Số lượng:</strong>{" "}
                                        {item?.quantity}
                                    </p>
                                    <p className="mb-1">
                                        <strong>Giá:</strong> {item?.price}
                                    </p>
                                    <p>
                                        <strong>Giảm giá:</strong>{" "}
                                        {item.amountDiscount}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <div className="p-5 border rounded-lg bg-gray-100">
                            <h2 className="text-xl font-semibold mb-3">
                                Giao dịch
                            </h2>
                            {order?.transactions?.map((transaction, index) => (
                                <div
                                    key={index}
                                    className="mb-2 p-3 border rounded-lg bg-white shadow-sm"
                                >
                                    <p className="mb-1">
                                        <strong>Số tiền:</strong>{" "}
                                        {transaction.amount}
                                    </p>
                                    <p className="mb-1">
                                        <strong>Hình thức:</strong>{" "}
                                        {transaction.type}
                                    </p>
                                    <p className="mb-1">
                                        <strong>Mô tả:</strong>{" "}
                                        {transaction.description}
                                    </p>
                                    <p>
                                        <strong>Trạng thái:</strong>{" "}
                                        {transaction.status}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
