import SmoothScrollProvider from "@/lib/SmoothScrollProvider";
import Nav from "@/components/sections/Nav";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Features from "@/components/sections/Features";
import WhyAutomate from "@/components/sections/WhyAutomate";
import Benefits from "@/components/sections/Benefits";
import Services from "@/components/sections/Services";
import Testimonials from "@/components/sections/Testimonials";
import Process from "@/components/sections/Process";
import Blog from "@/components/sections/Blog";
import Pricing from "@/components/sections/Pricing";
import AgentShowcase from "@/components/sections/AgentShowcase";
import CTABlock from "@/components/sections/CTABlock";
import FAQ from "@/components/sections/FAQ";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <SmoothScrollProvider>
      {/* 0. NAV */}
      <Nav />

      {/* 1. HERO */}
      <Hero />

      {/* 2. 001 ABOUT US */}
      <About />

      {/* 3. 002 THE FEATURES */}
      <Features />

      {/* 4. 003 THE STATISTICS */}
      <WhyAutomate />

      {/* 5. 004 BENEFITS "SCALE YOUR TEAM" */}
      <Benefits />

      {/* 6. 005 SERVICES */}
      <Services />

      {/* 7. 006 TESTIMONIALS */}
      {/* TODO: replace with verified client testimonials */}
      <Testimonials />

      {/* 8. 007 THE PROCESS */}
      <Process />

      {/* 9. 008 BLOG */}
      {/* TODO: replace with live published blog links */}
      <Blog />

      {/* 10. 009 PRICING */}
      {/* TODO: update with enterprise pricing tiers */}
      <Pricing />

      {/* 11. SECOND STATISTICS / AGENTS BLOCK */}
      <AgentShowcase />

      {/* 12. CONTACT CTA */}
      <CTABlock />

      {/* 13. FAQ */}
      <FAQ />

      {/* 14. FOOTER */}
      <Footer />
    </SmoothScrollProvider>
  );
}
