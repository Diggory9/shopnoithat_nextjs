"use client";
import React, { useEffect, useState } from "react";
import { Table, Button, Tag, Modal } from "antd";
import ApiOrder from "@/api/order/order-api";
import { MOrder, OrderData } from "@/models/ordermodel";
import Link from "next/link";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

const Purchase: React.FC = () => {
    const dispatch = useAppDispatch();
    const auth = useAppSelector((state) => state.auth);
    const [orders, setOrders] = useState<MOrder[]>([]);
    const { confirm } = Modal;
    useEffect(() => {
        if (auth?.data?.id) {
            const fetchOrders = async () => {
                try {
                    const response = await ApiOrder.getOrdersByUserId(
                        auth?.data?.id || ""
                    );
                    setOrders(response.data);
                    console.log(response.data);
                } catch (error) {
                    console.error("Error fetching orders:", error);
                }
            };
            fetchOrders();
        }
    }, [auth?.data?.id]);
    const columns = [
        {
            title: "STT",
            dataIndex: "stt",
            key: "ss",
        },
        {
            title: "Mã đơn hàng",
            dataIndex: "orderNumber",
            key: "orderNumber",
        },
        {
            title: "Người nhận",
            dataIndex: "recipientName",
            key: "recipientName",
        },
        {
            title: "Tổng tiền",
            dataIndex: "total",
            key: "total",
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (status: string) => {
                switch (status) {
                    case "COMPLETED":
                        return <Tag color="success">Hoàn thành</Tag>;
                    case "PROCESSING":
                        return <Tag color="processing">Đang xử lý</Tag>;
                    case "CANCELLED":
                        return <Tag color="error">Đã hủy</Tag>;
                    case "NEW-ORDER":
                        return <Tag color="cyan">Đơn hàng mới</Tag>;
                    default:
                        return <Tag>{status}</Tag>;
                }
            },
        },
        {
            title: "Hành động",
            key: "action",
            render: (
                _: any,
                record: {
                    orderNumber: string;
                    key: any;
                    status: string;
                }
            ) => (
                <>
                    <Link
                        className="pr-6"
                        href={`/user/purchase/detail/${record.orderNumber}`}
                    >
                        <Button type="link">Chi tiết </Button>
                    </Link>
                    <Button
                        onClick={() => showDeleteConfirm(record.orderNumber)}
                        danger
                        disabled={record.status !== "NEW-ORDER"}
                    >
                        Hủy đơn hàng{" "}
                    </Button>
                </>
            ),
        },
    ];
    const handleCancelOrder = async (orderId: string) => {
        try {
            await ApiOrder.updateStatusOrder(orderId, "CANCELLED");
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.id === orderId
                        ? { ...order, status: "CANCELLED" }
                        : order
                )
            );
        } catch (error) {
            console.error("Error cancelling order:", error);
        }
    };
    const showDeleteConfirm = (orderId: string) => {
        confirm({
            title: "Bạn có muốn hủy đơn hàng",
            icon: <ExclamationCircleFilled />,
            content: orderId,
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            onOk() {
                handleCancelOrder(orderId);
            },
            onCancel() {
                console.log("Cancel");
            },
        });
    };

    const dataSource: OrderData[] = Array.isArray(orders)
        ? orders.map((item, index) => ({
              key: item.id || index,
              stt: index + 1,
              orderNumber: item.id || "",
              status: item.status || "",
              recipientName: item.recipientName || "",
              total: item.total || 0,
          }))
        : [];
    return (
        <div style={{ padding: "20px" }}>
            <h1 className="text-2xl font-bold pb-6">Thông tin đơn hàng</h1>
            <Table
                rowKey="orderNumber"
                dataSource={dataSource}
                columns={columns}
            />
        </div>
    );
};

export default Purchase;
