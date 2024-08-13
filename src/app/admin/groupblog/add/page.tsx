"use client";

import ApiGroupBlog from "@/api/groupblog/groupblog-api";
import { useAppSelector } from "@/redux/hooks";
import { Button, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";

export default function AddGroupBlog() {
    const router = useRouter();
    const auth = useAppSelector((state) => state.authCredentials);
    const token = auth.data?.jwToken || "";

    const handleSubmit = (value: any) => {
        ApiGroupBlog.createGroupBlog({
            name: value.name,
            description: value.description,
            accessToken: token || "",
        })
            .then((res) => {
                if (res?.ok) {
                    toast.success("Thêm thành công");
                    router.push("/admin/groupblog");
                } else {
                    toast.error("Thêm thất bại");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <div className="container mx-auto p-4 bg-white shadow-xl rounded-xl h-full">
            <h1 className="text-2xl font-bold pb-4">Thêm mới nhóm blog</h1>
            <Toaster position="top-right" richColors />
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                style={{ maxWidth: 500 }}
                onFinish={handleSubmit}
            >
                <Form.Item label="Tên" name="name">
                    <Input></Input>
                </Form.Item>
                <Form.Item label="Mô tả" name="description">
                    <TextArea></TextArea>
                </Form.Item>
                <div className="flex justify-center">
                    <Button htmlType="submit">Thêm mới</Button>
                </div>
            </Form>
        </div>
    );
}
