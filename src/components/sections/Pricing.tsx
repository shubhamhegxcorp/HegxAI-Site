"use client";
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// TODO: replace with real pricing tiers when finalized
// HARD RULE: NO invented dollar amounts, NO fake discounts

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const sectionRef = useRef<HTMLElement>(null);
  const priceRollStarterRef = useRef<HTMLDivElement>(null);
  const priceRollGrowthRef = useRef<HTMLDivElement>(null);

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

  // Vertical roll animation on billing toggle
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
      ref={sectionRef}
      style={{
        background: "var(--bg)",
        padding: "0 24px 120px",
        opacity: 0,
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Section Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 0",
            borderTop: "1px solid var(--line)",
            borderBottom: "1px solid var(--line)",
            marginBottom: "56px",
          }}
        >
          <span
            style={{
              fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--muted)",
            }}
          >
            FLEXIBLE ENGAGEMENT
          </span>
          <span
            style={{
              fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
              fontSize: "11px",
              color: "var(--muted)",
              letterSpacing: "0.12em",
            }}
          >
            009
          </span>
        </div>

        {/* Section Title & Monthly/Yearly Toggle */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            marginBottom: "64px",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--ff-display, 'Anton', sans-serif)",
              fontSize: "clamp(36px, 4.5vw, 68px)",
              fontWeight: 400,
              lineHeight: 0.95,
              textTransform: "uppercase",
              letterSpacing: "0.01em",
              color: "var(--ink)",
              maxWidth: "760px",
              margin: "0 0 32px",
            }}
          >
            FLEXIBLE AI SOLUTIONS FOR EVERY STAGE OF GROWTH
          </h2>

          {/* Animated Pill Slider Toggle */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              position: "relative",
              background: "var(--surface)",
              border: "1px solid var(--line)",
              borderRadius: "9999px",
              padding: "4px",
              boxShadow: "0 2px 10px rgba(20,20,20,0.03)",
            }}
          >
            {/* Sliding Pill Background Indicator */}
            <div
              style={{
                position: "absolute",
                top: "4px",
                bottom: "4px",
                left: billingCycle === "monthly" ? "4px" : "calc(50%)",
                width: "calc(50% - 4px)",
                background: "var(--ink)",
                borderRadius: "9999px",
                transition: "left 0.3s cubic-bezier(0.16,1,0.3,1)",
                zIndex: 1,
              }}
            />

            <button
              onClick={() => handleToggle("monthly")}
              style={{
                position: "relative",
                zIndex: 2,
                border: "none",
                background: "transparent",
                padding: "8px 24px",
                borderRadius: "9999px",
                fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                cursor: "pointer",
                color: billingCycle === "monthly" ? "var(--bg)" : "var(--muted)",
                transition: "color 0.25s ease",
              }}
            >
              MONTHLY
            </button>

            <button
              onClick={() => handleToggle("yearly")}
              style={{
                position: "relative",
                zIndex: 2,
                border: "none",
                background: "transparent",
                padding: "8px 24px",
                borderRadius: "9999px",
                fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                cursor: "pointer",
                color: billingCycle === "yearly" ? "var(--bg)" : "var(--muted)",
                transition: "color 0.25s ease",
              }}
            >
              YEARLY
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
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
              border: "1px solid var(--line)",
              borderRadius: "32px",
              padding: "48px 40px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "0 8px 32px rgba(20,20,20,0.04)",
              position: "relative",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
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
              </div>

              <h3
                style={{
                  fontFamily: "var(--ff-display, 'Anton', sans-serif)",
                  fontSize: "36px",
                  lineHeight: 1,
                  textTransform: "uppercase",
                  letterSpacing: "0.02em",
                  color: "var(--ink)",
                  marginBottom: "12px",
                }}
              >
                STARTER AUTOMATION
              </h3>

              <p
                style={{
                  fontFamily: "var(--ff-body, 'DM Sans', sans-serif)",
                  fontSize: "15px",
                  lineHeight: 1.6,
                  color: "var(--muted)",
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
                      fontFamily: "var(--ff-display, 'Anton', sans-serif)",
                      fontSize: "52px",
                      lineHeight: 1,
                      letterSpacing: "0.02em",
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
                <span
                  style={{
                    display: "block",
                    fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
                    fontSize: "10px",
                    color: "rgba(20,20,20,0.45)",
                    marginTop: "6px",
                  }}
                >
                  // Custom milestone or retainer agreement
                </span>
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
                        width: "18px",
                        height: "18px",
                        borderRadius: "50%",
                        background: "rgba(20,20,20,0.06)",
                        color: "var(--ink)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "11px",
                        fontWeight: "bold",
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

            {/* CTA Button */}
            <a
              href="#contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                width: "100%",
                padding: "16px 28px",
                borderRadius: "9999px",
                background: "transparent",
                border: "1px solid var(--ink)",
                color: "var(--ink)",
                fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--ink)";
                e.currentTarget.style.color = "var(--bg)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "var(--ink)";
              }}
            >
              Book a Strategy Call
              <span>→</span>
            </a>
          </div>

          {/* Card 2: Growth (Ink Theme with Popular Badge) */}
          <div
            style={{
              background: "var(--ink)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "32px",
              padding: "48px 40px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "0 16px 48px rgba(20,20,20,0.18)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Background texture line */}
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
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

                {/* Popular Plan Badge */}
                <span
                  style={{
                    background: "#D7FD41",
                    color: "#141414",
                    fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    padding: "4px 12px",
                    borderRadius: "9999px",
                  }}
                >
                  POPULAR PLAN
                </span>
              </div>

              <h3
                style={{
                  fontFamily: "var(--ff-display, 'Anton', sans-serif)",
                  fontSize: "36px",
                  lineHeight: 1,
                  textTransform: "uppercase",
                  letterSpacing: "0.02em",
                  color: "var(--bg)",
                  marginBottom: "12px",
                }}
              >
                GROWTH AUTOMATION
              </h3>

              <p
                style={{
                  fontFamily: "var(--ff-body, 'DM Sans', sans-serif)",
                  fontSize: "15px",
                  lineHeight: 1.6,
                  color: "rgba(244,239,230,0.65)",
                  marginBottom: "32px",
                }}
              >
                For scaling organizations requiring multi-agent orchestration, bidirectional data pipelines, and custom intelligence.
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
                      fontFamily: "var(--ff-display, 'Anton', sans-serif)",
                      fontSize: "52px",
                      lineHeight: 1,
                      letterSpacing: "0.02em",
                      color: "var(--bg)",
                    }}
                  >
                    Custom
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
                      fontSize: "13px",
                      color: "rgba(244,239,230,0.6)",
                    }}
                  >
                    / scoped to your needs
                  </span>
                </div>
                <span
                  style={{
                    display: "block",
                    fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
                    fontSize: "10px",
                    color: "rgba(244,239,230,0.45)",
                    marginTop: "6px",
                  }}
                >
                  // Scaled enterprise capacity agreement
                </span>
              </div>

              {/* Features List */}
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 40px", display: "flex", flexDirection: "column", gap: "16px" }}>
                {[
                  "Comprehensive multi-department workflow mapping",
                  "Autonomous multi-agent network orchestration",
                  "Bidirectional real-time database & API synchronization",
                  "Custom guardrails, failover logic & security compliance",
                  "Dedicated engineering escalation & priority iterations",
                  "Ongoing performance optimization & custom fine-tuning",
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
                      color: "var(--bg)",
                    }}
                  >
                    <span
                      style={{
                        width: "18px",
                        height: "18px",
                        borderRadius: "50%",
                        background: "#D7FD41",
                        color: "#141414",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "11px",
                        fontWeight: "bold",
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

            {/* CTA Button */}
            <a
              href="#contact"
              style={{
                position: "relative",
                zIndex: 1,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                width: "100%",
                padding: "16px 28px",
                borderRadius: "9999px",
                background: "var(--bg)",
                color: "var(--ink)",
                fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#D7FD41";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--bg)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Schedule Executive Audit
              <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
