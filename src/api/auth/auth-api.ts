import fetchBaseAuth from "@/api/base-api";


const Url = `${process.env.API_URL}Account`
const ApiAuth = {

    async authLogin({ email, password }: { email?: string, password?: string }) {
        try {
            const response = await fetch(
                `${process.env.API_URL}Account/authenticate`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password }),
                }
            );
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            return data;
        }
        catch (error) {
            console.error("Fetch error:", error);
        }
    }
    ,
    async authLogout({ email }: { email: string }) {
        try {
            const response = await fetchBaseAuth(
                `${process.env.API_URL}Account/logout?userEmail=${email}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            );
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            return data;
        }
        catch (error) {
            console.error("Fetch error:", error);
        }
    }
    , async authRefresh({ email, refreshToken }: { email: string, refreshToken: string }) {
        try {
            const body = {
                email,
                token: refreshToken
            }
            const response = await fetch(
                `${process.env.API_URL}Account/refreshtoken`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    }, body: JSON.stringify(body)
                }
            );
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            return data;
        }
        catch (error) {
            console.error("Fetch error:", error);
        }
    }

}

export default ApiAuth;