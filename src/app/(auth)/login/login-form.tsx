"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Toaster, toast } from "sonner";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { login, resetAuthStatus } from "@/redux/features/auth/authSlice";
import Link from "next/link";
import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
export default function LoginForm() {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const router = useRouter();
    const params = useSearchParams();
    const auth = useAppSelector((state) => state.authCredentials);
    const status = useAppSelector((state) => state.authCredentials);
    // console.log(status);

    const onFinish = (value: any) => {
        console.log(value);

        try {
            dispatch(
                login({
                    email: value?.userNameOrEmail,
                    password: value?.password,
                })
            );
        } catch (error) {
            console.error("Error during fetch:", error);
        }
    };
    useEffect(() => {
        if (auth.status === "succeeded" && auth.isLogin) {
            if (auth.data?.roles?.[0] === "Admin") {
                toast.success("Login successful!");
                router.push("/admin");
                dispatch(resetAuthStatus());
            } else {
                toast.error("Không có quyền truy cập");
            }
        } else if (auth.status === "failed") {
            toast.error(`Tài khoản mật khẩu không chính xác`);
            dispatch(resetAuthStatus());
        }
    }, [status, router, params, auth, dispatch]);
    return (
        <>
            <Form
                form={form}
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="userNameOrEmail"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Username!",
                        },
                    ]}
                >
                    <Input
                        prefix={
                            <UserOutlined className="site-form-item-icon" />
                        }
                        placeholder="Username"
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Password!",
                        },
                    ]}
                >
                    <Input.Password
                        prefix={
                            <LockOutlined className="site-form-item-icon" />
                        }
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <div className="flex">
                    <Form.Item>
                        <Link className="font-semibold" href="">
                            Quên mật khẩu?
                        </Link>
                    </Form.Item>
                </div>

                <Button type="primary" htmlType="submit">
                    Đăng nhập
                </Button>
            </Form>
        </>
    );
}
