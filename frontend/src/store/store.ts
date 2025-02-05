import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/store/slices/authSlice";
import errorReducer from "@/store/slices/errorSlice";
import categoriesReducer from "@/store/slices/categoriesSlice";
import cartReducer from "@/store/slices/cartSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    error: errorReducer,
    categories: categoriesReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
