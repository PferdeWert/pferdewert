// frontend/components/Layout.tsx

import React from "react";
import Header from "./Header";
import Footer from "./Footer";

type LayoutProps = {
  children: React.ReactNode;
  showFooter?: boolean;
  fullWidth?: boolean;
  background?: string;
};

export default function Layout({ 
  children, 
  showFooter = true, 
  fullWidth = false, 
  background 
}: LayoutProps) {
  return (
    <div className={`min-h-screen flex flex-col text-gray-900 ${background || "bg-gray-50"}`}>
      <Header />
      <main className={fullWidth ? "flex-1 w-full" : "flex-1 w-full max-w-6xl mx-auto px-4"}>
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
}