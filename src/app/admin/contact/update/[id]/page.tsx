"use client";
import ApiContact from "@/api/contact/contact-api";
import { ContactModel } from "@/models/contactmodel";
import { useAppSelector } from "@/redux/hooks";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import { error } from "console";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Reply({ params }: { params: { id: string } }) {
    const auth = useAppSelector((state) => state.authCredentials);
    const token = auth.data?.jwToken || "";
    const router = useRouter();
    const [form] = useForm();

    useEffect(() => {
        ApiContact.getContact(params.id, token)
            .then((res) => {
                form.setFieldsValue({
                    fullName: res.data.fullName,
                    email: res.data.email,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }, [params.id]);

    const handleSubmit = (value: any) => {
        ApiContact.contactReply(
            value.email,
            value.fullName,
            value.subject,
            value.body,
            token
        )
            .then((res) => {
                if (res?.ok) {
                    toast.success("Thành công");
                    ApiContact.updateStatusReply(params.id, token).then(
                        (res) => {
                            if (res?.ok) {
                                toast.success("Cập nhật trạng thái thành công");
                            } else {
                                toast.error("Thất bại");
                            }
                        }
                    );
                    router.push("/admin/contact");
                } else {
                    toast.error("Thất bại");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <div className="p-4 w-3/5">
            <Link href="/admin/contact">
                <Button type="default" className="mr-2">
                    <ArrowLeftOutlined />
                </Button>
            </Link>
            <h1 className="font-bold text-2xl py-4">Phản hồi khách hàng</h1>
            <Form
                form={form}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 16 }}
                layout="horizontal"
                style={{ maxWidth: 900 }}
                onFinish={handleSubmit}
            >
                <Form.Item label="Tên khách hàng" name="fullName">
                    <Input disabled></Input>
                </Form.Item>
                <Form.Item label="Email" name="email">
                    <Input disabled></Input>
                </Form.Item>
                <Form.Item label="Tiêu đề" name="subject">
                    <Input></Input>
                </Form.Item>

                <Form.Item label="Nội dung thư gửi" name="body">
                    <TextArea></TextArea>
                </Form.Item>

                <div className="flex justify-center">
                    <Button htmlType="submit">Gửi</Button>
                </div>
            </Form>
        </div>
    );
}
