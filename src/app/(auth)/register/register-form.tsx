"use client";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import ApiAuth from "@/api/auth/auth-api";
import { Button, Form, Input } from "antd";
import { toast } from "sonner";
import Link from "next/link";

export default function RegisterForm() {
    const [form] = Form.useForm();

    const router = useRouter();

    const onFinish = async (value: any) => {
        try {
            const response = await ApiAuth.authRegister({
                email: value.email,
                password: value.password,
                userName: value.userName,
                confirmPassword: value.confirmPassword,
            });
            const data = await response.json();
            console.log(data);

            if (response.ok) {
                // Đăng ký thành công, chuyển hướng hoặc xử lý tiếp
                toast.success("Đăng ký thành công");
                setTimeout(() => {
                    router.push("/login");
                }, 2000);
            } else {
                toast.error("hehe");
            }
        } catch (error) {
            console.error("Lỗi khi gửi yêu cầu:", error);
        }
    };
    return (
        <Form
            form={form}
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
        >
            <Form.Item
                name="userName"
                rules={[
                    {
                        required: true,
                        message: "Please input your Username!",
                    },
                    {
                        min: 6,
                        message: "Username must be at least 6 characters long!",
                    },
                ]}
            >
                <Input
                    allowClear
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Username"
                />
            </Form.Item>
            <Form.Item
                name="email"
                rules={[
                    {
                        required: true,
                        message: "Please input your Email!",
                    },
                    {
                        type: "email",
                        message: "The input is not valid E-mail!",
                    },
                ]}
            >
                <Input
                    prefix={<MailOutlined className="site-form-item-icon" />}
                    placeholder="Email"
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
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>
            <Form.Item
                name="confirmPassword"
                rules={[
                    {
                        required: true,
                        message: "Please confirm your Password!",
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue("password") === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(
                                new Error("Passwords do not match!")
                            );
                        },
                    }),
                ]}
            >
                <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="ConfirmPassword"
                />
            </Form.Item>
            <Button type="primary" htmlType="submit">
                Đăng ký
            </Button>
            <div className="pt-3">
                Nếu có tài khoản{" "}
                <Link className="font-bold" href="/login">
                    Đăng nhập
                </Link>
            </div>
        </Form>
    );
}
