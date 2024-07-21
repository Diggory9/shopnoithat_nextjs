import LoginForm from "@/app/(auth)/login/login-form";
import { Toaster } from "sonner";

export default function Login() {
    return (
        <div
            style={{
                backgroundImage: "url(/img/hello.png)",
                backgroundSize: "100%",
            }}
            className=" bg-no-repeat overflow-x-hidden  flex h-screen w-screen items-center justify-end bg-gray-50 "
        >
            <div className="w-full max-w-lg  rounded-2xl border border-gray-100 shadow-xl mr-52 ">
                <div className=" flex flex-col  space-y-3 rounded-lg border-gray-200 bg-white py-8 pt-16 text-center sm:px-16">
                    <Toaster position="top-right" richColors duration={2000} />
                    <h3 className="text-2xl font-semibold pb-4">Đăng nhập</h3>
                    <LoginForm />
                </div>
            </div>
        </div>
    );
}
