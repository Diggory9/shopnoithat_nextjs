"use client";
import { Button, Result } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
type dataOrder = {
    data?: {
        id?: string;
    };
};
export default function Success() {
    const router = useRouter();
    const [dataOrder, setDataOrder] = useState<dataOrder>({});
    useEffect(() => {
        const dataLocal = localStorage.getItem("dataOrder");
        if (dataLocal) {
            setDataOrder(JSON.parse(dataLocal));
        }
    }, []);
    console.log(dataOrder?.data);
    const handleBackHome = () => {
        router.push("/");
    };
    return (
        <Result
            status="success"
            title="Đặt hàng thành công"
            subTitle={`Mã đơn hàng: ${
                dataOrder?.data?.id || "Không có mã đơn hàng"
            }`}
            extra={[
                <Button type="primary" key="home" onClick={handleBackHome}>
                    Về trang chủ
                </Button>,
                <Button key="detail">Chi tiết đơn hàng hehe</Button>,
            ]}
        />
    );
}
