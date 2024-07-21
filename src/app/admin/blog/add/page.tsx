"use client";

import ApiGroupBlog from "@/api/groupblog/groupblog-api";
import { Button, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AddBlog() {
    const router = useRouter();
    const handleSubmit = (value: any) => {
        ApiGroupBlog.createGroupBlog({
            name: value.name,
            description: value.description,
        })
            .then((res) => {
                if (res?.ok) {
                    toast.success("Thêm thành công");
                    router.push("/admin/blog");
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
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                style={{ maxWidth: 500 }}
                onFinish={handleSubmit}
            >
                <Form.Item label="Tiêu đề" name="title">
                    <Input></Input>
                </Form.Item>
                <Form.Item label="Nội dung" name="content">
                    <Input></Input>
                </Form.Item>
                <Form.Item label="Nhóm" name="blogGroupId">
                    <Input></Input>
                </Form.Item>
                <Form.Item label="Tag" name="tagsBlog">
                    <Input></Input>
                </Form.Item>

                <div className="flex justify-center">
                    <Button htmlType="submit">Thêm mới</Button>
                </div>
            </Form>
        </div>
    );
}
