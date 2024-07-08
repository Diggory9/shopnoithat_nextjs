import ApiCart from '@/api/cart/cart-api';
import { CartModel } from '@/models/cartmodel'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import Item from 'antd/es/list/Item';
import { getCart } from '../cart/cartSlice';
import { MAuth } from '@/models/auth';
import ApiAuth from '@/api/auth/auth-api';
import { access } from 'fs';
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

export const login = createAsyncThunk('user/login', async ({ email, password }: { email?: string, password?: string }, { dispatch }) => {
  const response = await ApiAuth.authLogin({ email, password });
  if (response.data) {
    let userId = response.data.id;
  }
  return response.data;
});
export const logout = createAsyncThunk('user/logout', async ({ email }: { email: string }) => {
  const response = await ApiAuth.authLogout({ email: email });
  return null;
});
export const refreshToken = createAsyncThunk('user/refresh-token', async ({ email, refreshToken }: { email: string, refreshToken: string }) => {

  const response = await ApiAuth.authRefresh({ email: email, refreshToken: refreshToken });
  console.log(response);
  return response.data;
});
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

  }, extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isLogin = true;
        state.data = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLogin = false;
        state.data = null;
        state.error = null;
        state.status = null;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isLogin = true;
        state.data = action.payload;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
  },
});

export const { } = authSlice.actions;
export default authSlice.reducer;