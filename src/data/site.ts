/** Shared site identity — keep in sync with index.html meta / JSON-LD. */
export const SITE_NAME = "ElevatED Learning Partners";
export const SITE_LEGAL_NAME = "ElevatED Learning Partners, LLC";
export const SITE_URL = "https://elevatedlearningpartners.com";
export const SITE_TAGLINE = "Purposeful Learning, Measurable Progress";
export const SITE_DESCRIPTION =
  "Learning design, professional training, and the technology that helps both last. For universities, organizations, and growing businesses.";

export const navLinks = [
  { href: "#offerings", label: "Offerings", sections: ["offerings"] },
  { href: "#innovation", label: "Innovation", sections: ["innovation"] },
  {
    href: "#course-quality-platform",
    label: "Portfolio",
    sections: ["course-quality-platform", "portfolio", "ai-essentials", "credentials"],
  },
  { href: "#about", label: "About", sections: ["about", "process"] },
] as const;

export const processSteps = [
  {
    number: "01",
    title: "Discover",
    copy: "We listen first, then define the real challenge, audience and measure of success.",
  },
  {
    number: "02",
    title: "Design",
    copy: "We prototype the right learning, workflow or experience with your context built in.",
  },
  {
    number: "03",
    title: "Implement",
    copy: "We build, test and refine with clear checkpoints and practical documentation.",
  },
  {
    number: "04",
    title: "Sustain",
    copy: "We transfer capability so your team can keep improving long after launch.",
  },
] as const;

export const heroImages = [
  "/brand/hero/01.jpg",
  "/brand/hero/02.jpg",
  "/brand/hero/03.jpg",
  "/brand/hero/04.jpg",
  "/brand/hero/05.jpg",
  "/brand/hero/06.jpg",
] as const;
