"use client";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";
import { MDiscount } from "@/models/discount";
import { Button, Form, Input, InputNumber, Select, DatePicker } from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { useForm } from "antd/es/form/Form";
import {
    checkDescription,
    checkDiscountCode,
    checkDiscountType,
    formatDate,
} from "@/utils/config";
export default function addDiscount() {
    const { RangePicker } = DatePicker;
    const router = useRouter();
    const [form] = useForm();

    const handleSubmit = async (value: MDiscount) => {
        const { day, ...rest } = value;
        const body: Omit<MDiscount, "day"> = {
            ...rest,
            dateStart: formatDate(value.day[0].$d),
            dateEnd: formatDate(value.day[1].$d),
        };
        console.log(body);
        try {
            const respone = await fetch(
                "https://localhost:44372/api/Discount/create",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                }
            );
            if (respone.ok) {
                //Thêm thành công
                console.log("Success");

                // console.log(data.data);
                toast.success("Thêm khuyến mãi thành công");
                router.push("/admin/discount");
            } else {
                //Thêm thất bại
                console.log("Fail !!!");
                toast.error("Thêm khuyến mãi thất bại");
            }
        } catch (error) {
            console.error("Lỗi khi gửi yêu cầu:", error);
        }
    };
    const handleTypeChange = () => {
        form.validateFields(["discountValue"]);
    };

    return (
        <div className="container mx-auto p-4 bg-white shadow-xl rounded-xl">
            <h1 className="text-2xl font-bold pb-4">Thêm giảm giá</h1>
            <Toaster position="top-right" richColors />
            <Form
                form={form}
                onFinish={handleSubmit}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                style={{ maxWidth: 600 }}
            >
                <Form.Item
                    name="code"
                    label="Mã Code"
                    rules={[
                        {
                            validator: (_, value) => checkDiscountCode(value),
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="type"
                    label="Kiểu giảm giá"
                    rules={[
                        {
                            validator: (_, value) => checkDiscountType(value),
                        },
                    ]}
                >
                    <Select onChange={handleTypeChange}>
                        <Select.Option value="PERCENTAGE">
                            PERCENTAGE
                        </Select.Option>
                        <Select.Option value="FIX-AMOUNT">
                            FIX-AMOUNT
                        </Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="discountValue"
                    label="Giá trị"
                    rules={[
                        { required: true, message: "Giá trị là bắt buộc" },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                const type = getFieldValue("type");
                                if (
                                    type === "PERCENTAGE" &&
                                    (value <= 0 || value > 100)
                                ) {
                                    return Promise.reject(
                                        new Error(
                                            "Giá trị phần trăm phải nằm trong khoảng từ 1 đến 100"
                                        )
                                    );
                                }
                                if (type === "FIX-AMOUNT" && value <= 0) {
                                    return Promise.reject(
                                        new Error("Giá trị phải lớn hơn 0")
                                    );
                                }
                                return Promise.resolve();
                            },
                        }),
                    ]}
                >
                    <InputNumber min={1} />
                </Form.Item>
                <Form.Item
                    name="day"
                    label="Thời gian hiệu lực "
                    rules={[
                        { required: true, message: "Vui lòng chọn thời gian" },
                    ]}
                >
                    <RangePicker
                        disabledDate={(day) => dayjs().add(-1, "day") >= day}
                    />
                </Form.Item>

                <Form.Item
                    name="condition"
                    label="Giá tối thiểu"
                    rules={[{ required: true, message: "Điền giá tối thiểu" }]}
                >
                    <InputNumber min={1} />
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Mô tả"
                    rules={[{ required: true, message: "Vui lòng điền mô tả" }]}
                >
                    <TextArea rows={4} />
                </Form.Item>

                <div className="justify-center items-center flex">
                    <Button htmlType="submit">Thêm giảm giá</Button>
                </div>
            </Form>
        </div>
    );
}
