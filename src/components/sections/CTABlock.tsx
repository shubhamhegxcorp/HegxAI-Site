"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionBar, SectionColumn, Button } from "@/components/ui/shared";

gsap.registerPlugin(ScrollTrigger);

export default function CTABlock() {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    gsap.fromTo(
      cardRef.current,
      { scale: 0.96, opacity: 0.8 },
      {
        scale: 1,
        opacity: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 90%",
          end: "top 55%",
          scrub: 1,
        },
      }
    );
  }, []);

  return (
    <section
      id="contact"
      style={{
        background: "var(--bg)",
        padding: "128px 0",
      }}
    >
      <SectionColumn style={{ padding: "0 var(--col-pad, 24px)" }}>
        <SectionBar label="CONTACT" sectionId="contact" />

        <div
          ref={cardRef}
          style={{
            background: "var(--surface)",
            border: "1px solid rgba(20,20,20,0.12)",
            borderRadius: "var(--r-card, 12px)",
            padding: "64px 48px",
            marginTop: "64px",
            position: "relative",
            boxShadow: "none",
          }}
        >
          <div style={{ maxWidth: "56ch" }}>
            <h2
              style={{
                fontFamily: "var(--ff-display, 'Inter Tight', sans-serif)",
                fontSize: "clamp(32px, 3.6vw, 56px)",
                fontWeight: 500,
                lineHeight: 1.04,
                letterSpacing: "-0.02em",
                color: "var(--ink)",
                marginBottom: "20px",
              }}
            >
              Transform your business with intelligent AI automation
            </h2>

            <p
              style={{
                fontFamily: "var(--ff-body, 'DM Sans', sans-serif)",
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: 1.65,
                color: "#5f5b52",
                maxWidth: "56ch",
                marginBottom: "36px",
              }}
            >
              Start with a free audit. We&apos;ll map your biggest automation opportunities and
              show you exactly what&apos;s possible — no commitment required.
            </p>

            <Button href="mailto:hello@hegxai.com" variant="primary">
              Book a free audit
            </Button>
          </div>
        </div>
      </SectionColumn>
    </section>
  );
}
