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
    <>
      <Header />
      <main>{children}</main>
      {showFooter && <Footer />}
    </>
  );
}
