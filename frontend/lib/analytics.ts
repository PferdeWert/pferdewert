// frontend/lib/analytics.ts
// GA4 Analytics Configuration for PferdeWert.de

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";

// Track page views
export const trackPageView = (url: string): void => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", GA_TRACKING_ID, {
      page_location: url,
    });
  }
};

// Track form progression through wizard steps
export const trackFormProgress = (stepNumber: number, stepName: string): void => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "form_progress", {
      event_category: "Engagement",
      event_label: `${stepName} - Step ${stepNumber}`,
      step_number: stepNumber,
      form_name: "pferde_bewertung_form",
      non_interaction: false
    });
  }
};

// Track when user starts the valuation process
export const trackValuationStart = (): void => {
  if (typeof window !== "undefined" && window.gtag) {
    console.log("🎯 [GA4] Firing pferde_bewertung_started event");
    window.gtag("event", "pferde_bewertung_started", {
      event_category: "Conversion Funnel",
      event_label: "Valuation Process Started",
      value: 0,
      custom_parameters: {
        page_location: window.location.href,
        timestamp: new Date().toISOString()
      }
    });
  } else {
    console.warn("🎯 [GA4] trackValuationStart called but gtag not available");
  }
};

// Track payment initiation (begin_checkout)
export const trackPaymentStart = (formData: Record<string, unknown>): void => {
  // Enhanced error handling and retry mechanism for GA4 timing issues
  const sendEvent = () => {
    if (typeof window !== "undefined" && window.gtag) {
      console.log("🎯 [GA4] Firing begin_checkout event", formData);
      // Enhanced E-commerce begin_checkout event
      window.gtag("event", "begin_checkout", {
        event_category: "E-commerce",
        event_label: "Payment Initiated",
        value: 14.90,
        currency: "EUR",
        items: [{
          item_id: "pferde-bewertung",
          item_name: "Professionelle Pferdebewertung",
          category: "AI-Service", 
          quantity: 1,
          price: 14.90
        }],
        custom_parameters: {
          horse_breed: formData.rasse || "unknown",
          horse_age: formData.alter || "unknown",
          horse_discipline: formData.haupteignung || "unknown",
          form_completion_time: formData.completionTime || 0
        }
      });

      // Custom conversion funnel event
      window.gtag("event", "pferde_payment_started", {
        event_category: "Conversion Funnel",
        event_label: "Payment Process Initiated",
        value: 14.90,
        currency: "EUR"
      });
      return true;
    }
    return false;
  };

  // Immediate attempt
  if (sendEvent()) return;

  // Retry with delays for GA4 initialization timing
  console.warn("🎯 [GA4] gtag not ready, retrying begin_checkout...");
  setTimeout(() => {
    if (!sendEvent()) {
      setTimeout(() => {
        if (!sendEvent()) {
          console.error("🎯 [GA4] Failed to send begin_checkout after retries");
        }
      }, 500);
    }
  }, 200);
};

// Track successful horse valuation completion (main conversion)
export const trackValuationCompleted = (
  sessionId: string, 
  bewertungId: string,
  paymentMethod?: string
): void => {
  if (typeof window !== "undefined" && window.gtag) {
    console.log("🎯 [GA4] Firing purchase event", { sessionId, bewertungId, paymentMethod });
    // Enhanced E-commerce purchase event
    window.gtag("event", "purchase", {
      transaction_id: sessionId,
      value: 14.90,
      currency: "EUR",
      items: [{
        item_id: "pferde-bewertung",
        item_name: "Professionelle Pferdebewertung",
        category: "AI-Service",
        quantity: 1,
        price: 14.90
      }],
      custom_parameters: {
        bewertung_id: bewertungId,
        payment_method: paymentMethod || "unknown",
        service_type: "horse_valuation"
      }
    });

    // Primary conversion event for GA4 Goals
    window.gtag("event", "pferde_bewertung_completed", {
      event_category: "Conversion",
      event_label: "Horse Valuation Completed Successfully",
      value: 14.90,
      currency: "EUR",
      custom_parameters: {
        bewertung_id: bewertungId,
        session_id: sessionId,
        completion_timestamp: new Date().toISOString()
      }
    });

  }
};

// Track PDF download (secondary conversion)
export const trackPDFDownload = (bewertungId: string): void => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "file_download", {
      event_category: "Engagement",
      event_label: "PDF Report Downloaded",
      file_name: "PferdeWert-Analyse.pdf",
      file_extension: "pdf",
      link_url: window.location.href,
      custom_parameters: {
        bewertung_id: bewertungId,
        download_timestamp: new Date().toISOString()
      }
    });

    // Custom PDF download event
    window.gtag("event", "pferde_pdf_download", {
      event_category: "Post-Conversion",
      event_label: "Analysis PDF Downloaded",
      value: 0,
      custom_parameters: {
        bewertung_id: bewertungId
      }
    });
  }
};

// Track form abandonment for optimization insights
export const trackFormAbandonment = (lastCompletedStep: number, totalSteps: number): void => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "form_abandon", {
      event_category: "Engagement",
      event_label: `Form Abandoned at Step ${lastCompletedStep}/${totalSteps}`,
      value: 0,
      custom_parameters: {
        last_completed_step: lastCompletedStep,
        total_steps: totalSteps,
        abandonment_rate: (lastCompletedStep / totalSteps) * 100,
        page_url: window.location.href
      }
    });
  }
};

// Track regional keyword performance (for SEO insights)
export const trackRegionalKeyword = (region: string, keyword: string): void => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "regional_keyword_landing", {
      event_category: "SEO",
      event_label: `${keyword} - ${region}`,
      custom_parameters: {
        region: region,
        target_keyword: keyword,
        landing_page: window.location.pathname
      }
    });
  }
};

// Helper function to get form completion time
export const calculateFormCompletionTime = (startTime: number): number => {
  return Math.round((Date.now() - startTime) / 1000); // in seconds
};