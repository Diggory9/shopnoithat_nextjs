"use client";
import ApiGroupBlog from "@/api/groupblog/groupblog-api";
import EditorComponent from "@/components/product/editor";
import MyEditor from "@/components/product/editor";
import MEditor from "@/components/product/editor";
import MyEditorComponent from "@/components/product/editor";

import MUploadImage from "@/components/ui/UploadImage";
import { GroupBlogModel } from "@/models/groupblogmodel";
import { Button, Form, Input, Select } from "antd";
import JoditEditor from "jodit-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function AddBlog() {
    const router = useRouter();
    const editor = useRef(null);
    const [dataGroupBlog, setDataGroupBlog] = useState<GroupBlogModel[]>([]);
    const [content, setContent] = useState("");
    useEffect(() => {
        ApiGroupBlog.getAllGroupBlog()
            .then((res) => {
                setDataGroupBlog(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    console.log(dataGroupBlog);

    const handleSubmit = (value: any) => {
        console.log(value);
    };
    console.log(content);

    return (
        <div className="container mx-auto p-4 bg-white shadow-xl rounded-xl h-full">
            <h1 className="text-2xl font-bold pb-4">Thêm mới blog</h1>
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 18 }}
                layout="horizontal"
                style={{ maxWidth: 700 }}
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
                        // config={config}
                        // tabIndex={1} // tabIndex of textarea
                        onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                        onChange={(newContent) => {}}
                    />
                    {/* <MyEditor></MyEditor> */}
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
                    <Input></Input>
                </Form.Item>

                <div className="flex justify-center">
                    <Button htmlType="submit">Thêm mới</Button>
                </div>
            </Form>
        </div>
    );
}
