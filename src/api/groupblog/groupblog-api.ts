const ApiGroupBlog = {
    async createGroupBlog({
        name,
        description,
        accessToken,
    }: {
        name: string;
        description: string;
        accessToken: string;
    }) {
        try {
            //const accessToken = localStorage.getItem("accessToken");

            const response = await fetch(
                `${process.env.API_URL}GroupBlog/create-blog-group`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                    // mode: "no-cors",
                    body: JSON.stringify({
                        name,
                        description,
                    }),
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
    async getDetailGroupBlog(id: string, accessToken: string) {
        try {
            const response = await fetch(
                `${process.env.API_URL}GroupBlog/${id}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            if (!response) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    },
    async deleteGroupBlog(id: string, accessToken: string) {
        try {
            const response = await fetch(
                `${process.env.API_URL}GroupBlog/${id}`,
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
            console.error(" error:", error);
        }
    },
    async updateGroupBlog({
        id,
        name,
        description,
        accessToken,
    }: {
        id: string;
        name: string;
        description: string;
        accessToken: string;
    }) {
        try {
            const response = await fetch(
                `${process.env.API_URL}GroupBlog/update`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify({
                        id,
                        name,
                        description,
                    }),
                }
            );
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response;
        } catch (error) {
            console.error(" error:", error);
        }
    },
    async getAllGroupBlog(accessToken: string) {
        try {
            const response = await fetch(`${process.env.API_URL}GroupBlog`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            });
            if (!response) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    },
};
export default ApiGroupBlog;
