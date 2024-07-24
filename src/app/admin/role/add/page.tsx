"use client";
import ApiRole from "@/api/role/role-api";
import { Button, Form, Input } from "antd";
import { toast, Toaster } from "sonner";

export default function AddRole() {
    const [form] = Form.useForm();
    const handleSubmit = async (values: any) => {
        ApiRole.createRole(values.roleName)
            .then((response) => {
                if (response?.ok) toast.success("Thêm thành công");
            })
            .catch(() => {
                toast.error("Thêm thất bại");
            });
    };
    return (
        <div className="container mx-auto p-4 bg-white shadow-xl rounded-xl">
            <h1 className="text-2xl font-bold pb-4">Thêm vai trò</h1>
            <Toaster position="top-right" richColors />
            <Form
                form={form}
                onFinish={handleSubmit}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                style={{ maxWidth: 600 }}
            >
                <Form.Item name="roleName" label="Tên vai trò">
                    <Input></Input>
                </Form.Item>

                <div className="justify-center items-center flex">
                    <Button htmlType="submit">Thêm vai trò</Button>
                </div>
            </Form>
        </div>
    );
}
