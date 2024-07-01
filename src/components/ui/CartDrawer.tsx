// CartDrawer.tsx
import React from "react";
import { Drawer, Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { CartModel } from "@/models/cartmodel";

type CartDrawerProps = {
    open: boolean;
    loading?: boolean;
    datacart?: CartModel[];
    userId?: string;
    setOpen: (open: boolean) => void;
    handleRemoveItem: (userId?: string, itemId?: string) => void;
    handleContinueBuyProduct: () => void;
};

const CartDrawer: React.FC<CartDrawerProps> = ({
    open,
    loading = false,
    datacart = [],
    userId = "",
    setOpen,
    handleRemoveItem,
    handleContinueBuyProduct,
}) => {
    const totalPrice = datacart.reduce((total, item) => {
        return total + item?.price! * item?.quantity!;
    }, 0);
    return (
        <Drawer
            closable
            destroyOnClose
            title={<p>Giỏ hàng</p>}
            placement="right"
            open={open}
            onClose={() => setOpen(false)}
        >
            {datacart.map((item) => (
                <div className="w-full flex" key={item.id}>
                    <div className="w-1/4">
                        <img src={item?.images?.[0]?.url} alt="" />
                    </div>
                    <div className="w-3/4 flex justify-between items-center">
                        <div>
                            <div>{item?.name}</div>
                            <div>
                                {item?.price} <span>x</span> {item?.quantity}
                            </div>
                        </div>
                        <button
                            onClick={() => handleRemoveItem(userId, item?.id)}
                        >
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    </div>
                </div>
            ))}
            <div className="flex justify-between items-center mt-4">
                <div className="text-lg font-bold">
                    Tổng cộng:{" "}
                    {totalPrice.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                    })}
                </div>
            </div>
            <div className="mt-4">
                <Button
                    type="primary"
                    style={{
                        marginBottom: 16,
                        marginRight: 34,
                    }}
                    onClick={handleContinueBuyProduct}
                >
                    Xem giỏ hàng
                </Button>
                <Button type="primary">Thanh toán</Button>
            </div>
        </Drawer>
    );
};

export default CartDrawer;
