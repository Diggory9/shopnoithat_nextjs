const ApiGroupBlog = {
    async createGroupBlog({ name, description }: { name: string, description: string }) {
        try {
            const response = await fetch(`${process.env.API_URL}GroupBlog/create-blog-group`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name, description
                    })
                }
            )
            if (!response) {
                throw new Error("Network response was not ok");
            }
            return response;
        } catch (error) {
            console.error(error);
        }
    },
    async getDetailGroupBlog(id: string) {
        try {
            const response = await fetch(`${process.env.API_URL}GroupBlog/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },

            });
            if (!response) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    },
    async deleteGroupBlog(id: string) {
        try {
            const response = await fetch(`${process.env.API_URL}GroupBlog/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },

                }
            )
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response;
        } catch (error) {
            console.error(" error:", error);
        }
    },
    async updateGroupBlog({ id, name, description }: { id: string, name: string, description: string }) {
        try {
            const response = await fetch(`${process.env.API_URL}GroupBlog/update`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id, name, description
                    })
                }
            )
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response;
        } catch (error) {
            console.error(" error:", error);
        }
    },
    async getAllGroupBlog() {
        try {
            const response = await fetch(`${process.env.API_URL}GroupBlog`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },

            });
            if (!response) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    },
}
export default ApiGroupBlog