
const ApiReview = {
    async getReviews(id: string, pageNumber: number, pageSize: number) {
        try {
            const response = await fetch(`${process.env.API_URL}Review/${id}?pageNumber=${pageNumber}&pageSize=${pageSize}`, {
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
            console.error("Error fetch review:", error);
        }

    },
    async createReview(values: {}) {
        try {
            const response = await fetch(`${process.env.API_URL}Review/create-review`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            })
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response;
        } catch (error) {
            console.error("Error fetch review:", error);
        }
    },

}
export default ApiReview;