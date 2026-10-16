"use client";
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsMobile } from "@/lib/useIsMobile";

gsap.registerPlugin(ScrollTrigger);

const FAQS = [
  {
    q: "How long does a project take?",
    a: "It depends on scope — a single workflow automation can be live in days, while a full multi-system deployment typically takes a few weeks. We scope this clearly in our initial audit so there are no surprises.",
  },
  {
    q: "Does it work with our existing tools?",
    a: "In almost every case, yes. We build integrations for the most common business tools — CRMs, email platforms, spreadsheets, project management software, and more. If your tool has an API, we can connect it.",
  },
  {
    q: "Do you build custom AI agents?",
    a: "Yes. We design and deploy AI agents tailored to your specific workflows — whether that's a customer support agent, a lead qualification bot, or an internal operations assistant. Every agent is purpose-built, not off-the-shelf.",
  },
  {
    q: "How do you handle data security?",
    a: "We take data security seriously. All automations are built with least-privilege access principles, encrypted connections, and clear data handling documentation. We never store your data beyond what's needed to make a system work.",
  },
  {
    q: "Do you provide ongoing support?",
    a: "Yes. Every project includes a handoff period, full documentation, and an option for ongoing maintenance. Your automations will keep running reliably — and if anything needs adjusting as your business evolves, we're here.",
  },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const answerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isMobile = useIsMobile();

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

  const toggle = (idx: number) => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = answerRefs.current[idx];

    if (openIdx === idx) {
      if (el && !prefersReduced) {
        gsap.to(el, { height: 0, opacity: 0, duration: 0.35, ease: "power3.inOut" });
      }
      setOpenIdx(null);
    } else {
      // Close previous
      if (openIdx !== null) {
        const prevEl = answerRefs.current[openIdx];
        if (prevEl && !prefersReduced) {
          gsap.to(prevEl, { height: 0, opacity: 0, duration: 0.3, ease: "power3.inOut" });
        }
      }
      setOpenIdx(idx);
      if (el && !prefersReduced) {
        gsap.set(el, { height: "auto", opacity: 1 });
        const h = el.offsetHeight;
        gsap.fromTo(el, { height: 0, opacity: 0 }, { height: h, opacity: 1, duration: 0.45, ease: "power3.out" });
      }
    }
  };

  return (
    <section
      id="faq"
      ref={sectionRef}
      style={{
        background: "var(--bg)",
        padding: "0 24px 120px",
        opacity: 0,
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Section bar */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 0",
          borderTop: "1px solid var(--line)",
          borderBottom: "1px solid var(--line)",
          marginBottom: "64px",
        }}>
          <span style={{
            fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--muted)",
          }}>
            FAQ
          </span>
          <span style={{
            fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
            fontSize: "11px",
            color: "var(--muted)",
            letterSpacing: "0.12em",
          }}>
            008
          </span>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "80px",
          alignItems: "start",
        }}>
          {/* Left: giant heading */}
          <div>
            <h2 style={{
              fontFamily: "var(--ff-display, 'Anton', sans-serif)",
              fontSize: "clamp(56px, 7vw, 100px)",
              fontWeight: 400,
              lineHeight: 0.9,
              textTransform: "uppercase",
              letterSpacing: "0.01em",
              color: "var(--ink)",
            }}>
              FREQUENTLY
              <br />
              ASKED
            </h2>

            <p style={{
              fontFamily: "var(--ff-body, 'DM Sans', sans-serif)",
              fontSize: "15px",
              fontWeight: 400,
              lineHeight: 1.7,
              color: "var(--muted)",
              marginTop: "28px",
              maxWidth: "360px",
            }}>
              Questions about working with us? Here are the ones we hear most
              often — answered honestly.
            </p>

            <a
              href="mailto:hello@hegxai.com"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                marginTop: "28px",
                fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--accent)",
                textDecoration: "none",
                transition: "gap 0.2s ease",
              }}
              onMouseEnter={e => { e.currentTarget.style.gap = "12px"; }}
              onMouseLeave={e => { e.currentTarget.style.gap = "8px"; }}
            >
              Ask a question →
            </a>
          </div>

          {/* Right: accordion */}
          <div>
            {FAQS.map((faq, i) => (
              <div
                key={i}
                style={{ borderBottom: "1px solid var(--line)" }}
              >
                <button
                  onClick={() => toggle(i)}
                  id={`faq-btn-${i}`}
                  aria-expanded={openIdx === i}
                  aria-controls={`faq-answer-${i}`}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "22px 0",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    gap: "16px",
                    textAlign: "left",
                  }}
                >
                  <span style={{
                    fontFamily: "var(--ff-body, 'DM Sans', sans-serif)",
                    fontSize: "16px",
                    fontWeight: 500,
                    color: "var(--ink)",
                    lineHeight: 1.3,
                  }}>
                    {faq.q}
                  </span>
                  <span
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      border: "1px solid var(--line)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      fontSize: "16px",
                      color: "var(--ink)",
                      transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1), background 0.2s ease",
                      transform: openIdx === i ? "rotate(45deg)" : "rotate(0deg)",
                      background: openIdx === i ? "var(--ink)" : "transparent",
                    }}
                    aria-hidden
                  >
                    <span style={{ color: openIdx === i ? "var(--bg)" : "var(--ink)", lineHeight: 1 }}>+</span>
                  </span>
                </button>

                <div
                  id={`faq-answer-${i}`}
                  ref={(el) => { answerRefs.current[i] = el; }}
                  role="region"
                  aria-labelledby={`faq-btn-${i}`}
                  style={{
                    height: openIdx === i ? "auto" : 0,
                    overflow: "hidden",
                    opacity: openIdx === i ? 1 : 0,
                  }}
                >
                  <p style={{
                    fontFamily: "var(--ff-body, 'DM Sans', sans-serif)",
                    fontSize: "15px",
                    fontWeight: 400,
                    lineHeight: 1.7,
                    color: "var(--muted)",
                    paddingBottom: "24px",
                  }}>
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
