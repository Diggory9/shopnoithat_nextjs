

const ApiOrder = {
    async getDetailOrder(id: string) {
        try {
            const response = await fetch(
                `${process.env.API_URL}Order/${id}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching order details:", error);
        }
    },
    async getOrders(pageNumber: number, pageSize: number) {
        try {
            const response = await fetch(
                `${process.env.API_URL}Order/list?pageNumber=${pageNumber}&pageSize=${pageSize}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    }
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

    async getOrdersByUserId(userId: string) {
        try {
            const response = await fetch(
                `${process.env.API_URL}Order/user/${userId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    },
    async updateStatusOrder(id?: string, status?: string) {
        try {
            const response = await fetch(`${process.env.API_URL}Order/status`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
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
    }
}
export default ApiOrder;