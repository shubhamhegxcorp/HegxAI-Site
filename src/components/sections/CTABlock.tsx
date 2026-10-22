"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionBar, SectionColumn, Button } from "@/components/ui/shared";
import { siteContent, getContactHref } from "@/content/site";

gsap.registerPlugin(ScrollTrigger);

export default function CTABlock() {
  const cardRef = useRef<HTMLDivElement>(null);
  const hasContact = Boolean(siteContent.contact.email || siteContent.contact.bookingUrl);
  const contactHref = getContactHref();

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
      aria-labelledby="contact-title"
      style={{
        background: "var(--bg)",
        padding: "var(--section-py, 96px) 0",
      }}
    >
      <SectionColumn style={{ padding: "0 var(--col-pad, 24px)" }}>
        <SectionBar label="CONTACT" sectionId="contact" />

        <div
          ref={cardRef}
          className="card p-5 md:p-14"
          style={{
            background: "var(--surface)",
            border: "1px solid rgba(20,20,20,0.12)",
            borderRadius: "var(--r-card, 12px)",
            marginTop: "var(--heading-content-gap, 40px)",
            position: "relative",
            boxShadow: "none",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "28px",
            alignItems: "center",
          }}
        >
          {/* Left: Heading + Copy + CTA */}
          <div style={{ maxWidth: "52ch" }}>
            <h2
              id="contact-title"
              style={{
                fontFamily: "var(--ff-display, 'Inter Tight', sans-serif)",
                fontSize: "clamp(28px, 6vw, 56px)",
                fontWeight: 500,
                lineHeight: 1.04,
                letterSpacing: "-0.02em",
                color: "var(--ink)",
                marginBottom: "16px",
              }}
            >
              Transform your business with intelligent AI automation
            </h2>

            <p
              style={{
                fontFamily: "var(--ff-body, 'DM Sans', sans-serif)",
                fontSize: "15px",
                fontWeight: 400,
                lineHeight: 1.6,
                color: "#5f5b52",
                maxWidth: "52ch",
                marginBottom: "24px",
              }}
            >
              Start with a free audit. We&apos;ll map your biggest automation opportunities and
              show you exactly what&apos;s possible — no commitment required.
            </p>

            {hasContact ? (
              <Button
                href={contactHref}
                variant="primary"
                className="btn-mobile-full"
                style={{ minHeight: "52px" }}
              >
                Book a free audit
              </Button>
            ) : (
              <button
                type="button"
                disabled
                aria-disabled="true"
                className="btn-mobile-full"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  padding: "16px 24px",
                  borderRadius: "0px",
                  background: "var(--ink)",
                  border: "1px solid var(--ink)",
                  color: "#ffffff",
                  fontFamily: "var(--ff-display, 'Inter Tight', sans-serif)",
                  fontSize: "13px",
                  fontWeight: 500,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  opacity: 0.4,
                  cursor: "not-allowed",
                  userSelect: "none",
                  minHeight: "52px",
                }}
              >
                Booking opens soon
              </button>
            )}
          </div>

          {/* Right: Mobile 1-line step list */}
          <div
            className="flex md:hidden items-center justify-center py-2 border-t border-[rgba(20,20,20,0.12)]"
            style={{
              fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
              fontSize: "12px",
              color: "var(--muted)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {[
              { num: "01", text: "Free audit call" },
              { num: "02", text: "Automation map" },
              { num: "03", text: "Build plan" },
            ].map(s => `${s.num} ${s.text}`).join(" · ")}
          </div>

          {/* Right: Desktop Vertical list of 3 steps */}
          <div
            className="hidden md:flex flex-col justify-center border-t md:border-t-0 md:border-l border-[rgba(20,20,20,0.12)] md:pl-10"
          >
            {[
              { num: "01", text: "Free audit call" },
              { num: "02", text: "Automation map" },
              { num: "03", text: "Build plan" },
            ].map((step, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "18px 0",
                  borderBottom: "1px solid rgba(20,20,20,0.12)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <span
                    style={{
                      width: "10px",
                      height: "10px",
                      background: "var(--ink)",
                      display: "inline-block",
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "var(--ff-display, 'Inter Tight', sans-serif)",
                      fontSize: "18px",
                      fontWeight: 500,
                      color: "var(--ink)",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {step.text}
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
                    fontSize: "11px",
                    fontWeight: 500,
                    letterSpacing: "0.08em",
                    color: "rgba(20,20,20,0.4)",
                  }}
                >
                  {step.num}
                </span>
              </div>
            ))}
          </div>
        </div>
      </SectionColumn>
    </section>
  );
}
