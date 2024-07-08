"use client";

import React, { useState, useEffect } from "react";
import {
    LogoutOutlined,
    SolutionOutlined,
    UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown as AntDropdown, Button, Space } from "antd";
import Link from "next/link";
import ApiAuth from "@/api/auth/auth-api";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { login } from "@/redux/features/auth/authSlice";
import { logout } from "@/redux/features/auth/authSlice";
const CustomDropdown: React.FC = () => {
    const dispatch = useAppDispatch();
    const { status, error, isLogin, data } = useAppSelector(
        (state) => state.auth
    );

    const handleOnClick = () => {
        if (isLogin) {
            dispatch(logout({ email: data?.email || "" }));
        }
    };

    const items: MenuProps["items"] = [
        {
            label: <Link href={"/user/profile"}>Thông tin</Link>,
            key: "1",
            icon: <UserOutlined />,
        },
        {
            label: <Link href={"/user/purchase"}>Đơn hàng</Link>,
            key: "2",
            icon: <SolutionOutlined />,
        },
        {
            label: (
                <Button onClick={handleOnClick} type="link" danger>
                    Đăng xuất
                </Button>
            ),
            key: "3",
            icon: <LogoutOutlined />,
            danger: true,
        },
    ];

    const menuProps = {
        items,
    };

    return (
        <Space wrap>
            <AntDropdown.Button
                menu={menuProps}
                placement="bottom"
                icon={<UserOutlined />}
            >
                Account
            </AntDropdown.Button>
        </Space>
    );
};

export default CustomDropdown;
