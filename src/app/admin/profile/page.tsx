import { Toaster } from "sonner";
import ResetPasswordForm from "./change-pass";

export default function ChangePassword() {
    return (
        <div className="w-1/3 p-5">
            <Toaster position="top-right" richColors></Toaster>
            <ResetPasswordForm></ResetPasswordForm>
        </div>
    );
}
