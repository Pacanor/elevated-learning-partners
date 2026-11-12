import { enquireEmail, enquireWhatsApp } from "./contact";

export type InnovationItem =
  | {
      number: string;
      id: string;
      tone: "forest" | "gold" | "mint" | "sage";
      audience: string;
      title: string;
      summary: string;
      detail: string;
      points: readonly string[];
      cta: string;
      href: string;
      secondaryCta: string;
      secondaryHref: string;
      calendly?: undefined;
    }
  | {
      number: string;
      id: string;
      tone: "forest" | "gold" | "mint" | "sage";
      audience: string;
      title: string;
      summary: string;
      detail: string;
      points: readonly string[];
      cta: string;
      calendly: true;
      secondaryCta: string;
      secondaryHref: string;
      href?: undefined;
    };

export const innovations: InnovationItem[] = [
  {
    number: "01",
    id: "product-hub",
    tone: "forest",
    audience: "Faculty support",
    title: "Faculty Digital Support Hub",
    summary: "Smarter support for educators and instructional teams.",
    detail:
      "A centralized solution that organizes, routes, and tracks faculty support requests, improving response times, accountability, and continuous improvement.",
    points: [
      "Intelligent request routing",
      "Centralized, searchable records",
      "Insights for continuous improvement",
    ],
    cta: "Email us about faculty support",
    href: enquireEmail("Faculty Digital Support Hub"),
    secondaryCta: "WhatsApp",
    secondaryHref: enquireWhatsApp("Faculty Digital Support Hub"),
  },
  {
    number: "02",
    id: "product-benchmark",
    tone: "gold",
    audience: "Higher education",
    title: "Course Quality Benchmark Tool",
    summary: "Transform course reviews into actionable insights.",
    detail:
      "An AI-assisted, human-validated course evaluation tool informed by Quality Matters (QM) standards that assesses instructional design, accessibility, and course quality, identifies trends across programs, and provides actionable insights for continuous improvement.",
    points: [
      "Course quality insights informed by Quality Matters (QM) standards",
      "AI-assisted, human-validated reviews that support continuous improvement",
      "Accessibility evaluation against WCAG 2.1 AA",
    ],
    cta: "Request a demo",
    calendly: true,
    secondaryCta: "WhatsApp",
    secondaryHref: enquireWhatsApp("Course Quality Benchmarking Platform"),
  },
  {
    number: "03",
    id: "product-automation",
    tone: "mint",
    audience: "Business & organizational workflows",
    title: "AI & automation solutions",
    summary: "Smarter processes. More time for meaningful work.",
    detail:
      "Practical AI-powered solutions that help educational institutions, organizations, and growing businesses automate repetitive tasks, streamline communication, improve scheduling, and manage everyday operations more efficiently.",
    points: [
      "Automated communication and follow-ups",
      "Streamlined scheduling and administrative workflows",
      "Improved tracking and operational efficiency",
    ],
    cta: "Email us about automation",
    href: enquireEmail("AI and automation"),
    secondaryCta: "WhatsApp",
    secondaryHref: enquireWhatsApp("AI and automation"),
  },
  {
    number: "04",
    id: "product-technology",
    tone: "sage",
    audience: "Teaching & learning",
    title: "Learning technology integration",
    summary: "Technology designed around teaching and learning.",
    detail:
      "Strategic selection, integration, and optimization of learning management systems, digital learning tools, and interactive technologies that enhance instruction and learner engagement.",
    points: [
      "LMS and learning technology integration",
      "Digital and interactive learning tools",
      "Practical implementation and adoption support",
    ],
    cta: "Email us about learning technology",
    href: enquireEmail("Learning technology integration"),
    secondaryCta: "WhatsApp",
    secondaryHref: enquireWhatsApp("Learning technology integration"),
  },
];
