const ApiReport = {
    async getSummary(startDate: string, endDate: string, accessToken: string) {
        try {
            const response = await fetch(
                `${process.env.API_URL}Report/sales-summary?startDate=${startDate}&endDate=${endDate}`,
                {
                    method: "POST",
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
            console.log(data);
            return data;
        } catch (error) {
            console.error("Fetch error: ", error);
            throw error;
        }
    },
};
export default ApiReport;
