"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
export default function NavHome() {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const currentUser = useSelector(
        (state: RootState) => state.auth.login.currentUser
    );
    // const [hasMounted, setHasMounted] = useState(false)
    useEffect(() => {
        // setHasMounted(true);
        // Kiểm tra sự tồn tại của access token
        const token = Cookies.get("access_token");
        setIsLoggedIn(!!token);
    }, []);
    // if (!hasMounted) {
    //     // Tránh render phía server bằng cách trả về null cho đến khi component được mount
    //     return null;
    // }
    const handleLogout = () => {
        // Xóa access token khỏi cookies
        Cookies.remove("access_token");
        setIsLoggedIn(false);
        // Điều hướng người dùng về trang login hoặc trang chủ
        router.push("/");
    };

    return (
        <div>
            <div className="flex py-2 text-ms justify-items-center bg-slate-200">
                <h2 className="basis-1/2 uppercase text-sm">
                    Up To 40% off best selling furniture
                </h2>
                <div className="basis-1/2 text-sm">
                    Contact for me 0123-456-789
                </div>
            </div>
            <div className="flex py-5 bg-white shadow-xl border-y-2">
                <div className="basis-1/3 text-center">TV FURNITURE</div>
                <div className="basis-1/2 flex">
                    <ul className=" flex">
                        <li>
                            <Link className="px-4 hover:underline" href={"/"}>
                                Trang chủ
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="px-4 hover:underline"
                                href={"/product"}
                            >
                                Sản phẩm
                            </Link>
                        </li>
                        <li>
                            <Link className="px-4 hover:underline" href={""}>
                                Về chúng tôi
                            </Link>
                        </li>
                        <li>
                            <Link className="px-4 hover:underline" href={""}>
                                Liên hệ
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="basis-1/4 flex">
                    {currentUser ? (
                        <>
                            <Link href="/profile" className="mr-4">
                                <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                                    Quản lý thông tin
                                </button>
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="flex items-center bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                            >
                                Đăng xuất
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    width="20"
                                    height="20"
                                    fill="gray"
                                    className="ml-2"
                                >
                                    <path d="M12 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 12c-3.313 0-10 1.688-10 5v3h20v-3c0-3.313-6.687-5-10-5z" />
                                </svg>
                            </button>
                        </>
                    ) : (
                        <Link href="/login" className="flex">
                            <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                                Đăng nhập
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
