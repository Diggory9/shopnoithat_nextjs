"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { CartModel } from "@/models/cartmodel";
import CartDrawer from "@/components/ui/CartDrawer";
import Search from "antd/es/transfer/search";
import { SearchProps } from "antd/es/input";
import CustomDropdown from "../ui/DropDownUser";

export default function HeaderHome() {
    const [datacart, setDatacart] = useState<CartModel[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [open, setOpen] = useState<boolean>(false);
    const [userName, setUserName] = useState("");
    const isLogin = useState<boolean>(false);
    const [userId, setUserId] = useState("");
    const router = useRouter();
    const { Search } = Input;
    const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
        console.log(info?.source, value);
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
            isLogin[0] = true;
        }
        if (storedName) {
            setUserName(storedName);
        }
    }, []);
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

    //console.log(datacart);

    const deleteCartItem = async (userId?: string, itemId?: string) => {
        try {
            if (isLogin[0]) {
                const response = await fetch(
                    `${process.env.API_URL}Cart/${userId}/item/${itemId}`,
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
                return response.json();
            }
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
        <nav className="flex py-5 bg-white shadow-xl border-y-2">
            <Toaster position="top-right" richColors duration={2000} />
            <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-3 w-full">
                <div className="basis-1/6 text-center font-extralight text-zinc-700">
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
                            <Search
                                placeholder="Tìm kiếm sản phẩm"
                                allowClear
                                onSearch={onSearch}
                                style={{ width: 220 }}
                            />
                        </li>
                    </ul>
                </div>
                <div className="basis-1/3 flex">
                    <ul className="flex">
                        {userName ? (
                            <li>
                                <CustomDropdown />
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
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
