"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';
import { Toaster, toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { loginFailed, loginStart, loginSuccess } from "../redux/authSlice";
import { RootState } from "../redux/store";
export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const dispatch = useDispatch();
    const { isFetching, error } = useSelector((state:RootState) => state.auth.login);
    const handleSubmit = async (event: { preventDefault: () => void }) => {
        event.preventDefault(); // Ngăn chặn hành vi mặc định của form
        dispatch(loginStart());
        try {
            const response = await fetch(
                "https://localhost:44372/api/Account/authenticate",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password }),
                }
            );

            const data = await response.json();

            if (response.ok) {
                // Đăng nhập thành công, chuyển hướng hoặc xử lý tiếp
                dispatch(loginSuccess(data));
                toast.success("Đăng nhập thành công");
                // console.log(data.data.jwToken);
                Cookies.set('access_token', data.data.jwToken, { expires: 7 }); 
                // console.log("Đăng nhập thành công");
                
                setTimeout(() => {
                    router.push("/");
                }, 1000);
            } else {
                // Đăng nhập thất bại
                dispatch(loginFailed());
                // console.log("Đăng nhập thất bại ");
                toast.error("Tài khoản hoặc mật khẩu không đúng !");
            }
        } catch (error) {
            console.error("Error during fetch:", error);
        }
    };
    return (
        <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
            <div className="w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
                <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
                    <Toaster position="top-right" richColors />
                    <h3 className="text-xl font-semibold">Đăng nhập</h3>
                    <p className="text-sm text-gray-500">
                       Sử dụng email và mật khẩu để đăng nhập
                    </p>
                </div>
                <form
                    className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16"
                    onSubmit={handleSubmit}
                >
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-xs text-gray-600 uppercase"
                        >
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-xs text-gray-600 uppercase"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2"
                        />
                    </div>
                    <button
                        type="submit"
                        className="flex h-10 w-full  items-center justify-center rounded-md border border-gray-600 text-sm "
                    >
                       Đăng nhập
                    </button>
                    <p className="text-center text-sm text-gray-600">
                        Bạn chưa có tài khoản?{" "}
                        <a
                            className="font-semibold text-gray-800 "
                            href="/register"
                        >
                            Đăng ký
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
}
