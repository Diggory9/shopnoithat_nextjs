"use client";
import { MProduct } from "@/models/productmodel";
import { useEffect, useState } from "react";
import { Button } from "antd";
import ProductTabs from "../components/tabprop";
import { customMoney } from "@/utils/config";
import InputQuantity from "../components/inputQuantity";
import { toast } from "sonner";
import Product from "@/app/admin/product/page";
import ImageGalleryComponent from "@/components/ui/ImageGalleryComponent";
import ApiProduct from "@/api/product/product-api";
export default function ProductDetail({ params }: { params: { id: string } }) {
    const [product, setProduct] = useState<MProduct | null>(null);
    const [productItemId, setProductItemId] = useState("");
    const [quantity, setQuantity] = useState<number>(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                ApiProduct.getDetailProducts(params.id)
                    .then(res => {
                        console.log(res)
                        setProductItemId(res.data.productItems[0].id)
                        const productBeforeItemSelected = updateProductItemSelected(res.data, res.data.productItems[0].id);
                        setProduct(productBeforeItemSelected!);
                    }).catch(errors => console.log(errors));
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };
        fetchData();
    }, [params.id]);

    const updateProductItemSelected = (product: MProduct, productItemId: string) => {
        if (!productItemId || !product) return;

        // Tìm productItem trong product với productItemId
        const updatedProductItems = product.productItems?.map((item) =>
            item.id === productItemId
                ? { ...item, selected: true }
                : { ...item, selected: false }
        );
        return {
            ...product,
            productItems: updatedProductItems,
        };
    }
    const handleOnClickChangeColor = (productItemId?: string) => () => {

        if (!productItemId || !product) return;
        const productBeforeItemSelected = updateProductItemSelected(product, productItemId);
        setProduct(productBeforeItemSelected!);
        setProductItemId(productItemId!);
        console.log(productItemId);
    };

    const handleAddToCart = async () => {
        if (!product) return;

        try {
            const response = await fetch(
                `${process.env.API_URL}Cart/add-to-cart`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("access_token") ?? ""
                            }`,
                    },
                    body: JSON.stringify({
                        userId: localStorage.getItem("userId") ?? "",
                        productItemId: productItemId,
                        quantity: quantity,
                    }),
                }
            );

            if (response.ok) {
                toast.success("Thêm vào giỏ hàng thành công!");
                try {
                    const response11 = await fetch(
                        `${process.env.API_URL}Cart/get-cart/${localStorage.getItem("userId") ?? ""
                        }`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${localStorage.getItem("access_token") ?? ""
                                    }`,
                            },
                        }
                    );

                    if (response11.ok) {
                        //toast.success("Success ");
                    } else {
                        toast.error("Fail");
                    }
                    const result = await response11.json();
                    localStorage.setItem(
                        "CartData",
                        JSON.stringify(result.data)
                    );
                    //console.log(result);
                } catch (error) {
                    console.error("Error during fetch:", error);
                    toast.error("Bạn cần đăng nhập");
                }
            } else {
                toast.error("Thêm vào giỏ hàng thất bại. Vui lòng thử lại!");
            }
        } catch (error) {
            console.error("Error during fetch:", error);
            toast.error("Bạn cần đăng nhập");
        }
    };
    const selectedProductItem = product?.productItems?.find((item) => item.selected);
    return (
        <div className="bg-white">
            <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="lg:flex lg:items-center lg:justify-between">
                    <div className="lg:w-1/2">
                        {
                            product &&
                                product.productItems &&
                                product.productItems.length > 0 ?
                                <>
                                    <ImageGalleryComponent product={product} />

                                </> : <div>

                                </div>
                        }

                    </div>
                    <div className="mt-10 lg:mt-0 lg:w-1/2 lg:pl-10 ">
                        <h1 className="text-3xl text-gray-900 font-serif border-b">
                            {product && product?.name}
                        </h1>
                        <p className="mt-4 text-xl text-red-500 border-b">
                            {customMoney(product && product?.price)}
                        </p>
                        <p className="mt-4 text-xl text-gray-900 border-b flex items-center">
                            Màu sắc: &nbsp;
                            {product?.productItems?.map((item) => (
                                <div className="ml-3" key={item.id}>
                                    <Button
                                        onClick={handleOnClickChangeColor(item?.id)}

                                        className="m-1"
                                        style={{
                                            backgroundColor:
                                                item.color?.colorCode || "#ffffff",
                                        }}
                                    >
                                    </Button>
                                    <div className="text-sm font-extralight">
                                        {
                                            item.color?.colorName
                                        }
                                    </div>
                                </div>

                            ))}
                        </p>
                        {/* product specification */}

                        {
                            product &&
                            product?.productSpecifications &&
                            product?.productSpecifications.length > 0 && (
                                product.productSpecifications.map(specification => {
                                    return (
                                        <div className="mt-4 text-xl text-gray-900 border-b pb-2" key={specification.id}>
                                            {specification.specType} &nbsp;
                                            <span className="text-base border p-1">
                                                {specification.specValue}
                                            </span>
                                        </div>
                                    )
                                }
                                )

                            )
                        }
                        <p className="mt-4 text-black text-lg">
                            Danh mục: {product && product.category.name}
                        </p>
                        <div className="pt-4">
                            <div className="flex gap-4">
                                <div className="w-[120px]">
                                    <InputQuantity
                                        className="w-full"
                                        max={product?.productQuantity || 99}
                                        value={quantity}
                                        onClickMinus={() =>
                                            setQuantity(
                                                quantity < 2 ? 1 : quantity - 1
                                            )
                                        }
                                        onClickPlus={() =>
                                            setQuantity(
                                                quantity >
                                                    (product?.productQuantity
                                                        ? product?.productQuantity -
                                                        1
                                                        : 98)
                                                    ? product?.productQuantity
                                                        ? product?.productQuantity
                                                        : 99
                                                    : quantity + 1
                                            )
                                        }
                                        onChange={(value) => {
                                            setQuantity((value as number) || 1);
                                        }}
                                    />
                                </div>
                                <div className=" text-center">
                                    {product && (
                                        <p>{`Còn: ${product?.productQuantity} sản phẩm`}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <button className="mt-6 bg-black text-white px-4 py-2 uppercase">
                            Mua ngay
                        </button>
                        <button
                            onClick={handleAddToCart}
                            className="mt-6 ml-5 bg-white text-black px-4 py-2 uppercase hover:bg-blue-300 border-2"
                        >
                            Thêm vào giỏ
                        </button>
                        <div dangerouslySetInnerHTML={{ __html: "" }}></div>

                    </div>


                </div>
                <div className="flex justify-end">
                    <div className="w-1/2"></div>
                    <div className="w-1/2 lg:flex lg:items-center lg:justify-between">
                        <ProductTabs des={product?.description} />

                    </div>
                </div>
            </div>
        </div>
    );
}
