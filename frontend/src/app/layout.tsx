import "./globals.css";
import Navbar from "@/components/Layout/Navbar/Navbar";
import Footer from "@/components/Layout/Footer/Footer";
import React, { ReactNode } from "react";

import Providers from "@/components/Layout/Providers/Providers";

export const metadata = {
  title: {
    default: "FashionFusion - Trendy Fashion for Everyone",
    template: "%s | FashionFusion",
  },
  description:
    "Discover the latest fashion trends for men and women at FashionFusion.",
  openGraph: {
    title: "FashionFusion - Trendy Fashion for Everyone",
    description: "Shop the latest trends in clothing, accessories, and more.",
    // url: "https://fashionfusion.com",
    siteName: "FashionFusion",
    type: "website",
    icons: {
      icon: "/favicon.ico",
    },
  },
};
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body className="flex flex-col min-h-screen">
        <Providers>
          <Navbar />
          <div className="grow">
            <main>{children}</main>
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
