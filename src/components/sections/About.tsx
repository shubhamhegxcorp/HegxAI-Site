"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionBar, SectionColumn } from "@/components/ui/shared";
import { useIsMobile } from "@/lib/useIsMobile";
import { siteContent } from "@/content/site";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    if (headlineRef.current) {
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headlineRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        background: "var(--bg)",
        padding: isMobile ? "80px 0" : "128px 0",
        position: "relative",
      }}
    >
      <SectionColumn style={{ padding: "0 var(--col-pad, 24px)" }}>
        <SectionBar label="ABOUT US" sectionId="about" />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : siteContent.founder.name
              ? "110px 1fr 180px"
              : "110px 1fr",
            gap: isMobile ? "32px" : "48px",
            alignItems: "start",
            marginTop: "64px",
          }}
        >
          {/* Left: Lime Chamfered Sticky Tag (100x144) */}
          <a
            href="#contact"
            className="chamfer-tag"
            style={{
              width: "100px",
              height: "144px",
              background: "#d7fd41",
              color: "#141414",
              clipPath:
                "polygon(0 0, 100% 0, 100% calc(100% - 22px), calc(100% - 22px) 100%, 0 100%)",
              boxShadow: "0 6px 24px rgba(215, 253, 65, 0.35)",
              padding: "16px 14px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              flexShrink: 0,
              cursor: "pointer",
              textDecoration: "none",
              transition: "transform 0.25s ease",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  background: "#141414",
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "1px",
                  lineHeight: 1,
                }}
              >
                ›››
              </span>
            </div>
            <div style={{ textAlign: "right" }}>
              <div
                style={{
                  fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
                  fontSize: "10px",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  lineHeight: 1.25,
                  color: "#141414",
                }}
              >
                BOOK A
                <br />
                FREE AUDIT
              </div>
            </div>
          </a>

          {/* Center Main Content: Two-tone Headline + Material Columns */}
          <div>
            <h2
              ref={headlineRef}
              style={{
                fontFamily: "var(--ff-display, 'Inter Tight', sans-serif)",
                fontSize: "clamp(32px, 3.6vw, 56px)",
                fontWeight: 500,
                letterSpacing: "-0.03em",
                lineHeight: 1.02,
                margin: 0,
                marginBottom: "48px",
                maxWidth: "960px",
              }}
            >
              <span style={{ color: "var(--ink)" }}>
                Innovative automation agency building intelligent workflow systems powered by{" "}
              </span>
              <span style={{ color: "#A8A59B" }}>
                advanced AI technology for modern high-growth businesses.
              </span>
            </h2>

            {/* Bottom-right: Two narrow text columns with 1px border and 8px square node on top */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: isMobile ? "32px" : "48px",
                maxWidth: "840px",
                marginLeft: isMobile ? "0" : "auto",
                marginTop: "40px",
              }}
            >
              {/* Column 1 */}
              <div
                style={{
                  position: "relative",
                  borderLeft: "1px solid rgba(20,20,20,0.25)",
                  paddingLeft: "24px",
                  paddingTop: "12px",
                }}
              >
                {/* 8px square node on top of border */}
                <span
                  style={{
                    position: "absolute",
                    left: "-4px",
                    top: "0px",
                    width: "8px",
                    height: "8px",
                    background: "var(--ink)",
                  }}
                />
                <p
                  style={{
                    fontFamily: "var(--ff-body, 'DM Sans', sans-serif)",
                    fontSize: "15px",
                    fontWeight: 400,
                    lineHeight: 1.65,
                    color: "#5f5b52",
                    maxWidth: "56ch",
                    margin: 0,
                  }}
                >
                  HEGXAI was built for operators who are tired of duct-taping tools together. We
                  design automation from first principles — mapping your real workflows before
                  deploying reliable AI agents.
                </p>
              </div>

              {/* Column 2 */}
              <div
                style={{
                  position: "relative",
                  borderLeft: "1px solid rgba(20,20,20,0.25)",
                  paddingLeft: "24px",
                  paddingTop: "12px",
                }}
              >
                {/* 8px square node on top of border */}
                <span
                  style={{
                    position: "absolute",
                    left: "-4px",
                    top: "0px",
                    width: "8px",
                    height: "8px",
                    background: "var(--ink)",
                  }}
                />
                <p
                  style={{
                    fontFamily: "var(--ff-body, 'DM Sans', sans-serif)",
                    fontSize: "15px",
                    fontWeight: 400,
                    lineHeight: 1.65,
                    color: "#5f5b52",
                    maxWidth: "56ch",
                    margin: 0,
                  }}
                >
                  Every deployment is engineered to last: clean architecture, deterministic
                  guardrails, and seamless integration across your CRM, communications, and database
                  stack.
                </p>
              </div>
            </div>
          </div>

          {/* Top-Right: Founder Block (ONLY if real content exists in src/content/site.ts) */}
          {siteContent.founder.name && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "12px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: "96px",
                  height: "96px",
                  borderRadius: "50%",
                  background: "#e8c89c",
                  overflow: "hidden",
                  border: "2px solid var(--ink)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {siteContent.founder.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={siteContent.founder.photo}
                    alt={siteContent.founder.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="18" r="9" fill="#141414" />
                    <path d="M6 42c0-10 8-16 18-16s18 6 18 16" fill="#141414" />
                  </svg>
                )}
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "var(--ff-display, 'Inter Tight', sans-serif)",
                    fontSize: "16px",
                    fontWeight: 500,
                    letterSpacing: "-0.02em",
                    color: "var(--ink)",
                  }}
                >
                  {siteContent.founder.name}
                </div>
                <div
                  style={{
                    fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
                    fontSize: "11px",
                    fontWeight: 500,
                    letterSpacing: "0.08em",
                    color: "#5f5b52",
                    marginTop: "2px",
                    textTransform: "uppercase",
                  }}
                >
                  {siteContent.founder.role}
                </div>
              </div>
            </div>
          )}
        </div>
      </SectionColumn>
    </section>
  );
}
