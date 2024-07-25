const ApiOrder = {
    async getDetailOrder(id: string, accessToken: string) {
        try {
            const response = await fetch(`${process.env.API_URL}Order/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching order details:", error);
        }
    },
    async getOrders(pageNumber: number, pageSize: number, accessToken: string) {
        try {
            const response = await fetch(
                `${process.env.API_URL}Order/list?pageNumber=${pageNumber}&pageSize=${pageSize}`,
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
            console.error("Fetch error: ", error);
            throw error;
        }
    },

    async getOrdersByUserId(userId?: string, accessToken?: string) {
        try {
            const response = await fetch(
                `${process.env.API_URL}Order/user/${userId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    },
    async updateStatusOrder(
        id?: string,
        status?: string,
        accessToken?: string
    ) {
        try {
            const response = await fetch(`${process.env.API_URL}Order/status`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ id, status }),
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response;
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    },
};
export default ApiOrder;
