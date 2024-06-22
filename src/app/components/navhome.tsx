"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { CartModel } from "@/models/cartmodel";
import CartDrawer from "./cartDrawer";

export default function NavHome() {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [userId, setUserId] = useState("");
    const router = useRouter();
    const [datacart, setDatacart] = useState<CartModel[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const cartData = localStorage.getItem("CartData");
        const storedUserId = localStorage.getItem("userId");
        const storedName = localStorage.getItem("name");
        const storedEmail = localStorage.getItem("email");

        if (cartData) {
            setDatacart(JSON.parse(cartData));
        }
        if (storedUserId) {
            setUserId(storedUserId);
        }

        if (storedEmail) {
            setEmail(storedEmail);
        }

        if (storedName) {
            setUserName(storedName);
        }
    }, []);

    const handerLogout = async () => {
        try {
            const response = await fetch(
                `https://localhost:44372/api/Account/logout?userEmail=${email}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.ok) {
                toast.success("Đăng xuất thành công");
                router.push("/");
                router.refresh();
                localStorage.clear();
                // localStorage.removeItem("access_token");
                // localStorage.removeItem("email");
                // localStorage.removeItem("name");
                // localStorage.removeItem("CartData");
                // localStorage.removeItem("userId");
            }
        } catch (error) {
            alert("Logout failed");
            console.error("Logout error:", error);
        }
    };
    // console.log(email);

    const showLoading = () => {
        setOpen(true);
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 1000);
    };
    const handleContinueBuyProduct = () => {
        router.push("/cart");
        setOpen(false);
    };

    console.log(datacart);

    const deleteCartItem = async (userId?: string, itemId?: string) => {
        try {
            const response = await fetch(
                `https://localhost:44372/api/Cart/${localStorage.getItem(
                    "userId"
                )}/item/${itemId}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${
                            localStorage.getItem("access_token") ?? ""
                        }`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to delete item");
            }
            console.log("SUCCESS");

            return response.json();
        } catch (error) {
            console.error("Error deleting item:", error);
            throw error;
        }
    };
    const handleRemoveItem = async (userId?: string, itemId?: string) => {
        try {
            await deleteCartItem(userId, itemId);
            const updatedCart = datacart.filter((item) => item.id !== itemId);
            localStorage.setItem("CartData", JSON.stringify(updatedCart));

            setDatacart(updatedCart);
        } catch (error) {
            console.error("Failed to remove item from cart:", error);
        }
    };

    return (
        <div>
            <div className="flex py-5 bg-white shadow-xl border-y-2">
                <Toaster position="top-right" richColors duration={2000} />
                <div className="basis-1/4 text-center font-extralight text-zinc-700">
                    <Link href="/">TV FURNITURE</Link>{" "}
                </div>
                <div className="basis-1/2 flex">
                    <ul className=" flex">
                        <li>
                            <Link
                                className="px-4 hover:underline font-serif uppercase font-normal text-sm hover:text-orange-400"
                                href={"/"}
                            >
                                Trang chủ
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="px-4 hover:underline font-serif uppercase font-normal text-sm hover:text-orange-400"
                                href={"/product"}
                            >
                                Sản phẩm
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="px-4 hover:underline font-serif uppercase font-normal text-sm hover:text-orange-400"
                                href={""}
                            >
                                Bộ sưu tập
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="px-4 hover:underline font-serif uppercase font-normal text-sm hover:text-orange-400"
                                href={""}
                            >
                                Liên hệ
                            </Link>
                        </li>
                        <li>
                            <input
                                placeholder="Tìm sản phẩm"
                                type="text"
                                className="ml-2 border rounded-xl text-sm px-2 py-0.5 bg-slate-100"
                            />
                        </li>
                    </ul>
                </div>
                <div className="basis-1/4 flex">
                    <ul className="flex">
                        {userName ? (
                            <li className="pr-6">
                                {"Hi, " + userName}
                                <button
                                    onClick={handerLogout}
                                    className="hover:text-red-500 pl-4 "
                                >
                                    Đăng xuất
                                </button>
                            </li>
                        ) : (
                            <>
                                <li className="pr-6">
                                    <Link
                                        href="/login"
                                        className="hover:text-red-500 "
                                    >
                                        Đăng nhập
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/register"
                                        className="hover:text-red-500"
                                    >
                                        Đăng ký
                                    </Link>
                                </li>
                            </>
                        )}
                        <li className="pl-3">
                            <Button onClick={showLoading}>
                                <ShoppingCartOutlined
                                    style={{
                                        fontSize: "24px",
                                    }}
                                />
                            </Button>
                            <CartDrawer
                                open={open}
                                loading={loading}
                                datacart={datacart}
                                userId={userId}
                                setOpen={setOpen}
                                handleRemoveItem={handleRemoveItem}
                                handleContinueBuyProduct={
                                    handleContinueBuyProduct
                                }
                            ></CartDrawer>
                            {/* <Drawer
                                closable
                                destroyOnClose
                                title={<p>Giỏ hàng</p>}
                                placement="right"
                                open={open}
                                loading={loading}
                                onClose={() => setOpen(false)}
                            >
                                {datacart?.map((item) => (
                                    <div className="w-full flex">
                                        <div className="w-1/4">
                                            <img
                                                src={item?.images?.[0]?.url}
                                                alt=""
                                            />
                                        </div>
                                        <div className="w-3/4 flex justify-between items-center">
                                            <div>
                                                <div>{item?.name}</div>
                                                <div>
                                                    {item?.price} <span>x</span>{" "}
                                                    {item?.quantity}
                                                </div>
                                            </div>
                                            <button
                                                onClick={() =>
                                                    handleRemoveItem(
                                                        userId,
                                                        item.id
                                                    )
                                                }
                                            >
                                                <FontAwesomeIcon
                                                    icon={faTimes}
                                                />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <div className="flex justify-between items-center mt-4">
                                    <div className="text-lg font-bold">
                                        Tổng cộng: 11đ
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
                                    <Button
                                        type="primary"
                                        // onClick={handleCheckout}
                                    >
                                        Thanh toán
                                    </Button>
                                </div>
                            </Drawer> */}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
