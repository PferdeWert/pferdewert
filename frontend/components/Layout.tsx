// frontend/components/Layout.tsx

import React from "react";
import Footer from "./Footer";

// Layout-Komponente für konsistente Seitenstruktur
// Nutzt optional Footer (showFooter kann z. B. bei PDF-Ansicht deaktiviert werden)
type LayoutProps = {
  children: React.ReactNode;
  showFooter?: boolean;
};

export default function Layout({ children, showFooter = true }: LayoutProps) {
  return (
    <>
      <main>{children}</main>
      {showFooter && <Footer />}
    </>
  );
}
