"use client";
import { Toaster, toast } from "sonner";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MSupplier } from "@/models/suppliermodel";
import { Button, Form, Input } from "antd";
import ApiSupplier from "@/api/supplier/supplier-api";
import { useAppSelector } from "@/redux/hooks";
import { trimAndCleanObjectStrings } from "@/helper/helper";
import Link from "next/link";
import { ArrowLeftOutlined } from "@ant-design/icons";

export default function updateSupplier({ params }: { params: { id: string } }) {
    const [dataSupplier, setdataSupplier] = useState<MSupplier | null>(null);
    const [allSuppliers, setAllSuppliers] = useState<MSupplier[]>([]);
    const router = useRouter();
    const [form] = Form.useForm();
    const auth = useAppSelector((state) => state.authCredentials);
    const token = auth.data?.jwToken || "";
    //Fetch data supplier

    useEffect(() => {
        ApiSupplier.getSupplier(params.id)
            .then((res) => {
                setdataSupplier(res.data);
            })
            .catch((error) => console.log(error));
        ApiSupplier.getSuppliers()
            .then((res) => {
                setAllSuppliers(res.data);
            })
            .catch((error) => console.log(error));
    }, [params.id]);

    //Set data to form

    useEffect(() => {
        form.setFieldsValue(dataSupplier);
    }, [dataSupplier]);

    //Update supplier

    const handleSubmit = async (value: MSupplier) => {
        const trimmedValues = trimAndCleanObjectStrings(value);
        const existingSupplier = allSuppliers.find(
            (supplier) =>
                supplier.supplierName === trimmedValues.supplierName &&
                supplier.id !== params.id
        );

        if (existingSupplier) {
            toast.error("Tên nhà cung cấp đã tồn tại");
            return;
        }
        ApiSupplier.updateSupplier(params.id, trimmedValues, token)
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
                <Link href="/admin/supplier">
                    <Button type="default" className="mr-2">
                        <ArrowLeftOutlined />
                    </Button>
                </Link>
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
