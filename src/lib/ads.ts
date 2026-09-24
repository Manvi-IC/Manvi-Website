export const ADS = {
  leadForm: "AW-16880308122/jB3TCL-RwNccEJqflPE-",
  whatsapp: "AW-16880308122/9ekfCIS399ccEJqflPE-",
  requestQuote: "AW-16880308122/iOWzCJbhrtccEJqflPE-",
  clickToCall: "AW-16880308122/aoaYCMbx5dccEJqflPE-",
  phoneConfig: "AW-16880308122/Ek21CIif9tccEJqflPE-",
} as const;

export function gtagEvent(...args: any[]) {
  if (typeof window === "undefined") return;

  const dataLayer = window.dataLayer || [];
  window.dataLayer = dataLayer;

  if (typeof window.gtag === "function") {
    window.gtag(...args);
    return;
  }

  const gtagFn = (...payload: any[]) => {
    dataLayer.push(payload);
  };

  window.gtag = gtagFn;
  window.gtag(...args);
}

export function fireLeadFormConversion() {
  gtagEvent("event", "conversion", { send_to: ADS.leadForm });
}

export function fireWhatsappConversion() {
  gtagEvent("event", "conversion", { send_to: ADS.whatsapp });
}

export function fireRequestQuoteConversion() {
  gtagEvent("event", "conversion", { send_to: ADS.requestQuote });
}

export function firePhoneConfig() {
  gtagEvent("config", ADS.phoneConfig, {
    phone_conversion_number: "7070506070",
  });
}

export function fireClickToCallConversion(url?: string) {
  const callback = () => {
    if (typeof url !== "undefined" && url) {
      window.location.href = url;
    }
  };

  gtagEvent("event", "conversion", {
    send_to: ADS.clickToCall,
    event_callback: callback,
  });

  return false;
}
