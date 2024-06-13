"use client";
import { FormEventHandler, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MCategory } from "@/models/categorymodel";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { MSupplier } from "@/models/suppliermodel";
import MUploadImageMultiple from "@/app/components/uploadImageMultiple";
// import MUploadImage from "@/app/components/uploadImage";
import { CloseOutlined } from "@ant-design/icons";
import {
    Button,
    Card,
    Form,
    Input,
    InputNumber,
    Space,
    Image,
    Typography,
    Upload,
    UploadProps,
} from "antd";

import { Select } from "antd";
import {
    checkBrandName,
    checkDescription,
    checkInputMoney,
    checkProductName,
    checkQuantity,
} from "@/utils/config";
import { Toaster, toast } from "sonner";
interface MUploadImageProps extends UploadProps {
    image?: string;
    formName?: string | string[];
    disableTitle?: boolean;
    notRequired?: boolean;
}

type FieldType = {
    name?: string;
    description?: string;
    productQuantity?: number;
    productBrand?: string;
    price?: number;
    supplierId?: string;
    categoryId?: string;
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
    colorId?: string;
    productImages?: ProductImage[];
};
type ProductImage = {
    url?: string;
};
const AddProduct: React.FC<MUploadImageProps> = ({
    image,
    formName,
    disableTitle,
    notRequired,
    ...rest
}) => {
    const [imageLocal, setImageLocal] = useState<string>("");

    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState<any[]>([]); //
    const handleChange: UploadProps["onChange"] = (info) => {
        let fileList = [...info.fileList];
        // Only keep the last file
        fileList = fileList.slice(-1);
        setFileList(fileList);
        if (info.file.status === "uploading") {
            setLoading(true);
            return;
        }
        if (info.file.status === "done") {
            setLoading(false);
            setImageLocal(info.file?.response?.data[0].url);
        }
    };

    const getFile = (e: UploadProps) => {
        if (Array.isArray(e)) {
            return e;
        }
        return (
            e &&
            e?.fileList?.[e?.fileList?.length - 1 || 0]?.response?.data[0].url
        );
    };

    useEffect(() => {
        setImageLocal(image || "");
    }, [image]);
    const router = useRouter();
    //fetch list data category and supplier
    const [dataCate, setDataCate] = useState<MCategory[]>([]);
    const [dataSup, setDataSup] = useState<MSupplier[]>([]);
    const [dataSubmit, setDataSubmit] = useState<FieldType>({});
    const [form] = Form.useForm();
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const respone = await fetch(
                    "https://localhost:44372/api/Category/list",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                if (!respone.ok) {
                    throw new Error("Network response was not ok");
                }
                const result = await respone.json();
                setDataCate(result.data);
            } catch (error) {
                console.error("Fetch error:", error);
            } finally {
            }
        };
        fetchCategories();
    }, []);
    const options = dataCate.map((item) => ({
        value: item.id,
        label: item.name,
    }));
    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const respone = await fetch(
                    "https://localhost:44372/api/Supplier/list",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                if (!respone.ok) {
                    throw new Error("Network response was not ok");
                }
                const result = await respone.json();
                setDataSup(result.data);
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };
        fetchSuppliers();
    }, []);
    const optionsSup = dataSup.map((item) => ({
        value: item.id,
        label: item.supplierName,
    }));
    const handleSubmit = async (values: FieldType) => {
        // e.preventDefault();
        //console.log(e);

        try {
            const response = await fetch(
                "https://localhost:44372/api/Product/create",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
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
            <Form onFinish={handleSubmit} form={form}>
                <Form.Item
                    rules={[
                        { validator: (_, value) => checkProductName(value) },
                    ]}
                    label="Tên sản phẩm"
                    name="name"
                >
                    <Input style={{ width: 300 }} type="text" />
                </Form.Item>
                <Form.Item
                    rules={[
                        { validator: (_, value) => checkDescription(value) },
                    ]}
                    label="Mô tả sản phẩm"
                    name="description"
                >
                    <Input.TextArea style={{ width: 300 }} />
                </Form.Item>
                <Form.Item
                    rules={[{ validator: (_, value) => checkBrandName(value) }]}
                    label="Thương hiệu"
                    name="productBrand"
                >
                    <Input style={{ width: 300 }} type="text" />
                </Form.Item>
                <Form.Item
                    rules={[{ validator: (_, value) => checkQuantity(value) }]}
                    label="Số lượng"
                    name="productQuantity"
                >
                    <InputNumber style={{ width: 300 }} />
                </Form.Item>
                <Form.Item
                    rules={[
                        { validator: (_, value) => checkInputMoney(value) },
                    ]}
                    label="Giá"
                    name="price"
                >
                    <InputNumber style={{ width: 300 }} />
                </Form.Item>
                <Form.Item label="Danh mục sản phẩm" name="categoryId">
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
                        options={options}
                    />
                </Form.Item>
                <Form.Item label="Nhà cung cấp" name="supplierId">
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
                        options={optionsSup}
                    />
                </Form.Item>

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

                            <Button type="dashed" onClick={() => add()} block>
                                + Thêm thông số
                            </Button>
                        </div>
                    )}
                </Form.List>
                <Form.List name="productItems">
                    {(fields, { add, remove }) => (
                        <div
                            style={{
                                width: 400,
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
                                            style={{ width: 200 }}
                                            placeholder="Search to Select"
                                            optionFilterProp="children"
                                            filterOption={(input, option) =>
                                                (option?.label ?? "").includes(
                                                    input
                                                )
                                            }
                                            filterSort={(optionA, optionB) =>
                                                (optionA?.label ?? "")
                                                    .toLowerCase()
                                                    .localeCompare(
                                                        (
                                                            optionB?.label ?? ""
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

                                    <Form.List
                                        name={[field.name, "productImages"]}
                                    >
                                        {(subFields, subOpt) => (
                                            <div
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    rowGap: 16,
                                                }}
                                            >
                                                {subFields.map((subField) => (
                                                    <Space key={subField.key}>
                                                        <Form.Item
                                                            label={
                                                                disableTitle
                                                                    ? ""
                                                                    : "Hình ảnh"
                                                            }
                                                            name={[
                                                                field.name,
                                                                "url",
                                                            ]}
                                                            valuePropName="avatar"
                                                            getValueFromEvent={
                                                                getFile
                                                            }
                                                            rules={[
                                                                {
                                                                    required:
                                                                        !notRequired,
                                                                    message:
                                                                        "Image is required",
                                                                },
                                                            ]}
                                                        >
                                                            <Upload
                                                                name="file"
                                                                listType="picture-card"
                                                                className="avatar-uploader"
                                                                showUploadList={
                                                                    false
                                                                }
                                                                action={`https://localhost:44372/api/UploadPhoto/upload`}
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                accept="image/*"
                                                                {...rest}
                                                            >
                                                                {!loading &&
                                                                imageLocal ? (
                                                                    <Image
                                                                        src={
                                                                            imageLocal
                                                                        }
                                                                        alt="avatar"
                                                                        style={{
                                                                            width: "100%",
                                                                        }}
                                                                        preview={
                                                                            false
                                                                        }
                                                                    />
                                                                ) : (
                                                                    <button
                                                                        style={{
                                                                            border: 0,
                                                                            background:
                                                                                "none",
                                                                        }}
                                                                        type="button"
                                                                    >
                                                                        {loading ? (
                                                                            <LoadingOutlined />
                                                                        ) : (
                                                                            <PlusOutlined />
                                                                        )}
                                                                        <div
                                                                            style={{
                                                                                marginTop: 8,
                                                                            }}
                                                                        >
                                                                            Upload
                                                                        </div>
                                                                    </button>
                                                                )}
                                                            </Upload>
                                                        </Form.Item>
                                                        <CloseOutlined
                                                            onClick={() => {
                                                                subOpt.remove(
                                                                    subField.name
                                                                );
                                                            }}
                                                        />
                                                    </Space>
                                                ))}
                                                <Button
                                                    type="dashed"
                                                    onClick={() => subOpt.add()}
                                                    block
                                                >
                                                    + Image
                                                </Button>
                                            </div>
                                        )}
                                    </Form.List>
                                </Card>
                            ))}

                            <Button type="dashed" onClick={() => add()} block>
                                + Thêm mặt hàng
                            </Button>
                        </div>
                    )}
                </Form.List>

                <Button htmlType="submit" type="primary">
                    Thêm sản phẩm
                </Button>
            </Form>
        </div>
    );
};
export default AddProduct;
