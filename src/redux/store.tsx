import {
    Action,
    combineReducers,
    configureStore,
    ThunkAction,
} from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import createWebStorage from "redux-persist/es/storage/createWebStorage";
import authReducer from "@/redux/features/auth/authSlice";
import cartReducer from "@/redux/features/cart/cartSlice";

const createNoopStorage = () => {
    return {
        getItem(_key: any) {
            return Promise.resolve(null);
        },
        setItem(_key: any, value: any) {
            return Promise.resolve(value);
        },
        removeItem(_key: any) {
            return Promise.resolve();
        },
    };
};

const storage =
    typeof window === "undefined"
        ? createNoopStorage()
        : createWebStorage("local");

const authPersistConfig = {
    key: "auth",
    version: 1,
    storage,
};

// const cartPersistConfig = {
//     key: "cart",
//     version: 1,
//     storage,
// };

const rootReducer = combineReducers({
    authCredentials: persistReducer(authPersistConfig, authReducer),
    // cartCredentials: persistReducer(cartPersistConfig, cartReducer),
});

const persistConfig = {
    key: "root",
    version: 1,
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }).concat(),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
