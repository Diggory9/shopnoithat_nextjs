"use client";
import React from "react";
import {
    DollarOutlined,
    ProfileOutlined,
    ShoppingOutlined,
    SkinOutlined,
    TruckOutlined,
    UsergroupAddOutlined,
    UserSwitchOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import type { GetProp, MenuProps } from "antd";
import Link from "next/link";

export default function NavAdmin() {
    type MenuItem = GetProp<MenuProps, "items">[number];

    const items: MenuItem[] = [
        {
            key: "1",
            icon: <ProfileOutlined />,
            label: <Link href={"/admin/category"}>Danh mục sản phẩm</Link>,
        },
        {
            key: "2",
            icon: <SkinOutlined />,
            label: <Link href={"/admin/product"}>Sản phẩm</Link>,
        },
        {
            key: "3",
            icon: <TruckOutlined />,
            label: <Link href={"/admin/supplier"}>Nhà cung cấp</Link>,
        },
        {
            key: "7",
            icon: <UserSwitchOutlined />,
            label: <Link href={"/admin/role"}>Vai trò</Link>,
        },
        {
            key: "4",
            icon: <DollarOutlined />,
            label: <Link href={"/admin/discount"}>Giảm giá</Link>,
        },
        {
            key: "5",
            icon: <ShoppingOutlined />,
            label: <Link href={"/admin/order"}>Đơn hàng</Link>,
        },
        {
            key: "6",
            icon: <UsergroupAddOutlined />,
            label: <Link href={"/admin/user"}>Người dùng</Link>,
        },
    ];

    return (
        <>
            <Menu
                style={{ width: 256 }}
                // defaultSelectedKeys={["1"]}
                items={items}
            />
        </>
    );
}
