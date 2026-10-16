"use client";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// TODO: real testimonials - skip section as instructed

const STEPS = [
  {
    num: "01",
    title: "Discovery",
    tag: "(strategy)",
    body: "We start with a deep-dive into your current operations — workflows, tools, bottlenecks, and team structure. No assumption, no generic templates.",
    visual: "DISCOVER",
  },
  {
    num: "02",
    title: "Strategy",
    tag: "(planning)",
    body: "We design the automation blueprint: which processes to automate first, which tools to connect, and what the rollout sequence should look like.",
    visual: "PLAN",
  },
  {
    num: "03",
    title: "Build",
    tag: "(development)",
    body: "We build, test, and iterate in tight loops — deploying agents, triggers, and integrations with full documentation and team walkthroughs.",
    visual: "BUILD",
  },
  {
    num: "04",
    title: "Run",
    tag: "(deployment)",
    body: "We go live with monitoring, handoff your team, and stay available for support. Your automation runs — and keeps running — reliably.",
    visual: "DEPLOY",
  },
];

export default function Process() {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    const section = sectionRef.current;
    if (!section) return;

    // Pin the section and drive step changes on scroll
    const totalSteps = STEPS.length;
    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: `+=${totalSteps * 400}`,
      pin: true,
      pinSpacing: true,
      scrub: 0.5,
      onUpdate: (self) => {
        const newStep = Math.min(
          totalSteps - 1,
          Math.floor(self.progress * totalSteps)
        );
        if (newStep !== activeStep) {
          setActiveStep(newStep);
          // Update progress bar
          if (progressRef.current) {
            gsap.to(progressRef.current, {
              scaleY: (newStep + 1) / totalSteps,
              duration: 0.5,
              ease: "power3.out",
            });
          }
          // Crossfade detail card
          if (detailRef.current) {
            gsap.fromTo(detailRef.current,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }
            );
          }
        }
      },
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const step = STEPS[activeStep];

  return (
    <section
      id="process"
      ref={sectionRef}
      style={{
        background: "var(--bg)",
        padding: "0 24px",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%", flex: 1 }}>
        {/* Section label */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 0",
          borderTop: "1px solid var(--line)",
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
            THE PROCESS
          </span>
          <span style={{
            fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
            fontSize: "11px",
            color: "var(--muted)",
            letterSpacing: "0.12em",
          }}>
            007
          </span>
        </div>

        {/* Headline */}
        <h2
          style={{
            fontFamily: "var(--ff-display, 'Anton', sans-serif)",
            fontSize: "clamp(36px, 4.5vw, 64px)",
            fontWeight: 400,
            lineHeight: 0.95,
            textTransform: "uppercase",
            letterSpacing: "0.01em",
            color: "var(--ink)",
            maxWidth: "640px",
            padding: "48px 0 56px",
          }}
        >
          AUTOMATION BUILT AROUND YOUR BUSINESS
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "80px",
          paddingBottom: "80px",
          alignItems: "start",
        }}>
          {/* Left: step list + progress */}
          <div style={{ display: "flex", gap: "24px" }}>
            {/* Progress line */}
            <div style={{
              width: "2px",
              background: "var(--line)",
              position: "relative",
              flexShrink: 0,
              borderRadius: "2px",
            }}>
              <div
                ref={progressRef}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "25%",
                  background: "var(--accent)",
                  borderRadius: "2px",
                  transformOrigin: "top",
                  transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
                }}
              />
            </div>

            <div style={{ flex: 1 }}>
              {STEPS.map((s, i) => (
                <div
                  key={i}
                  onClick={() => setActiveStep(i)}
                  style={{
                    padding: "20px 0",
                    borderBottom: i < STEPS.length - 1 ? "1px solid var(--line)" : "none",
                    cursor: "pointer",
                    transition: "opacity 0.2s ease",
                    opacity: activeStep === i ? 1 : 0.45,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "4px" }}>
                    {activeStep === i && (
                      <div style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: "var(--accent)",
                        flexShrink: 0,
                        animation: "pulse-dot 1.6s ease-in-out infinite",
                      }} />
                    )}
                    <span style={{
                      fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
                      fontSize: "10px",
                      fontWeight: 500,
                      letterSpacing: "0.12em",
                      color: activeStep === i ? "var(--accent)" : "var(--muted)",
                    }}>
                      {s.num}
                    </span>
                    <span style={{
                      fontFamily: "var(--ff-display, 'Anton', sans-serif)",
                      fontSize: "24px",
                      fontWeight: 400,
                      letterSpacing: "0.02em",
                      textTransform: "uppercase",
                      color: "var(--ink)",
                    }}>
                      {s.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: detail card */}
          <div
            ref={detailRef}
            style={{
              background: "var(--surface)",
              border: "1px solid var(--line)",
              borderRadius: "28px",
              padding: "36px",
              boxShadow: "0 4px 32px rgba(20,20,20,0.06)",
            }}
          >
            <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
              <span style={{
                background: "var(--accent-light)",
                border: "1px solid var(--accent)",
                borderRadius: "9999px",
                padding: "4px 12px",
                fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
                fontSize: "10px",
                fontWeight: 500,
                color: "var(--accent)",
                letterSpacing: "0.08em",
              }}>
                {step.tag}
              </span>
              <span style={{
                background: "var(--surface)",
                border: "1px solid var(--line)",
                borderRadius: "9999px",
                padding: "4px 12px",
                fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
                fontSize: "10px",
                fontWeight: 500,
                color: "var(--muted)",
                letterSpacing: "0.08em",
              }}>
                Step {step.num}
              </span>
            </div>

            <div style={{
              fontFamily: "var(--ff-display, 'Anton', sans-serif)",
              fontSize: "40px",
              fontWeight: 400,
              textTransform: "uppercase",
              letterSpacing: "0.02em",
              color: "var(--ink)",
              lineHeight: 0.95,
              marginBottom: "20px",
            }}>
              {step.title}
            </div>

            <p style={{
              fontFamily: "var(--ff-body, 'DM Sans', sans-serif)",
              fontSize: "15px",
              fontWeight: 400,
              lineHeight: 1.7,
              color: "var(--muted)",
              marginBottom: "28px",
            }}>
              {step.body}
            </p>

            {/* Visual placeholder */}
            <div style={{
              background: "var(--ink)",
              borderRadius: "16px",
              padding: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "120px",
              position: "relative",
              overflow: "hidden",
            }}>
              <div aria-hidden style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)`,
                backgroundSize: "20px 20px",
              }} />
              <span style={{
                fontFamily: "var(--ff-display, 'Anton', sans-serif)",
                fontSize: "48px",
                fontWeight: 400,
                letterSpacing: "0.04em",
                color: "rgba(255,255,255,0.08)",
                textTransform: "uppercase",
                position: "relative",
              }}>
                {step.visual}
              </span>
              {/* Accent accent line */}
              <div style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                height: "3px",
                background: "var(--accent)",
                width: `${((activeStep + 1) / STEPS.length) * 100}%`,
                transition: "width 0.5s cubic-bezier(0.16,1,0.3,1)",
                borderRadius: "2px",
              }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
