import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "@/lib/api/apiClient";
import { setError } from "@/store/slices/errorSlice";
import { User } from "@/config/types/user";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loadingLogin: boolean;
  loadingRegister: boolean;
  error: string | null;
  isLoginModalOpen: boolean;
}

const getUserFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }
  return null;
};

const getTokenFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token") || null;
  }
  return null;
};

// **REGISTER ACTION**
export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    userData: { name: string; email: string; password: string },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const response = await api.post("/auth/register", userData);
      dispatch(
        setError({ message: "Registration successful!", type: "success" })
      );
      return response.data.message;
    } catch (error: any) {
      dispatch(
        setError({
          message: error.response?.data?.message || "Registration failed",
          type: "error",
        })
      );
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

// **LOGIN ACTION**
export const loginUser = createAsyncThunk(
  "auth/login",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const response = await api.post("/auth/login", credentials);
      const { token, name, email, role } = response.data.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify({ name, email, role }));

      dispatch(setError({ message: "Login successful!", type: "success" }));
      return { token, user: { name, email, role } };
    } catch (error: any) {
      dispatch(
        setError({
          message: error.response?.data?.message || "Login failed",
          type: "error",
        })
      );
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// **LOGOUT ACTION**
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch }) => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("totalItems");

    dispatch(
      setError({ message: "Logged out successfully!", type: "success" })
    );
    return null;
  }
);

const initialState: AuthState = {
  user: getUserFromLocalStorage(),
  token: getTokenFromLocalStorage(),
  isAuthenticated: !!getTokenFromLocalStorage(),
  loadingLogin: false,
  loadingRegister: false,
  error: null,
  isLoginModalOpen: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthError: (state) => {
      state.error = null;
    },
    setLoginModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isLoginModalOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // **REGISTER REDUCERS**
      .addCase(registerUser.pending, (state) => {
        state.loadingRegister = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loadingRegister = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loadingRegister = false;
        state.error = action.payload as string;
      })
      // **LOGIN REDUCERS**
      .addCase(loginUser.pending, (state) => {
        state.loadingLogin = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.loadingLogin = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loadingLogin = false;
        state.error = action.payload as string;
      })
      // **LOGOUT REDUCERS**
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      });
  },
});

export const { resetAuthError, setLoginModalOpen } = authSlice.actions;
export default authSlice.reducer;
