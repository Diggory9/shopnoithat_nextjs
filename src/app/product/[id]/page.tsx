"use client";
import { MProduct } from "@/models/productmodel";
import { useEffect, useState } from "react";
import { Button } from "antd";
import ProductTabs from "../components/tabprop";
import { customMoney } from "@/utils/config";
import InputQuantity from "../components/inputQuantity";
import { toast } from "sonner";
export default function ProductDetail({ params }: { params: { id: string } }) {
    const [product, setProduct] = useState<MProduct | null>(null);
    const [productItemId, setProductItemId] = useState("");
    const [quantity, setQuantity] = useState<number>(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const respone = await fetch(
                    `${process.env.API_URL}Product/${params.id}`,
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
                setProduct(result.data);
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };
        fetchData();
    }, [params.id]);

    const handleOnClick = (productItemId?: string) => () => {
        if (!productItemId || !product) return;

        // Tìm productItem trong product với productItemId
        const updatedProductItems = product.productItems?.map((item) =>
            item.id === productItemId
                ? { ...item, selected: true }
                : { ...item, selected: false }
        );

        // Cập nhật product với productItems đã được chọn
        setProduct((prevProduct) => ({
            ...prevProduct,
            productItems: updatedProductItems,
        }));
        setProductItemId(productItemId);
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
                        Authorization: `Bearer ${
                            localStorage.getItem("access_token") ?? ""
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
                        `${process.env.API_URL}Cart/get-cart/${
                            localStorage.getItem("userId") ?? ""
                        }`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${
                                    localStorage.getItem("access_token") ?? ""
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

    // console.log("Số lượng:" + quantity);
    // console.log("UserID:" + userId1);
    // console.log("ProducItem:" + productItemId);

    return (
        <div className="bg-white">
            <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="lg:flex lg:items-center lg:justify-between">
                    <div className="lg:w-1/2">
                        <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg bg-gray-200">
                            {product &&
                                product.productItems &&
                                product.productItems.length > 0 && (
                                    <img
                                        src={
                                            product?.productItems?.find(
                                                (item) => item.selected
                                            )?.productImages?.[0]?.url ||
                                            product?.productItems?.[0]
                                                ?.productImages?.[0]?.url
                                        }
                                        alt={product.name}
                                        className="h-full w-full object-cover object-center"
                                    />
                                )}
                        </div>
                    </div>
                    <div className="mt-10 lg:mt-0 lg:w-1/2 lg:pl-10 ">
                        <h1 className="text-3xl text-gray-900 font-serif border-b">
                            {product && product?.name}
                        </h1>
                        <p className="mt-4 text-xl text-red-500 border-b">
                            {customMoney(product && product?.price)}
                        </p>
                        <p className="mt-4 text-xl text-gray-900 border-b ">
                            Màu sắc:
                            {product?.productItems?.map((item) => (
                                <Button
                                    onClick={handleOnClick(item?.id)}
                                    key={item?.id}
                                    className="m-1"
                                    style={{
                                        backgroundColor:
                                            item.color?.colorCode || "#ffffff",
                                    }}
                                ></Button>
                            ))}
                        </p>
                        {/* <p className="mt-4 text-xl text-gray-900 border-b ">
                            Số lượng:{" "}
                            <span>
                                {product &&
                                    product?.productItems &&
                                    product?.productItems?.length > 0 &&
                                    product?.productItems[0]?.quantity}
                            </span>
                        </p> */}
                        <p className="mt-4 text-xl text-gray-900 border-b pb-2   ">
                            Kích thước:{" "}
                            <span className="text-base  border p-1">
                                {" "}
                                {product &&
                                    product?.productSpecifications &&
                                    product?.productSpecifications[0]
                                        ?.specValue}
                            </span>
                        </p>
                        <p className="mt-4 text-xl text-gray-900 border-b pb-2 ">
                            Vật liệu:{" "}
                            <span className="text-base border p-1">
                                {" "}
                                {product &&
                                    product?.productSpecifications &&
                                    product?.productSpecifications[1]
                                        ?.specValue}
                            </span>
                        </p>

                        <p className="mt-4 text-black text-lg">
                            Danh mục: {product && product.categoryName}
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
                <div className="lg:flex lg:items-center lg:justify-between">
                    <ProductTabs des={product?.description} />
                    <div className="w-[55%]"></div>
                    <div className="w-[45%] h-80"></div>
                </div>
            </div>
        </div>
    );
}
