import React from "react";
import { PoweroffOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Dropdown, Space } from "antd";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/features/auth/authSlice";
import { toast } from "sonner";

// Declare dispatch and auth within the component
const CDropdown: React.FC = (props) => {
    const dispatch = useAppDispatch();
    const auth = useAppSelector((state) => state.auth);

    // Define handleLogout function
    const handleLogout = async () => {
        try {
            if (auth.isLogin) {
                const logoutParams = {
                    email: auth?.data?.email || "",
                };
                dispatch(logout(logoutParams));
                toast.success("Đăng xuất thành công!");
            }
        } catch (error) {
            alert("Logout failed");
            console.error("Logout error:", error);
        }
    };

    const items: MenuProps["items"] = [
        {
            label: "Thông tin",
            key: "1",
            icon: <UserOutlined />,
        },
        {
            label: <Link href={"/user/purchase"}>Đơn hàng</Link>,
            key: "2",
            icon: <UserOutlined />,
        },
        {
            label: (
                <Button danger onClick={handleLogout}>
                    Đăng xuất
                </Button>
            ),
            key: "3",
            icon: <PoweroffOutlined />,
            danger: true,
        },
    ];

    const menuProps = {
        items,
    };

    return (
        <Space wrap>
            <Dropdown.Button
                menu={menuProps}
                placement="bottom"
                icon={<UserOutlined />}
            >
                Hi
            </Dropdown.Button>
        </Space>
    );
};

export default CDropdown;
