import { RootState, store } from '../redux/store';
import { refreshToken } from '../redux/features/auth/authSlice';
import { checkIfTokenExpired } from '@/utils/tokenUtils';
// Fetch Base Auth Middleware


const fetchBaseAuth = async (input: RequestInfo, init?: RequestInit): Promise<Response> => {
    console.log('input', input);
    try {
        const { data } = store.getState().auth;// null
        console.log(data);
        if (data?.jwToken) {
            const checkAccessTokenExpired = checkIfTokenExpired(data?.jwToken)
            console.log(checkAccessTokenExpired)
            if (checkAccessTokenExpired)
                store.dispatch(refreshToken({ email: data.email || "", refreshToken: data.refreshToken || "" }));
        }
        const updatedInit = {
            ...init,
            headers: {
                ...init?.headers,
                'Authorization': `Bearer ${data?.jwToken || ""}`,
            },
        };

        return fetch(input, updatedInit);
    } catch (error) {
        throw error;
    }

};

export default fetchBaseAuth;
