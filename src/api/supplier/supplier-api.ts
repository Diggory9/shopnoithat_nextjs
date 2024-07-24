const ApiSupplier = {
    async getSupplier(id: string) {
        try {
            const response = await fetch(
                `${process.env.API_URL}Supplier/${id}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (!response.ok) throw new Error("Network response was not ok");
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Fetch error:", error);
        }
    },
    async getSuppliers() {
        try {
            const response = await fetch(
                `${process.env.API_URL}Supplier/list`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (!response.ok) throw new Error("Network response was not ok");
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Fetch error: ", error);
            throw error;
        }
    },
    async createSupplier(values: {}, accessToken: string) {
        try {
            const response = await fetch(
                `${process.env.API_URL}Supplier/create`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify(values),
                }
            );

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response;
        } catch (error) {
            console.error("Fetch error: ", error);
            throw error;
        }
    },
    async deleteSupplier(id: string, accessToken: string) {
        try {
            const response = await fetch(
                `${process.env.API_URL}Supplier/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            if (!response.ok) throw new Error("Network response was not ok");
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Delete error: ", error);
            throw error;
        }
    },
    async updateSupplier(id: string, values: {}, accessToken: string) {
        try {
            const response = await fetch(
                `${process.env.API_URL}Supplier/update/${id}`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                }
            );
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response;
        } catch (error) {
            console.error("Fetch error: ", error);
            throw error;
        }
    },
};
export default ApiSupplier;
