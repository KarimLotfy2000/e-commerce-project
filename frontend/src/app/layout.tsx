import "./globals.css";
import { Navbar } from "@/components/Layout/Navbar/Navbar";
import Footer from "@/components/Layout/Footer/Footer";
import React, { ReactNode } from "react";

export const metadata = {
  title: "FashionFusion - Your Online Clothing Store",
  description: "Shop the latest fashion trends at FashionFusion.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <div className="grow">
           <main>{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
