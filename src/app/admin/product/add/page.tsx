"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MCategory } from "@/models/categorymodel";
import { MSupplier } from "@/models/suppliermodel";
import MUploadImageMultiple from "@/app/components/uploadImageMultiple";
import MUploadImage from "@/app/components/uploadImage";
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
    productImages?: string[];
};
export default function AddProduct() {
    const router = useRouter();
    //fetch list data category and supplier
    const [dataCate, setDataCate] = useState<MCategory[]>([]);
    const [dataSup, setDataSup] = useState<MSupplier[]>([]);
    const [dataSubmit, setDataSubmit] = useState<FieldType>({});
    const [productSpecifications, setProductSpecifications] = useState<
        ProductSpecification[]
    >([{ specValue: "", specType: "", key: Date.now() }]);
    const [productItems, setProductItems] = useState<ProductItem[]>([]);
    const [productImages, setProductImages] = useState([]);
    const [url, setUrl] = useState("");
    const [previewSrc, setPreviewSrc] = useState("");

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
                ); // Thay thế bằng URL API thực tế
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch(
                "https://localhost:44372/api/Product/create",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(dataSubmit),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to add product");
            }

            router.push("/admin/product"); // Redirect to the product list page after successful addition
        } catch (error) {
            console.error("Add product error:", error);
        }
    };
    const handleSpecChange = (
        index: number,
        key: keyof ProductSpecification,
        value: string
    ) => {
        const newSpecifications = [...productSpecifications];
        newSpecifications[index][key] = value;
        setProductSpecifications(newSpecifications);
        setDataSubmit((prev) => ({
            ...prev,
            productSpecifications: newSpecifications,
        }));
    };
    const addSpecification = () => {
        const newSpecification = {
            specValue: "",
            specType: "",
            key: Date.now(),
        };
        setProductSpecifications((prev) => [...prev, newSpecification]);
        setDataSubmit((prev) => ({
            ...prev,
            productSpecifications: [...(prev.productSpecifications || []), newSpecification],
        }));
    };
    const handleItemChange = (index: number, key: keyof ProductItem, value: any) => {
        const newItems = [...productItems];
        newItems[index][key] = value;
        setProductItems(newItems);
        setDataSubmit((prev) => ({
            ...prev,
            productItems: newItems,
        }));
    };
    const addProductItem = () => {
        const newItem: ProductItem = {
            quantity: 0,
            colorId: "",
            productImages: [],
        };
        setProductItems((prev) => [...prev, newItem]);
        setDataSubmit((prev) => ({
            ...prev,
            productItems: [...(prev.productItems || []), newItem],
        }));
    };
    return (
        <div className="container mx-auto p-4 bg-white shadow-xl rounded-xl">
            <h1 className="text-2xl font-bold pb-4">Thêm sản phẩm mới</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Product Name</label>
                    <input
                        type="text"
                        value={dataSubmit.name}
                        onChange={(e) =>
                            setDataSubmit((prev) => ({
                                ...prev,
                                name: e.target.value,
                            }))
                        }
                        className="w-1/2 p-2 border border-gray-300 rounded-lg"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Description</label>
                    <textarea
                        value={dataSubmit.description}
                        onChange={(e) =>
                            setDataSubmit((prev) => ({
                                ...prev,
                                description: e.target.value,
                            }))
                        }
                        className="w-1/2 p-2 border border-gray-300 rounded-lg"
                        required
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Quantity</label>
                    <input
                        type="number"
                        value={dataSubmit.productQuantity}
                        onChange={(e) =>
                            setDataSubmit((prev) => ({
                                ...prev,
                                productQuantity: Number(e.target.value),
                            }))
                        }
                        className="w-1/2 p-2 border border-gray-300 rounded-lg"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Price</label>
                    <input
                        type="number"
                        value={dataSubmit.price}
                        onChange={(e) =>
                            setDataSubmit((prev) => ({
                                ...prev,
                                price: Number(e.target.value),
                            }))
                        }
                        className="w-1/2 p-2 border border-gray-300 rounded-lg"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Category</label>
                    <select
                        name="cars"
                        id="cars"
                        className="w-1/2 p-2 border-2 rounded-lg"
                        onChange={(e) =>
                            setDataSubmit((prev) => ({
                                ...prev,
                                categoryId: e.target.value,
                            }))
                        }
                    >
                        {dataCate.map((item, index) => (
                            <>
                                <option value={item.id}>{item.name}</option>
                            </>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Supplier</label>
                    <select
                        name="supplier"
                        id="supplier"
                        className="w-1/2 p-2 border-2 rounded-lg"
                        onChange={(e) =>
                            setDataSubmit((prev) => ({
                                ...prev,
                                supplierId: e.target.value,
                            }))
                        }
                    >
                        {dataSup.map((item, index) => (
                            <>
                                <option value={item.id}>
                                    {item.supplierName}
                                </option>
                            </>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">
                        Specifications
                    </label>
                    {productSpecifications.map((spec, index) => (
                        <div key={spec.key} className="mb-2">
                            <input
                                type="text"
                                placeholder=" Type"
                                value={spec.specType || ""}
                                onChange={(e) =>
                                    handleSpecChange(
                                        index,
                                        "specType",
                                        e.target.value
                                    )
                                }
                                className="w-1/4 p-2 border border-gray-300 rounded-lg mb-2"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Value"
                                value={spec.specValue || ""}
                                onChange={(e) =>
                                    handleSpecChange(
                                        index,
                                        "specValue",
                                        e.target.value
                                    )
                                }
                                className="w-1/4 p-2 border border-gray-300 rounded-lg mb-2"
                                required
                            />
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addSpecification}
                        className="bg-green-500 text-white p-2 rounded-lg"
                    >
                        Add Specification
                    </button>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-xl">
                        ProductItem
                    </label>

                    {productItems.map((item, index) => (
                        <div key={index} className="mb-2">
                            <input
                                type="number"
                                placeholder="Quantity"
                                value={item.quantity || 0}
                                onChange={(e) =>
                                    handleItemChange(index, "quantity", Number(e.target.value))
                                }
                                className="w-1/5 p-2 border border-gray-300 rounded-lg mb-2"
                                required
                            />
                            <select
                                value={item.colorId || ""}
                                onChange={(e) =>
                                    handleItemChange(index, "colorId", e.target.value)
                                }
                                className="p-2 border-2 rounded-lg"
                            >
                                <option value="99fe8bab-42ab-444c-a5b8-8195ddb2ba88">Black</option>
                                <option value="8ea83fdd-ecf0-4c68-8df0-d9238e098400">Gray</option>
                                <option value="1c1a2a09-d03e-40cd-b39c-088ce1333295">White</option>
                            </select>
                            <MUploadImage/>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addProductItem}
                        className="bg-green-500 text-white p-2 rounded-lg"
                    >
                        Add ProductItem
                    </button>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded-lg"
                >
                    Them san pham
                </button>
            </form>
        </div>
    );
}
