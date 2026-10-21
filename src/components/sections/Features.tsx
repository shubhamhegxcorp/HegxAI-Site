"use client";
import { useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SectionBar, SectionColumn, Button } from "@/components/ui/shared";
import { useIsMobile } from "@/lib/useIsMobile";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    tag: "AI AGENT",
    title: "Deploy an AI Agent in hours, not months",
    body: "Configure intelligent agents that handle repetitive tasks, answer customer queries, qualify leads, and escalate edge cases — all without human intervention.",
    agentType: "Customer Support Agent",
    tasks: ["Respond to FAQs", "Route complex tickets", "Log to CRM"],
    status: "ACTIVE",
  },
  {
    tag: "WORKFLOW",
    title: "Automate multi-step workflows end to end",
    body: "Connect your tools into seamless pipelines. From inbound lead to closed deal — every step can be mapped, automated, and monitored in real-time.",
    agentType: "Sales Pipeline Workflow",
    tasks: ["Enrich lead data", "Schedule outreach", "Update Sheets"],
    status: "ACTIVE",
  },
  {
    tag: "INTEGRATION",
    title: "One source of truth, zero data entry",
    body: "Sync data across your stack automatically. No more copy-pasting between tools — every system stays in sync without manual effort.",
    agentType: "Data Sync Integration",
    tasks: ["Bi-directional sync", "Conflict resolution", "Audit trail"],
    status: "ACTIVE",
  },
];

export default function Features() {
  const isMobile = useIsMobile();
  const [mobileActive, setMobileActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const avatarNodesRef = useRef<(HTMLDivElement | null)[]>([]);
  const digitsRef = useRef<HTMLDivElement>(null);
  const leftPanelsRef = useRef<(HTMLDivElement | null)[]>([]);
  const rightPanelsRef = useRef<(HTMLDivElement | null)[]>([]);
  const stRef = useRef<ScrollTrigger | null>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const isMobile = window.innerWidth < 768;

      // 1. Continuous orbital rotation & counter-rotation to stay upright
      if (orbitRef.current) {
        gsap.to(orbitRef.current, {
          rotation: 360,
          duration: 40,
          ease: "none",
          repeat: -1,
        });
      }

      avatarNodesRef.current.forEach((node) => {
        if (node) {
          gsap.to(node, {
            rotation: -360,
            duration: 40,
            ease: "none",
            repeat: -1,
          });
        }
      });

      // 2. Skip pinning and scrub on mobile or reduced-motion
      if (prefersReduced || isMobile) {
        gsap.fromTo(
          sectionRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
        return;
      }

      // 3. Desktop pinned scroll-driven feature swap
      const leftPanels = leftPanelsRef.current.filter(Boolean) as HTMLElement[];
      const rightPanels = rightPanelsRef.current.filter(Boolean) as HTMLElement[];
      const digitsEl = digitsRef.current;

      if (!leftPanels.length || !rightPanels.length || !sectionRef.current) return;

      // Setup initial positions
      // Panel 0 starts visible
      gsap.set([leftPanels[0], rightPanels[0]], { opacity: 1, y: 0, scale: 1 });
      // Panels 1 and 2 start hidden below with scale 0.98
      for (let i = 1; i < FEATURES.length; i++) {
        if (leftPanels[i] && rightPanels[i]) {
          gsap.set([leftPanels[i], rightPanels[i]], { opacity: 0, y: 40, scale: 0.98 });
        }
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=300%",
          pin: true,
          pinSpacing: true,
          scrub: 0.6,
          onRefresh: (self) => {
            stRef.current = self;
          },
        },
      });

      stRef.current = tl.scrollTrigger || null;

      // Swap 0 -> 1
      tl.to({}, { duration: 0.4 }) // brief hold on 0
        .to([leftPanels[0], rightPanels[0]], {
          opacity: 0,
          y: -40,
          scale: 0.98,
          duration: 1,
          ease: "power2.inOut",
          onStart: () => {
            gsap.set([leftPanels[0], rightPanels[0]], { willChange: "transform, opacity" });
          },
          onComplete: () => {
            gsap.set([leftPanels[0], rightPanels[0]], { willChange: "auto" });
          },
        })
        .to(
          [leftPanels[1], rightPanels[1]],
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power2.inOut",
            onStart: () => {
              gsap.set([leftPanels[1], rightPanels[1]], { willChange: "transform, opacity" });
            },
            onComplete: () => {
              gsap.set([leftPanels[1], rightPanels[1]], { willChange: "auto" });
            },
          },
          "<"
        )
        .to(
          digitsEl,
          {
            yPercent: -33.333,
            duration: 1,
            ease: "power2.inOut",
          },
          "<"
        )
        // Swap 1 -> 2
        .to({}, { duration: 0.4 }) // brief hold on 1
        .to([leftPanels[1], rightPanels[1]], {
          opacity: 0,
          y: -40,
          scale: 0.98,
          duration: 1,
          ease: "power2.inOut",
          onStart: () => {
            gsap.set([leftPanels[1], rightPanels[1]], { willChange: "transform, opacity" });
          },
          onComplete: () => {
            gsap.set([leftPanels[1], rightPanels[1]], { willChange: "auto" });
          },
        })
        .to(
          [leftPanels[2], rightPanels[2]],
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power2.inOut",
            onStart: () => {
              gsap.set([leftPanels[2], rightPanels[2]], { willChange: "transform, opacity" });
            },
            onComplete: () => {
              gsap.set([leftPanels[2], rightPanels[2]], { willChange: "auto" });
            },
          },
          "<"
        )
        .to(
          digitsEl,
          {
            yPercent: -66.666,
            duration: 1,
            ease: "power2.inOut",
          },
          "<"
        )
        .to({}, { duration: 0.4 }); // brief hold on 2
    },
    { scope: sectionRef }
  );

  const goTo = (idx: number) => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isMobile || prefersReduced || !stRef.current) {
      setMobileActive(idx);
      return;
    }

    const st = stRef.current;
    const progress = idx / (FEATURES.length - 1);
    const scrollTarget = st.start + progress * (st.end - st.start);
    window.scrollTo({ top: scrollTarget, behavior: "smooth" });
  };

  return (
    <section
      id="features"
      aria-labelledby="features-title"
      ref={sectionRef}
      style={{
        background: "var(--bg)",
        padding: isMobile ? "80px 24px" : "128px 24px",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
      }}
    >
      <SectionColumn style={{ padding: "0 var(--col-pad, 24px)", width: "100%" }}>
        <SectionBar label="THE FEATURES" sectionId="features" />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1px 380px",
            gap: isMobile ? "32px" : "48px",
            marginTop: "64px",
            alignItems: "stretch",
          }}
        >
          {/* Left: agent card mockup */}
          <div
            ref={cardRef}
            style={{
              background: "var(--ink)",
              borderRadius: "var(--r-card, 12px)",
              padding: "36px",
              minHeight: "480px",
              position: "relative",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.06)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            {/* Halftone pattern ONLY inside dark card (static, 25% opacity, masked to fade at edges) */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(0,0,0,1) 20%, transparent 90%)",
                WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(0,0,0,1) 20%, transparent 90%)",
                opacity: 0.25,
                zIndex: 1,
              }}
            >
              <svg width="100%" height="100%">
                <defs>
                  <pattern id="card-halftone-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
                    <circle cx="5" cy="5" r="1.5" fill="#ffffff" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#card-halftone-pattern)" />
              </svg>
            </div>

            {/* Orbiting circles: centered bigger (160px) and vertically in the card's top half */}
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "200px",
                padding: "16px 0",
                zIndex: 2,
              }}
            >
              <div style={{ position: "relative", width: "160px", height: "160px" }}>
                {/* Center circle */}
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    background: "var(--accent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 0 40px rgba(232,162,92,0.4)",
                    zIndex: 2,
                  }}
                >
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 2L13.8 8.2H20L14.8 11.8L16.6 18L12 14.4L7.4 18L9.2 11.8L4 8.2H10.2L12 2Z"
                      fill="var(--ink)"
                    />
                  </svg>
                </div>

                {/* Orbital ring (140px dashed ring) */}
                <div
                  style={{
                    position: "absolute",
                    inset: "10px",
                    borderRadius: "50%",
                    border: "1px dashed rgba(255,255,255,0.15)",
                  }}
                />

                {/* Rotating container for mini avatars (160px) */}
                <div
                  ref={orbitRef}
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "50%",
                  }}
                >
                  {[
                    { left: "137px", top: "67px", bg: "hsl(30, 60%, 65%)" },
                    { left: "32px", top: "128px", bg: "hsl(70, 60%, 65%)" },
                    { left: "32px", top: "6px", bg: "hsl(110, 60%, 65%)" },
                  ].map((avatar, i) => (
                    <div
                      key={i}
                      ref={(el) => {
                        avatarNodesRef.current[i] = el;
                      }}
                      style={{
                        position: "absolute",
                        left: avatar.left,
                        top: avatar.top,
                        width: "26px",
                        height: "26px",
                        borderRadius: "50%",
                        background: avatar.bg,
                        border: "2px solid var(--ink)",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Left feature details container (Desktop layered cross-fade) */}
            <div style={{ position: "relative", minHeight: "220px", zIndex: 3 }}>
              {FEATURES.map((item, i) => (
                <div
                  key={i}
                  ref={(el) => {
                    leftPanelsRef.current[i] = el;
                  }}
                  style={{
                    position: i === 0 ? "relative" : "absolute",
                    inset: 0,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  {/* Top status (tiny labels <= 11px keep mono) */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "16px",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
                        fontSize: "11px",
                        fontWeight: 500,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.45)",
                      }}
                    >
                      DEPLOY AN AI AGENT
                    </span>
                    <div
                      style={{
                        background: "var(--accent)",
                        borderRadius: "var(--r-pill, 999px)",
                        padding: "3px 10px",
                        fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
                        fontSize: "10px",
                        color: "var(--ink)",
                        fontWeight: 600,
                        letterSpacing: "0.06em",
                      }}
                    >
                      {item.status}
                    </div>
                  </div>

                  {/* Agent info */}
                  <div>
                    {/* Card title row: Inter Tight */}
                    <div
                      style={{
                        fontFamily: "var(--ff-display, 'Inter Tight', sans-serif)",
                        fontSize: "24px",
                        fontWeight: 500,
                        letterSpacing: "-0.02em",
                        color: "#ffffff",
                        marginBottom: "12px",
                      }}
                    >
                      {item.agentType}
                    </div>

                    {/* Plain line of text (replacing chips per Step 3) */}
                    <p
                      style={{
                        fontFamily: "var(--ff-body, 'DM Sans', sans-serif)",
                        fontSize: "14px",
                        color: "rgba(255,255,255,0.7)",
                        lineHeight: 1.5,
                        margin: "0 0 24px",
                      }}
                    >
                      {item.tasks.join(" · ")}
                    </p>

                    <Button href="#contact" variant="inverse" size="sm">
                      Book a free audit
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 1px vertical divider (ink 25%) between card and right text column, full height of row */}
          {!isMobile && (
            <div
              aria-hidden="true"
              style={{
                width: "1px",
                height: "100%",
                background: "rgba(20, 20, 20, 0.25)",
              }}
            />
          )}

          {/* Right: Feature copy + rolling pager */}
          <div style={{ paddingTop: "12px", display: "flex", flexDirection: "column", minHeight: "440px", justifyContent: "space-between" }}>
            <div style={{ position: "relative", minHeight: "320px" }}>
              {FEATURES.map((item, i) => (
                <div
                  key={i}
                  ref={(el) => {
                    rightPanelsRef.current[i] = el;
                  }}
                  style={{
                    position: i === 0 ? "relative" : "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                  }}
                >
                  <h2
                    id={i === 0 ? "features-title" : undefined}
                    style={{
                      fontFamily: "var(--ff-display, 'Inter Tight', sans-serif)",
                      fontSize: "clamp(26px, 2.8vw, 38px)",
                      fontWeight: 500,
                      letterSpacing: "-0.02em",
                      lineHeight: 1.04,
                      color: "var(--ink)",
                      marginBottom: "20px",
                    }}
                  >
                    {item.title}
                  </h2>

                  <p
                    style={{
                      fontFamily: "var(--ff-body, 'DM Sans', sans-serif)",
                      fontSize: "15px",
                      fontWeight: 400,
                      lineHeight: 1.7,
                      color: "var(--muted)",
                      marginBottom: "40px",
                    }}
                  >
                    {item.body}
                  </p>
                </div>
              ))}
            </div>

            {/* Pager with vertically rolling digits */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "auto" }}>
              <div
                style={{
                  fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
                  fontSize: "11px",
                  letterSpacing: "0.1em",
                  color: "var(--muted)",
                }}
              >
                ▶ NEXT FEATURE
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <button
                  onClick={() => goTo((mobileActive - 1 + FEATURES.length) % FEATURES.length)}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    border: "1px solid var(--line)",
                    background: "var(--surface)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "sans-serif",
                    fontSize: "14px",
                    color: "var(--muted)",
                    transition: "background-color 0.2s ease, color 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--ink)";
                    e.currentTarget.style.color = "var(--bg)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "var(--surface)";
                    e.currentTarget.style.color = "var(--muted)";
                  }}
                  aria-label="Previous feature"
                >
                  ‹
                </button>

                {/* Rolling digits container */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
                    fontSize: "12px",
                    color: "var(--muted)",
                    letterSpacing: "0.08em",
                  }}
                >
                  <div
                    style={{
                      display: "inline-block",
                      height: "16px",
                      overflow: "hidden",
                      verticalAlign: "middle",
                    }}
                  >
                    <div
                      ref={digitsRef}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        lineHeight: "16px",
                        transform: "translateY(0%)",
                      }}
                    >
                      <span style={{ height: "16px", display: "flex", alignItems: "center" }}>01</span>
                      <span style={{ height: "16px", display: "flex", alignItems: "center" }}>02</span>
                      <span style={{ height: "16px", display: "flex", alignItems: "center" }}>03</span>
                    </div>
                  </div>
                  <span style={{ lineHeight: "16px" }}>&nbsp;/ 03</span>
                </div>

                <button
                  onClick={() => goTo((mobileActive + 1) % FEATURES.length)}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    border: "1px solid var(--line)",
                    background: "var(--surface)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "sans-serif",
                    fontSize: "14px",
                    color: "var(--muted)",
                    transition: "background-color 0.2s ease, color 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--ink)";
                    e.currentTarget.style.color = "var(--bg)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "var(--surface)";
                    e.currentTarget.style.color = "var(--muted)";
                  }}
                  aria-label="Next feature"
                >
                  ›
                </button>
              </div>
            </div>
          </div>
        </div>
      </SectionColumn>
    </section>
  );
}
