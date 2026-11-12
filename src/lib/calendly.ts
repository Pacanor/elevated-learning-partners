import { CALENDLY_INLINE_URL, CALENDLY_URL } from "../data/contact";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
      initInlineWidget?: (options: {
        url: string;
        parentElement: HTMLElement;
      }) => void;
    };
  }
}

/**
 * Production-stable popup opener.
 * Relies on widget.css + widget.js from index.html (same as live).
 */
export function openCalendly() {
  if (window.Calendly?.initPopupWidget) {
    window.Calendly.initPopupWidget({ url: CALENDLY_URL });
    return;
  }
  window.open(CALENDLY_URL, "_blank", "noopener,noreferrer");
}

/** Mount the branded inline embed once the widget API is available. */
export function mountCalendlyInline(host: HTMLElement) {
  if (!window.Calendly?.initInlineWidget) return false;
  host.innerHTML = "";
  window.Calendly.initInlineWidget({
    url: CALENDLY_INLINE_URL,
    parentElement: host,
  });
  return true;
}
