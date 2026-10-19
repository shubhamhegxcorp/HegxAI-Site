"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SectionBar, SectionColumn } from "@/components/ui/shared";
import AsciiHalftoneCanvas from "@/components/ui/AsciiHalftoneCanvas";

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  {
    tag: "(strategy)",
    num: "01",
    title: "Audit",
    copy: "We map your current workflows, identify the biggest automation opportunities, and define the exact scope of what to build.",
  },
  {
    tag: "(development)",
    num: "02",
    title: "Build",
    copy: "We design and build your automation stack — AI agents, integrations, triggers — fully tested before going live.",
  },
  {
    tag: "(deployment)",
    num: "03",
    title: "Run",
    copy: "We deploy, monitor, and maintain your systems. Your team gets a full handoff with documentation so you own everything.",
  },
];

export default function Benefits() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const tagsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const numsRef = useRef<(HTMLSpanElement | null)[]>([]);

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

      // On mobile: simple fades, no sticky stacking or parallax
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

      // Desktop: 3 right cards stack with scrub
      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
      const tags = tagsRef.current.filter(Boolean) as HTMLSpanElement[];
      const nums = numsRef.current.filter(Boolean) as HTMLSpanElement[];

      if (cards.length < 3) return;

      // Card 0 tag & num start visible
      gsap.set([tags[0], nums[0]], { opacity: 1, y: 0 });

      // Card 1 arrives: Card 0 scales to 0.94 and dims to 0.6; Card 1 tag + num fade in
      gsap.set([tags[1], nums[1]], { opacity: 0, y: 15 });
      const tl1 = gsap.timeline({
        scrollTrigger: {
          trigger: cards[1],
          start: "top 80%",
          end: "top 25%",
          scrub: 0.6,
        },
      });

      tl1.to(cards[0], {
        scale: 0.94,
        opacity: 0.6,
        transformOrigin: "top center",
        ease: "none",
      }).to(
        [tags[1], nums[1]],
        {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          ease: "none",
        },
        "<"
      );

      // Card 2 arrives: Card 1 scales to 0.94 and dims to 0.6 (Card 0 dims further to 0.4); Card 2 tag + num fade in
      gsap.set([tags[2], nums[2]], { opacity: 0, y: 15 });
      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: cards[2],
          start: "top 80%",
          end: "top 25%",
          scrub: 0.6,
        },
      });

      tl2.to(cards[1], {
        scale: 0.94,
        opacity: 0.6,
        transformOrigin: "top center",
        ease: "none",
      })
        .to(
          cards[0],
          {
            scale: 0.88,
            opacity: 0.35,
            transformOrigin: "top center",
            ease: "none",
          },
          "<"
        )
        .to(
          [tags[2], nums[2]],
          {
            opacity: 1,
            y: 0,
            stagger: 0.05,
            ease: "none",
          },
          "<"
        );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="benefits"
      ref={sectionRef}
      style={{
        background: "var(--bg)",
        padding: "0 24px 140px",
        position: "relative",
      }}
    >
      {/* Background ASCII Halftone Matrix */}
      <AsciiHalftoneCanvas theme="light" density="sparse" interactive={true} />

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
                  letterSpacing: "-0.04em",
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

      <SectionColumn style={{ padding: "0 24px" }}>
        <SectionBar label="BENEFITS" num="004" />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
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
              top: "120px",
            }}
          >
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
              Scale your team
            </span>

            <h2
              style={{
                fontFamily: "var(--ff-display, 'Inter Tight', sans-serif)",
                fontSize: "clamp(32px, 3.6vw, 56px)",
                fontWeight: 500,
                lineHeight: 0.95,
                color: "var(--ink)",
                marginBottom: "28px",
                letterSpacing: "-0.04em",
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

            <a
              href="#contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "14px 28px",
                borderRadius: "9999px",
                background: "var(--ink)",
                color: "var(--bg)",
                fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
                fontSize: "12px",
                fontWeight: 500,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "background-color 0.3s ease, transform 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#2a2a2a";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--ink)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Get Started →
            </a>
          </div>

          {/* Right: stacked cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0px" }}>
            {CARDS.map((card, i) => (
              <div
                key={i}
                ref={(el) => {
                  cardsRef.current[i] = el;
                }}
                style={{
                  position: "sticky",
                  top: `${140 + i * 16}px`,
                  marginBottom: i < CARDS.length - 1 ? "40vh" : "0",
                  background: i === 1 ? "var(--ink)" : "var(--surface)",
                  border: `1px solid ${
                    i === 1 ? "rgba(255,255,255,0.06)" : "var(--line)"
                  }`,
                  borderRadius: "24px",
                  padding: "28px 32px",
                  boxShadow: "0 8px 32px rgba(20,20,20,0.08)",
                  transformOrigin: "top center",
                  willChange: "transform, opacity",
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
                    ref={(el) => {
                      tagsRef.current[i] = el;
                    }}
                    style={{
                      fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
                      fontSize: "12px",
                      fontWeight: 500,
                      letterSpacing: "0.06em",
                      color: i === 1 ? "var(--accent)" : "var(--muted)",
                      display: "inline-block",
                    }}
                  >
                    {card.tag}
                  </span>
                  <span
                    ref={(el) => {
                      numsRef.current[i] = el;
                    }}
                    style={{
                      fontFamily: "var(--ff-display, 'Inter Tight', sans-serif)",
                      fontSize: "44px",
                      fontWeight: 500,
                      lineHeight: 0.9,
                      color: i === 1 ? "rgba(255,255,255,0.15)" : "var(--line)",
                      letterSpacing: "-0.04em",
                      display: "inline-block",
                    }}
                  >
                    {card.num}
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: "var(--ff-display, 'Inter Tight', sans-serif)",
                    fontSize: "clamp(20px, 1.8vw, 28px)",
                    fontWeight: 500,
                    letterSpacing: "-0.04em",
                    lineHeight: 1.1,
                    color: i === 1 ? "#fff" : "var(--ink)",
                    marginBottom: "12px",
                  }}
                >
                  {card.title}
                </div>
                <p
                  style={{
                    fontFamily: "var(--ff-body, 'DM Sans', sans-serif)",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: 1.65,
                    color: i === 1 ? "rgba(255,255,255,0.7)" : "#5f5b52",
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
