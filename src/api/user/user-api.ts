const ApiUser = {
    async getUserById(id: string, accessToken: string) {
        try {
            const response = await fetch(
                `${process.env.API_URL}UserManagement/get-user?userId=${id}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error :", error);
        }
    },
    async getAllUser(
        pageNumber: number,
        pageSize: number,
        accessToken: string
    ) {
        try {
            const response = await fetch(
                `${process.env.API_URL}UserManagement/get-users?pageNumber=${pageNumber}&pageSize=${pageSize}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error ", error);
        }
    },

    async addRoleToUser(userId: string, roleName: string, accessToken: string) {
        try {
            const response = await fetch(
                `${process.env.API_URL}UserManagement/add-role-to-user`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify({ userId, roleName }),
                }
            );
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response;
        } catch (error) {
            console.error("Error :", error);
        }
    },
    async removeRole(userId: string, roleNames: [string], accessToken: string) {
        try {
            const response = await fetch(
                `${process.env.API_URL}UserManagement/user-remove-role`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify({ userId, roleNames }),
                }
            );
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response;
        } catch (error) {
            console.error("Error :", error);
        }
    },
};
export default ApiUser;
