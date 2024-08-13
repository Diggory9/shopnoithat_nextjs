"use client";
import ApiAuth from "@/api/auth/auth-api";
import { useAppSelector } from "@/redux/hooks";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useEffect } from "react";
import { toast } from "sonner";

export interface ResetPasswordModel {
    email?: string;
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
}

export default function ResetPasswordForm() {
    const [form] = Form.useForm();
    const auth = useAppSelector((state) => state.authCredentials);
    // console.log(auth.data);

    const onFinish = async (values: ResetPasswordModel) => {
        // console.log(values);
        ApiAuth.authChangePassWord({
            email: auth?.data?.email || "",
            currentPassword: values.currentPassword || "",
            password: values.newPassword || "",
            confirmPassword: values.confirmPassword || "",
            accessToken: auth.data?.jwToken || "",
        })
            .then((res) => {
                if (res?.ok) {
                    toast.success("Thay đổi thành công");
                    form.setFieldValue("currentPassword", "");
                    form.setFieldValue("newPassword", "");
                    form.setFieldValue("confirmPassword", "");
                } else {
                    toast.error("Thay đổi thất bại");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    useEffect(() => {
        form.setFieldValue("UserName", auth.data?.userName);
    }, [auth.data?.userName, form]);
    return (
        <Form
            form={form}
            name="change_password"
            onFinish={onFinish}
            layout="vertical"
        >
            <Form.Item name="UserName" label="UserName">
                <Input disabled />
            </Form.Item>
            <Form.Item
                name="currentPassword"
                label="Mật khẩu hiện tại"
                rules={[
                    {
                        required: true,
                        message: "Please input your current password!",
                    },
                ]}
            >
                <Input.Password prefix={<LockOutlined />} />
            </Form.Item>

            <Form.Item
                name="newPassword"
                label="Mật khẩu mới"
                rules={[
                    {
                        required: true,
                        message: "Please input your new password!",
                    },
                ]}
            >
                <Input.Password prefix={<LockOutlined />} />
            </Form.Item>

            <Form.Item
                name="confirmPassword"
                label="Xác nhận mật khẩu mới"
                dependencies={["newPassword"]}
                rules={[
                    {
                        required: true,
                        message: "Please input your new password!",
                    },
                ]}
            >
                <Input.Password prefix={<LockOutlined />} />
            </Form.Item>

            <Button type="primary" htmlType="submit">
                Thay đổi mật khẩu
            </Button>
        </Form>
    );
}
