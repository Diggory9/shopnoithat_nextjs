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

export default function HeaderHome() {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [userId, setUserId] = useState("");
    const router = useRouter();
    const [datacart, setDatacart] = useState<CartModel[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const isLogin = useState<boolean>(false);
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
                `${process.env.API_URL}Account/logout?userEmail=${email}`,
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
            }
        } catch (error) {
            alert("Logout failed");
            console.error("Logout error:", error);
        }
    };
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
                <div className="basis-1/4 text-center font-extralight text-zinc-700">
                    <Link href="/">TV FURNITURE</Link>{" "}
                </div>
                <button
                    data-collapse-toggle="navbar-default"
                    type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-controls="navbar-default"
                    aria-expanded="false"
                >
                    <span className="sr-only">Open main menu</span>
                    <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 17 14"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 1h15M1 7h15M1 13h15"
                        />
                    </svg>
                </button>

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
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
