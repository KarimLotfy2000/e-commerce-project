import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import {
  loginUser,
  registerUser,
  logoutUser,
  resetAuthError,
} from "@/store/slices/authSlice";

const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, token, isAuthenticated, loadingLogin, loadingRegister, error } =
    useSelector((state: RootState) => state.auth);

  const login = async (email: string, password: string) => {
    dispatch(resetAuthError());
    await dispatch(loginUser({ email, password }));
  };

  const register = async (name: string, email: string, password: string) => {
    dispatch(resetAuthError());
    try {
      await dispatch(registerUser({ name, email, password })).unwrap();
      return true;
    } catch {
      return false;
    }
  };

  const logout = () => {
    dispatch(logoutUser());
  };

  const resetError = () => {
    dispatch(resetAuthError());
  };

  return {
    user,
    token,
    isAuthenticated,
    loadingLogin,
    loadingRegister,
    error,
    login,
    register,
    logout,
    resetError,
  };
};

export default useAuth;
