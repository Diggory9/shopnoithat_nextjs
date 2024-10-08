const ApiRole = {
    async getRole(id: string, accessToken: string) {
        try {
            const response = await fetch(
                `${process.env.API_URL}RoleManager/get-role-by-id/${id}`,
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
            console.error("Fetch error:", error);
        }
    },
    async getAllRole(accessToken: string) {
        try {
            const response = await fetch(
                `${process.env.API_URL}RoleManager/get-roles`,
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
    async createRole(name: string, accessToken: string) {
        try {
            const response = await fetch(
                `${process.env.API_URL}RoleManager/create-role`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify({ name }),
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
    async deleteRoleName(roleName: string, accessToken: string) {
        try {
            const response = await fetch(
                `${process.env.API_URL}RoleManager/${roleName}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response;
        } catch (error) {
            console.error(" Error: ", error);
        }
    },
    async updateRoleName(id: string, name: string, accessToken: string) {
        try {
            const response = await fetch(
                `${process.env.API_URL}RoleManager/update-role-name/${id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify({
                        name,
                    }),
                }
            );
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response;
        } catch (error) {
            console.error("Update error: ", error);
        }
    },
};
export default ApiRole;
