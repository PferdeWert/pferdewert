import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Footer from "@/components/Footer"; // Footer bleibt

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Footer /> {/* Footer unter jeder Seite */}
    </>
  );
}
