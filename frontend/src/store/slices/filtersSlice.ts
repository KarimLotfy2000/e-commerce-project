import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/api/apiClient";
import { ProductFilterParams } from "@/config/types/filter";

interface FiltersState {
  brands: string[];
  colors: string[];
  minPrice: number;
  maxPrice: number;
  selectedFilters: ProductFilterParams;
  loading: boolean;
  error: string | null;
}

const initialState: FiltersState = {
  brands: [],
  colors: [],
  minPrice: 0,
  maxPrice: 0,
  selectedFilters: {
    brand: undefined,
    color: undefined,
    minPrice: 0,
    maxPrice: 0,
    sortBy: undefined,
    order: "asc",
  },
  loading: false,
  error: null,
};

export const fetchFilters = createAsyncThunk(
  "filters/fetchFilters",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/products/filters");
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch filters"
      );
    }
  }
);

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.selectedFilters = { ...state.selectedFilters, ...action.payload };
    },
    resetFilters: (state) => {
      state.selectedFilters = {
        brand: undefined,
        color: undefined,
        minPrice: undefined,
        maxPrice: undefined,
        sortBy: undefined,
        order: "asc",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilters.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.brands = action.payload.brands.sort((a: string, b: string) =>
          a.localeCompare(b)
        );
        state.colors = action.payload.colors.sort((a: string, b: string) =>
          a.localeCompare(b)
        );
        state.minPrice = action.payload.minPrice;
        state.maxPrice = action.payload.maxPrice;
        state.selectedFilters.minPrice = action.payload.minPrice;
        state.selectedFilters.maxPrice = action.payload.maxPrice;
      })
      .addCase(fetchFilters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setFilters, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
