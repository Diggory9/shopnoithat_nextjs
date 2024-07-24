"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";
import { MCategory } from "@/models/categorymodel";
import Link from "next/link";
import { Button, Form, Input, Select } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import ApiCategory from "@/api/category/category-api";
import { useAppSelector } from "@/redux/hooks";
import { trimAndCleanObjectStrings } from "@/helper/helper";

export default function UpdateCategory({ params }: { params: { id: string } }) {
    const [form] = Form.useForm();
    const router = useRouter();
    const [dataCate, setDataCate] = useState<MCategory | null>(null);
    const [dataAllCate, setDataAllCate] = useState<MCategory[]>([]);
    const auth = useAppSelector((state) => state.authCredentials);
    const token = auth.data?.jwToken || "";
    //Fetch data categories
    useEffect(() => {
        ApiCategory.getAllCategory()
            .then((res) => setDataAllCate(res.data))
            .catch((error) => console.log(error));
    }, []);
    // Fetch data category
    useEffect(() => {
        ApiCategory.getCategory(params.id, token).then((res) => {
            setDataCate(res?.data);
        });
    }, [params.id]);

    // Set data to form
    useEffect(() => {
        form.setFieldValue("name", dataCate?.name);
        form.setFieldValue("description", dataCate?.description);
        form.setFieldValue("categoryParent", dataCate?.categoryParent);
    }, [dataCate]);

    const handleSubmit = (values: MCategory) => {
        const trimmedValues = trimAndCleanObjectStrings(values);
        ApiCategory.updateCategory(
            params.id,
            trimmedValues.name,
            trimmedValues.categoryParent,
            values.description,
            token
        )
            .then((res) => {
                if (res?.ok) {
                    toast.success("Cập nhật thành công");
                    router.push("/admin/category");
                } else toast.error("Cập nhật thất bại");
            })
            .catch(() => toast.error("Cập nhật thất bại"));
    };

    return (
        <div className="bg-gray-50 w-full">
            <div className="bg-white p-3 rounded-xl mb-4 shadow-xl">
                <Link href="/admin/category">
                    <Button type="default" className="mr-2">
                        <ArrowLeftOutlined />
                    </Button>
                </Link>
                <h1 className="p-3 text-2xl font-bold">Update Category</h1>
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
                            options={dataAllCate.map((item) => ({
                                value: item.id,
                                label: item.name,
                            }))}
                        />
                    </Form.Item>
                    <div className="justify-center items-center flex">
                        <Button htmlType="submit">Cập nhật danh mục</Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}
