

const Url = `${process.env.API_URL}Category`


const ApiCategory = {
    async getCategoryParent() {
        try {
            const response = await fetch(
                `${Url}/categories-parent`,
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
    async getCategory() {
        try {
            const response = await fetch(
                `${Url}/list`,
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
}

export default ApiCategory