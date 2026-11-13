export const CONTACT_EMAIL = "team@elevatedlearningpartners.com";
export const CONTACT_DOMAIN = "elevatedlearningpartners.com";

export const WHATSAPP_NUMBER = "14439399177";

export const DP_TECH_URL = "https://www.digitalpolaroid.tech/";

/** Calendly discovery-call event used by Book a call / Request a demo popups. */
export const CALENDLY_URL = "https://calendly.com/elevatedlearningpartnersllc/discoverycall";

/**
 * Brand colours for Calendly embed query strings (must stay hex without #).
 * Keep in sync with CSS tokens: --forest, --tone-on-dark, --gold (Noir).
 */
export const CALENDLY_BRAND = {
  background: "0d261d",
  text: "f4f3eb",
  primary: "d2aa5c",
} as const;

/** Branded Calendly URL (kept for embed reuse; paid plans apply colour params). */
export const CALENDLY_INLINE_URL =
  `${CALENDLY_URL}?hide_gdpr_banner=1&background_color=${CALENDLY_BRAND.background}&text_color=${CALENDLY_BRAND.text}&primary_color=${CALENDLY_BRAND.primary}`;

export const createEmailLink = (subject: string, body = "", email = CONTACT_EMAIL) => {
  let href = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
  if (body) href += `&body=${encodeURIComponent(body)}`;
  return href;
};

export const createWhatsAppLink = (message: string, number = WHATSAPP_NUMBER) =>
  `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

export const enquireMessage = (item: string) =>
  `Hi, I noticed your ${item} on your website and would like to talk more about it.\n\n`;

export const enquireEmail = (item: string) =>
  createEmailLink(
    `Enquiry about ${item}`,
    `${enquireMessage(item)}A useful place to begin would be...\n\nThank you.`,
  );

export const enquireWhatsApp = (item: string, number?: string) =>
  createWhatsAppLink(enquireMessage(item).trim(), number ?? WHATSAPP_NUMBER);

export const leaders = [
  {
    name: "Eliza Osae-Kwapong, Ed.D.",
    shortName: "Eliza",
    role: "Co-founder · Learning Strategy & Analytics",
    bio: "Eliza is an experienced instructional designer and educator with over 18 years of experience in instructional design, faculty development, and learning analytics, alongside nearly two decades of teaching college-level mathematics. She creates accessible, learner-centered experiences through Universal Design for Learning (UDL), AI automation, and data-informed strategies.",
    image: "/team/eliza-osae-kwapong-portrait.jpg",
    phone: "+14439399177",
    email: `eliza@${CONTACT_DOMAIN}`,
    linkedin: "https://www.linkedin.com/in/elizaosaekwapong",
    whatsapp: "14439399177",
    qualification:
      "With certifications in Quality Matters course review and AI workflow automation, she combines evidence-based design, inclusive practices, and emerging technologies to enhance online learning and faculty support systems.",
  },
  {
    name: "Hannah Shelton, M.Ed.",
    shortName: "Hannah",
    role: "Co-founder · Instructional Design & Digital Pedagogy",
    bio: "Hannah is a tech-forward instructional designer with a master’s degree in Technology in Education and over a decade of experience in eLearning, instructional design, and curriculum development. She creates accessible, learner-centered experiences across LMS platforms, multimedia, and emerging AI technologies.",
    image: "/team/hannah-shelton-portrait.jpg",
    phone: "+14432209719",
    email: `hannah@${CONTACT_DOMAIN}`,
    linkedin: "https://www.linkedin.com/in/hannah-shelton-learning",
    whatsapp: "14432209719",
    qualification:
      "With certification in Quality Matters course review and Agentic AI Engineering, along with accessibility training through WebAIM, she combines evidence-based design, inclusive practices, and emerging technologies to create engaging, effective digital learning experiences.",
  },
] as const;
