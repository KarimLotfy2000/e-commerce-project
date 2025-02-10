"use client";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import Snackbar from "@/components/Snackbar/Snackbar";
import { Toaster } from "@/components/ui/toaster";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      {children}
      <Snackbar />
      <Toaster />
    </Provider>
  );
}
