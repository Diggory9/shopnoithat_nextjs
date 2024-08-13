"use client";
import ApiBanner from "@/api/banner/banner-api";
import MUploadImage from "@/components/ui/UploadImage";
import { useAppSelector } from "@/redux/hooks";
import { Button, Form, Select, Switch } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
export default function Banner() {
    const [dataBanner, setDataBanner] = useState([]);
    const router = useRouter();
    const auth = useAppSelector((state) => state.authCredentials);
    const token = auth.data?.jwToken || "";
    useEffect(() => {
        ApiBanner.getGroupBanners(token)
            .then((res) => {
                setDataBanner(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    const handleSubmit = (values: any) => {
        ApiBanner.createBanner({
            url: values.url,
            groupId: values.groupId,
            isEnable: values.isEnable,
            accessToken: token,
        })
            .then((res) => {
                if (res?.ok) {
                    toast.success("Thêm thành công");
                    router.push("/admin/banner");
                } else toast.error("Thêm thất bại");
            })
            .catch(() => toast.error("Thêm thất bại"));
    };
    return (
        <div className="container mx-auto p-4 bg-white shadow-xl rounded-xl h-full">
            <h1 className="text-2xl font-bold pb-4">Thêm mới banner</h1>
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                style={{ maxWidth: 500 }}
                onFinish={handleSubmit}
            >
                <Form.Item label="Nhóm" name="groupId">
                    <Select>
                        {dataBanner.map((item: any) => (
                            <Select.Option key={item.id} value={item.id}>
                                {item.groupName}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Trạng thái"
                    valuePropName="checked"
                    name="isEnable"
                >
                    <Switch />
                </Form.Item>
                <MUploadImage />
                <div className="flex justify-center">
                    <Button htmlType="submit">Thêm mới</Button>
                </div>
            </Form>
        </div>
    );
}
