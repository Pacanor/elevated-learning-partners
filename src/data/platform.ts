export const platformScreens = [
  {
    src: "/brand/platform/01-overview.png",
    alt: "Course Quality Benchmarking Platform overview with rubric-based review, leadership dashboard, and institution-isolated data",
  },
  {
    src: "/brand/platform/02-kpis.png",
    alt: "Course Quality Benchmarking Platform showing strongest and weakest standards with recently updated course reviews",
  },
  {
    src: "/brand/platform/03-heatmap.png",
    alt: "Course Quality Benchmarking Platform institutional heatmap with faculty development insight and maturity distribution",
  },
] as const;

/** Doubled for seamless CSS/JS marquee loops. */
export const platformStream = [...platformScreens, ...platformScreens];
