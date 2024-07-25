const Url = `${process.env.API_URL}Product`;

const ApiProduct = {
    async getAllProduct(
        pageNumber: number,
        pageSize: number,
        accessToken: string
    ) {
        try {
            const response = await fetch(
                `${Url}/list?pageNumber=${pageNumber}&pageSize=${pageSize}`,
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
            console.log(data);
            return data;
        } catch (error) {
            console.error("Fetch error: ", error);
            throw error;
        }
    },
    async getProductPublicByCategory(
        id: string,
        pageNumber = 1,
        pageSize = 10,
        accessToken: string
    ) {
        try {
            console.log("id", id);
            const response = await fetch(
                `${Url}/get-product-by-category-publish/${id}?offset=${pageNumber}&limit=${pageSize}`,
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
    async getProductByCategory(
        id: string,
        pageNumber = 1,
        pageSize = 10,
        accessToken: string
    ) {
        try {
            console.log("id", id);
            const response = await fetch(
                `${Url}/get-product-by-category/${id}?offset=${pageNumber}&limit=${pageSize}`,
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
    async getDetailProduct(id: string, accessToken: string) {
        try {
            const response = await fetch(`${Url}/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
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
    async createProduct(values: {}, accessToken: string) {
        try {
            const response = await fetch(
                `${process.env.API_URL}Product/create`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify(values),
                }
            );
            if (!response) {
                throw new Error("Network response was not ok");
            }
            return response;
        } catch (error) {
            console.error(error);
        }
    },
    async UpdateProduct(values: {}, productId: string, accessToken: string) {
        try {
            const response = await fetch(
                `${process.env.API_URL}Product/${productId}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify(values),
                }
            );
            if (!response) {
                throw new Error("Network response was not ok");
            }
            return response;
        } catch (error) {
            console.error(error);
        }
    },
    async updateStatus(productId: string, accessToken: string, status: string) {
        try {
            const response = await fetch(
                `${process.env.API_URL}Product/${status}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify({ productId }),
                }
            );
            if (!response) {
                throw new Error("Network response was not ok");
            }
            return response;
        } catch (error) {
            console.error(error);
        }
    },
    async applyDiscount(
        productId: string,
        discountId: string,
        accessToken: string
    ) {
        try {
            const response = await fetch(
                `${process.env.API_URL}Product/update-discount/${productId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify({ discountId }),
                }
            );
            if (!response) {
                throw new Error("Network response was not ok");
            }
            return response;
        } catch (error) {
            console.error(error);
        }
    },
};
export default ApiProduct;
