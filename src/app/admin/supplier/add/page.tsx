"use client";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";
import { MSupplier } from "@/models/suppliermodel";
import { Button, Form, Input } from "antd";
import ApiSupplier from "@/api/supplier/supplier-api";
import { useAppSelector } from "@/redux/hooks";
import { trimAndCleanObjectStrings } from "@/helper/helper";

export default function addSupplier() {
    const [form] = Form.useForm();
    const router = useRouter();
    const auth = useAppSelector((state) => state.authCredentials);
    const token = auth.data?.jwToken || "";
    const handleSubmit = async (values: MSupplier) => {
        const trimmedValues = trimAndCleanObjectStrings(values);

        ApiSupplier.createSupplier(trimmedValues, token)
            .then((res) => {
                if (res?.ok) {
                    toast.success("Thêm nhà cung cấp thành công");
                    router.push("/admin/supplier");
                }
            })
            .catch(() => toast.error("Tên đã tồn tại, thêm thất bại"));
    };
    return (
        <div className="container mx-auto p-4 bg-white shadow-xl rounded-xl">
            <h1 className="text-2xl font-bold pb-4">Thêm nhà cung cấp mới</h1>
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
                    <Button htmlType="submit">Thêm nhà cung cấp</Button>
                </div>
            </Form>
        </div>
    );
}
