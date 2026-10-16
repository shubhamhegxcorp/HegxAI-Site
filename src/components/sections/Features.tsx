"use client";
import { useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SectionLabel } from "@/components/ui/shared";
import AsciiHalftoneCanvas from "@/components/ui/AsciiHalftoneCanvas";

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
      gsap.set([leftPanels[0], rightPanels[0]], { opacity: 1, y: 0, filter: "blur(0px)" });
      // Panels 1 and 2 start hidden below with 8px blur
      for (let i = 1; i < FEATURES.length; i++) {
        if (leftPanels[i] && rightPanels[i]) {
          gsap.set([leftPanels[i], rightPanels[i]], { opacity: 0, y: 40, filter: "blur(8px)" });
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
          filter: "blur(8px)",
          duration: 1,
          ease: "power2.inOut",
        })
        .to(
          [leftPanels[1], rightPanels[1]],
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1,
            ease: "power2.inOut",
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
          filter: "blur(8px)",
          duration: 1,
          ease: "power2.inOut",
        })
        .to(
          [leftPanels[2], rightPanels[2]],
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1,
            ease: "power2.inOut",
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

  const f = FEATURES[mobileActive];

  return (
    <section
      id="services"
      ref={sectionRef}
      style={{
        background: "var(--bg)",
        padding: "32px 24px 80px",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
      }}
    >
      {/* Background ASCII Halftone Matrix */}
      <AsciiHalftoneCanvas theme="light" density="sparse" interactive={true} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
        <SectionLabel label="THE FEATURES" number="002" />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 380px",
            gap: "48px",
            marginTop: "48px",
            alignItems: "start",
          }}
        >
          {/* Left: agent card mockup */}
          <div
            ref={cardRef}
            style={{
              background: "var(--ink)",
              borderRadius: "28px",
              padding: "36px",
              minHeight: "460px",
              position: "relative",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.06)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            {/* Background grid dots */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)`,
                backgroundSize: "24px 24px",
                pointerEvents: "none",
              }}
            />

            {/* Orbiting circles (Continuous 40s linear rotation) */}
            <div
              style={{
                position: "relative",
                display: "flex",
                justifyContent: "center",
                margin: "12px 0 28px",
                zIndex: 2,
              }}
            >
              <div style={{ position: "relative", width: "120px", height: "120px" }}>
                {/* Center circle */}
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    background: "var(--accent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 0 40px rgba(232,162,92,0.4)",
                    zIndex: 2,
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 2L13.8 8.2H20L14.8 11.8L16.6 18L12 14.4L7.4 18L9.2 11.8L4 8.2H10.2L12 2Z"
                      fill="var(--ink)"
                    />
                  </svg>
                </div>

                {/* Orbital ring */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "50%",
                    border: "1px dashed rgba(255,255,255,0.1)",
                  }}
                />

                {/* Rotating container for mini avatars */}
                <div
                  ref={orbitRef}
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "50%",
                  }}
                >
                  {[
                    { left: "100px", top: "48px", bg: "hsl(30, 60%, 65%)" },
                    { left: "22px", top: "93px", bg: "hsl(70, 60%, 65%)" },
                    { left: "22px", top: "3px", bg: "hsl(110, 60%, 65%)" },
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
                        width: "24px",
                        height: "24px",
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
                  {/* Top status */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "20px",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
                        fontSize: "11px",
                        fontWeight: 500,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.4)",
                      }}
                    >
                      DEPLOY AN AI AGENT
                    </span>
                    <div
                      style={{
                        background: "var(--accent)",
                        borderRadius: "9999px",
                        padding: "3px 10px",
                        fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
                        fontSize: "10px",
                        color: "var(--ink)",
                        fontWeight: 500,
                        letterSpacing: "0.06em",
                      }}
                    >
                      {item.status}
                    </div>
                  </div>

                  {/* Agent info */}
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--ff-body, 'DM Sans', sans-serif)",
                        fontSize: "22px",
                        fontWeight: 500,
                        color: "#fff",
                        marginBottom: "10px",
                      }}
                    >
                      {item.agentType}
                    </div>

                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "20px" }}>
                      {item.tasks.map((task) => (
                        <span
                          key={task}
                          style={{
                            background: "rgba(255,255,255,0.07)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: "9999px",
                            padding: "4px 10px",
                            fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
                            fontSize: "10px",
                            color: "rgba(255,255,255,0.5)",
                            fontWeight: 500,
                            textTransform: "uppercase",
                            letterSpacing: "0.06em",
                          }}
                        >
                          {task}
                        </span>
                      ))}
                    </div>

                    <a
                      href="#contact"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        padding: "14px 24px",
                        width: "100%",
                        borderRadius: "14px",
                        background: "var(--lime)",
                        color: "var(--ink)",
                        fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
                        fontSize: "12px",
                        fontWeight: 600,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        textDecoration: "none",
                        transition: "transform 0.25s var(--ease-out), box-shadow 0.25s var(--ease-out)",
                        boxShadow: "0 4px 20px var(--lime-glow)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow = "0 8px 28px var(--lime-glow)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "0 4px 20px var(--lime-glow)";
                      }}
                    >
                      Deploy Agent ››
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

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
                  <span
                    style={{
                      display: "inline-block",
                      background: "var(--surface)",
                      border: "1px solid var(--line)",
                      borderRadius: "9999px",
                      padding: "5px 14px",
                      fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
                      fontSize: "11px",
                      fontWeight: 500,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--accent)",
                      marginBottom: "20px",
                    }}
                  >
                    {item.tag}
                  </span>

                  <h2
                    style={{
                      fontFamily: "var(--ff-body, 'DM Sans', sans-serif)",
                      fontSize: "clamp(24px, 2.5vw, 36px)",
                      fontWeight: 500,
                      lineHeight: 1.2,
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
      </div>

      {/* Marquee word strip */}
      <div
        style={{
          marginTop: "64px",
          borderTop: "1px solid var(--line)",
          borderBottom: "1px solid var(--line)",
          padding: "20px 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            flex: 1,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "60px",
              animation: "marquee-scroll 25s linear infinite",
              width: "max-content",
            }}
          >
            {Array(8)
              .fill("INTELLIGENT AUTOMATION")
              .map((w, i) => (
                <span
                  key={i}
                  style={{
                    fontFamily: "var(--ff-display, 'Anton', sans-serif)",
                    fontSize: "clamp(40px, 5vw, 72px)",
                    fontWeight: 400,
                    letterSpacing: "0.02em",
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

        <a
          href="#contact"
          style={{
            flexShrink: 0,
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
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
            marginLeft: "32px",
            transition: "background-color 0.3s ease, transform 0.3s ease",
            whiteSpace: "nowrap",
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
    </section>
  );
}
