"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CTABlock() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    gsap.fromTo(
      sectionRef.current,
      { scale: 0.92, opacity: 0.8 },
      {
        scale: 1,
        opacity: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
          end: "top 45%",
          scrub: 1,
        },
      }
    );
  }, []);

  return (
    <section
      id="contact"
      style={{
        background: "var(--bg)",
        padding: "0 24px 120px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div
          ref={sectionRef}
          style={{
            background: "var(--surface)",
            border: "1px solid var(--line)",
            borderRadius: "32px",
            padding: "80px 64px",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 8px 60px rgba(20,20,20,0.06)",
          }}
        >
          {/* Background dot grid */}
          <div aria-hidden style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `radial-gradient(circle, rgba(20,20,20,0.04) 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
            pointerEvents: "none",
          }} />

          {/* Faint floating mockup behind */}
          <div aria-hidden style={{
            position: "absolute",
            right: "64px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "300px",
            height: "200px",
            background: "linear-gradient(135deg, rgba(232,162,92,0.06) 0%, transparent 60%)",
            borderRadius: "24px",
            border: "1px solid rgba(232,162,92,0.1)",
            pointerEvents: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <div style={{
              fontFamily: "var(--ff-display, 'Anton', sans-serif)",
              fontSize: "80px",
              color: "rgba(232,162,92,0.08)",
              letterSpacing: "0.04em",
            }}>
              AI
            </div>
          </div>

          {/* Content */}
          <div style={{ position: "relative", maxWidth: "620px" }}>
            <span style={{
              fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--muted)",
              display: "block",
              marginBottom: "20px",
            }}>
              CONTACT
            </span>

            <h2
              data-reveal
              style={{
                fontFamily: "var(--ff-display, 'Anton', sans-serif)",
                fontSize: "clamp(44px, 5vw, 72px)",
                fontWeight: 400,
                lineHeight: 0.95,
                textTransform: "uppercase",
                letterSpacing: "0.01em",
                color: "var(--ink)",
                marginBottom: "24px",
              }}
            >
              TRANSFORM YOUR BUSINESS WITH INTELLIGENT AI AUTOMATION
            </h2>

            <p
              data-reveal
              style={{
                fontFamily: "var(--ff-body, 'DM Sans', sans-serif)",
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: 1.7,
                color: "var(--muted)",
                marginBottom: "40px",
              }}
            >
              Start with a free audit. We&apos;ll map your biggest automation opportunities and
              show you exactly what&apos;s possible — no commitment required.
            </p>

            <a
              href="mailto:hello@hegxai.com"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "16px 36px",
                borderRadius: "9999px",
                background: "var(--ink)",
                color: "var(--bg)",
                fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
                fontSize: "13px",
                fontWeight: 500,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "background-color 0.3s cubic-bezier(0.16,1,0.3,1), transform 0.3s cubic-bezier(0.16,1,0.3,1)",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "#2a2a2a"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "var(--ink)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              Book a Free Audit
              <span style={{ transition: "transform 0.3s ease", display: "inline-block" }}>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
