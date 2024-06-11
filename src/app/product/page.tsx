"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
interface ProductImages {
    url: string;
}

interface ProductItem {
    productImages: ProductImages[];
}
interface Product {
    id:string;
    name: string;
    description: string;
    productQuantity: number;
    productBrand: string;
    price: number;
    productImages: ProductImages[];
    productItems: ProductItem[];
}

export default function Product() {
    const [dataProduct, setDataProduct] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const respone = await fetch(
                    "https://localhost:44372/api/Product/list?pageNumber=1&pageSize=10",
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
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-serif text-gray-900 pb-8 uppercase">
                   Sản phẩm mới
                </h2>
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 border-y-2">
                    {dataProduct.map((item) => (
                        <a
                            key={item.productQuantity}
                            href={`/product/${item.id}`}
                            className="group"
                        >
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                                {item.productItems &&
                                    item.productItems.length > 0 &&
                                    item.productItems.map(
                                        (item1, i) =>
                                            item1.productImages &&
                                            item1.productImages.length > 0 &&
                                            item1.productImages.map(
                                                (item2, j) => (
                                                    <img
                                                        src={item2.url}
                                                        alt={item2.url}
                                                        className="h-full w-full object-cover object-center group-hover:opacity-75"
                                                    />
                                                )
                                            )
                                    )}
                            </div>
                            <h3 className="mt-4 text-black text-2xl">
                                {item.name}
                            </h3>
                            <p className="mt-1 text-lg text-orange-300 font-serif">
                                ${item.price}
                            </p>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
