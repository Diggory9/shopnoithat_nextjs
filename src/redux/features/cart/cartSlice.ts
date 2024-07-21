import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';



import ApiCart from '@/api/cart/cart-api';
import { CartModel } from '@/models/cartmodel';
import { OrderInfo } from '@/models/order-info-model';

interface CartState {
  data: CartModel[] | null;
  error: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed' | 'addSuccessed' | 'deleteSuccessed';
  orderInfo: OrderInfo | null;
  statusOrder: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: CartState = {
  data: null,
  status: 'idle',
  error: null,
  orderInfo: null,
  statusOrder: 'idle'
};

export const getCart = createAsyncThunk('cart/fetchCart', async ({ userId }: { userId: string }) => {
  const response = await ApiCart.getCartByUser(userId);
  return response.data as CartModel[];
});

export const paymentVnpay = createAsyncThunk('cart/fetchPayment', async ({ txnRef }: { txnRef: string }) => {
  const response = await fetch(`${process.env.API_URL}/Payment/create-order/${txnRef}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data as OrderInfo;
});

export const addToCart = createAsyncThunk('cart/addToCart', async ({ userId, productItem, incr, quantity }: { userId: string | null, productItem: string, incr?: number, quantity: number | null }) => {
  const response = await ApiCart.addProductToCart(userId, productItem, incr, quantity);
  return response.data as CartModel[];
});

export const deleteProductFromCart = createAsyncThunk('cart/deleteToCart', async ({ userId, productItemId }: { userId: string, productItemId: string }) => {
  const response = await ApiCart.deleteProductToCart({ userId, productItemId });
  return response.data as CartModel[];
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    resetCartStatus(state) {
      state.status = 'idle';
    },
    resetCart(state) {
      state.data = null,
        state.status = 'idle',
        state.error = null,
        state.orderInfo = null,
        state.statusOrder = 'idle';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'addSuccessed';
        state.error = null;
      })
      .addCase(addToCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteProductFromCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteProductFromCart.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'deleteSuccessed';
        state.error = null;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.error = action.error.message || '';
        state.status = 'failed';
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.error = action.error.message || '';
        state.status = 'failed';
      })
      .addCase(deleteProductFromCart.rejected, (state, action) => {
        state.error = action.error.message || '';
        state.status = 'failed';
      })
      .addCase(paymentVnpay.pending, (state) => {
        state.statusOrder = 'loading';
      })
      .addCase(paymentVnpay.fulfilled, (state, action) => {
        state.orderInfo = action.payload;
        state.statusOrder = 'succeeded';
      })
      .addCase(paymentVnpay.rejected, (state, action) => {
        state.error = action.error.message || '';
        state.statusOrder = 'failed';
      });
  }
});

export const { resetCartStatus, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
