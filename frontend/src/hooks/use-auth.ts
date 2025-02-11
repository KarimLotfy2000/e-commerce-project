import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import {
  loginUser,
  registerUser,
  logoutUser,
  setLoginModalOpen,
} from "@/store/slices/authSlice";

const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    user,
    token,
    isAuthenticated,
    loadingLogin,
    loadingRegister,
    error,
    isLoginModalOpen,
  } = useSelector((state: RootState) => state.auth);

  const login = (email: string, password: string) => {
    dispatch(loginUser({ email, password }));
  };

  const register = async (name: string, email: string, password: string) => {
    const response = await dispatch(registerUser({ name, email, password }));
    return response.meta.requestStatus === "fulfilled";
  };

  const logout = () => {
    dispatch(logoutUser());
  };

  const showLoginModal = () => {
    dispatch(setLoginModalOpen(true));
  };

  const hideLoginModal = () => {
    dispatch(setLoginModalOpen(false));
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const shouldOpenLogin = sessionStorage.getItem("openLoginModal");
      if (shouldOpenLogin) {
        dispatch(setLoginModalOpen(true));
        sessionStorage.removeItem("openLoginModal");
      }
    }
  }, [dispatch]);

  return {
    user,
    token,
    isAuthenticated,
    loadingRegister,
    loadingLogin,
    error,
    login,
    register,
    logout,
    isLoginModalOpen,
    showLoginModal,
    hideLoginModal,
  };
};

export default useAuth;
