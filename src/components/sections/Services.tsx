"use client";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    name: "AI STRATEGY",
    tags: ["(discovery)", "(consulting)"],
    desc: "We analyze your bottlenecks, evaluate automation feasibility, and design a strategic blueprint for enterprise AI adoption.",
  },
  {
    name: "CUSTOM AI AGENTS",
    tags: ["(autonomous)", "(decisioning)"],
    desc: "Custom AI agents that work autonomously — handling triage, customer queries, and multi-step logic 24/7.",
  },
  {
    name: "WORKFLOW AUTOMATION",
    tags: ["(end-to-end)", "(multi-step)"],
    desc: "End-to-end automation of complex business processes across your existing operations stack.",
  },
  {
    name: "INTEGRATIONS",
    tags: ["(crm)", "(api)"],
    desc: "Seamless connections between your operational platforms with zero manual data entry.",
  },
  {
    name: "PROCESS DESIGN",
    tags: ["(audit)", "(systems)"],
    desc: "We map existing friction, identify automation ROI, and design resilient operational architecture.",
  },
];

export default function Services() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      {
        opacity: 1, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%", toggleActions: "play none none none" },
      }
    );
  }, []);

  return (
    <section
      id="services-list"
      ref={sectionRef}
      style={{
        background: "var(--bg)",
        padding: "0 24px 100px",
        opacity: 0,
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Marquee strip above */}
        <div style={{
          overflow: "hidden",
          borderTop: "1px solid var(--line)",
          borderBottom: "1px solid var(--line)",
          padding: "14px 0",
          marginBottom: "0",
        }}>
          <div style={{
            display: "flex",
            gap: "48px",
            animation: "marquee-scroll 22s linear infinite",
            width: "max-content",
            whiteSpace: "nowrap",
          }}>
            {Array(10).fill("BEST FOR GROWING TEAMS  •  BUILT TO SCALE  •  AI-FIRST APPROACH").map((w, i) => (
              <span key={i} style={{
                fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--muted)",
              }}>
                {w}
              </span>
            ))}
          </div>
        </div>

        {/* Section label */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 0",
          borderBottom: "1px solid var(--line)",
        }}>
          <span style={{
            fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--muted)",
          }}>
            SERVICES
          </span>
          <span style={{
            fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
            fontSize: "11px",
            color: "var(--muted)",
            letterSpacing: "0.12em",
          }}>
            005
          </span>
        </div>

        {/* Service rows */}
        <div>
          {SERVICES.map((service, i) => (
            <div
              key={i}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "32px 24px",
                borderBottom: "1px solid var(--line)",
                background: hoveredIdx === i ? "var(--ink)" : "transparent",
                cursor: "pointer",
                transition: "background 0.35s cubic-bezier(0.16,1,0.3,1), padding 0.25s ease",
                borderRadius: hoveredIdx === i ? "16px" : "0",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "32px", flex: 1 }}>
                {/* Arrow */}
                <span
                  style={{
                    fontFamily: "sans-serif",
                    fontSize: "18px",
                    color: hoveredIdx === i ? "var(--accent)" : "var(--line)",
                    transition: "transform 0.35s ease, color 0.35s ease",
                    transform: hoveredIdx === i ? "rotate(-45deg)" : "rotate(0deg)",
                    display: "inline-block",
                    flexShrink: 0,
                  }}
                >
                  →
                </span>

                {/* Service name */}
                <span
                  style={{
                    fontFamily: "var(--ff-display, 'Anton', sans-serif)",
                    fontSize: "clamp(28px, 3.5vw, 52px)",
                    fontWeight: 400,
                    letterSpacing: "0.01em",
                    textTransform: "uppercase",
                    color: hoveredIdx === i ? "var(--bg)" : "var(--ink)",
                    transition: "color 0.35s ease",
                  }}
                >
                  {service.name}
                </span>
              </div>

              {/* Tags — slide in on hover */}
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  overflow: "hidden",
                  opacity: hoveredIdx === i ? 1 : 0,
                  transform: hoveredIdx === i ? "translateX(0)" : "translateX(20px)",
                  transition: "opacity 0.3s ease, transform 0.3s ease",
                  flexShrink: 0,
                  marginLeft: "24px",
                }}
              >
                {service.tags.map((tag) => (
                  <span key={tag} style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: "9999px",
                    padding: "6px 14px",
                    fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
                    fontSize: "11px",
                    fontWeight: 500,
                    letterSpacing: "0.06em",
                    color: "rgba(255,255,255,0.6)",
                    whiteSpace: "nowrap",
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* (our clients) logo marquee row */}
        {/* TODO: replace with real client logos */}
        <div style={{ marginTop: "60px", textAlign: "center" }}>
          <span
            style={{
              fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--muted)",
              display: "block",
              marginBottom: "20px",
            }}
          >
            (our clients)
          </span>

          <div
            style={{
              width: "100%",
              overflow: "hidden",
              position: "relative",
              maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
              WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "20px",
                width: "max-content",
                animation: "marquee-scroll 24s linear infinite",
              }}
            >
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    padding: "10px 24px",
                    borderRadius: "9999px",
                    background: "var(--surface)",
                    border: "1px solid var(--line)",
                    color: "var(--muted)",
                    minWidth: "140px",
                  }}
                >
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "2px",
                      background: "rgba(20,20,20,0.25)",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
                      fontSize: "12px",
                      fontWeight: 500,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: "rgba(20,20,20,0.55)",
                    }}
                  >
                    Client logo
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
