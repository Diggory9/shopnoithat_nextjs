"use client";
import ApiBlog from "@/api/blog/blog-api";
import ApiGroupBlog from "@/api/groupblog/groupblog-api";
import ApiTag from "@/api/tag/tag-api";
import MUploadImage from "@/components/ui/UploadImage";
import { GroupBlogModel } from "@/models/groupblogmodel";
import { useAppSelector } from "@/redux/hooks";
import { Button, Form, Input, Select } from "antd";
import JoditEditor from "jodit-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast, Toaster } from "sonner";

export default function AddBlog() {
    const router = useRouter();
    const editor = useRef(null);
    const [dataGroupBlog, setDataGroupBlog] = useState<GroupBlogModel[]>([]);
    const [dataTag, setDataTag] = useState<any[]>([]);
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
        ApiTag.getAllTag(token)
            .then((res) => {
                setDataTag(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleSubmit = (value: any) => {
        ApiBlog.createBlog({
            accessToken: token,
            authorId: auth?.data?.id || "",
            blogImage: value.blogImage,
            title: value.title,
            content: content,
            tagsBlog: value.tagsBlog,
            blogGroupId: value.blogGroupId,
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
            <h1 className="text-2xl font-bold pb-4">Thêm mới blog</h1>
            <Toaster position="top-right" richColors />
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 18 }}
                layout="horizontal"
                style={{ maxWidth: 900 }}
                onFinish={handleSubmit}
            >
                <MUploadImage formName={["blogImage"]}></MUploadImage>
                <Form.Item label="Tiêu đề" name="title">
                    <Input></Input>
                </Form.Item>
                <Form.Item label="Nội dung" name="content">
                    <JoditEditor
                        ref={editor}
                        value={content}
                        onBlur={(newContent) => setContent(newContent)}
                        onChange={(newContent) => {}}
                    />
                </Form.Item>
                <Form.Item label="Nhóm" name="blogGroupId">
                    <Select
                        options={dataGroupBlog?.map((item) => ({
                            value: item.id,
                            label: item.name,
                        }))}
                    ></Select>
                </Form.Item>
                <Form.Item label="Tag" name="tagsBlog">
                    <Select
                        mode="multiple"
                        allowClear
                        style={{ width: "100%" }}
                        placeholder="Please select"
                        options={dataTag.map((item) => ({
                            value: item.tagTitle,
                        }))}
                    />
                </Form.Item>

                <div className="flex justify-center">
                    <Button htmlType="submit">Thêm mới</Button>
                </div>
            </Form>
        </div>
    );
}
