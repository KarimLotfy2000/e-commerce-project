import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/api/apiClient";

interface Address {
  id: number;
  street: string;
  city: string;
  country: string;
  zipCode: string;
}

interface CheckoutState {
  selectedAddress: Address | null;
  paymentMethod: string | null;
  addresses: Address[];
  order: Order;
  loading: boolean;
  error: string | null;
}

interface Order {
  id: number;
  address: Address;
  paymentMethod: string;
  status: string;
  totalPrice: number;
  orderDate: string;
}

const initialState: CheckoutState = {
  selectedAddress: null,
  paymentMethod: null,
  addresses: [],
  order: {
    id: 0,
    address: {
      id: 0,
      street: "",
      city: "",
      country: "",
      zipCode: "",
    },
    paymentMethod: "",
    status: "",
    totalPrice: 0,
    orderDate: "",
  },
  loading: false,
  error: null,
};

// ✅ Fetch User Addresses
export const fetchAddresses = createAsyncThunk(
  "checkout/fetchAddresses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/user/addresses");
      return response.data.data as Address[];
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch addresses"
      );
    }
  }
);

// ✅ Add New Address
export const addAddress = createAsyncThunk(
  "checkout/addAddress",
  async (
    newAddress: {
      street: string;
      city: string;
      country: string;
      zipCode: string;
    },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const response = await api.post("/user/addresses", newAddress);
      dispatch(fetchAddresses());
      return response.data.data as Address;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add address"
      );
    }
  }
);

// ✅ Make Order
export const makeOrder = createAsyncThunk(
  "checkout/makeOrder",
  async (
    {
      savedAddressId,
      paymentMethod,
    }: { savedAddressId: number; paymentMethod: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post("/order", {
        savedAddressId,
        paymentMethod,
      });
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to make order"
      );
    }
  }
);

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setSelectedAddress: (state, action) => {
      state.selectedAddress = action.payload;
    },
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ Fetch User Addresses
      .addCase(fetchAddresses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = action.payload;
      })
      .addCase(fetchAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // ✅ Add New Address
      .addCase(addAddress.pending, (state) => {
        state.loading = true;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // ✅ Make Order
      .addCase(makeOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(makeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order.address = action.payload.address;
        state.order.paymentMethod = action.payload.paymentMethod;
        state.order.id = action.payload.id;
        state.order.status = action.payload.status;
        state.order.totalPrice = action.payload.totalPrice;
        state.order.orderDate = action.payload.orderDate;
        localStorage.setItem("orderCompleted", "true"); // ✅ Save order completion flag
      })
      .addCase(makeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedAddress, setPaymentMethod } = checkoutSlice.actions;
export default checkoutSlice.reducer;
