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

export const siteContent: SiteContent = {
  founder: {
    name: "", // Keep empty to hide placeholder box per prompt instruction
    role: "",
    photo: "",
    bio: "",
  },
  clientLogos: [],
  testimonials: [],
  blogPosts: [],
  pricingTiers: [],
};
