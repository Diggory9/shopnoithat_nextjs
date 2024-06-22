"use client";
import { Button, Form, Input, Radio, Select } from "antd";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function CheckOut() {
    const [dataProvince, setDataProvince] = useState<MOrder[]>([]);
    const [dataDistrict, setDataDistrict] = useState<MDistrict[]>([]);
    const [dataWard, setDataWard] = useState<MWard[]>([]);
    const [form] = Form.useForm();
    // Lấy data tỉnh thành phố
    useEffect(() => {
        const fetDataProvince = async () => {
            const url =
                "https://online-gateway.ghn.vn/shiip/public-api/master-data/province";
            const token = "b4b2cdc2-2bf0-11ef-8f55-4ee3d82283af";
            try {
                const response11 = await fetch(url, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        token: `${token}`,
                    },
                });

                if (response11.ok) {
                    //toast.success("Success ");
                } else {
                    toast.error("Fail");
                }
                const result = await response11.json();
                setDataProvince(result.data);
                console.log(result);
            } catch (error) {
                console.error("Error during fetch:", error);
            }
        };
        form.setFieldsValue({ recipientName: "ghghhgh" });
        fetDataProvince();
    }, []);

    // Lấy data huyện / quận
    const handleChoiceProvince = async (value: any) => {
        const url = `https://online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${value}`;
        const token = "b4b2cdc2-2bf0-11ef-8f55-4ee3d82283af";
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    token: `${token}`,
                },
            });
            if (response.ok) {
                // toast.success("Successfully fetched districts.");
                const result = await response.json();
                console.log(result.data);
                setDataDistrict(result.data);
            } else {
                toast.error("Failed to fetch districts.");
            }
        } catch (error) {
            console.error("Error during fetch:", error);
            toast.error("Error during fetch.");
        }

        form.setFieldValue("district", null);
        form.setFieldValue("ward", null);
    };
    // Lấy data phường / xã
    const handleChoiceDistrict = async (value: any) => {
        const url = `https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${value}`;
        const token = "b4b2cdc2-2bf0-11ef-8f55-4ee3d82283af";
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    token: `${token}`,
                },
            });

            if (response.ok) {
                // toast.success("Successfully fetched ward.");
                const result = await response.json();
                console.log(result);

                setDataWard(result.data);
            } else {
                toast.error("Failed to fetch ward.");
            }
        } catch (error) {
            console.error("Error during fetch:", error);
            toast.error("Error during fetch.");
        }
    };
    const provinceOptions = dataProvince?.map((item) => ({
        value: item?.ProvinceID,
        label: item?.ProvinceName,
    }));
    const districtOptions = dataDistrict?.map((item) => ({
        value: item?.DistrictID,
        label: item?.DistrictName,
    }));
    const wardOptions = dataWard?.map((item) => ({
        value: item?.WardCode,
        label: item?.WardName,
    }));

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-semibold mb-4">Thanh toán</h1>
            <Form
                form={form}
                onFinish={(value) => console.log(value)}
                labelCol={{ span: 3 }}
                wrapperCol={{ span: 14 }}
            >
                <Form.Item label="Tên người nhận" name="recipientName">
                    <Input style={{ width: 300 }} type="text" />
                </Form.Item>
                <Form.Item label="Số điện thoại" name="phone">
                    <Input style={{ width: 300 }} type="text" />
                </Form.Item>
                <Form.Item label="Tỉnh/Thành Phố" name="province">
                    <Select
                        style={{ width: 200 }}
                        placeholder="Tỉnh/Thành Phố"
                        showSearch
                        optionFilterProp="children"
                        onChange={(value) => handleChoiceProvince(value)}
                        filterOption={(input, option) =>
                            (option?.label ?? "").includes(input)
                        }
                        virtual
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? "")
                                .toLowerCase()
                                .localeCompare(
                                    (optionB?.label ?? "").toLowerCase()
                                )
                        }
                        options={provinceOptions}
                    ></Select>
                </Form.Item>
                <Form.Item label="Quận/Huyện" name="district">
                    <Select
                        style={{ width: 200 }}
                        placeholder="Quận/Huyện"
                        showSearch
                        virtual
                        onChange={(value) => handleChoiceDistrict(value)}
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            (option?.label ?? "").includes(input)
                        }
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? "")
                                .toLowerCase()
                                .localeCompare(
                                    (optionB?.label ?? "").toLowerCase()
                                )
                        }
                        options={districtOptions}
                    ></Select>
                </Form.Item>
                <Form.Item label="Phường/Xã" name="ward">
                    <Select
                        style={{ width: 200 }}
                        placeholder="Phường/Xã"
                        optionFilterProp="children"
                        virtual
                        filterOption={(input, option) =>
                            (option?.label ?? "").includes(input)
                        }
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? "")
                                .toLowerCase()
                                .localeCompare(
                                    (optionB?.label ?? "").toLowerCase()
                                )
                        }
                        options={wardOptions}
                    ></Select>
                </Form.Item>
                <Form.Item label="Địa chỉ" name="address">
                    <Input style={{ width: 300 }} type="text" />
                </Form.Item>

                <Form.Item label="Tổng phụ" name="subTotal">
                    <Input style={{ width: 300 }} type="text" />
                </Form.Item>
                <Form.Item label="Tổng cộng" name="grandTotal">
                    <Input style={{ width: 300 }} type="text" />
                </Form.Item>
                <Form.Item label="Chú thích" name="notes">
                    <Input.TextArea rows={4} />
                </Form.Item>
                <Form.Item name="orderType" label="Kiểu thanh toán">
                    <Radio.Group>
                        <Radio.Button value="a">Online</Radio.Button>
                        <Radio.Button value="b">Offline</Radio.Button>
                    </Radio.Group>
                </Form.Item>
                <Button htmlType="submit">Ok</Button>
            </Form>
        </div>
    );
}
