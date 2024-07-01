"use client";
import { useSelector, useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";
export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const handleSubmit = async (event: { preventDefault: () => void }) => {
        event.preventDefault();

        try {
            const response = await fetch(
                `${process.env.API_URL}Account/authenticate`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password }),
                }
            );

            const res = await response.json();
            if (response.ok) {
                toast.success("Đăng nhập thành công");
                // console.log(data.data.jwToken);

                const token = res.data.jwToken;
                const role = res.data.roles;
                console.log(role);

                localStorage.setItem("userId", res.data.id);

                localStorage.setItem("email", res.data.email);
                localStorage.setItem("name", res.data.userName);
                localStorage.setItem("access_token", res.data.jwToken);
                localStorage.setItem("refresh_token", res.data.refreshToken);

                if (!role.includes("User")) {
                    router.push("/admin");
                    router.refresh();
                    console.log("Admin login");
                } else {
                    router.push("/");
                    router.refresh();

                    console.log("User login");
                }
            } else {
                toast.error("Tài khoản hoặc mật khẩu không đúng !");
            }
        } catch (error) {
            console.error("Error during fetch:", error);
        }
    };
    return (
        <form
            className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16"
            onSubmit={handleSubmit}
        >
            <div>
                <label
                    htmlFor="email"
                    className="block text-xs text-gray-600 uppercase"
                >
                    Địa chỉ email
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
                    Mật khẩu
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
                <a className="font-semibold text-gray-800 " href="/register">
                    Đăng ký
                </a>
            </p>
        </form>
    );
}
