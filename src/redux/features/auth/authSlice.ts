

import ApiAuth from '@/api/auth/auth-api';
import { MAuth } from '@/models/auth';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
interface UserState {
  isLogin: boolean;
  data: MAuth | null;
  error: string | null;
  status?: 'loading' | 'succeeded' | 'failed' | null;
}

const initialState: UserState = {
  isLogin: false,
  data: null,
  error: null,
  status: null,
}
export const login = createAsyncThunk('user/login', async ({ email, password }: { email?: string, password?: string }) => {
  const response = await ApiAuth.authLogin({ email, password });
  const data = response.data;
  const { jwToken, refreshToken } = data;
  localStorage.setItem('accessToken', JSON.stringify(jwToken));
  localStorage.setItem('refreshToken', JSON.stringify(refreshToken));
  localStorage.setItem('email', JSON.stringify(email));
  return data;
});
export const externalLogin = createAsyncThunk('user/externalLogin', async ({ provider, idToken }: { provider: string, idToken: string }) => {
  const response = await ApiAuth.authExternalLogin({ provider, idToken });
  const data = response.data;
  const { jwToken, refreshToken, email } = data;
  console.log(data);
  localStorage.setItem('accessToken', JSON.stringify(jwToken));
  localStorage.setItem('refreshToken', JSON.stringify(refreshToken));
  localStorage.setItem('email', JSON.stringify(email));
  return data;
});
export const logout = createAsyncThunk('user/logout', async ({ email }: { email: string }) => {
  await ApiAuth.authLogout({ email })
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('email');
});
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthStatus(state) {
      state.status = null;
    },
    setAuthData(state, action) {
      state.isLogin = true;
      state.data = action.payload;
    },
  }, extraReducers(buiders) {
    buiders.addCase(login.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLogin = true;
      state.error = null;
      state.status = 'succeeded';
    });
    buiders.addCase(login.rejected, (state, action) => {
      state.error = action.error.message || "";
      state.status = 'failed';
    });
    buiders.addCase(logout.fulfilled, (state) => {
      state.data = null;
      state.isLogin = false;
      state.error = null;
      state.status = null;
    });
    buiders.addCase(externalLogin.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLogin = true;
      state.error = null;
      state.status = 'succeeded';
    });
    buiders.addCase(externalLogin.rejected, (state, action) => {
      state.error = action.error.message || "";
      state.status = 'failed';
    });
  }
});

export const { resetAuthStatus, setAuthData } = authSlice.actions;
export default authSlice.reducer;