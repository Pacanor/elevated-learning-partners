import { useEffect } from "react";

/**
 * Reveal `.reveal` elements once as they enter the viewport.
 * Uses `data-revealed` (not a class) so React className updates cannot wipe visibility.
 */
export function useReveal(active = true) {
  useEffect(() => {
    if (!active) return;

    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal:not([data-revealed='true'])"),
    );
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach((element) => element.setAttribute("data-revealed", "true"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-revealed", "true");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -42px" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [active]);
}
