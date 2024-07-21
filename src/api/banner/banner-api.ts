const ApiBanner = {

    async getBanners() {
        try {
            const response = await fetch(`${process.env.API_URL}Banner`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Fetch error:", error);
        }
    },
    async createBanner({ url, isEnable, groupId }: { url: string, isEnable: boolean, groupId: string }) {
        try {
            const response = await fetch(`${process.env.API_URL}Banner/create-banner`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    url, isEnable, groupId
                }),
            }
            )
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response;
        } catch (error) {
            console.error("Create error:", error);
        }
    },
    async deleteBanner(id: string) {
        try {
            const response = await fetch(`${process.env.API_URL}Banner/${id}`,
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
    async updateBanner(id: string) {
        try {
            const response = await fetch(`${process.env.API_URL}Banner/toggle-enable/${id}`,
                {
                    method: "PUT",
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
    async getGroupBanners() {
        try {
            const response = await fetch(`${process.env.API_URL}GroupBanner`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Fetch error:", error);
        }
    },
    async getDetailGroupBanner(id: string) {
        try {
            const response = await fetch(`${process.env.API_URL}GroupBanner/groups-banner/${id}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Fetch error:", error);
        }
    },
    async updateGroupBanner(id: string) {
        try {
            const response = await fetch(`${process.env.API_URL}GroupBanner/toggle-enable/${id}`,
                {
                    method: "PUT",
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
}
export default ApiBanner;