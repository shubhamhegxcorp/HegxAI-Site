"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SectionBar, SectionColumn } from "@/components/ui/shared";
import { siteContent } from "@/content/site";

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

interface ServiceRowProps {
  service: typeof SERVICES[0];
  onRegisterRow: (el: HTMLDivElement | null) => void;
}

function ServiceRow({ service, onRegisterRow }: ServiceRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (bgRef.current) {
      gsap.to(bgRef.current, {
        scaleY: 1,
        transformOrigin: "bottom",
        duration: 0.5,
        ease: "power3.out",
        overwrite: "auto",
      });
    }
    if (nameRef.current) {
      gsap.to(nameRef.current, {
        color: "var(--bg)",
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
    if (arrowRef.current) {
      gsap.to(arrowRef.current, {
        rotation: 45,
        color: "var(--accent)",
        duration: 0.35,
        ease: "power3.out",
        overwrite: "auto",
      });
    }
    if (tagsRef.current) {
      const chips = tagsRef.current.children;
      gsap.fromTo(
        chips,
        { x: 25, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.35,
          ease: "power3.out",
          stagger: 0.05,
          overwrite: "auto",
        }
      );
    }
  };

  const handleMouseLeave = () => {
    if (bgRef.current) {
      gsap.to(bgRef.current, {
        scaleY: 0,
        transformOrigin: "bottom",
        duration: 0.4,
        ease: "power3.out",
        overwrite: "auto",
      });
    }
    if (nameRef.current) {
      gsap.to(nameRef.current, {
        color: "var(--ink)",
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
    if (arrowRef.current) {
      gsap.to(arrowRef.current, {
        rotation: 0,
        color: "var(--line)",
        duration: 0.35,
        ease: "power3.out",
        overwrite: "auto",
      });
    }
    if (tagsRef.current) {
      const chips = tagsRef.current.children;
      gsap.to(chips, {
        x: 25,
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
        overwrite: "auto",
      });
    }
  };

  return (
    <div
      ref={(el) => {
        rowRef.current = el;
        onRegisterRow(el);
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "32px 24px",
        borderBottom: "1px solid var(--line)",
        cursor: "pointer",
        overflow: "hidden",
        borderRadius: "16px",
      }}
    >
      {/* Ink background wipe element */}
      <div
        ref={bgRef}
        style={{
          position: "absolute",
          inset: 0,
          background: "var(--ink)",
          transform: "scaleY(0)",
          transformOrigin: "bottom",
          borderRadius: "16px",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          gap: "32px",
          flex: 1,
        }}
      >
        {/* Arrow (rotates 45deg on hover) */}
        <span
          ref={arrowRef}
          style={{
            fontFamily: "sans-serif",
            fontSize: "18px",
            color: "var(--line)",
            display: "inline-block",
            flexShrink: 0,
            transformOrigin: "center center",
          }}
        >
          →
        </span>

        {/* Service name (turns cream on hover) */}
        <span
          ref={nameRef}
          style={{
            fontFamily: "var(--ff-display, 'Inter Tight', sans-serif)",
            fontSize: "clamp(24px, 3vw, 44px)",
            fontWeight: 500,
            letterSpacing: "-0.04em",
            textTransform: "uppercase",
            lineHeight: 0.95,
            color: "var(--ink)",
          }}
        >
          {service.name}
        </span>
      </div>

      {/* Tags chips (slide in from the right with stagger 0.05 on hover) */}
      <div
        ref={tagsRef}
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          gap: "8px",
          overflow: "hidden",
          flexShrink: 0,
          marginLeft: "24px",
        }}
      >
        {service.tags.map((tag) => (
          <span
            key={tag}
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "9999px",
              padding: "6px 14px",
              fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.06em",
              color: "rgba(255,255,255,0.85)",
              whiteSpace: "nowrap",
              opacity: 0,
              transform: "translateX(25px)",
              display: "inline-block",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      const rows = rowsRef.current.filter(Boolean) as HTMLDivElement[];
      if (!rows.length) return;

      // Rows reveal with stagger 0.1 on enter
      gsap.fromTo(
        rows,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="services-list"
      ref={sectionRef}
      style={{
        background: "var(--bg)",
        padding: "0 24px 100px",
      }}
    >
      <SectionColumn style={{ padding: "0 24px 100px" }}>
        {/* Marquee strip above */}
        <div
          style={{
            overflow: "hidden",
            borderTop: "1px solid var(--line)",
            borderBottom: "1px solid var(--line)",
            padding: "14px 0",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "48px",
              animation: "marquee-scroll 22s linear infinite",
              width: "max-content",
              whiteSpace: "nowrap",
            }}
          >
            {Array(10)
              .fill("BEST FOR GROWING TEAMS  •  BUILT TO SCALE  •  AI-FIRST APPROACH")
              .map((w, i) => (
                <span
                  key={i}
                  style={{
                    fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
                    fontSize: "11px",
                    fontWeight: 500,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#5f5b52",
                  }}
                >
                  {w}
                </span>
              ))}
          </div>
        </div>

        <SectionBar label="SERVICES" num="005" />

        {/* Service rows */}
        <div>
          {SERVICES.map((service, i) => (
            <ServiceRow
              key={i}
              service={service}
              onRegisterRow={(el) => {
                rowsRef.current[i] = el;
              }}
            />
          ))}
        </div>

        {/* (our clients) logo marquee row - only shown if real logos exist */}
        {siteContent.clientLogos.length > 0 && (
          <div style={{ marginTop: "60px", textAlign: "center" }}>
            <span
              style={{
                fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#5f5b52",
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
                maskImage:
                  "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
                WebkitMaskImage:
                  "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
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
                {siteContent.clientLogos.map((client, i) => (
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
                    <span
                      style={{
                        fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
                        fontSize: "12px",
                        fontWeight: 500,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "var(--ink)",
                      }}
                    >
                      {client.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </SectionColumn>
    </section>
  );
}
