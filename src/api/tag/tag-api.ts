const ApiTag = {
    async createTag(tagTitle: string, accessToken: string) {
        try {
            const response = await fetch(
                `${process.env.API_URL}Tag/create-tag`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify({ tagTitle }),
                }
            );
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    async getAllTag(accessToken: string) {
        try {
            const response = await fetch(`${process.env.API_URL}Tag`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error :", error);
        }
    },
};
export default ApiTag;
