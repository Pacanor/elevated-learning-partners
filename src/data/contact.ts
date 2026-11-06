export const CONTACT_EMAIL = "team@elevatedlearningpartners.com";
export const CONTACT_DOMAIN = "elevatedlearningpartners.com";

export const WHATSAPP_NUMBER = "14439399177";

export const DP_TECH_URL = "https://www.digitalpolaroid.tech/";

/** Calendly event URL. Syncs live availability from Google/Outlook calendars. Replace with your team event link. */
export const CALENDLY_URL = "https://calendly.com/elevatedlearningpartners/intro";

export const createEmailLink = (subject: string, body: string, email = CONTACT_EMAIL) =>
  `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

export const createWhatsAppLink = (message: string, number = WHATSAPP_NUMBER) =>
  number ? `https://wa.me/${number}?text=${encodeURIComponent(message)}` : null;

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
    role: "Co-founder · Learning strategy & analytics",
    bio: "Eliza brings over 18 years of leadership in instructional design, faculty development and learning analytics, alongside nearly two decades teaching college-level mathematics. She specializes in accessibility, Universal Design for Learning, AI automation and data-informed transformation for universities and organizations worldwide.",
    image: "/team/eliza-osae-kwapong-portrait.jpg",
    phone: "+14439399177",
    phoneDisplay: "+1 (443) 939-9177",
    email: `eliza@${CONTACT_DOMAIN}`,
    linkedin: "https://www.linkedin.com/in/elizaosaekwapong",
    whatsapp: "14439399177",
    qualification:
      "Certified across Quality Matters course review and AI workflow automation, which sharpens her course reviews and the faculty support systems she designs.",
  },
  {
    name: "Hannah Shelton, M.Ed.",
    shortName: "Hannah",
    role: "Co-founder · Instructional design & digital pedagogy",
    bio: "Hannah is a tech-forward instructional designer with a Master’s in Technology in Education from Lesley University and more than a decade in eLearning, digital pedagogy and curriculum development. She builds accessible, learner-centered experiences across LMS platforms, multimedia and emerging AI-supported teaching tools.",
    image: "/team/hannah-shelton-portrait.jpg",
    phone: "+14432209719",
    phoneDisplay: "+1 (443) 220-9719",
    email: `hannah@${CONTACT_DOMAIN}`,
    linkedin: "https://www.linkedin.com/in/hannah-shelton-learning",
    whatsapp: "14432209719",
    qualification:
      "Certified across Quality Matters course review and applied AI, including Johns Hopkins and COABE, which sharpens the courses and faculty learning she designs.",
  },
] as const;
