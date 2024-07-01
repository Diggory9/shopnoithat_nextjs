import { Toaster, toast } from "sonner";
import RegisterFrom from "./register-form";
export default function Register() {
    return (
        <div
            style={{ backgroundImage: "url(/img/hello.png)" }}
            className="flex h-screen w-screen items-center justify-end bg-gray-50 "
        >
            <div className="w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl mr-52 mt-10">
                <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
                    <h3 className="text-xl font-semibold">Sign Up</h3>
                </div>
                <Toaster position="top-right" richColors duration={2000} />
                <RegisterFrom />
            </div>
        </div>
    );
}
