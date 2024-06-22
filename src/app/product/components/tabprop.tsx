import React from "react";
import { ConfigProvider, Tabs } from "antd";
import type { TabsProps } from "antd";
import Desciption from "./description";
import Review from "./review";
import Delivery from "./delivery";

const onChange = (key: string) => {
    console.log(key);
};

type PropsProductTabs = {
    des?: string;
    review?: any;
    delivery?: any;
};
const ProductTabs = ({ delivery, des, review }: PropsProductTabs) => {
    const items: TabsProps["items"] = [
        {
            key: "1",
            label: "Mô tả",
            children: <Desciption data={des} />,
        },
        {
            key: "2",
            label: "Đánh giá",
            children: <Review />,
        },
        {
            key: "3",
            label: "Giao hàng",
            children: <Delivery />,
        },
    ];
    return (
        <>
            <ConfigProvider
                theme={{
                    token: {
                        fontSize: 16,
                    },
                }}
            >
                <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
            </ConfigProvider>
        </>
    );
};

export default ProductTabs;
