import { describe, expect, it } from "vitest";
import {
  CALENDLY_INLINE_URL,
  CALENDLY_URL,
  CONTACT_EMAIL,
  createEmailLink,
  createWhatsAppLink,
  enquireEmail,
  enquireWhatsApp,
} from "./contact";

describe("contact helpers", () => {
  it("builds mailto links with encoded subject and body", () => {
    const href = createEmailLink("Hello & welcome", "Line 1\nLine 2");
    expect(href).toContain(`mailto:${CONTACT_EMAIL}?`);
    expect(href).toContain("subject=Hello%20%26%20welcome");
    expect(href).toContain("body=Line%201%0ALine%202");
  });

  it("builds WhatsApp deep links", () => {
    const href = createWhatsAppLink("Hi there", "14439399177");
    expect(href).toBe("https://wa.me/14439399177?text=Hi%20there");
  });

  it("builds enquire email and WhatsApp URLs for a named item", () => {
    expect(enquireEmail("Faculty Hub")).toContain("Enquiry%20about%20Faculty%20Hub");
    expect(enquireWhatsApp("Faculty Hub")).toContain("wa.me/14439399177");
    expect(enquireWhatsApp("Faculty Hub")).toContain("Faculty%20Hub");
  });

  it("keeps Calendly discovery URL and branded inline params", () => {
    expect(CALENDLY_URL).toContain("discoverycall");
    expect(CALENDLY_INLINE_URL).toContain("background_color=0d261d");
    expect(CALENDLY_INLINE_URL).toContain("primary_color=d2aa5c");
  });
});
