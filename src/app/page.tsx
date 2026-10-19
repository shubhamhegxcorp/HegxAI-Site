import SmoothScrollProvider from "@/lib/SmoothScrollProvider";
import Nav from "@/components/sections/Nav";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Features from "@/components/sections/Features";
import WhyAutomate from "@/components/sections/WhyAutomate";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import CTABlock from "@/components/sections/CTABlock";
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

      {/* 4. 003 WHY AUTOMATE (DARK) */}
      <WhyAutomate />

      {/* 5. 004 SERVICES */}
      <Services />

      {/* 6. 005 THE PROCESS */}
      <Process />

      {/* 7. 006 FLEXIBLE ENGAGEMENT (PRICING) */}
      <Pricing />

      {/* 8. 007 FAQ */}
      <FAQ />

      {/* 9. 008 CONTACT */}
      <CTABlock />

      {/* 10. FOOTER */}
      <Footer />
    </SmoothScrollProvider>
  );
}
