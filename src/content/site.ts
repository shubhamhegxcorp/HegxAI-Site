// Site content and configuration
// HARD RULE: Only real data. If empty, components hide the section/block instead of showing fake placeholders.

export interface SiteContent {
  hero: {
    subtitle: string;
  };
  contact: {
    email: string;
    bookingUrl: string;
    newsletterAction: string;
  };
  founder: {
    name: string;
    role: string;
    photo: string;
    bio: string;
  };
  clientLogos: Array<{ name: string; logoUrl: string }>;
  logos: Array<{ name: string; url: string }>;
  pricingTiers: Array<{
    name: string;
    price: string;
    period: string;
    description: string;
    features: string[];
  }>;
  socials: Array<{ label: string; href: string }>;
  legal: Array<{ label: string; href: string }>;
}

export const ACTIVE_SECTIONS = [
  { id: "about", label: "ABOUT US" },
  { id: "features", label: "THE FEATURES" },
  { id: "why-automate", label: "WHY AUTOMATE" },
  { id: "services", label: "SERVICES" },
  { id: "process", label: "THE PROCESS" },
  { id: "pricing", label: "FLEXIBLE ENGAGEMENT" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "CONTACT" },
] as const;

export type SectionId = typeof ACTIVE_SECTIONS[number]["id"];

export function getSectionNumber(sectionId: string): string {
  const index = ACTIVE_SECTIONS.findIndex((s) => s.id === sectionId);
  if (index === -1) return "";
  return String(index + 1).padStart(3, "0");
}

export function getContactHref(): string {
  if (siteContent.contact.bookingUrl) return siteContent.contact.bookingUrl;
  if (siteContent.contact.email) return `mailto:${siteContent.contact.email}`;
  return "#contact";
}

export function getCalLink(url: string = siteContent.contact.bookingUrl): string {
  if (!url) return "";
  try {
    const parsed = new URL(url);
    return parsed.pathname.replace(/^\/+/, "");
  } catch {
    return url.replace(/^https?:\/\/(www\.)?cal\.com\//i, "").replace(/^\/+/, "");
  }
}

export const siteContent: SiteContent = {
  hero: {
    subtitle: "AI agents and workflows that run your repetitive business work.",
  },
  contact: {
    email: "", // keep empty per task
    bookingUrl: "https://cal.com/hegxai/free-audit",
    newsletterAction: "", // TODO: newsletter subscription endpoint (leave empty to hide form)
  },
  founder: {
    name: "", // Keep empty to hide founder slot until real data exists
    role: "",
    photo: "",
    bio: "",
  },
  clientLogos: [],
  logos: [],
  pricingTiers: [],
  socials: [], // Empty: hides social links until real social channels exist
  legal: [], // Empty: hides legal links until real policy pages exist
};

export const calLink = getCalLink(siteContent.contact.bookingUrl);
