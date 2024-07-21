const ApiBlog = {
    async createBlog({
        blogImage,
        title,
        content,
        authorId,
        tagsBlog,
    }: {
        blogImage: string;
        title: string;
        content: string;
        authorId: string;
        tagsBlog: [string];
    }) {
        try {
            const response = await fetch(
                `${process.env.API_URL}Blog/create-blog`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        blogImage,
                        title,
                        content,
                        authorId,
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
    async getAllBlog(pageNumber = 1, pageSize = 20) {
        try {
            const response = await fetch(
                `${process.env.API_URL}Blog?pageNumber=${pageNumber}&pageSize=${pageSize}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
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
};
export default ApiBlog;
