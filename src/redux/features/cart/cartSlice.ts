import ApiCart from '@/api/cart/cart-api';
import { CartModel } from '@/models/cartmodel'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import Item from 'antd/es/list/Item';

interface CartState {
  data: CartModel[] | null;
  error: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}
const initialState: CartState = {
  data: [],
  status: 'idle',
  error: null as string | null

}
// Thunk để lấy dữ liệu giỏ hàng từ API
export const getCart = createAsyncThunk('cart/fetchCart', async ({ userId, }: { userId: string }) => {
  const response = await ApiCart.getCartByUser(userId);
  return response.data;
});
export const addToCart = createAsyncThunk('cart/addToCart', async ({ userId, productItem, incr, quantity }: { userId: string | null, productItem: string, incr?: number, quantity: number | null }) => {
  const response = await ApiCart.addProductToCart(userId, productItem, incr, quantity);
  return response.data;
});
export const deleteProductFromCart = createAsyncThunk('cart/deleteToCart', async ({
  userId, productItemId }: { userId: string, productItemId: string }) => {
  const response = await ApiCart.deleteProductToCart({ userId: userId, productItemId: productItemId });
  console.log(response);
  return response.data;
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message!;
      })
      .addCase(addToCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = 'failed';
      })
      .addCase(deleteProductFromCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(deleteProductFromCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message!;
      })


  },
});

export const { } = cartSlice.actions;
export default cartSlice.reducer;