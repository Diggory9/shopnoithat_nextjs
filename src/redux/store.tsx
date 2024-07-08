import { Action, combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
} from 'redux-persist';
import cartSlice from "@/redux/features/cart/cartSlice";
import authSlice from "@/redux/features/auth/authSlice";
import { thunk, ThunkAction } from "redux-thunk";

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'cart'],
};


// Combine reducers
const rootReducer = combineReducers({
  cart: cartSlice,
  auth: authSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);


// Persist the combined reducers
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(thunk),
});
// Infer the type of makeStore
// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
export const persistor = persistStore(store);
