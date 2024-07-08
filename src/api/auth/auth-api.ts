import { toast } from "sonner";

const ApiAuth = {
    async LogOut(email: string) {
        try {
            const response = await fetch(
                `${process.env.API_URL}Account/logout?userEmail=${email}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.ok) {
                toast.success("Đăng xuất thành công");
                // router.push("/");
                // router.refresh();
                localStorage.clear();
            }
        } catch (error) {
            console.error("Fetch error: ", error);
            throw error;
        }
    }
}
export default ApiAuth;