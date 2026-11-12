import { useEffect } from "react";

type Options = {
  onNavigate?: () => void;
};

/** Soft custom easing for in-page hash links; respects reduced motion. */
export function useSoftHashScroll({ onNavigate }: Options = {}) {
  useEffect(() => {
    let frame = 0;
    const scrollToTarget = (target: HTMLElement) => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const margin = Number.parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
      const end = target.getBoundingClientRect().top + window.scrollY - margin;
      if (reduce) {
        window.scrollTo(0, end);
        return;
      }
      const start = window.scrollY;
      const distance = end - start;
      if (Math.abs(distance) < 2) return;

      // Soft accel → cruise → soft decel (~0.5s edges).
      const edge = 500;
      const cruise = Math.min(1800, Math.max(520, Math.abs(distance) * 0.42));
      const duration = edge * 2 + cruise;
      const started = performance.now();
      const root = document.documentElement;
      root.style.scrollBehavior = "auto";

      const integSmooth = (u: number) => {
        const x = Math.min(1, Math.max(0, u));
        return x * x * x - 0.5 * x * x * x * x;
      };
      const totalWeight = edge + cruise;
      const progressAt = (elapsed: number) => {
        if (elapsed <= edge) return (edge * integSmooth(elapsed / edge)) / totalWeight;
        if (elapsed <= edge + cruise) return (edge * 0.5 + (elapsed - edge)) / totalWeight;
        const u = Math.min(1, (elapsed - edge - cruise) / edge);
        return (edge * 0.5 + cruise + edge * (u - integSmooth(u))) / totalWeight;
      };

      const step = () => {
        const elapsed = performance.now() - started;
        const t = Math.min(1, progressAt(elapsed));
        window.scrollTo(0, start + distance * t);
        if (elapsed < duration) {
          frame = window.requestAnimationFrame(step);
          return;
        }
        window.scrollTo(0, end);
        root.style.scrollBehavior = "";
      };
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(step);
    };

    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }
      const link = (event.target as Element | null)?.closest("a[href^='#']");
      if (!(link instanceof HTMLAnchorElement)) return;
      const href = link.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!(target instanceof HTMLElement)) return;
      event.preventDefault();
      scrollToTarget(target);
      history.pushState(null, "", href);
      onNavigate?.();
    };

    document.addEventListener("click", onClick);
    return () => {
      window.cancelAnimationFrame(frame);
      document.documentElement.style.scrollBehavior = "";
      document.removeEventListener("click", onClick);
    };
  }, [onNavigate]);
}
