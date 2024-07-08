"use client";
import { CartModel } from "@/models/cartmodel";
import { Button, Form, Input, Radio, Select } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";

export default function CheckOut() {
    const [dataProvince, setDataProvince] = useState<MOrderGHN[]>([]);
    const [dataDistrict, setDataDistrict] = useState<MDistrict[]>([]);
    const [dataWard, setDataWard] = useState<MWard[]>([]);
    const [form] = Form.useForm();
    const [datacart, setDatacart] = useState<CartModel[]>([]);
    const [userId, setUserId] = useState("");
    const router = useRouter();
    form.setFieldsValue({ recipientName: "The Nguyen" });
    form.setFieldsValue({ phone: "0358326432" });
    form.setFieldsValue({ notes: "Giao hang 9h-10h" });
    form.setFieldsValue({ address: "180 cao lo" });
    //Lấy data giỏ hàng và userID từ local
    useEffect(() => {
        const cartData = localStorage.getItem("CartData");
        if (cartData) {
            setDatacart(JSON.parse(cartData));
        }
        const storedUserId = localStorage.getItem("userId");
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);

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
                //console.log(result);
            } catch (error) {
                console.error("Error during fetch:", error);
            }
        };

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
    // Đổ dữ liệu vào option
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
    // Tổng tiền
    const totalPrice = datacart.reduce((total, item) => {
        return total + item?.price! * item?.quantity!;
    }, 0);
    // Tổng tiền giảm giá
    const totalDiscount = datacart.reduce((total, item) => {
        return (
            total +
            (item?.price! * item?.quantity! * (item?.discount?.value || 0)) /
                100
        );
    }, 0);
    // Hàm xử lý
    const handleFinish = async (values: any) => {
        const selectedProvince = dataProvince.find(
            (item) => item.ProvinceID === values.province
        );
        const selectedDistrict = dataDistrict.find(
            (item) => item.DistrictID === values.district
        );
        const selectedWard = dataWard.find(
            (item) => item.WardCode === values.ward
        );
        // Lấy địa chỉ từ các option và custom lại
        const address = `${values.address}, ${selectedWard?.WardName}, ${selectedDistrict?.DistrictName}, ${selectedProvince?.ProvinceName}`;
        //const total = totalPrice;
        //const subTotal = totalPrice;

        const finalValues = {
            ...values,
            address: address,
            total: totalPrice,
            subTotal: totalPrice,
            totalDiscount: totalDiscount,
            userId: userId,
            items: datacart.map((item) => ({
                productItemId: item.id,
                quantity: item.quantity,
                price: item.price,
                amountDiscount: item.quantityInStock,
            })),
            transactions: [
                {
                    amount: totalPrice,
                    type: values.typePayment,
                    description: "123",
                    userId: userId,
                    status: "OK",
                },
            ],
        };
        delete finalValues.district;
        delete finalValues.province;
        delete finalValues.ward;
        delete finalValues.typePayment;
        console.log(finalValues);
        if (finalValues.transactions[0].type == "COD") {
            try {
                const response = await fetch(
                    `${process.env.API_URL}Order/create`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(finalValues),
                    }
                );

                if (response.ok) {
                    //toast.success("Đặt hàng thành công");
                    const dataOrder = await response.json();
                    localStorage.setItem(
                        "dataOrder",
                        JSON.stringify(dataOrder)
                    );
                    router.push("/checkout/success");
                } else {
                    toast.error("Failed");
                    throw new Error("Failed to add product");
                }
            } catch (error) {
                console.error("Create order:", error);
            }
        } else if (finalValues.transactions[0].type == "VNPAY") {
            try {
                const response = await fetch(
                    `${process.env.API_URL}Payment/vnpay`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(finalValues),
                    }
                );

                if (response.ok) {
                    //toast.success("Đặt hàng thành công");
                    const dataOrder = await response.json();
                    localStorage.setItem(
                        "dataOrder",
                        JSON.stringify(dataOrder)
                    );
                    console.log(dataOrder.url);
                    window.open(dataOrder.url, "_blank");
                    //router.push("/checkout/success");
                } else {
                    toast.error("Failed");
                    throw new Error("Failed to add product");
                }
            } catch (error) {
                console.error("Create order:", error);
            }
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-semibold mb-4">Thanh toán</h1>
            <Toaster position="top-right" richColors />

            <div className="flex">
                <div className="w-3/5">
                    {" "}
                    <Form
                        form={form}
                        onFinish={handleFinish}
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
                                onChange={(value) =>
                                    handleChoiceProvince(value)
                                }
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
                                onChange={(value) =>
                                    handleChoiceDistrict(value)
                                }
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

                        {/* <Form.Item label="Tổng phụ" name="subTotal">
                            <Input style={{ width: 300 }} type="text" />
                        </Form.Item> */}
                        <Form.Item label="Chú thích" name="notes">
                            <Input.TextArea rows={4} />
                        </Form.Item>
                        <Form.Item name="orderType" label="Loại đơn hàng">
                            <Radio.Group>
                                <Radio.Button value="Online">
                                    Online
                                </Radio.Button>
                                <Radio.Button value="Offline">
                                    Offline
                                </Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            name="typePayment"
                            label="Phương thức thanh toán"
                        >
                            <Radio.Group>
                                <Radio.Button value="COD">
                                    Thanh toán sau khi nhận hàng
                                </Radio.Button>
                                <Radio.Button value="VNPAY">
                                    Thanh toán VNPAY
                                </Radio.Button>
                            </Radio.Group>
                        </Form.Item>

                        <Button htmlType="submit">Ok</Button>
                    </Form>
                </div>
                <div className="w-2/5">
                    {" "}
                    <div className="mt-8">
                        <h2 className="text-2xl font-semibold mb-4">
                            Tóm tắt đơn hàng
                        </h2>
                        <div>
                            <div className="flex flex-col space-y-4">
                                {datacart.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center space-x-4 py-4 border-b border-gray-200"
                                    >
                                        <div className="w-20 h-20 overflow-hidden">
                                            <img
                                                src={
                                                    item.image &&
                                                    item.image?.url
                                                        ? item.image.url
                                                        : ""
                                                }
                                                alt=""
                                                className="object-cover w-full h-full"
                                            />
                                        </div>
                                        <div>
                                            <p className="text-lg font-medium">
                                                {item?.name}{" "}
                                                <span className="text-red-600 font-bold">
                                                    x{item.quantity}
                                                </span>
                                            </p>
                                            <p className="text-gray-600">
                                                Giá: {item?.price} VND
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <p className="mt-4 font-semibold">
                                <span>Tổng cộng</span>
                                <span>
                                    {" "}
                                    {totalPrice.toLocaleString("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                    })}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
