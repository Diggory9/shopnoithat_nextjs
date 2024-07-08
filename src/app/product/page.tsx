"use client";
import ApiProduct from "@/api/product/product-api";
import { MProduct } from "@/models/productmodel";
import { useEffect, useState } from "react";
import './style.css'
import CategoryComponent from "@/components/category/category-component-list";
import CardProduct from "@/components/product/card-product";

export default function ProductComponent() {
    const [dataProduct, setDataProduct] = useState<MProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [showCategory, setShowCategory] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {

                ApiProduct.getProductPublics(1, 10)
                    .then(res => {
                        setDataProduct(res.data)
                    })
                    .catch(error => console.error(error));
                console.log("data product", dataProduct);

            } catch (error) {
                console.error("Fetch error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleOnSelectCategory = (value: string) => {
        if (value === "All") {
            try {
                ApiProduct.getProductPublics(1, 10)
                    .then(res => {
                        console.log(res)
                        setDataProduct(res.data)
                    })
                    .catch(error => console.error(error));
            } catch (error) {
                console.error("Fetch error:", error);
            } finally {
                setLoading(false);
            }
        } else {
            try {
                ApiProduct.getProductPublicByCategory(value, 1, 10)
                    .then(res => {
                        console.log(res)
                        setDataProduct(res.data)
                    })
                    .catch(error => console.error(error));
            } catch (error) {
                console.error("Fetch error:", error);
            } finally {
                setLoading(false);
            }
        }
    }

    return (
        <div className="bg-white flex flex-col sm:flex-row w-full mx-5 mt-10">
            <button
                className="sm:hidden mb-4 px-4 py-2 bg-blue-500 text-white rounded"
                onClick={() => setShowCategory(!showCategory)}
            >
                {showCategory ? "Hide Categories" : "Show Categories"}
            </button>
            <div className={`w-full ${showCategory ? "block" : "hidden"} sm:block sm:w-1/4 lg:w-1/6`}>
                <CategoryComponent
                    onSelectCategory={handleOnSelectCategory}
                    selectedCategory={selectedCategory}
                />
            </div>
            <div className={`w-full ${showCategory ? "" : "sm:w-full"} sm:w-3/4 lg:w-5/6 p-10`}>
                <div className="grid grid-cols-1 gap-x-3 gap-y-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {!dataProduct || dataProduct.length == 0 ? "Khong co du lieu" : dataProduct.map((product) => (
                        <CardProduct key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );

}
