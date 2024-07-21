"use client";
import { Toaster, toast } from "sonner";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MSupplier } from "@/models/suppliermodel";
import { Button, Form, Input } from "antd";
import ApiSupplier from "@/api/supplier/supplier-api";

export default function updateSupplier({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [dataSupplier, setdataSupplier] = useState<MSupplier | null>(null);
    const [form] = Form.useForm();

    //Fetch data supplier

    useEffect(() => {
        ApiSupplier.getSupplier(params.id)
            .then((res) => {
                setdataSupplier(res.data);
            })
            .catch((error) => console.log(error));
    }, [params.id]);

    //Set data to form

    useEffect(() => {
        form.setFieldsValue(dataSupplier);
    }, [dataSupplier]);

    //Update supplier

    const handleSubmit = async (value: MSupplier) => {
        ApiSupplier.updateSupplier(params.id, value)
            .then((res) => {
                if (res?.ok) {
                    toast.success("Cập nhật thành công");
                    router.push("/admin/supplier");
                } else toast.error("Cập nhật thất bại");
            })
            .catch(() => toast.error("Cập nhật thất bại"));
    };

    return (
        <div className="bg-gray-50 w-full">
            <div className="bg-white p-3 rounded-xl mb-4 shadow-xl">
                <h1 className="p-3 text-2xl font-bold">Update Supplier</h1>
                <Toaster position="top-right" richColors />
                <Form
                    form={form}
                    onFinish={handleSubmit}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                    style={{ maxWidth: 600 }}
                >
                    <Form.Item name="supplierName" label="Tên nhà cung cấp">
                        <Input></Input>
                    </Form.Item>
                    <Form.Item name="contactPhone" label="Số điện thoại">
                        <Input></Input>
                    </Form.Item>
                    <Form.Item name="contactPerson" label="Người liên hệ">
                        <Input></Input>
                    </Form.Item>
                    <Form.Item name="address" label="Địa chỉ">
                        <Input></Input>
                    </Form.Item>
                    <Form.Item name="notes" label="Chú thích">
                        <Input></Input>
                    </Form.Item>
                    <div className="justify-center items-center flex">
                        <Button htmlType="submit">Cập nhật</Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}
