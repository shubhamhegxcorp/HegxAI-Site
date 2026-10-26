"use client";
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SectionBar, SectionColumn, Button } from "@/components/ui/shared";
import { useBooking } from "@/components/ui/BookingProvider";
import FeatureVisual from "./FeatureVisual";
import { useIsMobile } from "@/lib/useIsMobile";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    tag: "AI AGENT",
    title: "Deploy an AI Agent in hours, not months",
    body: "Configure intelligent agents that handle repetitive tasks, answer customer queries, qualify leads, and escalate edge cases — all without human intervention.",
    agentType: "Customer Support Agent",
    tasks: ["Respond to FAQs", "Route complex tickets", "Log to CRM"],
  },
  {
    tag: "WORKFLOW",
    title: "Automate multi-step workflows end to end",
    body: "Connect your tools into seamless pipelines. From inbound lead to closed deal — every step can be mapped, automated, and monitored in real-time.",
    agentType: "Sales Pipeline Workflow",
    tasks: ["Enrich lead data", "Schedule outreach", "Update Sheets"],
  },
  {
    tag: "INTEGRATION",
    title: "One source of truth, zero data entry",
    body: "Sync data across your stack automatically. No more copy-pasting between tools — every system stays in sync without manual effort.",
    agentType: "Data Sync Integration",
    tasks: ["Bi-directional sync", "Conflict resolution", "Audit trail"],
  },
];

export default function Features() {
  const { openBooking, preloadBooking, bookingUrl } = useBooking();
  const isMobile = useIsMobile();
  const [mobileActive, setMobileActive] = useState(0);
  const [activeIdx, setActiveIdx] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const digitsRef = useRef<HTMLDivElement>(null);
  const leftPanelsRef = useRef<(HTMLDivElement | null)[]>([]);
  const rightPanelsRef = useRef<(HTMLDivElement | null)[]>([]);
  const stRef = useRef<ScrollTrigger | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    const onScroll = () => {
      const children = Array.from(el.children);
      const scrollCenter = el.scrollLeft + el.clientWidth / 2;
      let closestIdx = 0;
      let minDiff = Infinity;
      children.forEach((child, i) => {
        const c = child as HTMLElement;
        const center = c.offsetLeft + c.offsetWidth / 2;
        const diff = Math.abs(scrollCenter - center);
        if (diff < minDiff) {
          minDiff = diff;
          closestIdx = i;
        }
      });
      setMobileActive(closestIdx);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const scrollCarouselTo = (idx: number) => {
    const el = carouselRef.current;
    if (!el) return;
    const children = Array.from(el.children);
    const target = children[idx] as HTMLElement;
    if (target) {
      el.scrollTo({ left: target.offsetLeft - el.offsetLeft, behavior: "smooth" });
    }
    setMobileActive(idx);
  };

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const isMobile = window.innerWidth < 768;

      // 2. Skip pinning and scrub on mobile or reduced-motion
      if (prefersReduced) {
        leftPanelsRef.current.forEach((panel, i) => { if (panel) gsap.set(panel, { opacity: i === 0 ? 1 : 0 }); });
        rightPanelsRef.current.forEach((panel, i) => { if (panel) gsap.set(panel, { opacity: i === 0 ? 1 : 0 }); });
        return;
      }
      if (isMobile) {
        gsap.fromTo(
          ".features-mobile-card",
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 95%",
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
          end: "+=140%",
          pin: true,
          pinSpacing: true,
          scrub: 0.6,
          onUpdate: (self) => {
            const p = self.progress;
            const idx = p < 0.35 ? 0 : p < 0.75 ? 1 : 2;
            setActiveIdx(idx);
          },
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
        );
    },
    { scope: sectionRef }
  );

  const goTo = (idx: number) => {
    if (idx < 0 || idx >= FEATURES.length) return;
    setActiveIdx(idx);
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isMobile || prefersReduced || !stRef.current) {
      if (prefersReduced) {
        leftPanelsRef.current.forEach((panel, i) => { if (panel) gsap.set(panel, { opacity: i === idx ? 1 : 0 }); });
        rightPanelsRef.current.forEach((panel, i) => { if (panel) gsap.set(panel, { opacity: i === idx ? 1 : 0 }); });
        gsap.set(digitsRef.current, { yPercent: -idx * 100 / FEATURES.length });
      }
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
        padding: "var(--section-py, 96px) 0",
        position: "relative",
      }}
    >
      <SectionColumn style={{ padding: "0 var(--col-pad, 24px)", width: "100%" }}>
        <SectionBar label="THE FEATURES" sectionId="features" />

        {/* ─── MOBILE CAROUSEL (< 768px): Horizontal scroll-snap carousel ─── */}
        <div className="flex flex-col md:hidden">
          <div
            ref={carouselRef}
            className="features-carousel-container"
            style={{
              display: "flex",
              overflowX: "auto",
              scrollSnapType: "x mandatory",
              gap: "12px",
              paddingBottom: "4px",
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              width: "100%",
            }}
          >
            {FEATURES.map((item, i) => (
              <div
                key={i}
                className="features-slide"
                style={{
                  flex: "0 0 88%",
                  width: "88%",
                  scrollSnapAlign: "start",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                {/* Visual Card on top (min-height 200px) */}
                <div
                  style={{
                    background: "var(--ink)",
                    borderRadius: "var(--r-card, 12px)",
                    padding: "16px",
                    minHeight: "200px",
                    height: "200px",
                    position: "relative",
                    overflow: "hidden",
                    border: "1px solid rgba(255,255,255,0.06)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      inset: 0,
                      pointerEvents: "none",
                      opacity: 0.25,
                      maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(0,0,0,1) 20%, transparent 90%)",
                      WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(0,0,0,1) 20%, transparent 90%)",
                    }}
                  >
                    <svg width="100%" height="100%">
                      <defs>
                        <pattern id={`card-halftone-m-${i}`} width="10" height="10" patternUnits="userSpaceOnUse">
                          <circle cx="5" cy="5" r="1.5" fill="#ffffff" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill={`url(#card-halftone-m-${i})`} />
                    </svg>
                  </div>

                  <div style={{ flex: 1, minHeight: 0, position: "relative", zIndex: 2 }}>
                    <FeatureVisual index={i} />
                  </div>

                  <div style={{ position: "relative", zIndex: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span className="label-mono" style={{ color: "#d7fd41", fontSize: "11px" }}>{item.tag}</span>
                    <span style={{ fontFamily: "var(--ff-display, 'Inter Tight', sans-serif)", fontSize: "13px", color: "rgba(255,255,255,0.7)" }}>{item.agentType}</span>
                  </div>
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: "var(--ff-display, 'Inter Tight', sans-serif)",
                    fontSize: "18px",
                    fontWeight: 500,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.15,
                    color: "var(--ink)",
                    margin: 0,
                  }}
                >
                  {item.title}
                </h3>

                {/* 2-line paragraph */}
                <p
                  style={{
                    fontFamily: "var(--ff-body, 'DM Sans', sans-serif)",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: 1.4,
                    color: "var(--muted)",
                    margin: 0,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {item.body}
                </p>

                {/* The 3 bullet rows collapsed into ONE line of text separated by " · " */}
                <div
                  style={{
                    fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
                    fontSize: "12px",
                    color: "var(--ink)",
                    paddingTop: "6px",
                    borderTop: "1px solid var(--line)",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    lineHeight: 1.25,
                  }}
                >
                  {item.tasks.join(" · ")}
                </div>
              </div>
            ))}
          </div>

          {/* Dots under carousel (3 dots, active = ink, 24x24px hit area with zero overlap) */}
          <div
            className="flex items-center justify-center gap-1"
            style={{ marginTop: "10px", marginBottom: "12px" }}
          >
            {FEATURES.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => scrollCarouselTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className="features-carousel-dot"
                style={{
                  minWidth: "24px",
                  minHeight: "24px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "transparent",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                }}
              >
                <span
                  style={{
                    display: "block",
                    width: mobileActive === i ? "20px" : "7px",
                    height: "7px",
                    borderRadius: "4px",
                    background: mobileActive === i ? "var(--ink)" : "rgba(20,20,20,0.2)",
                    transition: "all 0.25s ease",
                  }}
                />
              </button>
            ))}
          </div>

          {/* ONE primary CTA below carousel */}
          <div style={{ width: "100%" }}>
            <Button
              href={bookingUrl || "#contact"}
              variant="primary"
              className="btn-mobile-full"
              style={{ minHeight: "48px", width: "100%", justifyContent: "center" }}
              onClick={(e) => {
                if (e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
                  e.preventDefault();
                  openBooking();
                }
              }}
              onPointerEnter={preloadBooking}
              onFocus={preloadBooking}
            >
              Book a free audit
            </Button>
          </div>
        </div>

        {/* ─── DESKTOP PINNED SECTION (>= 768px) ─── */}
        <div
          className="features-desktop-grid hidden md:grid"
          style={{
            gridTemplateColumns: "1fr 1px 380px",
            gap: "48px",
            marginTop: "var(--heading-content-gap, 40px)",
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

            <FeatureVisual index={activeIdx} />

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
                  {/* Category label from data (AI AGENT, WORKFLOW, INTEGRATION) */}
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
                        color: "rgba(255,255,255,0.65)",
                      }}
                    >
                      {item.tag}
                    </span>
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
                        marginBottom: "24px",
                      }}
                    >
                      {item.agentType}
                    </div>
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

          {/* Right: Feature copy + 3 bullet rows + rolling pager */}
          <div style={{ paddingTop: "12px", display: "flex", flexDirection: "column", minHeight: "440px", justifyContent: "space-between" }}>
            <div style={{ position: "relative", minHeight: "360px" }}>
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
                      marginBottom: "16px",
                    }}
                  >
                    {item.title}
                  </h2>

                  <p
                    style={{
                      fontFamily: "var(--ff-body, 'DM Sans', sans-serif)",
                      fontSize: "15px",
                      fontWeight: 400,
                      lineHeight: 1.65,
                      color: "var(--muted)",
                      marginBottom: "24px",
                    }}
                  >
                    {item.body}
                  </p>

                  {/* 3 bullet items moved out of card as rows (1px dividers, 10px ink square marker, 15px text) */}
                  <div style={{ marginTop: "16px", marginBottom: "32px", borderTop: "1px solid var(--line)" }}>
                    {item.tasks.map((task, tIdx) => (
                      <div
                        key={tIdx}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                          padding: "12px 0",
                          borderBottom: "1px solid var(--line)",
                        }}
                      >
                        <span
                          style={{
                            width: "10px",
                            height: "10px",
                            background: "var(--ink)",
                            display: "inline-block",
                            flexShrink: 0,
                          }}
                        />
                        <span
                          style={{
                            fontFamily: "var(--ff-body, 'DM Sans', sans-serif)",
                            fontSize: "15px",
                            fontWeight: 400,
                            color: "var(--ink)",
                          }}
                        >
                          {task}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Pager with vertically rolling digits */}
            {(() => {
              const currentIdx = isMobile ? mobileActive : activeIdx;
              return (
                <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "auto" }}>
                  {currentIdx < FEATURES.length - 1 && (
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
                  )}

                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginLeft: currentIdx >= FEATURES.length - 1 ? "auto" : undefined }}>
                    <button
                      disabled={currentIdx === 0}
                      onClick={() => goTo(currentIdx - 1)}
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        border: "1px solid var(--line)",
                        background: "var(--surface)",
                        cursor: currentIdx === 0 ? "not-allowed" : "pointer",
                        opacity: currentIdx === 0 ? 0.35 : 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "sans-serif",
                        fontSize: "14px",
                        color: "var(--muted)",
                        transition: "background-color 0.2s ease, color 0.2s ease, opacity 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        if (currentIdx !== 0) {
                          e.currentTarget.style.background = "var(--ink)";
                          e.currentTarget.style.color = "var(--bg)";
                        }
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
                      disabled={currentIdx === FEATURES.length - 1}
                      onClick={() => goTo(currentIdx + 1)}
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        border: "1px solid var(--line)",
                        background: "var(--surface)",
                        cursor: currentIdx === FEATURES.length - 1 ? "not-allowed" : "pointer",
                        opacity: currentIdx === FEATURES.length - 1 ? 0.35 : 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "sans-serif",
                        fontSize: "14px",
                        color: "var(--muted)",
                        transition: "background-color 0.2s ease, color 0.2s ease, opacity 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        if (currentIdx !== FEATURES.length - 1) {
                          e.currentTarget.style.background = "var(--ink)";
                          e.currentTarget.style.color = "var(--bg)";
                        }
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
              );
            })()}
          </div>
        </div>
        {!isMobile && (
          <div className="feature-audit-cta hidden md:flex">
            <Button
              href={bookingUrl || "#contact"}
              variant="primary"
              onClick={(e) => {
                if (e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
                  e.preventDefault();
                  openBooking();
                }
              }}
              onPointerEnter={preloadBooking}
              onFocus={preloadBooking}
            >
              Book a free audit
            </Button>
          </div>
        )}
      </SectionColumn>
    </section>
  );
}
