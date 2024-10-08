const ApiDiscount = {
    async getDetailDiscount(id: string, accessToken: string) {
        try {
            const response = await fetch(
                `${process.env.API_URL}Discount/${id}`,
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
            console.error("Error fetching :", error);
        }
    },
    async getAllDiscount(
        pageNumber: number,
        pageSize: number,
        accessToken: string
    ) {
        try {
            const response = await fetch(
                `${process.env.API_URL}Discount/list?pageNumber=${pageNumber}&pageSize=${pageSize}`,
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
            console.error("Error fetching :", error);
        }
    },
    async createDiscount(values: {}, accessToken: string) {
        try {
            const response = await fetch(
                `${process.env.API_URL}Discount/create`,
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
    async updateStatusDiscount(
        discountId: string,
        status: string,
        accessToken: string
    ) {
        try {
            const response = await fetch(
                `${process.env.API_URL}Discount/${status}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify({ discountId }),
                }
            );
            return response;
        } catch (error) {
            console.error("Update:", error);
        }
    },
    async updateTimeDiscount(
        idDiscount: string,
        dateStart: string,
        dateEnd: string,
        accessToken: string
    ) {
        try {
            const response = await fetch(
                `${process.env.API_URL}Discount/update-time/${idDiscount}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify({ dateStart, dateEnd }),
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
export default ApiDiscount;
