
const ApiRole = {
    async getAllRole() {
        try {
            const response = await fetch(`${process.env.API_URL}RoleManager/get-roles`, {
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
            console.error("Error :", error);
        }

    }
}
export default ApiRole;