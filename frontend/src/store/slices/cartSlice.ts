import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/api/apiClient";
import { Cart } from "@/config/types/cart";
import { setError } from "@/store/slices/errorSlice";

export const LOCAL_STORAGE_KEY = "totalItems";

const loadTotalItems = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(LOCAL_STORAGE_KEY)
      ? parseInt(localStorage.getItem(LOCAL_STORAGE_KEY)!)
      : 0;
  }
  return 0;
};

// ✅ Fetch Cart
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/cart");
      const cartData = response.data.data;
      localStorage.setItem(LOCAL_STORAGE_KEY, cartData.totalItems.toString());
      return cartData as Cart;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch cart"
      );
    }
  }
);

// ✅ Add to Cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (sizeVariantId: number, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.post(
        `/cart/add?sizeVariantId=${sizeVariantId}`
      );
      const cartData = response.data.data;
      localStorage.setItem(LOCAL_STORAGE_KEY, cartData.totalItems.toString());
      dispatch(setError({ message: "Item added to cart!", type: "success" }));
      return cartData as Cart;
    } catch (error: any) {
      dispatch(
        setError({
          message: error.response?.data?.message || "Failed to add to cart",
          type: "error",
        })
      );
      return rejectWithValue(
        error.response?.data?.message || "Failed to add to cart"
      );
    }
  }
);

// ✅ Clear Cart
export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.delete("/cart/clear");
      localStorage.setItem(LOCAL_STORAGE_KEY, "0");
      dispatch(
        setError({ message: "Cart cleared successfully!", type: "success" })
      );
      return response.data.data as Cart;
    } catch (error: any) {
      dispatch(
        setError({
          message: error.response?.data?.message || "Failed to clear cart",
          type: "error",
        })
      );
      return rejectWithValue(
        error.response?.data?.message || "Failed to clear cart"
      );
    }
  }
);

// ✅ Update Cart Quantity
export const updateCartQuantity = createAsyncThunk(
  "cart/updateCartQuantity",
  async (
    { cartItemId, quantity }: { cartItemId: number; quantity: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.patch(
        `/cart/update-quantity/${cartItemId}?quantity=${quantity}`
      );
      const cartData = response.data.data;
      localStorage.setItem(LOCAL_STORAGE_KEY, cartData.totalItems.toString());
      return cartData as Cart;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update quantity"
      );
    }
  }
);

// ✅ Remove Item from Cart
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (cartItemId: number, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.delete(`/cart/remove/${cartItemId}`);
      const cartData = response.data.data;
      localStorage.setItem(LOCAL_STORAGE_KEY, cartData.totalItems.toString());
      dispatch(
        setError({ message: "Item removed successfully!", type: "default" })
      );
      return cartData as Cart;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove item"
      );
    }
  }
);

interface CartState extends Cart {
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  id: 0,
  totalPrice: 0,
  totalItems: loadTotalItems(),
  cartItems: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setTotalItems: (state, action) => {
      state.totalItems = action.payload;
      localStorage.setItem(LOCAL_STORAGE_KEY, action.payload.toString());
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ Fetch Cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        Object.assign(state, action.payload);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // ✅ Add to Cart
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        Object.assign(state, action.payload);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // ✅ Clear Cart
      .addCase(clearCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.loading = false;
        Object.assign(state, action.payload);
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // ✅ Update Cart Quantity
      .addCase(updateCartQuantity.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.loading = false;
        Object.assign(state, action.payload);
      })
      .addCase(updateCartQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // ✅ Remove from Cart
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        Object.assign(state, action.payload);
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setTotalItems } = cartSlice.actions;
export default cartSlice.reducer;
