"use client";
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionBar, SectionColumn, Button } from "@/components/ui/shared";
import { siteContent } from "@/content/site";

gsap.registerPlugin(ScrollTrigger);

// HARD RULE: NO invented dollar amounts, NO fake discounts

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const sectionRef = useRef<HTMLElement>(null);
  const priceRollStarterRef = useRef<HTMLDivElement>(null);
  const priceRollGrowthRef = useRef<HTMLDivElement>(null);

  // Render toggle only if any plan has a numeric price
  const hasNumericPrices = siteContent.pricingTiers.some((p) => /\d/.test(p.price));

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  const handleToggle = (cycle: "monthly" | "yearly") => {
    if (cycle === billingCycle) return;
    setBillingCycle(cycle);

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    [priceRollStarterRef.current, priceRollGrowthRef.current].forEach((el) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { y: -16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: "back.out(1.7)" }
      );
    });
  };

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-title"
      ref={sectionRef}
      style={{
        background: "var(--bg)",
        padding: "128px 0",
        opacity: 0,
      }}
    >
      <SectionColumn style={{ padding: "0 var(--col-pad, 24px)" }}>
        <SectionBar label="FLEXIBLE ENGAGEMENT" sectionId="pricing" />

        {/* Section Title & Optional Toggle */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            marginTop: "64px",
            marginBottom: "64px",
          }}
        >
          <h2
            id="pricing-title"
            style={{
              fontFamily: "var(--ff-display, 'Inter Tight', sans-serif)",
              fontSize: "clamp(32px, 3.6vw, 56px)",
              fontWeight: 500,
              lineHeight: 1.04,
              letterSpacing: "-0.02em",
              color: "var(--ink)",
              maxWidth: "56ch",
              margin: "0 0 32px",
            }}
          >
            <span className="reveal-mask">
              <span className="reveal-line" data-reveal-line>
                Flexible AI solutions for every stage of growth
              </span>
            </span>
          </h2>

          {/* Toggle only rendered if numeric prices exist */}
          {hasNumericPrices && (
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                position: "relative",
                background: "var(--surface)",
                border: "1px solid var(--line)",
                borderRadius: "var(--r-0, 0px)",
                padding: "4px",
                boxShadow: "0 2px 10px rgba(20,20,20,0.03)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "4px",
                  bottom: "4px",
                  left: billingCycle === "monthly" ? "4px" : "calc(50%)",
                  width: "calc(50% - 4px)",
                  background: "var(--ink)",
                  borderRadius: "var(--r-0, 0px)",
                  transition: "left 0.3s cubic-bezier(0.16,1,0.3,1)",
                  zIndex: 1,
                }}
              />
              <button
                onClick={() => handleToggle("monthly")}
                style={{
                  position: "relative",
                  zIndex: 2,
                  padding: "8px 20px",
                  border: "none",
                  background: "transparent",
                  color: billingCycle === "monthly" ? "#ffffff" : "var(--muted)",
                  fontFamily: "var(--ff-display, 'Inter Tight', sans-serif)",
                  fontSize: "12px",
                  fontWeight: 500,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                }}
              >
                Monthly
              </button>
              <button
                onClick={() => handleToggle("yearly")}
                style={{
                  position: "relative",
                  zIndex: 2,
                  padding: "8px 20px",
                  border: "none",
                  background: "transparent",
                  color: billingCycle === "yearly" ? "#ffffff" : "var(--muted)",
                  fontFamily: "var(--ff-display, 'Inter Tight', sans-serif)",
                  fontSize: "12px",
                  fontWeight: 500,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                }}
              >
                Annual
              </button>
            </div>
          )}
        </div>

        {/* Pricing Cards Grid (Card radius 12px, aligned top) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "32px",
            alignItems: "stretch",
          }}
        >
          {/* Card 1: Starter */}
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid rgba(20,20,20,0.12)",
              borderRadius: "var(--r-card, 12px)",
              padding: "48px 40px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "none",
              position: "relative",
            }}
          >
            <div>
              {/* Top Bar with Reserved Height to perfectly align with Card 2 */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  minHeight: "28px",
                  marginBottom: "20px",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                  }}
                >
                  FOUNDATIONAL
                </span>
                {/* Empty placeholder spacer maintaining exact top alignment */}
                <span style={{ minHeight: "24px", display: "inline-block" }} />
              </div>

              <h3
                style={{
                  fontFamily: "var(--ff-display, 'Inter Tight', sans-serif)",
                  fontSize: "clamp(22px, 2vw, 30px)",
                  lineHeight: 1.04,
                  letterSpacing: "-0.02em",
                  color: "var(--ink)",
                  marginBottom: "12px",
                  fontWeight: 500,
                }}
              >
                Starter Automation
              </h3>

              <p
                style={{
                  fontFamily: "var(--ff-body, 'DM Sans', sans-serif)",
                  fontSize: "15px",
                  lineHeight: 1.6,
                  color: "#5f5b52",
                  maxWidth: "56ch",
                  marginBottom: "32px",
                }}
              >
                For emerging teams seeking to automate core recurring workflows and eliminate manual administrative overhead.
              </p>

              {/* Price Slot */}
              <div
                ref={priceRollStarterRef}
                style={{
                  marginBottom: "36px",
                  paddingBottom: "28px",
                  borderBottom: "1px solid var(--line)",
                }}
              >
                <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
                  <span
                    style={{
                      fontFamily: "var(--ff-display, 'Inter Tight', sans-serif)",
                      fontSize: "44px",
                      lineHeight: 1,
                      letterSpacing: "-0.02em",
                      fontWeight: 500,
                      color: "var(--ink)",
                    }}
                  >
                    Custom
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
                      fontSize: "13px",
                      color: "var(--muted)",
                    }}
                  >
                    / scoped to your needs
                  </span>
                </div>
              </div>

              {/* Features List */}
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 40px", display: "flex", flexDirection: "column", gap: "16px" }}>
                {[
                  "Workflow friction audit & process mapping",
                  "Custom AI agent development for primary tasks",
                  "Seamless integration with core CRM & messaging tools",
                  "Continuous reliability monitoring & error handling",
                  "Complete architectural documentation & team onboarding",
                ].map((feat, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "12px",
                      fontFamily: "var(--ff-body, 'DM Sans', sans-serif)",
                      fontSize: "14px",
                      lineHeight: 1.5,
                      color: "var(--ink)",
                    }}
                  >
                    <span
                      style={{
                        width: "16px",
                        height: "16px",
                        borderRadius: "50%",
                        background: "rgba(20,20,20,0.06)",
                        color: "var(--ink)",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "9px",
                        fontWeight: 700,
                        flexShrink: 0,
                        marginTop: "2px",
                      }}
                    >
                      ✓
                    </span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Button: Secondary */}
            <Button
              href="#process"
              variant="secondary"
              style={{ width: "100%", color: "var(--ink)", borderColor: "var(--ink)" }}
            >
              See how it works
            </Button>
          </div>

          {/* Card 2: Growth (Dark Theme with RECOMMENDED Badge) */}
          <div
            style={{
              background: "var(--ink)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "var(--r-card, 12px)",
              padding: "48px 40px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "none",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Background subtle dot texture */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)`,
                backgroundSize: "24px 24px",
                pointerEvents: "none",
              }}
            />

            <div style={{ position: "relative", zIndex: 1 }}>
              {/* Top Bar with RECOMMENDED Badge */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  minHeight: "28px",
                  marginBottom: "20px",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "rgba(244,239,230,0.6)",
                  }}
                >
                  ENTERPRISE
                </span>

                {/* RECOMMENDED Badge */}
                <span
                  style={{
                    background: "#D7FD41",
                    color: "#141414",
                    fontFamily: "var(--ff-display, 'Inter Tight', sans-serif)",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    padding: "4px 12px",
                    borderRadius: "var(--r-0, 0px)",
                  }}
                >
                  RECOMMENDED
                </span>
              </div>

              <h3
                style={{
                  fontFamily: "var(--ff-display, 'Inter Tight', sans-serif)",
                  fontSize: "clamp(22px, 2vw, 30px)",
                  lineHeight: 1.04,
                  letterSpacing: "-0.02em",
                  color: "#ffffff",
                  marginBottom: "12px",
                  fontWeight: 500,
                }}
              >
                Growth Automation
              </h3>

              <p
                style={{
                  fontFamily: "var(--ff-body, 'DM Sans', sans-serif)",
                  fontSize: "15px",
                  lineHeight: 1.6,
                  color: "rgba(255,255,255,0.65)",
                  maxWidth: "56ch",
                  marginBottom: "32px",
                }}
              >
                Comprehensive automation infrastructure for organizations demanding high-volume operations and autonomous agent networks.
              </p>

              {/* Price Slot */}
              <div
                ref={priceRollGrowthRef}
                style={{
                  marginBottom: "36px",
                  paddingBottom: "28px",
                  borderBottom: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
                  <span
                    style={{
                      fontFamily: "var(--ff-display, 'Inter Tight', sans-serif)",
                      fontSize: "44px",
                      lineHeight: 1,
                      letterSpacing: "-0.02em",
                      fontWeight: 500,
                      color: "#ffffff",
                    }}
                  >
                    Enterprise
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
                      fontSize: "13px",
                      color: "rgba(255,255,255,0.5)",
                    }}
                  >
                    / tailored scope
                  </span>
                </div>
              </div>

              {/* Features List */}
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 40px", display: "flex", flexDirection: "column", gap: "16px" }}>
                {[
                  "Full operational audit & systems architecture blueprint",
                  "Multi-agent autonomous systems with human-in-the-loop controls",
                  "Custom API integrations & legacy database synchronizations",
                  "Priority operational SLA & dedicated monitoring engineer",
                  "Quarterly automation reviews & roadmap expansion",
                ].map((feat, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "12px",
                      fontFamily: "var(--ff-body, 'DM Sans', sans-serif)",
                      fontSize: "14px",
                      lineHeight: 1.5,
                      color: "rgba(255,255,255,0.85)",
                    }}
                  >
                    <span
                      style={{
                        width: "16px",
                        height: "16px",
                        borderRadius: "50%",
                        background: "rgba(215,253,65,0.2)",
                        color: "#D7FD41",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "9px",
                        fontWeight: 700,
                        flexShrink: 0,
                        marginTop: "2px",
                      }}
                    >
                      ✓
                    </span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Button: Inverse */}
            <Button href="#contact" variant="inverse" style={{ width: "100%" }}>
              Book a free audit
            </Button>
          </div>
        </div>
      </SectionColumn>
    </section>
  );
}
