"use client";
import { MCategory } from "@/models/categorymodel";
import { MProduct } from "@/models/productmodel";
import { useEffect, useState } from "react";
export default function Product() {
    const [dataProduct, setDataProduct] = useState<MProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [dataCategories, setDataCategories] = useState<MCategory[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const respone = await fetch(
                    `${process.env.API_URL}Product/list?pageNumber=1&pageSize=10`,
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
    useEffect(() => {
        const fetchDataCate = async () => {
            try {
                const respone = await fetch(
                    `${process.env.API_URL}Category/list`,
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
                setDataCategories(result.data);
            } catch (error) {
                console.error("Fetch error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDataCate();
    }, []);
    const filteredProducts =
        selectedCategory === "All"
            ? dataProduct
            : dataProduct.filter(
                  (product) => product.categoryName === selectedCategory
              );

    return (
        <div className="bg-white">
            <div className=" flex mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <div className="w-1/5 pr-4">
                    <h2 className="text-xl font-serif text-gray-900 pb-4 uppercase">
                        Danh mục
                    </h2>
                    <ul className="space-y-3">
                        <li>
                            <button
                                onClick={() => setSelectedCategory("All")}
                                className={`text-left w-full p-2 rounded ${
                                    selectedCategory === "All"
                                        ? "bg-gray-200"
                                        : "bg-white"
                                } hover:bg-gray-100`}
                            >
                                Tất cả sản phẩm
                            </button>
                        </li>
                        {dataCategories.map((item) => (
                            <li key={item.id}>
                                <button
                                    onClick={() =>
                                        setSelectedCategory(item.name)
                                    }
                                    className={`text-left w-full p-2 rounded ${
                                        selectedCategory === item.name
                                            ? "bg-gray-200"
                                            : "bg-white"
                                    } hover:bg-gray-100`}
                                >
                                    {item.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="w-3/4">
                    {/* <h2 className="text-2xl font-serif text-gray-900 pb-8 uppercase">
                        Sản phẩm mới
                    </h2> */}
                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 border-y-2">
                        {filteredProducts.map((item) => (
                            <a
                                key={item.id}
                                href={`/product/${item.id}`}
                                className="group"
                            >
                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                                    {item &&
                                        item.productItems &&
                                        item.productItems.length > 0 && (
                                            <img
                                                src={
                                                    item?.productItems?.find(
                                                        (item1) =>
                                                            item1.selected
                                                    )?.productImages?.[0]
                                                        ?.url ||
                                                    item?.productItems?.[0]
                                                        ?.productImages?.[0]
                                                        ?.url
                                                }
                                                alt={item.name}
                                                className="h-full w-full object-cover object-center"
                                            />
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
        </div>
    );
}
