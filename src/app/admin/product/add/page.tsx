"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
interface ProductImages {
    url: string;
}

interface ProductItem {
    productImages: ProductImages[];
}
interface Product {
    name: string;
    description: string;
    productQuantity: number;
    productBrand: string;
    price: number;
    productImages: ProductImages[];
    productItems: ProductItem[];
}
interface Category {
    id: string;
    name: string;
    categoryParent: string;
    description: string;
}
export default function AddProduct() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [productQuantity, setProductQuantity] = useState(0);
    const [productBrand, setProductBrand] = useState("");

    const [price, setPrice] = useState(0);
    const [imageUrls, setImageUrls] = useState<string[]>([""]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [dataCate, setDataCate] = useState<Category[]>([]);
    const [nameCate, setNameCate] = useState("");
    useEffect(() => {
        const fetchData = async () => {
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
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    
    const handleImageChange = (index: number, url: string) => {
        const newImageUrls = [...imageUrls];
        newImageUrls[index] = url;
        setImageUrls(newImageUrls);
    };

    const handleAddImage = () => {
        setImageUrls([...imageUrls, ""]);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const productData = {
            name,
            description,
            productQuantity,
            productBrand,
            price,
            productItems: [
                {
                    productImages: imageUrls.map((url) => ({ url })),
                },
            ],
        };

        try {
            const response = await fetch(
                "https://localhost:44372/api/Product/add",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(productData),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to add product");
            }

            router.push("/admin/product"); // Redirect to the product list page after successful addition
        } catch (error) {
            console.error("Add product error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4 bg-white shadow-xl rounded-xl">
            <h1 className="text-2xl font-bold pb-4">Thêm sản phẩm mới</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Product Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-1/2 p-2 border border-gray-300 rounded-lg"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-1/2 p-2 border border-gray-300 rounded-lg"
                        required
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Quantity</label>
                    <input
                        type="number"
                        value={productQuantity}
                        onChange={(e) =>
                            setProductQuantity(Number(e.target.value))
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
                        onChange={(e) => setNameCate(e.target.value)}
                    >
                        {dataCate.map((item, index) => (
                            <>
                                <option value={item.id}>{item.name}</option>
                            </>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                <label className="block text-gray-700">Price</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        className="w-1/2 p-2 border border-gray-300 rounded-lg"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Images</label>
                    {imageUrls.map((url, index) => (
                        <div key={index} className="flex mb-2">
                            <input
                                type="text"
                                value={url}
                                onChange={(e) =>
                                    handleImageChange(index, e.target.value)
                                }
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                placeholder="Image URL"
                                required
                            />
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={handleAddImage}
                        className="text-blue-500 hover:underline"
                    >
                        Add another image
                    </button>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded-lg"
                    disabled={loading}
                >
                    {loading ? "Adding..." : "Add Product"}
                </button>
            </form>
        </div>
    );
}
