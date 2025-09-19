import Head from "next/head";
import StripeLoadingScreen from "@/components/StripeLoadingScreen";

export default function TestLoading() {
  return (
    <>
      <Head>
        <title>Test Loading | PferdeWert</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <StripeLoadingScreen />
    </>
  );
}