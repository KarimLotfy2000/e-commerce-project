"use client";
import "./globals.css";
import Navbar from "@/components/Layout/Navbar/Navbar";
import Footer from "@/components/Layout/Footer/Footer";
import React, { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import Snackbar from "@/components/Snackbar/Snackbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <Provider store={store}>
        <body className="flex flex-col min-h-screen">
          <Navbar />
          <Snackbar />
          <div className="grow">
            <main>{children}</main>
          </div>
          <Footer />
          <Toaster />
        </body>
      </Provider>
    </html>
  );
}
