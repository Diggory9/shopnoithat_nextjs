import { toast } from "sonner";

const ApiUser = {
    async getAllUser(pageNumber: number, pageSize: number) {
        try {
            const response = await fetch(`${process.env.API_URL}UserManagement/get-users?pageNumber=${pageNumber}&pageSize=${pageSize}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error ", error);
        }
    },
    async getUserById(id: string) {
        try {
            const response = await fetch(`${process.env.API_URL}UserManagement/get-user?userId=${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error :", error);
        }
    },
    async updateUserRoles(userId: string, roleName: string) {
        try {
            const response = await fetch(`${process.env.API_URL}UserManagement/add-role-to-user`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId, roleName }),
            })

            if (!response.ok) {
                toast.error("Thêm role thất bại");
            }
            else {

                toast.success("Thêm role thành công");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error :", error);
        }
    }
}
export default ApiUser;