"use client";
import ImageGalleryComponent from "@/components/ui/ImageGalleryComponent";
import { MProduct } from "@/models/productmodel";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { customMoney } from "@/utils/config";
import { Button } from "antd";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import InputQuantity from "./inputQuantity";
import ProductTabs from "./tabprop";

export const DetailProduct = ({ data }: { data: any }) => {
    const dispatch = useAppDispatch();
    const pathname = usePathname();
    console.log(pathname);

    const [product, setProduct] = useState<MProduct | null>(null);
    const [productItemId, setProductItemId] = useState(data.productItems[0].id);
    const [quantity, setQuantity] = useState<number>(1);
    const router = useRouter();
    const cart = useAppSelector((state) => state.cart);
    const auth = useAppSelector((state) => state.auth);
    useEffect(() => {
        const productBeforeItemSelected = updateProductItemSelected(
            data,
            productItemId
        );
        setProduct(productBeforeItemSelected!);
    }, [data]);

    const updateProductItemSelected = (
        product: MProduct,
        productItemId: string
    ) => {
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
    };
    const handleOnClickChangeColor = (productItemId?: string) => () => {
        if (!productItemId || !product) return;
        const productBeforeItemSelected = updateProductItemSelected(
            product,
            productItemId
        );
        setProduct(productBeforeItemSelected!);
        setProductItemId(productItemId!);
        console.log(productItemId);
    };

    const handleAddToCart = () => {
        if (!product) return;
        if (!auth.isLogin) {
            toast.error("Bạn cần đăng nhập");
            router.push(`/login?callbackUrl=${pathname}`);
        } else {
            try {
                let payload = {
                    userId: auth.data?.id || "",
                    productItem: productItemId,
                    quantity: quantity,
                };
                console.log(payload);
                dispatch(addToCart(payload));
                handleNotificationAddCart;
            } catch (error) {
                toast.error(
                    "Thêm vào giỏ hàng thất bại xin thử lại sau ít phút"
                );
            }
        }
    };

    const handleNotificationAddCart = () => {
        if (cart?.status === "succeeded") {
            toast.success("Thêm sản phẩm và giỏ hàng thành công");
        } else if (cart.status === "failed" && cart.error) {
            toast.error(
                "Thêm sản phẩm vào giỏ hàng không thanh công xin thử lại sau ít phút"
            );
        }
    };
    const calculateDiscountedPrice = (
        price: number,
        discount: number
    ): number => {
        return price - (price * discount) / 100;
    };
    console.log(product);

    return (
        <div className="bg-white">
            <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="lg:flex lg:items-center lg:justify-between">
                    <div className="lg:w-1/2">
                        {product &&
                        product.productItems &&
                        product.productItems.length > 0 ? (
                            <>
                                <ImageGalleryComponent product={product} />
                            </>
                        ) : (
                            <div></div>
                        )}
                    </div>
                    {/* left info */}
                    <div className="mt-10 lg:mt-0 lg:w-1/2 lg:pl-10 ">
                        <h1 className="text-3xl text-gray-900 font-serif border-b">
                            {product && product?.name}
                        </h1>
                        {product?.productDiscount?.id ? (
                            <div className="mt-4 ">
                                <span className="text-red-500 text-xl">
                                    {customMoney(
                                        calculateDiscountedPrice(
                                            product?.price || 0,
                                            product?.productDiscount?.value || 0
                                        )
                                    )}
                                </span>
                                <span className="line-through mr-2 ml-4 text-stone-950 text-lg">
                                    {customMoney(product?.price)}
                                </span>
                            </div>
                        ) : (
                            <p className="mt-4 text-xl text-red-500 border-b">
                                {customMoney(product?.price)}
                            </p>
                        )}

                        <div className="mt-4 text-xl text-gray-900 border-b flex items-center">
                            Màu sắc: &nbsp;
                            {product?.productItems?.map((item) => (
                                <div className="ml-3" key={item.id}>
                                    <Button
                                        onClick={handleOnClickChangeColor(
                                            item?.id
                                        )}
                                        className="m-1"
                                        style={{
                                            backgroundColor:
                                                item.color?.colorCode ||
                                                "#ffffff",
                                        }}
                                    ></Button>
                                    <div className="text-sm font-extralight">
                                        {item.color?.colorName}
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* product specification */}

                        {product &&
                            product?.productSpecifications &&
                            product?.productSpecifications.length > 0 &&
                            product.productSpecifications.map(
                                (specification) => {
                                    return (
                                        <div
                                            className="mt-4 text-xl text-gray-900 border-b pb-2"
                                            key={specification.id}
                                        >
                                            {specification.specType} &nbsp;
                                            <span className="text-base border p-1">
                                                {specification.specValue}
                                            </span>
                                        </div>
                                    );
                                }
                            )}
                        <div className="mt-4 text-black text-lg">
                            Danh mục: {product && product.category.name}
                        </div>
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
                    </div>
                </div>
                <div className="flex ">
                    <div className="w-1/2 lg:flex lg:items-center lg:justify-between">
                        <ProductTabs
                            des={product?.description}
                            id={product?.id}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
