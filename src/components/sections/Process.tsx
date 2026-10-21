"use client";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionBar, SectionColumn } from "@/components/ui/shared";

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
  const activeStepRef = useRef(0);
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

    let st: ScrollTrigger | null = null;

    const ctx = gsap.context(() => {
      // Pin the section and drive step changes on scroll
      const totalSteps = STEPS.length;
      st = ScrollTrigger.create({
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
          if (newStep !== activeStepRef.current) {
            activeStepRef.current = newStep;
            setActiveStep(newStep);
            // Update progress bar
            if (progressRef.current) {
              gsap.to(progressRef.current, {
                scaleY: (newStep + 1) / totalSteps,
                duration: 0.5,
                ease: "power3.out",
                overwrite: "auto",
              });
            }
            // Crossfade detail card
            if (detailRef.current) {
              gsap.fromTo(
                detailRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.45, ease: "power3.out", overwrite: "auto" }
              );
            }
          }
        },
      });
    }, sectionRef);

    return () => {
      if (st) st.kill();
      ctx.revert();
    };
  }, []);

  const step = STEPS[activeStep];

  return (
    <section
      id="process"
      aria-labelledby="process-title"
      ref={sectionRef}
      style={{
        background: "var(--bg)",
        padding: "128px 24px",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <SectionColumn style={{ padding: "0 var(--col-pad, 24px)", flex: 1, width: "100%" }}>
        <SectionBar label="THE PROCESS" sectionId="process" />

        {/* Headline & Intro */}
        <div style={{ marginTop: "64px", marginBottom: "48px" }}>
          <h2
            id="process-title"
            style={{
              fontFamily: "var(--ff-display, 'Inter Tight', sans-serif)",
              fontSize: "clamp(32px, 3.6vw, 56px)",
              fontWeight: 500,
              lineHeight: 1.04,
              letterSpacing: "-0.02em",
              color: "var(--ink)",
              maxWidth: "640px",
              marginBottom: "16px",
            }}
          >
            Automation built around your business
          </h2>
          <p
            style={{
              fontFamily: "var(--ff-body, 'DM Sans', sans-serif)",
              fontSize: "16px",
              lineHeight: 1.6,
              color: "#5f5b52",
              maxWidth: "56ch",
            }}
          >
            Automation that grows with you — designed to scale alongside your team with no rework and no surprises.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "80px",
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
              borderRadius: "var(--r-0, 0px)",
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
                  borderRadius: "var(--r-0, 0px)",
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
                      color: activeStep === i ? "var(--accent-text, #B8742A)" : "var(--muted)",
                    }}>
                      {s.num}
                    </span>
                    <span style={{
                      fontFamily: "var(--ff-display, 'Inter Tight', sans-serif)",
                      fontSize: "20px",
                      fontWeight: 500,
                      letterSpacing: "-0.02em",
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
              border: "1px solid rgba(20,20,20,0.12)",
              borderRadius: "var(--r-card, 12px)",
              padding: "36px",
              boxShadow: "none",
            }}
          >
            <div
              style={{
                fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.08em",
                color: "var(--accent-text, #B8742A)",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
            >
              {step.tag} · STEP {step.num}
            </div>

            <div style={{
              fontFamily: "var(--ff-display, 'Inter Tight', sans-serif)",
              fontSize: "clamp(24px, 2.5vw, 36px)",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              color: "var(--ink)",
              lineHeight: 1.04,
              marginBottom: "20px",
            }}>
              {step.title}
            </div>

            <p style={{
              fontFamily: "var(--ff-body, 'DM Sans', sans-serif)",
              fontSize: "15px",
              fontWeight: 400,
              lineHeight: 1.7,
              color: "#5f5b52",
              maxWidth: "56ch",
              marginBottom: "28px",
            }}>
              {step.body}
            </p>

            {/* Visual placeholder */}
            <div style={{
              background: "var(--ink)",
              borderRadius: "var(--r-card, 12px)",
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
                fontFamily: "var(--ff-display, 'Inter Tight', sans-serif)",
                fontSize: "44px",
                fontWeight: 600,
                letterSpacing: "-0.04em",
                color: "rgba(255,255,255,0.12)",
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
                borderRadius: "var(--r-0, 0px)",
              }} />
            </div>
          </div>
        </div>
      </SectionColumn>
    </section>
  );
}
