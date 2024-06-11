import {PayloadAction, createSlice} from "@reduxjs/toolkit";
import Cookies from 'js-cookie';
import { User } from "./store";
const authSlice = createSlice({
    name:"auth",
    initialState:{
        user: null,
        token: Cookies.get('access_token') || null,
    },
    reducers: {
        loginSuccess: (state, action: PayloadAction<{ user: User; token: string }>) => {
           
            state.token = action.payload.token;
            Cookies.set('access_token', action.payload.token, { expires: 7 });
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            Cookies.remove('access_token');
        },
        setUserFromCookies: (state) => {
            const token = Cookies.get('access_token');
            if (token) {
                // Assuming you have a way to decode or fetch user info using the token
                state.token = token;
               
            }
        },
    },
});
export const { loginSuccess, logout,setUserFromCookies  } = authSlice.actions;
export default authSlice.reducer;