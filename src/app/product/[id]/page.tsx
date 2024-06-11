"use client";
import { useEffect, useState } from "react";
interface ProductImages {
    url: string;
}

interface ProductItem {
    productImages: ProductImages[];
}
interface Product {
    id: string;
    name: string;
    description: string;
    productQuantity: number;
    productBrand: string;
    price: number;
    productImages: ProductImages[];
    productItems: ProductItem[];
    productSpecifications:ProductSpecifications[];
}
interface ProductSpecifications{
    id:string;
    specValue:string;
    specType:string;
}
export default function EditProduct({ params }: { params: { id: string } }) {
    const [dataProduct, setDataProduct] = useState<Product[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const respone = await fetch(
                    `https://localhost:44372/api/Product/${params.id}`,
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
                setDataProduct(result.data);
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };
        fetchData();
    }, []);
    console.log(params);
    return (
        <div className="bg-white">
            <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="lg:flex lg:items-center lg:justify-between">
                    <div className="lg:w-1/2">
                        <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg bg-gray-200">
                            {dataProduct.productItems &&
                                dataProduct.productItems.length > 0 &&
                                dataProduct.productItems[0].productImages &&
                                dataProduct.productItems[0].productImages
                                    .length > 0 && (
                                    <img
                                        src={
                                            dataProduct.productItems[0]
                                                .productImages[0].url
                                        }
                                        alt={dataProduct.name}
                                        className="h-full w-full object-cover object-center"
                                    />
                                )}
                        </div>
                    </div>
                    <div className="mt-10 lg:mt-0 lg:w-1/2 lg:pl-10">
                        <h1 className="text-3xl text-gray-900 font-serif">
                            {dataProduct.name}
                        </h1>
                        <p className="mt-4 text-xl text-gray-900">
                            ${dataProduct.price}
                        </p>
                        <p className="mt-4 text-gray-600">
                            {dataProduct.description}
                        </p>
                        <p className="mt-4 text-black font-bold text-xl">
                            Vật liệu {dataProduct.categoryId}
                        </p>
                        <p className="mt-4 text-black font-bold text-xl">
                            Kích thước
                        </p>
                        <p className="mt-4 text-black text-lg">
                            Danh mục: {dataProduct.categoryId}
                        </p>
                        <button className="mt-6 bg-black text-white px-4 py-2 uppercase">
                            Mua ngay
                        </button>
                        <button className="mt-6 ml-5 bg-white text-black px-4 py-2 uppercase hover:bg-slate-300 border-2">
                            Thêm vào giỏ
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
