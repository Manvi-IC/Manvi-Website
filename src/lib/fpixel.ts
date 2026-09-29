declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

export const FB_PIXEL_ID =
  process.env.NEXT_FB_PIXEL_ID || "1651739266657305";

export const trackEvent = (
  name: string,
  params: Record<string, unknown> = {},
) => {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", name, params);
  }
};

export const trackCustom = (
  name: string,
  params: Record<string, unknown> = {},
) => {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("trackCustom", name, params);
  }
};