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
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import { logout } from "@/redux/features/auth/authSlice";
import { useRouter } from "next/navigation";
const CustomDropdown: React.FC = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { status, error, isLogin, data } = useAppSelector(
        (state) => state.authCredentials
    );

    const handleOnClick = () => {
        if (isLogin) {
            dispatch(logout({ email: data?.email || "" }));
            router.push("/");
        }
    };

    const items: MenuProps["items"] = [
        {
            label: <Link href={"/admin/profile"}>Thông tin</Link>,
            key: "1",
            icon: <UserOutlined />,
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
                {data?.userName}
            </AntDropdown.Button>
        </Space>
    );
};

export default CustomDropdown;
