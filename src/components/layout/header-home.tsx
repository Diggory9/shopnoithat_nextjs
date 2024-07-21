"use client";
import Link from "next/link";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Search from "antd/es/input/Search";
import { toast, Toaster } from "sonner";

import { Badge, Button } from "antd";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import CustomDropdown from "../ui/DropDownUser";
import { getCart, resetCart } from "@/redux/features/cart/cartSlice";
import CartDrawer from "../ui/CartDrawer";

export default function Header() {
    const router = useRouter();
    const [open, setOpen] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const auth = useAppSelector((state) => state.authCredentials);
    const cart = useAppSelector((state) => state.cartCredentials);

    useEffect(() => {
        if (auth.isLogin && cart?.status === "idle") {
            dispatch(getCart({ userId: auth.data?.id || "" }));
        } else if (auth && auth.isLogin === false) {
            dispatch(resetCart());
        }
    }, [auth.isLogin, auth.data?.id, cart?.status, dispatch]);

    // const handerLogout = async () => {
    //     if (auth.isLogin) {
    //         const logoutParams = {
    //             email: auth?.data?.email || "",
    //         };
    //         dispatch(logout(logoutParams));

    //         signOut(); // Gọi hàm signOut từ hook useGoogleLogout
    //         dispatch(resetCart());
    //         toast.success("Đăng xuất thành công!");
    //     } else {
    //         toast.error("Logout failed");
    //     }
    // };

    const showLoading = () => {
        if (!auth.isLogin) {
            router.push(`/login`);
            return;
        }
        setOpen(true);
    };
    const onSearch = async (value: string) => {
        router.push(`/search?query=${value}&offset=1&limit=10`);
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
                                style={{ width: 220 }}
                                onSearch={onSearch}
                            />
                        </li>
                    </ul>
                </div>

                <div className="basis-1/4 flex">
                    <ul className="flex">
                        {auth?.isLogin ? (
                            <li className="pr-6">
                                <CustomDropdown></CustomDropdown>
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
                            <Badge
                                count={cart?.data?.length || 0}
                                style={{
                                    display:
                                        !cart || cart?.data?.length === 0
                                            ? "none"
                                            : "block",
                                }}
                            >
                                <Button onClick={showLoading}>
                                    <ShoppingCartOutlined
                                        style={{
                                            fontSize: "24px",
                                        }}
                                    />
                                </Button>
                            </Badge>

                            <CartDrawer
                                open={open}
                                loading={cart?.status === "loading"}
                                setOpen={setOpen}
                            />
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
