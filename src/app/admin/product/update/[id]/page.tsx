"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MCategory } from "@/models/categorymodel";
import { MSupplier } from "@/models/suppliermodel";
import { CloseOutlined } from "@ant-design/icons";
import {
    Button,
    Card,
    Col,
    Form,
    Input,
    InputNumber,
    Row,
    Select,
    Spin,
} from "antd";
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
import { sumQuantity } from "@/helper/helper";
import ApiCategory from "@/api/category/category-api";
import ApiDiscount from "@/api/discount/discount-api";
import ApiSupplier from "@/api/supplier/supplier-api";

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
    color?: { id?: string; colorName?: string; colorCode?: string };
    productImages?: ProductImage[];
};

type ProductImage = {
    id?: string;
    url?: string;
};

const UpdateProduct = ({ params }: { params: { id: string } }) => {
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

    const handleOnchangeQuantity = () => {
        form.setFieldValue(
            "productQuantity",
            sumQuantity(form.getFieldValue("productItems"))
        );
    };
    useEffect(() => {
        if (params.id) {
            const fetchProduct = async () => {
                try {
                    const response = await fetch(
                        `${process.env.API_URL}Product/${params.id}`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }
                    );
                    if (!response.ok)
                        throw new Error("Network response was not ok");
                    const result = await response.json();
                    // console.log(result.data);
                    // const totalQuantity = sumQuantity(result.data.productItems);
                    // console.log(totalQuantity);

                    form.setFieldsValue({
                        name: result.data.name,
                        description: result.data.description,
                        productBrand: result.data.productBrand,
                        productQuantity: sumQuantity(result.data.productItems),
                        price: result.data.price,
                        image: result.data.image,
                        categoryId: result.data.category.id,
                        supplierId: result.data.supplier.id,
                        discountId: result.data.productDiscount?.id || null,
                        productSpecifications:
                            result.data.productSpecifications.map(
                                (specItem: {
                                    specType: string;
                                    specValue: string;
                                }) => ({
                                    specType: specItem.specType,
                                    specValue: specItem.specValue,
                                })
                            ),
                        productItems: result.data.productItems.map(
                            (item: {
                                quantity: number;
                                color: { id: string };
                                productImages: any[];
                            }) => ({
                                quantity: item.quantity,
                                colorId: item.color.id,
                                productImages: item.productImages.map(
                                    (image) => ({
                                        url: image.url,
                                    })
                                ),
                            })
                        ),
                    });
                } catch (error) {
                    console.error("Fetch product error:", error);
                }
            };
            fetchProduct();
        }
    }, [params.id, form]);

    const handleSubmit = async (values: MProduct) => {
        console.log(values);

        // try {
        //     const response = await fetch(
        //         `${process.env.API_URL}Product/${params.id}`,
        //         {
        //             method: "PATCH",
        //             headers: {
        //                 "Content-Type": "application/json",
        //             },
        //             body: JSON.stringify(values),
        //         }
        //     );

        //     if (response.ok) {
        //         toast.success("Cập nhật sản phẩm thành công");
        //         router.push("/admin/product");
        //     } else {
        //         toast.error("Cập nhật sản phẩm thất bại");
        //         throw new Error("Failed to update product");
        //     }
        // } catch (error) {
        //     console.error("Update product error:", error);
        // }
    };

    return (
        <div className="container mx-auto p-4 bg-white shadow-xl rounded-xl">
            <h1 className="text-2xl font-bold pb-4">Cập nhật sản phẩm</h1>
            <Toaster position="top-right" richColors />
            <Form onFinish={handleSubmit} form={form} layout="vertical">
                <Row justify="space-between">
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
                            rules={[
                                {
                                    validator: (_, value) =>
                                        checkQuantity(value),
                                },
                            ]}
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
                                style={{ width: 200 }}
                                placeholder="Chọn danh mục"
                                options={dataCate.map((item) => ({
                                    value: item.id,
                                    label: item.name,
                                }))}
                            />
                        </Form.Item>
                        <Form.Item<FieldType>
                            rules={[
                                {
                                    validator: (_, value) =>
                                        checkSupplier(value),
                                },
                            ]}
                            label="Nhà cung cấp"
                            name="supplierId"
                        >
                            <Select
                                style={{ width: 200 }}
                                placeholder="Chọn nhà cung cấp"
                                options={dataSup.map((item) => ({
                                    value: item.id,
                                    label: item.supplierName,
                                }))}
                            />
                        </Form.Item>
                        <Form.Item<FieldType>
                            label="Mã giảm giá"
                            name="discountId"
                        >
                            <Select
                                style={{ width: 200 }}
                                placeholder="Chọn mã giảm giá"
                                options={dataDis.map((item) => ({
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
                                                    onClick={() =>
                                                        remove(field.name)
                                                    }
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
                                                    onClick={() =>
                                                        remove(field.name)
                                                    }
                                                />
                                            }
                                        >
                                            <Form.Item
                                                label="Số lượng"
                                                name={[field.name, "quantity"]}
                                            >
                                                <InputNumber
                                                    min={1}
                                                    onChange={() =>
                                                        handleOnchangeQuantity()
                                                    }
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                label="Màu sắc"
                                                name={[field.name, "colorId"]}
                                            >
                                                <Select
                                                    style={{ width: 200 }}
                                                    placeholder="Chọn màu sắc"
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
                                                initFileList={
                                                    form
                                                        .getFieldValue(
                                                            "productItems"
                                                        )
                                                        ?.[
                                                            field.name
                                                        ]?.productImages?.map(
                                                            (item: any) =>
                                                                item.url
                                                        ) || []
                                                }
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
                    Cập nhật sản phẩm
                </Button>
            </Form>
        </div>
    );
};

export default UpdateProduct;
