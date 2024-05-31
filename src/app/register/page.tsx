"use client";
import { useState } from "react";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Register() {
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorUser, setErrorUser] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPass, setErrorPass] = useState("");
    const [errorConfirmPass, setErrorConfirmPass] = useState("");
    const router = useRouter();

    const handleSubmit = async (event: { preventDefault: () => void }) => {
        event.preventDefault(); // Ngăn chặn hành vi mặc định của form

        try {
            const response = await fetch(
                "https://localhost:44372/api/Account/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username,
                        email,
                        password,
                        confirmPassword,
                    }),
                }
            );

            const data = await response.json();

            if (response.ok) {
                // Đăng ký thành công, chuyển hướng hoặc xử lý tiếp
                console.log("Đăng ký thành công");
                toast.success("Đăng ký thành công");
                setTimeout(() => {
                    router.push("/login");
                }, 2000);
            } 
            else if(response.status==400){
                alert(data.Message);
            }
            else {
                // Đăng ký thất bại
               
                setErrorUser(data.errors.UserName||"");
                setErrorEmail(data.errors.Email||"");
                setErrorPass(data.errors.Password||"");
                setErrorConfirmPass(data.errors.ConfirmPassword||"");
                
            }
        } catch (error) {
            console.error("Lỗi khi gửi yêu cầu:", error);
            alert("Đã xảy ra lỗi. Vui lòng thử lại.");
        }
    };
    return (
        <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
            <div className="w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
                <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
                    <h3 className="text-xl font-semibold">Sign Up</h3>
                </div>
                <Toaster position="top-right" richColors />
                <form
                    className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16"
                    onSubmit={handleSubmit}
                >
                    <div>
                        <label
                            htmlFor="text"
                            className="block text-xs text-gray-600 uppercase"
                        >
                            User Name
                        </label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            required
                            onChange={(e) => setUserName(e.target.value)}
                            className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2"
                        />
                     
                            <p className="text-sm text-red-500">{errorUser}</p>
                 
                    </div>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-xs text-gray-600 uppercase"
                        >
                            Email Address
                        </label>
                        <input
                            name="email"
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2"
                        />
                       <p className="text-sm text-red-500">{errorEmail}</p>
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
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2"
                        />
                        <p className="text-sm text-red-500">{errorPass}</p>
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-xs text-gray-600 uppercase"
                        >
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2"
                        />
                        <p className="text-sm text-red-500">{errorConfirmPass}</p>
                    </div>
                    <button
                        type="submit"
                        className="flex h-10 w-full  items-center justify-center rounded-md border border-gray-600 text-sm "
                    >
                        Sign Up
                    </button>
                    <p className="text-center text-sm text-gray-600">
                        You have account?{" "}
                        <a
                            className="font-semibold text-gray-800 "
                            href="/login"
                        >
                            Sign In
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
}
