"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SectionBar, SectionColumn, Button } from "@/components/ui/shared";

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  {
    tag: "STRATEGY & AUDIT",
    num: "01",
    title: "Audit",
    copy: "We map your current workflows, identify the biggest automation opportunities, and define the exact scope of what to build.",
  },
  {
    tag: "CUSTOM DEVELOPMENT",
    num: "02",
    title: "Build",
    copy: "We design and build your automation stack — AI agents, integrations, triggers — fully tested before going live.",
  },
  {
    tag: "DEPLOYMENT & RUN",
    num: "03",
    title: "Run",
    copy: "We deploy, monitor, and maintain your systems. Your team gets a full handoff with documentation so you own everything.",
  },
];

export default function Benefits() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const isMobile = window.innerWidth < 768;

      if (prefersReduced) return;

      // Left column entrance
      gsap.fromTo(
        leftRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: leftRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // On mobile: simple fades, no sticky stacking
      if (isMobile) {
        cardsRef.current.forEach((card) => {
          if (!card) return;
          gsap.fromTo(
            card,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
                toggleActions: "play none none none",
              },
            }
          );
        });
        return;
      }

      // Desktop: sticky stack scrub scaling
      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
      if (cards.length >= 2) {
        // Card 0 scales to 0.96 as Card 1 covers it
        gsap.to(cards[0], {
          scale: 0.96,
          opacity: 0.65,
          transformOrigin: "top center",
          ease: "none",
          scrollTrigger: {
            trigger: cards[1],
            start: "top 75%",
            end: "top 25%",
            scrub: true,
          },
        });

        if (cards[2]) {
          // Card 1 scales to 0.96 as Card 2 covers it
          gsap.to(cards[1], {
            scale: 0.96,
            opacity: 0.65,
            transformOrigin: "top center",
            ease: "none",
            scrollTrigger: {
              trigger: cards[2],
              start: "top 75%",
              end: "top 25%",
              scrub: true,
            },
          });
        }
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="benefits"
      ref={sectionRef}
      style={{
        background: "var(--bg)",
        padding: "0 0 140px",
        position: "relative",
      }}
    >
      {/* Marquee above */}
      <div
        style={{
          borderTop: "1px solid var(--line)",
          borderBottom: "1px solid var(--line)",
          padding: "20px 0",
          marginBottom: "0",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "60px",
            animation: "marquee-scroll 20s linear infinite",
            width: "max-content",
          }}
        >
          {Array(10)
            .fill("SCALE YOUR TEAM")
            .map((w, i) => (
              <span
                key={i}
                style={{
                  fontFamily: "var(--ff-display, 'Inter Tight', sans-serif)",
                  fontSize: "clamp(32px, 3.6vw, 48px)",
                  fontWeight: 500,
                  letterSpacing: "-0.02em",
                  textTransform: "uppercase",
                  color: i % 2 === 0 ? "var(--ink)" : "var(--line)",
                  whiteSpace: "nowrap",
                }}
              >
                {w}
              </span>
            ))}
        </div>
      </div>

      <SectionColumn style={{ padding: "0 var(--col-pad, 24px)" }}>
        <SectionBar label="BENEFITS" sectionId="benefits" />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "80px",
            marginTop: "64px",
            alignItems: "start",
          }}
        >
          {/* Left: Sticky column */}
          <div
            ref={leftRef}
            style={{
              position: "sticky",
              top: "calc(var(--header-h, 92px) + 24px)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--ff-display, 'Inter Tight', sans-serif)",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#5f5b52",
                display: "block",
                marginBottom: "20px",
              }}
            >
              Scale your team
            </span>

            <h2
              style={{
                fontFamily: "var(--ff-display, 'Inter Tight', sans-serif)",
                fontSize: "clamp(32px, 3.6vw, 56px)",
                fontWeight: 500,
                lineHeight: 1.04,
                color: "var(--ink)",
                marginBottom: "28px",
                letterSpacing: "-0.02em",
              }}
            >
              Automation that grows with you
            </h2>

            <p
              style={{
                fontFamily: "var(--ff-body, 'DM Sans', sans-serif)",
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: 1.7,
                color: "var(--muted)",
                marginBottom: "36px",
              }}
            >
              Every system we build is designed to scale alongside your team —
              whether you grow from five to fifty, or fifty to five hundred.
              No rework, no surprises.
            </p>

            <Button href="#contact" variant="dark">
              Get Started
            </Button>
          </div>

          {/* Right: Real sticky stack cards (radius 12px, gap 24px, no 380px void) */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px", position: "relative" }}>
            {CARDS.map((card, i) => (
              <div
                key={i}
                ref={(el) => {
                  cardsRef.current[i] = el;
                }}
                style={{
                  position: "sticky",
                  top: `calc(var(--header-h, 92px) + 24px + ${i * 16}px)`,
                  background: i === 1 ? "var(--ink)" : "var(--surface)",
                  border: `1px solid ${
                    i === 1 ? "rgba(255,255,255,0.06)" : "var(--line)"
                  }`,
                  borderRadius: "var(--r-card, 12px)",
                  padding: "36px 32px",
                  boxShadow: "0 8px 32px rgba(20,20,20,0.08)",
                  transformOrigin: "top center",
                  willChange: "transform, opacity",
                  marginBottom: "24px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    marginBottom: "16px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--ff-display, 'Inter Tight', sans-serif)",
                      fontSize: "12px",
                      fontWeight: 600,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: i === 1 ? "#d7fd41" : "#5f5b52",
                      display: "inline-block",
                    }}
                  >
                    {card.tag}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--ff-display, 'Inter Tight', sans-serif)",
                      fontSize: "44px",
                      fontWeight: 500,
                      lineHeight: 0.9,
                      color: i === 1 ? "rgba(255,255,255,0.20)" : "rgba(20,20,20,0.20)",
                      letterSpacing: "-0.02em",
                      display: "inline-block",
                    }}
                  >
                    {card.num}
                  </span>
                </div>

                <div
                  style={{
                    fontFamily: "var(--ff-display, 'Inter Tight', sans-serif)",
                    fontSize: "clamp(22px, 2vw, 30px)",
                    fontWeight: 500,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.04,
                    color: i === 1 ? "#ffffff" : "var(--ink)",
                    marginBottom: "12px",
                  }}
                >
                  {card.title}
                </div>

                <p
                  style={{
                    fontFamily: "var(--ff-body, 'DM Sans', sans-serif)",
                    fontSize: "15px",
                    fontWeight: 400,
                    lineHeight: 1.65,
                    color: i === 1 ? "rgba(255,255,255,0.72)" : "#5f5b52",
                  }}
                >
                  {card.copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </SectionColumn>
    </section>
  );
}
