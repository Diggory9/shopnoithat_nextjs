"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";
const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export default function RegisterFrom() {
    const [userName, setUserName] = useState("");
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
        setErrorUser(
            userName.length < 6 ? "Tên người dùng phải có ít nhất 6 ký tự." : ""
        );
        setErrorEmail(!emailRegex.test(email) ? "Email không hợp lệ." : "");
        setErrorPass(
            !passwordRegex.test(password)
                ? "Mật khẩu cần có đầy đủ ký tự thường,in hoa, kí tự đặc biệt và số"
                : ""
        );
        setErrorConfirmPass(
            password !== confirmPassword ? "Mật khẩu xác nhận không khớp." : ""
        );

        try {
            const response = await fetch(
                `${process.env.API_URL}Account/register`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        userName,
                        email,
                        password,
                        confirmPassword,
                    }),
                }
            );

            const data = await response.json();

            if (response.ok) {
                // Đăng ký thành công, chuyển hướng hoặc xử lý tiếp
                toast.success("Đăng ký thành công");
                setTimeout(() => {
                    router.push("/login");
                }, 2000);
            } else {
                //Đăng ký thất bại
                const value = getValueBeforeSpace(data.Message);
                if (value == "Username") {
                    setErrorUser("Tên người dùng đã tồn tại" || "");
                }
                if (value == "Email") {
                    setErrorEmail("Địa chỉ email đã tồn tại" || "");
                }
                if (
                    value ==
                    "System.Collections.Generic.List`1[Microsoft.AspNetCore.Identity.IdentityError]"
                )
                    setErrorPass(
                        !passwordRegex.test(password)
                            ? "Mật khẩu cần có đầy đủ ký tự thường,in hoa, kí tự đặc biệt, số và độ dài lớn hơn 6"
                            : ""
                    );
                setErrorConfirmPass(
                    password !== confirmPassword
                        ? "Mật khẩu xác nhận không khớp."
                        : ""
                );
            }
        } catch (error) {
            console.error("Lỗi khi gửi yêu cầu:", error);
        }
    };
    return (
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
                    name="userName"
                    id="userName"
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
                    htmlFor="confirmPassword"
                    className="block text-xs text-gray-600 uppercase"
                >
                    Confirm Password
                </label>
                <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2"
                />
                <p className="text-sm text-red-500">{errorConfirmPass}</p>
            </div>
            <button
                type="submit"
                className="flex h-10 w-full  items-center justify-center rounded-md border border-gray-600 text-sm "
            >
                Đăng ký
            </button>
            <p className="text-center text-sm text-gray-600">
                Bạn đã có tài khoản?{" "}
                <a className="font-semibold text-gray-800 " href="/login">
                    Đăng nhập
                </a>
            </p>
        </form>
    );
}

function getValueBeforeSpace(str: string) {
    const parts = str.split(" ");
    return parts.shift();
}
