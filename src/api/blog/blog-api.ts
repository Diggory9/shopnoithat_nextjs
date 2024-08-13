const ApiBlog = {
    async createBlog({
        blogImage,
        title,
        content,
        authorId,
        tagsBlog,
        blogGroupId,
        accessToken,
    }: {
        blogImage: string;
        title: string;
        content: string;
        authorId: string;
        blogGroupId: string;
        tagsBlog: [string];
        accessToken: string;
    }) {
        try {
            const response = await fetch(
                `${process.env.API_URL}Blog/create-blog`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify({
                        authorId,
                        blogImage,
                        title,
                        content,
                        blogGroupId,
                        tagsBlog,
                    }),
                }
            );
            if (!response) {
                throw new Error("Network response was not ok");
            }
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    async getAllBlog(pageNumber = 1, pageSize = 20, accessToken: string) {
        try {
            const response = await fetch(
                `${process.env.API_URL}Blog?pageNumber=${pageNumber}&pageSize=${pageSize}`,
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
            console.log(error);
        }
    },
    async getBlogById(id: string, accessToken: string) {
        try {
            const response = await fetch(`${process.env.API_URL}Blog/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            if (!response) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    },
    async updateBlog({
        id,
        blogImage,
        title,
        content,
        authorId,
        tagsBlog,
        blogGroupId,
        accessToken,
    }: {
        id: string;
        blogImage: string;
        title: string;
        content: string;
        authorId: string;
        blogGroupId: string;
        tagsBlog: [string];
        accessToken: string;
    }) {
        try {
            const response = await fetch(
                `${process.env.API_URL}Blog/update-blog`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify({
                        id,
                        authorId,
                        blogImage,
                        title,
                        content,
                        blogGroupId,
                        tagsBlog,
                    }),
                }
            );
            if (!response) {
                throw new Error("Network response was not ok");
            }
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    async deleteBlog({ id, accessToken }: { id: string; accessToken: string }) {
        try {
            const response = await fetch(
                `${process.env.API_URL}Blog?id=${id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            if (!response) {
                throw new Error("Network response was not ok");
            }
            return response;
        } catch (error) {
            console.log(error);
        }
    },
};
export default ApiBlog;
