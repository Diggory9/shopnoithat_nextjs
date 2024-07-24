"use client";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";
import { MCategory } from "@/models/categorymodel";
import Link from "next/link";
import { Button, Form, Input, Select } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import ApiCategory from "@/api/category/category-api";
import { useAppSelector } from "@/redux/hooks";
import { trimAndCleanObjectStrings } from "@/helper/helper";

export default function addCategory() {
    const [form] = Form.useForm();
    const router = useRouter();
    const [dataCate, setDataCate] = useState<MCategory[]>([]);
    const auth = useAppSelector((state) => state.authCredentials);
    const token = auth.data?.jwToken;
    console.log(token);

    // Fetch data category
    useEffect(() => {
        ApiCategory.getAllCategory()
            .then((res) => setDataCate(res.data))
            .catch((error) => console.log(error));
    }, []);

    // Handle add category
    const handleSubmit = (values: MCategory) => {
        const trimmedValues = trimAndCleanObjectStrings(values);
        ApiCategory.addCategory(
            trimmedValues.name,
            trimmedValues.categoryParent,
            trimmedValues.description,
            token || ""
        )
            .then((res) => {
                if (res?.ok) {
                    toast.success("Thêm danh mục thành công");
                    router.push("/admin/category");
                } else toast.error("Thêm danh mục thất bại");
            })
            .catch(() => toast.error("Thêm danh mục thất bại"));
    };
    return (
        <div className="container mx-auto p-4 bg-white shadow-xl rounded-xl">
            <Link href="/admin/category">
                <Button type="default" className="mr-2">
                    <ArrowLeftOutlined />
                </Button>
            </Link>
            <h1 className="text-2xl font-bold pb-4">Thêm danh mục mới</h1>
            <Toaster position="top-right" richColors />
            <Form
                form={form}
                onFinish={handleSubmit}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                style={{ maxWidth: 600 }}
            >
                <Form.Item name="name" label="Tên danh mục">
                    <Input></Input>
                </Form.Item>
                <Form.Item name="description" label="Mô tả danh mục">
                    <TextArea></TextArea>
                </Form.Item>
                <Form.Item name="categoryParent" label="Danh mục cha">
                    <Select
                        //showSearch
                        style={{ width: 200 }}
                        placeholder="Search to Select"
                        options={dataCate.map((item) => ({
                            value: item.id,
                            label: item.name,
                        }))}
                    />
                </Form.Item>
                <div className="justify-center items-center flex">
                    <Button htmlType="submit">Thêm danh mục</Button>
                </div>
            </Form>
        </div>
    );
}
