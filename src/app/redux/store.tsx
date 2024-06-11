import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
export interface User {
  
  name: string;
  
}

export interface AuthState {
  user: User | null;
  token: string | null;
}


const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
