// Debug helper for GA4 testing
export const debugGA4 = (): void => {
  if (typeof window === "undefined") {
    console.log("🔍 [GA4 DEBUG] Running on server side");
    return;
  }

  console.log("🔍 [GA4 DEBUG] Starting GA4 debug check...");
  
  // Check if gtag is available
  console.log("🔍 [GA4 DEBUG] window.gtag available:", !!window.gtag);
  console.log("🔍 [GA4 DEBUG] dataLayer:", window.dataLayer?.length || "not found");
  
  // Check GA ID from env
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  console.log("🔍 [GA4 DEBUG] GA_MEASUREMENT_ID:", gaId ? `${gaId.slice(0, 5)}...` : "NOT SET");
  
  // Check cookie consent
  const cookieConsent = document.cookie.includes("pferdewert_cookie_consent=allow");
  console.log("🔍 [GA4 DEBUG] Cookie consent granted:", cookieConsent);
  
  // Test event
  if (window.gtag) {
    console.log("🔍 [GA4 DEBUG] Sending test event...");
    window.gtag("event", "debug_test", {
      event_category: "Debug",
      event_label: "Manual Debug Test",
      debug_time: new Date().toISOString()
    });
  }
};

// Add to window for console access
if (typeof window !== "undefined") {
  (window as any).debugGA4 = debugGA4;
}