

const Url = `${process.env.API_URL}Product`

const ApiProduct = {
    async getAllProduct(pageNumber = 1, pageSize = 10) {
        try {
            const response = await fetch(
                `${Url}/list?pageNumber=${pageNumber}&pageSize=${pageSize}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
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
    async getProductPublicByCategory(id: string, pageNumber = 1, pageSize = 10) {
        try {
            console.log("id", id);
            const response = await fetch(
                `${Url}/get-product-by-category/${id}?offset=${pageNumber}&limit=${pageSize}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log("res", response)
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
    async getDetailProduct(id: string) {
        try {
            const response = await fetch(
                `${Url}/${id}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
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

};
export default ApiProduct;

