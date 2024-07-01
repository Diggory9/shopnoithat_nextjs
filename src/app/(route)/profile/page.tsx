"use client";
import { useEffect, useState } from "react";
import { Table, TableColumnsType } from "antd";
import { MOrder } from "@/models/ordermodel";

interface DataType {
    id?: string;
    status?: string;
    total?: number;
    dateCreate?: string;
    recipientName?: string;
}

const columns: TableColumnsType<DataType> = [
    {
        title: "ID",
        dataIndex: "id",
    },
    {
        title: "Tên người nhận",
        dataIndex: "recipientName",
    },
    {
        title: "Tổng tiền",
        dataIndex: "total",
    },
    {
        title: "Ngày tạo",
        dataIndex: "dateCreate",
    },
    {
        title: "Trạng thái",
        dataIndex: "status",
    },
];

export default function Profile() {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState("");
    const [ordersUser, setOrdersUser] = useState<MOrder[]>([]);

    useEffect(() => {
        const storedUserId = localStorage.getItem("userId");
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);

    const fetchData = async () => {
        if (!userId) return;
        try {
            const response = await fetch(
                `${process.env.API_URL}Order/user/${userId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const data = await response.json();
            setOrdersUser(data.data);
        } catch (error) {
            console.error("Error fetching order data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [userId]);

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log("selectedRowKeys changed: ", newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const hasSelected = selectedRowKeys.length > 0;

    const data: DataType[] = ordersUser.map((order, index) => ({
        id: order.id,
        total: order.total,
        dateCreate: order.dateCreate,
        recipientName: order.recipientName,
        status: order.status,
    }));

    return (
        <div>
            <div style={{ marginBottom: 16 }}>
                <span style={{ marginLeft: 8 }}>
                    {hasSelected
                        ? `Selected ${selectedRowKeys.length} items`
                        : ""}
                </span>
            </div>
            <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={data}
                loading={loading}
            />
        </div>
    );
}
