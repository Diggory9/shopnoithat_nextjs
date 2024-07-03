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
                <div className="flex">
                    <div className="w-1/2">
                        <div className="mb-4 p-3 border rounded-lg">
                            <p>
                                <strong>Recipient Name:</strong>{" "}
                                {order?.recipientName}
                            </p>
                            <p>
                                <strong>Phone:</strong> {order?.phone}
                            </p>
                            <p>
                                <strong>Address:</strong> {order?.address}
                            </p>
                            <p>
                                <strong>Order Type:</strong> {order?.orderType}
                            </p>
                            {/* <p>
                                <strong>Sub Total:</strong> {order?.subTotal}
                            </p> */}
                            <p>
                                <strong>Total:</strong> {order?.total}
                            </p>
                            <p>
                                <strong>Total Discount:</strong>{" "}
                                {order?.totalDiscount}
                            </p>
                            {/* <p><strong>Total Ship:</strong> {order?.totalShip || 'N/A'}</p> */}
                            <p>
                                <strong>Status:</strong> {order?.status}
                            </p>
                            <p>
                                <strong>Date Created:</strong>{" "}
                                {formatDateToRender(order?.dateCreate)}
                            </p>
                            <p>
                                <strong>Notes:</strong> {order?.notes}
                            </p>
                        </div>
                    </div>
                    <div className="w-1/2">
                        <div className="mb-4">
                            {order?.orderItems?.map((item, index) => (
                                <div
                                    key={index}
                                    className="mb-2 p-3 border rounded-lg"
                                >
                                    <p>
                                        <strong>Product Name:</strong>{" "}
                                        {item?.product?.productName}
                                    </p>
                                    <p>
                                        <strong>Color:</strong>{" "}
                                        {item?.product?.colorItem?.colorName}
                                    </p>
                                    <p>
                                        <strong>Quantity:</strong>{" "}
                                        {item?.quantity}
                                    </p>
                                    <p>
                                        <strong>Price:</strong> {item?.price}
                                    </p>
                                    <p>
                                        <strong>Amount Discount:</strong>{" "}
                                        {item.amountDiscount}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div>
                            {order?.transactions?.map((transaction, index) => (
                                <div
                                    key={index}
                                    className="mb-2 p-3 border rounded-lg"
                                >
                                    {/* <p><strong>Transaction ID:</strong> {transaction.id}</p> */}
                                    <p>
                                        <strong>Amount:</strong>{" "}
                                        {transaction.amount}
                                    </p>
                                    <p>
                                        <strong>Type:</strong>{" "}
                                        {transaction.type}
                                    </p>
                                    <p>
                                        <strong>Description:</strong>{" "}
                                        {transaction.description}
                                    </p>
                                    <p>
                                        <strong>Status:</strong>{" "}
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
