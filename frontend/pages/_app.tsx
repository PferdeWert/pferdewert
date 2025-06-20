import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Footer from "@/components/Footer"; // ⬅️ das hier neu
import '../styles/fonts.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Footer /> {/* ⬅️ Footer kommt unter jede Seite */}
    </>
  );
}
