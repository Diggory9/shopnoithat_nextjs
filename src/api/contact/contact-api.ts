const ApiContact = {
    async getContact(id: string, accessToken: string) {
        try {
            const response = await fetch(
                `${process.env.API_URL}ContactUs/${id}`,
                {
                    method: "GET",
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
            console.error("Fetch error:", error);
        }
    },
    async getContacts(
        pageNumber: number,
        pageSize: number,
        accessToken: string
    ) {
        try {
            const response = await fetch(
                `${process.env.API_URL}ContactUs?pageNumber=${pageNumber}&pageSize=${pageSize}`,
                {
                    method: "GET",
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
            console.error("Fetch error:", error);
        }
    },

    async updateStatusReply(id: string, accessToken: string) {
        try {
            const response = await fetch(
                `${process.env.API_URL}ContactUs/contact-replied/${id}`,
                {
                    method: "PUT",
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
    async contactReply(
        email: string,
        fullName: string,
        subject: string,
        body: string,
        accessToken: string
    ) {
        try {
            const response = await fetch(
                `${process.env.API_URL}ContactUs/reply`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify({
                        email,
                        fullName,
                        subject,
                        body,
                    }),
                }
            );
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            return response;
        } catch (error) {
            console.error("Fetch error:", error);
        }
    },
};
export default ApiContact;
