"use client";
import ApiDiscount from "@/api/discount/discount-api";
import { MDiscount } from "@/models/discount";
import { useAppSelector } from "@/redux/hooks";
import { formatDate } from "@/utils/config";
import { Button, Col, DatePicker, Form, Input, Row } from "antd";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function updateDiscount({ params }: { params: { id: string } }) {
    const [dataDiscount, setDataDiscount] = useState<MDiscount | null>(null);
    const auth = useAppSelector((state) => state.authCredentials);
    const token = auth.data?.jwToken || "";
    const { RangePicker } = DatePicker;
    const [form] = Form.useForm();
    const router = useRouter();
    //Fetch data discount
    useEffect(() => {
        ApiDiscount.getDetailDiscount(params.id, token)
            .then((res) => setDataDiscount(res.data))
            .catch((error) => console.log(error));
    }, [params.id]);

    // Set data discount to input
    useEffect(() => {
        form.setFieldValue("code", dataDiscount?.code);
        form.setFieldValue("discountValue", dataDiscount?.discountValue);
    }, [dataDiscount]);

    // Handle button update
    const handleSubmit = (value: MDiscount) => {
        const dateStart = value.day?.[0]?.$d ? formatDate(value.day[0].$d) : "";
        const dateEnd = value.day?.[1]?.$d ? formatDate(value.day[1].$d) : "";
        ApiDiscount.updateTimeDiscount(params.id, dateStart, dateEnd)
            .then((response) => {
                if (response.ok) toast.success("Thành công");
                router.push("/admin/discount");
            })
            .catch(() => toast.error("Thất bại"));
    };
    return (
        <div>
            <Form
                className="p-4"
                onFinish={handleSubmit}
                form={form}
                layout="vertical"
            >
                <Row>
                    <Col span={8}>
                        <Form.Item name="code" label="Mã code">
                            <Input disabled />
                        </Form.Item>
                        <Form.Item name="discountValue" label="Giá trị">
                            <Input disabled />
                        </Form.Item>

                        <Form.Item
                            name="day"
                            label="Thời gian hiệu lực "
                            required
                        >
                            <RangePicker
                                disabledDate={(day) =>
                                    dayjs().add(-1, "day") >= day
                                }
                            />
                        </Form.Item>

                        <Button htmlType="submit">Cập nhật</Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}
