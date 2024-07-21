import { checkIfTokenExpired } from '@/utils/tokenUtils';
import ApiAuth from './auth/auth-api';


const fetchBaseAuth = async (input: RequestInfo, init?: RequestInit): Promise<Response> => {
    try {
        let accessToken = localStorage.getItem('accessToken') ? JSON.parse(localStorage.getItem('accessToken') || '') : null;
        const refreshToken = localStorage.getItem('refreshToken') ? JSON.parse(localStorage.getItem('refreshToken') || '') : null;
        const email = localStorage.getItem('email') ? JSON.parse(localStorage.getItem('email') || '') : null;

        if (accessToken) {
            const checkAccessTokenExpired = checkIfTokenExpired(accessToken)

            if (checkAccessTokenExpired) {
                const response = await ApiAuth.authRefresh({ email: email || "", refreshToken: refreshToken || "" });

                const data = response.data;

                localStorage.setItem('accessToken', JSON.stringify(data?.jwToken));
                localStorage.setItem('refreshToken', JSON.stringify(data?.refreshToken));
                accessToken = data?.jwToken;

            }

        }
        const updatedInit = {
            ...init,
            headers: {
                ...init?.headers,
                'Authorization': `Bearer ${accessToken || ""}`,
            },
        };
        return fetch(input, updatedInit);
    } catch (error) {
        throw error;
    }

};

export default fetchBaseAuth;
