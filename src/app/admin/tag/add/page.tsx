"use client";
import ApiTag from "@/api/tag/tag-api";
import { useAppSelector } from "@/redux/hooks";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AddTag() {
    const [form] = Form.useForm();
    const router = useRouter();
    const auth = useAppSelector((state) => state.authCredentials);
    const token = auth.data?.jwToken || "";
    const handleSubmit = async (value: any) => {
        ApiTag.createTag(value.tagTitle, token)
            .then((res) => {
                if (res?.ok) {
                    toast.success("Thành công");
                    router.push("/admin/tag");
                } else {
                    toast.error("Thất bại");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <div className="container mx-auto p-4 bg-white shadow-xl rounded-xl">
            <h1 className="text-2xl font-bold pb-4">Thêm tag</h1>

            <Form
                form={form}
                onFinish={handleSubmit}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                style={{ maxWidth: 600 }}
            >
                <Form.Item name="tagTitle" label="Tiêu đề">
                    <Input></Input>
                </Form.Item>

                <div className="justify-center items-center flex">
                    <Button htmlType="submit">Thêm tag</Button>
                </div>
            </Form>
        </div>
    );
}
