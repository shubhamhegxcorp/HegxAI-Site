"use client";
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// TODO: replace with real articles when published
// HARD RULE: NO fake dates, NO fake statistics
const BLOG_POSTS = [
  {
    index: "01",
    date: "[DATE]",
    category: "Workflow Automation",
    title: "Orchestrating Autonomous Triage in Enterprise Customer Support Operations",
    excerpt: "How scaling B2B teams eliminate manual ticket routing through deterministic AI handoffs and context-aware agents.",
    slug: "#",
  },
  {
    index: "02",
    date: "[DATE]",
    category: "Enterprise Architecture",
    title: "Designing Resilient Multi-Agent Pipelines Across Fragmented SaaS Platforms",
    excerpt: "A practical blueprint for zero-loss bidirectional data synchronization between CRM, communication, and ERP systems.",
    slug: "#",
  },
];

export default function Blog() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

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

  return (
    <section
      id="blog"
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
            marginBottom: "48px",
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
            INSIGHTS & CASE STUDIES
          </span>
          <span
            style={{
              fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
              fontSize: "11px",
              color: "var(--muted)",
              letterSpacing: "0.12em",
            }}
          >
            008
          </span>
        </div>

        {/* Section Title & Case Studies Link */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "24px",
            marginBottom: "56px",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--ff-display, 'Anton', sans-serif)",
              fontSize: "clamp(36px, 4.5vw, 64px)",
              fontWeight: 400,
              lineHeight: 0.96,
              textTransform: "uppercase",
              letterSpacing: "0.01em",
              color: "var(--ink)",
              maxWidth: "680px",
              margin: 0,
            }}
          >
            FEATURED AI SOLUTIONS FOR MODERN BUSINESSES
          </h2>

          <a
            href="#case-studies"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
              fontSize: "12px",
              fontWeight: 500,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--ink)",
              textDecoration: "none",
              borderBottom: "1px solid var(--ink)",
              paddingBottom: "4px",
              transition: "opacity 0.2s, gap 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Case Studies
            <span style={{ fontSize: "14px" }}>↗</span>
          </a>
        </div>

        {/* List-style Rows */}
        <div style={{ borderTop: "1px solid var(--line)" }}>
          {BLOG_POSTS.map((post, i) => {
            const isHovered = hoveredIdx === i;
            return (
              <a
                key={post.index}
                href={post.slug}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{
                  display: "block",
                  textDecoration: "none",
                  borderBottom: "1px solid var(--line)",
                  padding: "40px 28px",
                  background: isHovered ? "var(--ink)" : "transparent",
                  borderRadius: isHovered ? "20px" : "0px",
                  transition: "background 0.35s cubic-bezier(0.16,1,0.3,1), padding 0.25s ease, border-radius 0.25s ease",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    alignItems: "center",
                    gap: "24px",
                  }}
                >
                  {/* Left Column: Index, Date, Title */}
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        marginBottom: "16px",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
                          fontSize: "12px",
                          fontWeight: 600,
                          color: isHovered ? "var(--accent)" : "var(--muted)",
                          letterSpacing: "0.08em",
                        }}
                      >
                        {post.index}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
                          fontSize: "11px",
                          color: isHovered ? "rgba(244,239,230,0.6)" : "var(--muted)",
                          letterSpacing: "0.06em",
                        }}
                      >
                        {post.date}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
                          fontSize: "10px",
                          fontWeight: 500,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          padding: "3px 10px",
                          borderRadius: "9999px",
                          background: isHovered ? "rgba(244,239,230,0.12)" : "var(--surface)",
                          border: isHovered ? "1px solid rgba(244,239,230,0.2)" : "1px solid var(--line)",
                          color: isHovered ? "var(--bg)" : "var(--muted)",
                        }}
                      >
                        {post.category}
                      </span>
                    </div>

                    <h3
                      style={{
                        fontFamily: "var(--ff-body, 'DM Sans', sans-serif)",
                        fontSize: "clamp(20px, 2.2vw, 28px)",
                        fontWeight: 500,
                        lineHeight: 1.3,
                        color: isHovered ? "var(--bg)" : "var(--ink)",
                        margin: 0,
                        transition: "color 0.25s ease",
                      }}
                    >
                      {post.title}
                    </h3>
                  </div>

                  {/* Right Column: Excerpt + Hover Arrow */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "24px",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "var(--ff-body, 'DM Sans', sans-serif)",
                        fontSize: "15px",
                        lineHeight: 1.6,
                        color: isHovered ? "rgba(244,239,230,0.7)" : "var(--muted)",
                        margin: 0,
                        maxWidth: "460px",
                      }}
                    >
                      {post.excerpt}
                    </p>

                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "50%",
                        background: isHovered ? "var(--bg)" : "var(--surface)",
                        border: "1px solid var(--line)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        transition: "transform 0.35s ease, background 0.35s ease",
                        transform: isHovered ? "rotate(-45deg)" : "rotate(0deg)",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "18px",
                          color: isHovered ? "var(--ink)" : "var(--muted)",
                        }}
                      >
                        →
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
