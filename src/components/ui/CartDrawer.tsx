// CartDrawer.tsx
import React, { useEffect, useState } from "react";
import { Drawer, Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { deleteProductFromCart } from "@/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Link from "next/link";
type CartDrawerProps = {
    open: boolean;
    loading?: boolean;
    userId?: string;
    setOpen: (open: boolean) => void;
};

const CartDrawer: React.FC<CartDrawerProps> = ({
    open,
    loading = false,
    setOpen,
}) => {

    const cart = useAppSelector((state) => state.cart);
    const auth = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    console.log(cart);

    const totalPriceCart = () => {
        return cart?.data?.reduce((total, item) => {
            return total + item?.price! * item?.quantity!;
        }, 0);
    }
    const handleRemoveItem = (id: string) => {
        if (cart?.data) {
            dispatch(deleteProductFromCart({ userId: auth.data?.id || "", productItemId: id }));
        }
    }


    return (
        <Drawer
            closable
            destroyOnClose
            title={<p>Giỏ hàng</p>}
            placement="right"
            open={open}
            onClose={() => setOpen(false)}
        >
            <div>
                {
                    (!cart?.data || cart.data.length === 0 ?

                        <div>không có sản phẩm</div> :
                        <>
                            {

                                (cart?.data.map((item) => (
                                    <div className="w-full flex" key={item.id}>
                                        <div className="w-1/4">
                                            <img src={item?.image?.url} alt="" />
                                        </div>
                                        <div className="w-3/4 flex justify-between items-center">
                                            <div>
                                                <div>{item?.name}</div>
                                                <div>
                                                    {item?.price} <span>x</span> {item?.quantity}
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => handleRemoveItem(item?.id || "")}
                                            >
                                                <FontAwesomeIcon icon={faTimes} />
                                            </button>
                                        </div>
                                    </div>
                                )))
                            }



                            <div className="flex justify-between items-center mt-4">
                                <div className="text-lg font-bold">
                                    Tổng cộng:{" "}
                                    {totalPriceCart()?.toLocaleString("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                    })}
                                </div>
                            </div>
                            <div className="mt-4">
                                <Link href={"/cart"}>
                                    <Button
                                        type="primary"
                                        style={{
                                            marginBottom: 16,
                                            marginRight: 34,
                                        }}
                                    >
                                        Xem giỏ hàng
                                    </Button>
                                </Link>
                                <Button type="primary">Thanh toán</Button>
                            </div>
                        </>
                    )
                }
            </div>


        </Drawer>
    );
};

export default CartDrawer;
