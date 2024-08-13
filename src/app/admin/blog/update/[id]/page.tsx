"use client";
import ApiBlog from "@/api/blog/blog-api";
import ApiGroupBlog from "@/api/groupblog/groupblog-api";
import MUploadImage from "@/components/ui/UploadImage";
import { GroupBlogModel } from "@/models/groupblogmodel";
import { useAppSelector } from "@/redux/hooks";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { error } from "console";
import JoditEditor from "jodit-react";
import { Group } from "next/dist/shared/lib/router/utils/route-regex";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function UpdateBlog({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [form] = Form.useForm();
    const [dataBlog, setDataBlog] = useState<any[]>([]);
    const [dataGroupBlog, setDataGroupBlog] = useState<GroupBlogModel[]>([]);
    const editor = useRef(null);

    const [content, setContent] = useState("");
    const auth = useAppSelector((state) => state.authCredentials);
    const token = auth.data?.jwToken || "";
    useEffect(() => {
        ApiGroupBlog.getAllGroupBlog(token)
            .then((res) => {
                setDataGroupBlog(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
        ApiBlog.getBlogById(params.id, token)
            .then((res) => {
                setDataBlog(res.data);
                form.setFieldsValue({
                    title: res.data.title,
                    blogImage: res.data.blogImage,
                    content: res.data.content,
                    blogGroupId: res.data.blogGroupId,
                    tagsBlog: res.data.tags[0] || "",
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    console.log(dataBlog);

    const handleSubmit = (values: any) => {
        console.log(values);
        ApiBlog.updateBlog({
            accessToken: token,
            id: params.id,
            blogImage: values.blogImage,
            title: values.title,
            content: values.content,
            authorId: auth.data?.id || "",
            blogGroupId: values.blogGroupId,
            tagsBlog: [values.tags[0]],
        })
            .then((res) => {
                if (res?.ok) {
                    toast.success("Cập nhật thành công");
                    router.push("/admin/blog");
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
                <Link href="/admin/blog">
                    <Button type="default" className="mr-2">
                        <ArrowLeftOutlined />
                    </Button>
                </Link>
                <h1 className="p-3 text-2xl font-bold">Update Blog</h1>

                <Form
                    form={form}
                    onFinish={handleSubmit}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 24 }}
                    layout="horizontal"
                    style={{ maxWidth: 800 }}
                >
                    <MUploadImage formName={["blogImage"]}></MUploadImage>
                    <Form.Item label="Tiêu đề" name="title">
                        <Input></Input>
                    </Form.Item>
                    <Form.Item label="Nội dung" name="content">
                        <JoditEditor
                            ref={editor}
                            value={content}
                            // config={config}
                            // tabIndex={1} // tabIndex of textarea
                            onBlur={(newContent) => setContent(newContent)}
                            onChange={(newContent) => {}}
                        />
                    </Form.Item>
                    <Form.Item label="Nhóm" name="blogGroupId">
                        <Select
                            options={dataGroupBlog?.map((item: any) => ({
                                value: item.id,
                                label: item.name,
                            }))}
                        ></Select>
                    </Form.Item>
                    <Form.Item label="Tag" name="tagsBlog">
                        <Input></Input>
                    </Form.Item>

                    <div className="flex justify-center">
                        <Button htmlType="submit">Cập nhật</Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}
