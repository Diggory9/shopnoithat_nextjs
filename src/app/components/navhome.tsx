"use client";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { logout, setUserFromCookies } from "../../redux/authSlice";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { request } from "http";
import { Toaster, toast } from "sonner";

import { useRouter } from "next/navigation";
export default function NavHome() {
    const userName = Cookies.get("name");
    const email = Cookies.get("email");
    const router = useRouter();
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
                Cookies.remove("access_token");
                Cookies.remove("email");
                Cookies.remove("name");
                router.push("/")
                router.refresh();
            }
        } catch (error) {
            alert("Logout failed");
            console.error("Logout error:", error);
        }
    };

    return (
        <div>
            {/* <div className="flex py-2 text-ms justify-items-center bg-slate-200">
                <h2 className="basis-1/2 uppercase text-sm">
                    Up To 40% off best selling furniture
                </h2>
                <div className="basis-1/2 text-sm">
                    Contact for me 0123-456-789
                </div>
            </div> */}
            <div className="flex py-5 bg-white shadow-xl border-y-2">
            <Toaster position="top-right" richColors duration={2000}/>
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
                            <input placeholder="Tìm sản phẩm" type="text" className="ml-2 border rounded-xl text-sm px-2 py-0.5 bg-slate-100" /> 
                        </li>
                    </ul>
                </div>
                <div className="basis-1/4 flex">
                    <ul className="flex">
                        {userName ? (
                            <>
                                <li className="pr-6">
                                    {"Hi, " + userName}
                                    <button
                                        onClick={handerLogout}
                                        className="hover:text-red-500 pl-4 "
                                    >
                                        Đăng xuất
                                    </button>
                                </li>
                            </>
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
                    </ul>
                </div>
            </div>
        </div>
    );
}
