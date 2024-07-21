"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MCategory } from "@/models/categorymodel";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { MSupplier } from "@/models/suppliermodel";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, InputNumber, Row } from "antd";
import { Select } from "antd";
import {
    checkBrandName,
    checkCategory,
    checkDescription,
    checkInputMoney,
    checkProductName,
    checkQuantity,
    checkSupplier,
} from "@/utils/config";
import { Toaster, toast } from "sonner";
import { MProduct } from "@/models/productmodel";
import { MDiscount } from "@/models/discount";
import MUploadImageMultiple from "@/components/ui/UploadImageMulti";
import ApiCategory from "@/api/category/category-api";
import ApiDiscount from "@/api/discount/discount-api";
import ApiSupplier from "@/api/supplier/supplier-api";
import { sumQuantity } from "@/helper/helper";
type FieldType = {
    name?: string;
    description?: string;
    productQuantity?: number;
    productBrand?: string;
    price?: number;
    supplierId?: string;
    categoryId?: string;
    discountId?: string;
    productSpecifications?: Omit<ProductSpecification, "key">[];
    productItems?: ProductItem[];
};
type ProductSpecification = {
    specType?: string;
    specValue?: string;
    key?: number;
};
type ProductItem = {
    quantity?: number;
    //colorId?: string;
    color?: { id?: string; colorName?: string; colorCode?: string };
    productImages?: ProductImage[];
};
type ProductImage = {
    url?: string;
};
const AddProduct = () => {
    const router = useRouter();
    const [dataCate, setDataCate] = useState<MCategory[]>([]);
    const [dataSup, setDataSup] = useState<MSupplier[]>([]);
    const [dataDis, setDataDis] = useState<MDiscount[]>([]);
    const [form] = Form.useForm();
    useEffect(() => {
        ApiCategory.getAllCategory()
            .then((res) => {
                setDataCate(res.data);
            })
            .catch((error) => console.log(error));
        ApiDiscount.getAllDiscount(1, 10)
            .then((res) => {
                setDataDis(res.data);
            })
            .catch((error) => console.log(error));
        ApiSupplier.getSuppliers()
            .then((res) => {
                setDataSup(res.data);
            })
            .catch((error) => console.log(error));
    }, []);

    const handleSubmit = async (values: MProduct) => {
        const totalQuantity = sumQuantity(values.productItems);
        //console.log(values);
        // console.log(totalQuantity);

        const body = {
            ...values,
            productQuantity: totalQuantity,
        };
        try {
            const response = await fetch(
                `${process.env.API_URL}Product/create`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                }
            );

            if (response.ok) {
                toast.success("Thêm sản phẩm thành công");
                router.push("/admin/product");
            } else {
                toast.error("Thêm sản phẩm thất bại");
                throw new Error("Failed to add product");
            }
        } catch (error) {
            console.error("Add product error:", error);
        }
    };

    return (
        <div className="container mx-auto p-4 bg-white shadow-xl rounded-xl">
            <h1 className="text-2xl font-bold pb-4">Thêm sản phẩm mới</h1>
            <Toaster position="top-right" richColors />
            <Form
                onFinish={handleSubmit}
                form={form}
                layout="vertical"
                initialValues={{
                    productSpecifications: [
                        {
                            specType: "",
                            specValue: "",
                        },
                    ],
                    productItems: [
                        { quantity: 1, colorId: "", productImages: [] },
                    ],
                }}
            >
                <Row justify={"space-between"}>
                    <Col span={8}>
                        <Form.Item<FieldType>
                            rules={[
                                {
                                    validator: (_, value) =>
                                        checkProductName(value),
                                },
                            ]}
                            label="Tên sản phẩm"
                            name="name"
                        >
                            <Input style={{ width: 300 }} type="text" />
                        </Form.Item>
                        <Form.Item<FieldType>
                            rules={[
                                {
                                    validator: (_, value) =>
                                        checkDescription(value),
                                },
                            ]}
                            label="Mô tả sản phẩm"
                            name="description"
                        >
                            <Input.TextArea style={{ width: 300 }} />
                        </Form.Item>

                        <Form.Item<FieldType>
                            rules={[
                                {
                                    validator: (_, value) =>
                                        checkBrandName(value),
                                },
                            ]}
                            label="Thương hiệu"
                            name="productBrand"
                        >
                            <Input style={{ width: 300 }} type="text" />
                        </Form.Item>
                        <Form.Item<FieldType>
                            label="Số lượng"
                            name="productQuantity"
                        >
                            <InputNumber
                                disabled
                                type="number"
                                style={{ width: 300 }}
                                min={1}
                            />
                        </Form.Item>
                        <Form.Item<FieldType>
                            rules={[
                                {
                                    validator: (_, value) =>
                                        checkInputMoney(value),
                                },
                            ]}
                            label="Giá"
                            name="price"
                        >
                            <InputNumber style={{ width: 300 }} />
                        </Form.Item>
                        <Form.Item<FieldType>
                            rules={[
                                {
                                    validator: (_, value) =>
                                        checkCategory(value),
                                },
                            ]}
                            label="Danh mục sản phẩm"
                            name="categoryId"
                        >
                            <Select
                                //showSearch
                                style={{ width: 200 }}
                                placeholder="Search to Select"
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
                                options={dataCate.map((item) => ({
                                    value: item.id,
                                    label: item.name,
                                }))}
                            />
                        </Form.Item>
                        <Form.Item<FieldType>
                            label="Nhà cung cấp"
                            name="supplierId"
                            rules={[
                                {
                                    validator: (_, value) =>
                                        checkSupplier(value),
                                },
                            ]}
                        >
                            <Select
                                //showSearch
                                style={{ width: 200 }}
                                placeholder="Search to Select"
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
                                options={dataSup.map((item) => ({
                                    value: item.id,
                                    label: item.supplierName,
                                }))}
                            />
                        </Form.Item>
                        <Form.Item<FieldType>
                            label="Mã giảm giá"
                            name="discountId"
                            // rules={[
                            //     {
                            //         validator: (_, value) =>
                            //             checkSupplier(value),
                            //     },
                            // ]}
                        >
                            <Select
                                //showSearch
                                style={{ width: 200 }}
                                placeholder="Search to Select"
                                optionFilterProp="children"
                                options={dataDis?.map((item) => ({
                                    value: item.id,
                                    label: item.code,
                                }))}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.List name="productSpecifications">
                            {(fields, { add, remove }) => (
                                <div
                                    style={{
                                        width: 300,
                                        display: "flex",
                                        rowGap: 16,

                                        flexDirection: "column",
                                    }}
                                >
                                    {fields.map((field) => (
                                        <Card
                                            size="small"
                                            title={`Thông số chi tiết ${
                                                field.name + 1
                                            }`}
                                            key={field.key}
                                            extra={
                                                <CloseOutlined
                                                    onClick={() => {
                                                        remove(field.name);
                                                    }}
                                                />
                                            }
                                        >
                                            <Form.Item
                                                label="Loại thông số"
                                                name={[field.name, "specType"]}
                                            >
                                                <Input />
                                            </Form.Item>
                                            <Form.Item
                                                label="Giá trị"
                                                name={[field.name, "specValue"]}
                                            >
                                                <Input />
                                            </Form.Item>
                                        </Card>
                                    ))}

                                    <Button
                                        type="dashed"
                                        onClick={() => add()}
                                        block
                                    >
                                        + Thêm thông số
                                    </Button>
                                </div>
                            )}
                        </Form.List>
                    </Col>
                    <Col span={8}>
                        <Form.List name="productItems">
                            {(fields, { add, remove }) => (
                                <div
                                    style={{
                                        width: 300,
                                        display: "flex",
                                        rowGap: 16,
                                        flexDirection: "column",
                                    }}
                                >
                                    {fields.map((field) => (
                                        <Card
                                            size="small"
                                            title={`Mặt hàng ${field.name + 1}`}
                                            key={field.key}
                                            extra={
                                                <CloseOutlined
                                                    onClick={() => {
                                                        remove(field.name);
                                                    }}
                                                />
                                            }
                                        >
                                            <Form.Item
                                                label="Số lượng"
                                                name={[field.name, "quantity"]}
                                            >
                                                <InputNumber />
                                            </Form.Item>
                                            <Form.Item
                                                label="Màu sắc"
                                                name={[field.name, "colorId"]}
                                            >
                                                <Select
                                                    //showSearch
                                                    style={{
                                                        width: 200,
                                                    }}
                                                    placeholder="Search to Select"
                                                    optionFilterProp="children"
                                                    filterOption={(
                                                        input,
                                                        option
                                                    ) =>
                                                        (
                                                            option?.label || ""
                                                        ).includes(input)
                                                    }
                                                    filterSort={(
                                                        optionA,
                                                        optionB
                                                    ) =>
                                                        (optionA?.label || "")
                                                            .toLowerCase()
                                                            .localeCompare(
                                                                (
                                                                    optionB?.label ??
                                                                    ""
                                                                ).toLowerCase()
                                                            )
                                                    }
                                                    options={[
                                                        {
                                                            value: "8ea83fdd-ecf0-4c68-8df0-d9238e098400",
                                                            label: "Xám",
                                                        },
                                                        {
                                                            value: "99fe8bab-42ab-444c-a5b8-8195ddb2ba88",
                                                            label: "Đen",
                                                        },
                                                        {
                                                            value: "1c1a2a09-d03e-40cd-b39c-088ce1333295",
                                                            label: "Trắng",
                                                        },
                                                    ]}
                                                />
                                            </Form.Item>
                                            <MUploadImageMultiple
                                                formName={[
                                                    field.name,
                                                    "productImages",
                                                ]}
                                            />
                                        </Card>
                                    ))}

                                    <Button
                                        type="dashed"
                                        onClick={() => add()}
                                        block
                                    >
                                        + Thêm mặt hàng
                                    </Button>
                                </div>
                            )}
                        </Form.List>
                    </Col>
                </Row>
                <Button htmlType="submit" type="primary">
                    Thêm sản phẩm
                </Button>
            </Form>
        </div>
    );
};
export default AddProduct;
