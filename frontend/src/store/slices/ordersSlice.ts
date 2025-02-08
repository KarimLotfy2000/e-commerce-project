import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/api/apiClient";
import { Order } from "@/config/types/order";

interface OrdersState {
  recentOrders: Order[];
  allOrders: Order[];
  loading: boolean;
  error: string | null;
}
const initialState: OrdersState = {
  recentOrders: [],
  allOrders: [],
  loading: false,
  error: null,
};

// ✅ Fetch recent 5 orders
export const fetchRecentOrders = createAsyncThunk(
  "orders/fetchRecentOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/order/recent-orders");
      return response.data.data as Order[];
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch recent orders"
      );
    }
  }
);

// ✅ Fetch all orders
export const fetchAllOrders = createAsyncThunk(
  "orders/fetchAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/order/my-orders");
      return response.data.data as Order[];
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch all orders"
      );
    }
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecentOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRecentOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.recentOrders = action.payload;
      })
      .addCase(fetchRecentOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.allOrders = action.payload;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default ordersSlice.reducer;
