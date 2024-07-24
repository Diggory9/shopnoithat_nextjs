"use client";
import ApiGroupBlog from "@/api/groupblog/groupblog-api";
import { GroupBlogModel } from "@/models/groupblogmodel";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function UpdateGroupBlog({
    params,
}: {
    params: { id: string };
}) {
    const router = useRouter();
    const [form] = Form.useForm();
    const [dataGroupBlog, setDataGroupBlog] = useState<GroupBlogModel | null>(
        null
    );

    useEffect(() => {
        ApiGroupBlog.getDetailGroupBlog(params.id)
            .then((res) => {
                setDataGroupBlog(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        form.setFieldValue("name", dataGroupBlog?.name);
        form.setFieldValue("description", dataGroupBlog?.description);
    }, [dataGroupBlog]);

    const handleSubmit = (values: any) => {
        // console.log(values);
        ApiGroupBlog.updateGroupBlog({
            id: params.id,
            name: values.name,
            description: values.description,
        })
            .then((res) => {
                if (res?.ok) {
                    toast.success("Thành công");
                    router.push("/admin/groupblog");
                } else {
                    toast.error("Thất bại");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="bg-gray-50 w-full">
            <div className="bg-white p-3 rounded-xl mb-4 shadow-xl">
                <Link href="/admin/groupblog">
                    <Button type="default" className="mr-2">
                        <ArrowLeftOutlined />
                    </Button>
                </Link>
                <h1 className="p-3 text-2xl font-bold">Update Blog</h1>

                <Form
                    form={form}
                    onFinish={handleSubmit}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                    style={{ maxWidth: 600 }}
                >
                    <Form.Item name="name" label="Tên blog">
                        <Input></Input>
                    </Form.Item>
                    <Form.Item name="description" label="Mô tả ">
                        <TextArea></TextArea>
                    </Form.Item>

                    <div className="justify-center items-center flex">
                        <Button htmlType="submit">Cập nhật blog</Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}
