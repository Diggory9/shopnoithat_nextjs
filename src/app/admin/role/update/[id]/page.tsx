"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";

import Link from "next/link";
import { Button, Form, Input, Select } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";

import { MRole } from "@/models/role";
import ApiRole from "@/api/role/role-api";
import { error } from "console";

export default function UpdateRole({ params }: { params: { id: string } }) {
    const [form] = Form.useForm();
    const router = useRouter();
    const [dataRole, setdataRole] = useState<MRole | null>(null);
    // Fetch data role
    useEffect(() => {
        ApiRole.getRole(params.id)
            .then((res) => {
                setdataRole(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [params.id]);
    // Set data to form
    useEffect(() => {
        form.setFieldValue("name", dataRole?.name);
    }, [dataRole]);

    const handleSubmit = (values: MRole) => {};

    return (
        <div className="bg-gray-50 w-full">
            <div className="bg-white p-3 rounded-xl mb-4 shadow-xl">
                <Link href="/admin/category">
                    <Button type="default" className="mr-2">
                        <ArrowLeftOutlined />
                    </Button>
                </Link>
                <h1 className="p-3 text-2xl font-bold">Update Role</h1>
                <Toaster position="top-right" richColors />
                <Form
                    form={form}
                    onFinish={handleSubmit}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                    style={{ maxWidth: 600 }}
                >
                    <Form.Item name="name" label="Tên vai trò">
                        <Input></Input>
                    </Form.Item>

                    <div className="justify-center items-center flex">
                        <Button htmlType="submit">Cập nhật </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}
