import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/api/apiClient";
import { Category } from "@/config/types/product";

interface CategoryState {
  categories: Category[] | null;
  loading: boolean;
  error: string | null;
}

export const fetchCategories = createAsyncThunk(
  "categories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/categories");
      return response.data.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch categories");
    }
  }
);

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});
export default categoriesSlice.reducer;
