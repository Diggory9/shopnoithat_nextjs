"use client";
import { useEffect, useState } from "react";
import { Button } from "antd";
import { CartModel } from "@/models/cartmodel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import InputQuantity from "../../product/components/inputQuantity";

const CartPage = () => {
    const [datacart, setDatacart] = useState<CartModel[]>([]);
    const [userId, setUserId] = useState("");
    const router = useRouter();
    const [quantity, setQuantity] = useState<number>(1);
    useEffect(() => {
        const cartData = localStorage.getItem("CartData");
        if (cartData) {
            setDatacart(JSON.parse(cartData));
        }
        const storedUserId = localStorage.getItem("userId");
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);

    const handleRemoveItem = async (itemId?: string) => {
        try {
            // Remove item logic here...
            const updatedCart = datacart.filter((item) => item.id !== itemId);
            localStorage.setItem("CartData", JSON.stringify(updatedCart));
            setDatacart(updatedCart);
        } catch (error) {
            console.error("Failed to remove item from cart:", error);
        }
    };

    const handleCheckout = () => {
        router.push("/checkout");
        // alert("Proceeding to checkout");
    };

    const handleContinueShopping = () => {
        router.push("/product");
    };
    const totalPrice = datacart.reduce((total, item) => {
        return total + item?.price! * item?.quantity!;
    }, 0);
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-semibold mb-4">Giỏ hàng</h1>
            {datacart.length === 0 ? (
                <p>Giỏ hàng của bạn đang trống.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                        {datacart.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center justify-between border-b py-4"
                            >
                                <img
                                    src={item?.images?.[0]?.url}
                                    alt={item?.name}
                                    className="w-24"
                                />
                                <div className="flex-1 ml-4">
                                    <h2 className="text-xl">{item.name}</h2>
                                    <p className="text-sm text-gray-500">
                                        Màu:{item?.color?.colorName}
                                    </p>

                                    <p className="text-lg text-red-500">
                                        {item?.price}
                                    </p>
                                </div>
                                <div className="pr-10">
                                    <InputQuantity
                                        className="w-full"
                                        max={item?.quantity || 99}
                                        value={item?.quantity}
                                        onClickMinus={() =>
                                            setQuantity(
                                                item?.quantity! < 2
                                                    ? 1
                                                    : item?.quantity! - 1
                                            )
                                        }
                                        onClickPlus={() =>
                                            setQuantity(
                                                item?.quantity! >
                                                    (item?.quantity!
                                                        ? item?.quantity! - 1
                                                        : 98)
                                                    ? item?.quantity!
                                                        ? item?.quantity!
                                                        : 99
                                                    : item?.quantity! + 1
                                            )
                                        }
                                        onChange={(value) => {
                                            setQuantity((value as number) || 1);
                                        }}
                                    />
                                </div>
                                <div className="flex items-center">
                                    <button
                                        onClick={() =>
                                            handleRemoveItem(item.id)
                                        }
                                        className="text-red-500"
                                    >
                                        <FontAwesomeIcon icon={faTimes} />
                                    </button>
                                </div>
                            </div>
                        ))}
                        {/* <button className="mt-4 bg-black text-white px-4 py-2">
                            CẬP NHẬT GIỎ HÀNG
                        </button> */}
                    </div>
                    <div className="bg-gray-100 p-4">
                        <h2 className="text-xl font-semibold mb-4">
                            Tóm tắt đơn hàng
                        </h2>
                        <div className="flex justify-between mb-2">
                            <span>Thành tiền</span>
                            <span>
                                {" "}
                                {totalPrice.toLocaleString("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                })}
                            </span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span>Vận chuyển</span>
                            <span>Liên hệ phí vận chuyển sau</span>
                        </div>

                        <div className="flex justify-between mb-2">
                            <input
                                type="text"
                                placeholder="Mã giảm giá"
                                className="flex border py-2 px-2 mr-2"
                            />
                        </div>
                        <div className="flex justify-between font-bold">
                            <span>Tổng cộng</span>
                            <span>
                                {" "}
                                {totalPrice.toLocaleString("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                })}
                            </span>
                        </div>
                        <Button
                            onClick={handleCheckout}
                            type="primary"
                            className="mt-4 w-full"
                        >
                            Thanh toán
                        </Button>
                    </div>
                </div>
            )}
            <Button
                onClick={handleContinueShopping}
                type="primary"
                className="mt-4"
            >
                Tiếp tục mua sắm
            </Button>
        </div>
    );
};

export default CartPage;
