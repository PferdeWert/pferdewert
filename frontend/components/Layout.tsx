// frontend/components/Layout.tsx

import React from "react";
import Header from "./Header";
import Footer from "./Footer";

type LayoutProps = {
  children: React.ReactNode;
  showFooter?: boolean;
};

export default function Layout({ children, showFooter = true }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      <Header />
      <main className="flex-1 w-full max-w-6xl mx-auto px-4">{children}</main>
      {showFooter && <Footer />}
    </div>
  );
}
