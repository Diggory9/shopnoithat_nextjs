"use client";
import { useState } from "react";
import { useRouter } from 'next/navigation'
export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter()
    const handleSubmit = async (event: { preventDefault: () => void }) => {
        event.preventDefault(); // Ngăn chặn hành vi mặc định của form

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
                console.log("Đăng nhập thành công");
                router.push('/admin')
                alert("Đăng nhập thành công");
            } else {
                // Đăng nhập thất bại
                console.log("Đăng nhập thất bại ");
                alert("Đăng nhập thất bại");
            }
        } catch (error) {
            console.error("Error during fetch:", error);
        }
    };
    return (
        <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
            <div className="w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
                <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
                    <h3 className="text-xl font-semibold">Sign In</h3>
                    <p className="text-sm text-gray-500">
                        Use your email and password to sign in
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
                        Sign In
                    </button>
                    <p className="text-center text-sm text-gray-600">
                        Don't have account?{" "}
                        <a
                            className="font-semibold text-gray-800 "
                            href="/register"
                        >
                            Sign up
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
}
