// Site content and configuration
// HARD RULE: Only real data. If empty, components hide the section/block instead of showing fake placeholders.

export interface SiteContent {
  founder: {
    name: string;
    role: string;
    photo: string;
    bio: string;
  };
  clientLogos: Array<{ name: string; logoUrl: string }>;
  logos: Array<{ name: string; url: string }>;
  testimonials: Array<{
    id: string;
    name: string;
    role: string;
    quote: string;
  }>;
  blogPosts: Array<{
    slug: string;
    title: string;
    date: string;
    category: string;
    excerpt: string;
  }>;
  pricingTiers: Array<{
    name: string;
    price: string;
    period: string;
    description: string;
    features: string[];
  }>;
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

export const siteContent: SiteContent = {
  founder: {
    name: "", // Keep empty to hide placeholder box per prompt instruction
    role: "",
    photo: "",
    bio: "",
  },
  clientLogos: [],
  logos: [],
  testimonials: [],
  blogPosts: [],
  pricingTiers: [],
};
