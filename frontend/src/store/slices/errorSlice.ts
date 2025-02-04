import { createSlice } from "@reduxjs/toolkit";

interface ErrorState {
  message: string | null;
  type: "error" | "success";
}

const initialState: ErrorState = {
  message: null,
  type: "error",
};

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setError: (state, action) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    clearError: (state) => {
      state.message = null;
    },
  },
});

export const { setError, clearError } = errorSlice.actions;
export default errorSlice.reducer;
