"use client";
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteContent } from "@/content/site";

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);

  const TESTIMONIALS_DATA = siteContent.testimonials as Array<{
    id: string;
    name: string;
    role: string;
    quote: string;
    metric1Label?: string;
    metric1Val?: string;
    metric2Label?: string;
    metric2Val?: string;
  }>;

  useEffect(() => {
    if (siteContent.testimonials.length === 0) return;
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

  const changeSlide = (newIdx: number) => {
    if (newIdx === currentIdx) return;
    if (slideRef.current) {
      gsap.fromTo(
        slideRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }
      );
    }
    setCurrentIdx(newIdx);
  };

  const nextSlide = () => {
    if (TESTIMONIALS_DATA.length === 0) return;
    changeSlide((currentIdx + 1) % TESTIMONIALS_DATA.length);
  };

  const prevSlide = () => {
    if (TESTIMONIALS_DATA.length === 0) return;
    changeSlide((currentIdx - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
  };

  // HARD RULE: hide block/section when data is empty instead of rendering placeholders
  if (siteContent.testimonials.length === 0 || !TESTIMONIALS_DATA[currentIdx]) {
    return null;
  }

  const active = TESTIMONIALS_DATA[currentIdx];

  return (
    <section
      id="testimonials"
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
            TESTIMONIALS
          </span>
          <span
            style={{
              fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
              fontSize: "11px",
              color: "var(--muted)",
              letterSpacing: "0.12em",
            }}
          >
            006
          </span>
        </div>

        {/* Two-Column Card Layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "48px",
            alignItems: "center",
          }}
        >
          {/* Big portrait card left */}
          <div
            style={{
              position: "relative",
              borderRadius: "32px",
              minHeight: "460px",
              background: "linear-gradient(135deg, rgba(20,20,20,0.06) 0%, rgba(20,20,20,0.12) 100%)",
              border: "1px solid var(--line)",
              boxShadow: "0 8px 32px rgba(20,20,20,0.04)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "36px",
              overflow: "hidden",
            }}
          >
            {/* Subtle technical corner crosshair */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
                  fontSize: "10px",
                  fontWeight: 500,
                  letterSpacing: "0.12em",
                  color: "var(--muted)",
                  textTransform: "uppercase",
                }}
              >
                {/* VERIFIED CLIENT PARTNER */}
              </span>
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "var(--accent)",
                }}
              />
            </div>

            {/* Geometric Avatar Silhouette Placeholder */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                margin: "auto 0",
              }}
            >
              <div
                style={{
                  width: "140px",
                  height: "140px",
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(20,20,20,0.12) 0%, rgba(20,20,20,0.04) 70%, transparent 100%)",
                  border: "1px dashed var(--line)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "20px",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
                    fontSize: "28px",
                    color: "rgba(20,20,20,0.35)",
                  }}
                >
                  👤
                </span>
              </div>
              <span
                style={{
                  fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
                  fontSize: "11px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                  background: "var(--surface)",
                  padding: "6px 14px",
                  borderRadius: "9999px",
                  border: "1px solid var(--line)",
                }}
              >
                [PORTRAIT PLACEHOLDER]
              </span>
            </div>

            {/* Bottom client meta */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderTop: "1px solid var(--line)",
                paddingTop: "16px",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
                  fontSize: "11px",
                  color: "var(--ink)",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                }}
              >
                {active.name}
              </span>
              <span
                style={{
                  fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
                  fontSize: "10px",
                  color: "var(--muted)",
                  letterSpacing: "0.06em",
                }}
              >
                {active.role}
              </span>
            </div>
          </div>

          {/* Right side: Quote, Pager, Metric slots */}
          <div
            ref={slideRef}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: "440px",
              padding: "16px 8px",
            }}
          >
            <div>
              {/* Pager & Navigation Controls */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "32px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span
                    style={{
                      fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
                      fontSize: "14px",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      color: "var(--ink)",
                    }}
                  >
                    0{currentIdx + 1}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
                      fontSize: "13px",
                      color: "var(--muted)",
                    }}
                  >
                    / 0{TESTIMONIALS_DATA.length}
                  </span>
                </div>

                {/* Arrow Pager Buttons */}
                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    onClick={prevSlide}
                    aria-label="Previous testimonial"
                    style={{
                      width: "42px",
                      height: "42px",
                      borderRadius: "50%",
                      background: "var(--surface)",
                      border: "1px solid var(--line)",
                      color: "var(--ink)",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "14px",
                      transition: "background 0.2s, transform 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "var(--ink)";
                      e.currentTarget.style.color = "var(--bg)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "var(--surface)";
                      e.currentTarget.style.color = "var(--ink)";
                    }}
                  >
                    ←
                  </button>
                  <button
                    onClick={nextSlide}
                    aria-label="Next testimonial"
                    style={{
                      width: "42px",
                      height: "42px",
                      borderRadius: "50%",
                      background: "var(--surface)",
                      border: "1px solid var(--line)",
                      color: "var(--ink)",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "14px",
                      transition: "background 0.2s, transform 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "var(--ink)";
                      e.currentTarget.style.color = "var(--bg)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "var(--surface)";
                      e.currentTarget.style.color = "var(--ink)";
                    }}
                  >
                    →
                  </button>
                </div>
              </div>

              {/* Quote */}
              <blockquote
                style={{
                  fontFamily: "var(--ff-body, 'DM Sans', sans-serif)",
                  fontSize: "clamp(20px, 2.4vw, 32px)",
                  fontWeight: 400,
                  lineHeight: 1.4,
                  color: "var(--ink)",
                  letterSpacing: "-0.01em",
                  marginBottom: "36px",
                  fontStyle: "normal",
                }}
              >
                &ldquo;{active.quote}&rdquo;
              </blockquote>
            </div>

            {/* Metric Slots (Strict Rule: NO fake numbers, use qualitative or dashes) */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "24px",
                paddingTop: "28px",
                borderTop: "1px solid var(--line)",
              }}
            >
              <div>
                <span
                  style={{
                    display: "block",
                    fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
                    fontSize: "11px",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "var(--muted)",
                    marginBottom: "8px",
                  }}
                >
                  {active.metric1Label}
                </span>
                <span
                  style={{
                    fontFamily: "var(--ff-display, 'Inter Tight', sans-serif)",
                    fontSize: "36px",
                    fontWeight: 500,
                    lineHeight: 1,
                    letterSpacing: "-0.04em",
                    color: "var(--ink)",
                  }}
                >
                  {active.metric1Val}
                </span>
              </div>

              <div>
                <span
                  style={{
                    display: "block",
                    fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
                    fontSize: "11px",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "var(--muted)",
                    marginBottom: "8px",
                  }}
                >
                  {active.metric2Label}
                </span>
                <span
                  style={{
                    fontFamily: "var(--ff-display, 'Inter Tight', sans-serif)",
                    fontSize: "36px",
                    fontWeight: 500,
                    lineHeight: 1,
                    letterSpacing: "-0.04em",
                    color: "var(--ink)",
                  }}
                >
                  {active.metric2Val}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
