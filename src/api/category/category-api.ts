const Url = `${process.env.API_URL}Category`;

const ApiCategory = {
    async getCategoryParent() {
        try {
            const response = await fetch(`${Url}/categories-parent`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Fetch error: ", error);
        }
    },
    async getCategory(id: string, accessToken: string) {
        try {
            const response = await fetch(
                `${process.env.API_URL}Category/${id}`,
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
    async getAllCategory() {
        try {
            const response = await fetch(`${Url}/list`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
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
    async addCategory(
        name: string,
        categoryParent: string,
        description: string,
        accessToken: string
    ) {
        try {
            const response = await fetch(
                `${process.env.API_URL}Category/insert`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify({
                        name,
                        categoryParent,
                        description,
                    }),
                }
            );
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response;
        } catch (error) {
            console.error("Fetch error: ", error);
        }
    },
    async deleteCategory(id: string, accessToken: string) {
        try {
            const response = await fetch(
                `${process.env.API_URL}Category/${id}`,
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
    async updateCategory(
        id: string,
        name: string,
        categoryParent: string,
        description: string,
        accessToken: string
    ) {
        try {
            const response = await fetch(
                `${process.env.API_URL}Category/update/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify({
                        name,
                        categoryParent,
                        description,
                    }),
                }
            );
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response;
        } catch (error) {
            console.error("Fetch error: ", error);
        }
    },
};

export default ApiCategory;
