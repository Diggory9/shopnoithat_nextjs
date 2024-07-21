
import fetchBaseAuth from "../base-api";

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
                    body: JSON.stringify({ UserNameOrEmail: email, password }),
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
    },
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
    },
    async authRegister({ email, userName, password, confirmPassword }: { email: string, userName: string, password: string, confirmPassword: string }) {
        try {

            const response = await fetch(
                `${process.env.API_URL}Account/register`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        userName,
                        email,
                        password,
                        confirmPassword,
                    }),
                }
            );

            return response;

        } catch (error) {
            return Promise.reject(error);
        }
    },
    async authExternalLogin({ provider, idToken }: { provider: string, idToken: string }) {
        try {

            const response = await fetch(
                `${process.env.API_URL}Account/ExternalLogin`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        provider, idToken
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            return data;

        } catch (error) {
            return Promise.reject(error);
        }
    },

    async authChangePassWord({ email, currentPassword, password, confirmPassword }: { email: string, currentPassword: string, password: string, confirmPassword: string }) {
        try {
            const response = await fetch(
                `${process.env.API_URL}Account/reset-password`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        currentPassword,
                        password,
                        confirmPassword,
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
    }
}
export default ApiAuth;