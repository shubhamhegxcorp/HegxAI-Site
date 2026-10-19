"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Event feed cycling copies (no numbers / stats / brand names)
const FEED_ITEMS = [
  "Lead routed",
  "Reply drafted",
  "CRM updated",
  "Report generated",
];

interface Packet {
  id: number;
  active: boolean;
  stage: "to-agent" | "to-action";
  inPathIdx: number;
  outPathIdx: number;
  progress: number;
  duration: number;
}

interface FeedRow {
  id: number;
  text: string;
  isNew: boolean;
}

export default function HeroWorkflowCard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const agentHaloRef = useRef<SVGCircleElement>(null);
  const toastLeftRef = useRef<HTMLDivElement>(null);
  const toastRightRef = useRef<HTMLDivElement>(null);

  // 4 Icon Tiles refs
  const tileRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Workflow SVG path refs
  const inPathRefs = useRef<(SVGPathElement | null)[]>([]);
  const outPathRefs = useRef<(SVGPathElement | null)[]>([]);
  const actionNodeRefs = useRef<(SVGGElement | null)[]>([]);
  const packetCircleRefs = useRef<(SVGCircleElement | null)[]>([]);

  // State
  const [feedRows, setFeedRows] = useState<FeedRow[]>([
    { id: 1, text: "Lead routed", isNew: false },
    { id: 2, text: "Reply drafted", isNew: false },
    { id: 3, text: "CRM updated", isNew: false },
    { id: 4, text: "Report generated", isNew: false },
  ]);
  const [progressStep, setProgressStep] = useState(0);

  // References for ticker animation
  const isVisibleRef = useRef(false);
  const isReducedMotionRef = useRef(false);
  const feedCounterRef = useRef(0);
  const nextSpawnTimeRef = useRef(0);
  const packetsRef = useRef<Packet[]>([
    { id: 0, active: false, stage: "to-agent", inPathIdx: 0, outPathIdx: 0, progress: 0, duration: 0.9 },
    { id: 1, active: false, stage: "to-agent", inPathIdx: 1, outPathIdx: 1, progress: 0, duration: 0.9 },
    { id: 2, active: false, stage: "to-agent", inPathIdx: 2, outPathIdx: 2, progress: 0, duration: 0.9 },
    { id: 3, active: false, stage: "to-agent", inPathIdx: 0, outPathIdx: 1, progress: 0, duration: 0.9 },
  ]);

  // Feed row adder callback
  const pushFeedItem = useCallback(() => {
    feedCounterRef.current += 1;
    const text = FEED_ITEMS[feedCounterRef.current % FEED_ITEMS.length];
    const newId = Date.now() + Math.random();

    setFeedRows((prev) => [
      { id: newId, text, isNew: true },
      ...prev.slice(0, 3).map((r) => ({ ...r, isNew: false })),
    ]);
  }, []);

  // ─── 1. SCROLL ENTRANCE & BREATHING GLOW ────────────────────────────
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    isReducedMotionRef.current = prefersReduced;

    const panel = panelRef.current;
    if (!panel) return;

    if (!prefersReduced) {
      // Scale 0.92 -> 1, y 60 -> 0 scroll scrub
      gsap.fromTo(
        panel,
        { scale: 0.92, y: 60 },
        {
          scale: 1,
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: panel,
            start: "top 90%",
            end: "top 55%",
            scrub: true,
          },
        }
      );

      // Outer glow breathing: opacity 0.5 <-> 0.9, 4s cycle
      if (glowRef.current) {
        gsap.fromTo(
          glowRef.current,
          { opacity: 0.5 },
          {
            opacity: 0.9,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          }
        );
      }

      // Icon tiles subtle floating entrance & idle
      const validTiles = tileRefs.current.filter(Boolean) as HTMLDivElement[];
      if (validTiles.length > 0) {
        gsap.fromTo(
          validTiles,
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: "back.out(1.7)",
            delay: 0.5,
          }
        );

        validTiles.forEach((tile, i) => {
          gsap.to(tile, {
            y: i % 2 === 0 ? 5 : -5,
            duration: 3 + i * 0.7,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.2,
          });
        });
      }
    }
  }, []);

  // ─── 2. FLOATING TOASTS (Alternating Left/Right every ~3s) ──────────
  useEffect(() => {
    if (isReducedMotionRef.current) return;

    const toastL = toastLeftRef.current;
    const toastR = toastRightRef.current;
    if (!toastL || !toastR) return;

    gsap.set([toastL, toastR], { scale: 0.8, opacity: 0, pointerEvents: "none" });

    let isLeftTurn = true;
    let timer: NodeJS.Timeout | null = null;

    const runToastCycle = () => {
      if (!isVisibleRef.current) {
        timer = setTimeout(runToastCycle, 2000);
        return;
      }

      const activeToast = isLeftTurn ? toastL : toastR;
      isLeftTurn = !isLeftTurn;

      // Pop in
      gsap.to(activeToast, {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: "back.out(1.8)",
        onComplete: () => {
          // Hold 2.5s then pop out
          gsap.to(activeToast, {
            scale: 0.8,
            opacity: 0,
            duration: 0.35,
            delay: 2.5,
            ease: "power2.in",
            onComplete: () => {
              timer = setTimeout(runToastCycle, 1500);
            },
          });
        },
      });
    };

    // Initial delay before first toast pops
    timer = setTimeout(runToastCycle, 1800);

    return () => {
      if (timer) clearTimeout(timer);
      gsap.killTweensOf([toastL, toastR]);
    };
  }, []);

  // ─── 3. 3D TILT FOLLOWING MOUSE & 1.5x PARALLAX ON TILES ───────────
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasPointerFine = window.matchMedia("(pointer: fine)").matches;
    if (prefersReduced || !hasPointerFine) return;

    const container = containerRef.current;
    const panel = panelRef.current;
    if (!container || !panel) return;

    const quickRotateX = gsap.quickTo(panel, "rotationX", { duration: 0.5, ease: "power2.out" });
    const quickRotateY = gsap.quickTo(panel, "rotationY", { duration: 0.5, ease: "power2.out" });

    // QuickTo for 1.5x parallax on icon tiles
    const tileQuickSetters = tileRefs.current.map((tile) => {
      if (!tile) return null;
      return {
        x: gsap.quickTo(tile, "x", { duration: 0.6, ease: "power2.out" }),
        y: gsap.quickTo(tile, "y", { duration: 0.6, ease: "power2.out" }),
      };
    });

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisibleRef.current) return;
      const rect = panel.getBoundingClientRect();
      const panelCenterX = rect.left + rect.width / 2;
      const panelCenterY = rect.top + rect.height / 2;

      // Normalized coordinates from -1 to 1 based on viewport distance
      const normX = Math.max(-1, Math.min(1, (e.clientX - panelCenterX) / (window.innerWidth / 2)));
      const normY = Math.max(-1, Math.min(1, (e.clientY - panelCenterY) / (window.innerHeight / 2)));

      // Max 4 deg tilt
      quickRotateY(normX * 4);
      quickRotateX(-normY * 4);

      // 1.5x Parallax on tiles (up to 14px displacement)
      tileQuickSetters.forEach((setters) => {
        if (setters) {
          setters.x(normX * 14);
          setters.y(normY * 14);
        }
      });
    };

    const handleMouseLeave = () => {
      quickRotateX(0);
      quickRotateY(0);
      tileQuickSetters.forEach((setters) => {
        if (setters) {
          setters.x(0);
          setters.y(0);
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // ─── 4. WORKFLOW GRAPH PACKET SIMULATOR & TICKER ────────────────────
  useEffect(() => {
    if (isReducedMotionRef.current) return;

    // Cache path total lengths
    const inLengths = inPathRefs.current.map((p) => (p ? p.getTotalLength() : 0));
    const outLengths = outPathRefs.current.map((p) => (p ? p.getTotalLength() : 0));

    let lastTime = performance.now();
    let feedIntervalTimer = 0;
    let progressTimer = 0;

    const tickerCallback = (time: number) => {
      if (!isVisibleRef.current) return;
      const now = time * 1000;
      const deltaSec = Math.min(0.1, (now - lastTime) / 1000);
      lastTime = now;

      // 1. Spawn a new packet every ~1.2s if an idle packet exists (max 4 alive)
      if (now >= nextSpawnTimeRef.current) {
        nextSpawnTimeRef.current = now + 1200;
        const idlePacket = packetsRef.current.find((p) => !p.active);
        if (idlePacket) {
          idlePacket.active = true;
          idlePacket.stage = "to-agent";
          idlePacket.inPathIdx = Math.floor(Math.random() * 3);
          idlePacket.outPathIdx = Math.floor(Math.random() * 3);
          idlePacket.progress = 0;
          idlePacket.duration = 0.9;
        }
      }

      // 2. Advance active packets along curved paths
      packetsRef.current.forEach((pkt, idx) => {
        const circleEl = packetCircleRefs.current[idx];
        if (!pkt.active || !circleEl) {
          if (circleEl) circleEl.style.opacity = "0";
          return;
        }

        pkt.progress += deltaSec / pkt.duration;

        if (pkt.stage === "to-agent") {
          const pathEl = inPathRefs.current[pkt.inPathIdx];
          const totalLen = inLengths[pkt.inPathIdx];

          if (pathEl && totalLen > 0) {
            if (pkt.progress >= 1) {
              // Reached Agent: Flash halo and switch to action path
              pkt.stage = "to-action";
              pkt.progress = 0;
              pkt.duration = 0.9;

              if (agentHaloRef.current) {
                gsap.fromTo(
                  agentHaloRef.current,
                  { opacity: 0.9, scale: 1.25, transformOrigin: "center" },
                  { opacity: 0.1, scale: 1, duration: 0.35, ease: "power2.out" }
                );
              }
            } else {
              const pt = pathEl.getPointAtLength(pkt.progress * totalLen);
              circleEl.setAttribute("cx", pt.x.toFixed(1));
              circleEl.setAttribute("cy", pt.y.toFixed(1));
              circleEl.style.opacity = "1";
            }
          }
        } else if (pkt.stage === "to-action") {
          const pathEl = outPathRefs.current[pkt.outPathIdx];
          const totalLen = outLengths[pkt.outPathIdx];

          if (pathEl && totalLen > 0) {
            if (pkt.progress >= 1) {
              // Reached Action Node: Highlight action node and push feed item
              pkt.active = false;
              circleEl.style.opacity = "0";

              const actionNode = actionNodeRefs.current[pkt.outPathIdx];
              if (actionNode) {
                gsap.fromTo(
                  actionNode,
                  { stroke: "#d7fd41", strokeWidth: 2, scale: 1.04, transformOrigin: "center" },
                  { stroke: "rgba(255,255,255,0.14)", strokeWidth: 1, scale: 1, duration: 0.45, ease: "power2.out" }
                );
              }

              pushFeedItem();
            } else {
              const pt = pathEl.getPointAtLength(pkt.progress * totalLen);
              circleEl.setAttribute("cx", pt.x.toFixed(1));
              circleEl.setAttribute("cy", pt.y.toFixed(1));
              circleEl.style.opacity = "1";
            }
          }
        }
      });

      // 3. Fallback Feed trigger every ~1.6s if packets are quiet
      feedIntervalTimer += deltaSec;
      if (feedIntervalTimer >= 1.6) {
        feedIntervalTimer = 0;
        pushFeedItem();
      }

      // 4. Looping 12-segment progress bar over 6s
      progressTimer += deltaSec;
      if (progressTimer >= 6) progressTimer -= 6;
      const currentSegment = Math.floor((progressTimer / 6) * 12);
      setProgressStep(currentSegment);
    };

    gsap.ticker.add(tickerCallback);

    return () => {
      gsap.ticker.remove(tickerCallback);
    };
  }, [pushFeedItem]);

  // ─── 5. INTERSECTION OBSERVER & VISIBILITY ──────────────────────────
  useEffect(() => {
    const target = containerRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting && !document.hidden;
      },
      { rootMargin: "120px" }
    );
    observer.observe(target);

    const handleVisibilityChange = () => {
      isVisibleRef.current = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        zIndex: 5,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "-66px",
        perspective: "1200px",
        width: "100%",
      }}
    >
      {/* ─── MAIN LIME PANEL WITH CORNER BRACKETS & 3D TILT ─── */}
      <div
        ref={panelRef}
        style={{
          position: "relative",
          background: "#d7fd41",
          borderRadius: "12px",
          padding: "8px",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
        className="hero-workflow-panel"
      >
        {/* ─── FLOATING TOASTS (Overlapping lime panel edge) ─── */}
        {/* Toast Left: "Lead routed" */}
        <div
          ref={toastLeftRef}
          style={{
            position: "absolute",
            left: "-36px",
            top: "40px",
            zIndex: 12,
            background: "#ffffff",
            borderRadius: "9999px",
            padding: "7px 16px 7px 10px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            boxShadow: "0 10px 28px rgba(0,0,0,0.22)",
            border: "1px solid rgba(20,20,20,0.06)",
            transform: "translateZ(30px)",
          }}
          className="hidden md:flex"
        >
          <span
            style={{
              width: "18px",
              height: "18px",
              borderRadius: "50%",
              background: "#d7fd41",
              color: "#141414",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "10px",
              fontWeight: 800,
              lineHeight: 1,
            }}
          >
            ✓
          </span>
          <span
            style={{
              fontFamily: "var(--ff-body, 'DM Sans', sans-serif)",
              fontSize: "12px",
              fontWeight: 600,
              color: "#141414",
              letterSpacing: "0.01em",
              whiteSpace: "nowrap",
            }}
          >
            Lead routed
          </span>
        </div>

        {/* Toast Right: "Report generated" */}
        <div
          ref={toastRightRef}
          style={{
            position: "absolute",
            right: "-36px",
            bottom: "40px",
            zIndex: 12,
            background: "#ffffff",
            borderRadius: "9999px",
            padding: "7px 16px 7px 10px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            boxShadow: "0 10px 28px rgba(0,0,0,0.22)",
            border: "1px solid rgba(20,20,20,0.06)",
            transform: "translateZ(30px)",
          }}
          className="hidden md:flex"
        >
          <span
            style={{
              width: "18px",
              height: "18px",
              borderRadius: "50%",
              background: "#d7fd41",
              color: "#141414",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "10px",
              fontWeight: 800,
              lineHeight: 1,
            }}
          >
            ✓
          </span>
          <span
            style={{
              fontFamily: "var(--ff-body, 'DM Sans', sans-serif)",
              fontSize: "12px",
              fontWeight: 600,
              color: "#141414",
              letterSpacing: "0.01em",
              whiteSpace: "nowrap",
            }}
          >
            Report generated
          </span>
        </div>
        {/* Soft breathing outer glow (static blur 60px, opacity animated .5 <-> .9) */}
        <div
          ref={glowRef}
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "12px",
            boxShadow: "0 0 60px rgba(215, 253, 65, 0.35)",
            pointerEvents: "none",
            opacity: 0.5,
            zIndex: -1,
          }}
        />

        {/* ─── 4 CORNER BRACKETS (14px arms, offset 10px outside) ─── */}
        <span
          style={{
            position: "absolute",
            top: "-10px",
            left: "-10px",
            width: "14px",
            height: "14px",
            borderTop: "1.5px solid var(--ink, #141414)",
            borderLeft: "1.5px solid var(--ink, #141414)",
            pointerEvents: "none",
          }}
        />
        <span
          style={{
            position: "absolute",
            top: "-10px",
            right: "-10px",
            width: "14px",
            height: "14px",
            borderTop: "1.5px solid var(--ink, #141414)",
            borderRight: "1.5px solid var(--ink, #141414)",
            pointerEvents: "none",
          }}
        />
        <span
          style={{
            position: "absolute",
            bottom: "-10px",
            left: "-10px",
            width: "14px",
            height: "14px",
            borderBottom: "1.5px solid var(--ink, #141414)",
            borderLeft: "1.5px solid var(--ink, #141414)",
            pointerEvents: "none",
          }}
        />
        <span
          style={{
            position: "absolute",
            bottom: "-10px",
            right: "-10px",
            width: "14px",
            height: "14px",
            borderBottom: "1.5px solid var(--ink, #141414)",
            borderRight: "1.5px solid var(--ink, #141414)",
            pointerEvents: "none",
          }}
        />

        {/* ─── INNER DARK CARD (#1c1c1c, ~560x400 desktop, ~440x360 tablet) ─── */}
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "#1c1c1c",
            borderRadius: "10px",
            padding: "14px 16px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            boxSizing: "border-box",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* ─── 1. WHITE HEADER BAR ─── */}
          <div
            style={{
              width: "100%",
              height: "32px",
              background: "#ffffff",
              borderRadius: "6px",
              padding: "0 12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxSizing: "border-box",
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontFamily: "var(--ff-display, 'Inter Tight', sans-serif)",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "#141414",
              }}
            >
              AI AUTOMATIONS
            </span>
            <div
              style={{
                background: "#d7fd41",
                borderRadius: "9999px",
                padding: "2px 8px",
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <span
                style={{
                  width: "5px",
                  height: "5px",
                  borderRadius: "50%",
                  background: "#141414",
                  display: "inline-block",
                  animation: "hero-live-pulse 1.8s ease-in-out infinite",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
                  fontSize: "9px",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  color: "#141414",
                  lineHeight: 1,
                }}
              >
                LIVE
              </span>
            </div>
          </div>

          {/* ─── 2. MAIN BODY (LEFT 56% WORKFLOW + RIGHT 44% EVENT FEED) ─── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.27fr 1px 1fr",
              gap: "14px",
              alignItems: "stretch",
              flex: 1,
              minHeight: 0,
              padding: "10px 0 6px",
            }}
            className="hero-workflow-grid"
          >
            {/* ─── LEFT: WORKFLOW GRAPH (INLINE SVG) ─── */}
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <svg
                viewBox="0 0 420 230"
                width="100%"
                height="100%"
                style={{ display: "block", overflow: "visible" }}
                preserveAspectRatio="xMidYMid meet"
              >
                {/* ─── CONNECTOR CURVES (1px dashed rgba(255,255,255,0.25)) ─── */}
                <g>
                  {/* Inputs -> Agent */}
                  <path
                    ref={(el) => {
                      inPathRefs.current[0] = el;
                    }}
                    d="M 124 37 C 155 37, 165 115, 178 115"
                    fill="none"
                    stroke="rgba(255,255,255,0.25)"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  />
                  <path
                    ref={(el) => {
                      inPathRefs.current[1] = el;
                    }}
                    d="M 124 115 C 148 115, 162 115, 178 115"
                    fill="none"
                    stroke="rgba(255,255,255,0.25)"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  />
                  <path
                    ref={(el) => {
                      inPathRefs.current[2] = el;
                    }}
                    d="M 124 193 C 155 193, 165 115, 178 115"
                    fill="none"
                    stroke="rgba(255,255,255,0.25)"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  />

                  {/* Agent -> Actions */}
                  <path
                    ref={(el) => {
                      outPathRefs.current[0] = el;
                    }}
                    d="M 242 115 C 255 115, 265 37, 296 37"
                    fill="none"
                    stroke="rgba(255,255,255,0.25)"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  />
                  <path
                    ref={(el) => {
                      outPathRefs.current[1] = el;
                    }}
                    d="M 242 115 C 258 115, 272 115, 296 115"
                    fill="none"
                    stroke="rgba(255,255,255,0.25)"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  />
                  <path
                    ref={(el) => {
                      outPathRefs.current[2] = el;
                    }}
                    d="M 242 115 C 255 115, 265 193, 296 193"
                    fill="none"
                    stroke="rgba(255,255,255,0.25)"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  />
                </g>

                {/* ─── COLUMN 1: INPUT NODES (120x34, dark #262626, mono 11px label) ─── */}
                <g>
                  {/* Node 1: NEW LEAD */}
                  <g transform="translate(4, 20)">
                    <rect
                      width="120"
                      height="34"
                      rx="6"
                      fill="#262626"
                      stroke="rgba(255,255,255,0.12)"
                      strokeWidth="1"
                    />
                    <text
                      x="60"
                      y="21.5"
                      fill="rgba(255,255,255,0.88)"
                      fontFamily="var(--ff-mono, 'IBM Plex Mono', monospace)"
                      fontSize="11"
                      fontWeight="500"
                      letterSpacing="0.04em"
                      textAnchor="middle"
                    >
                      NEW LEAD
                    </text>
                  </g>

                  {/* Node 2: INBOUND EMAIL */}
                  <g transform="translate(4, 98)">
                    <rect
                      width="120"
                      height="34"
                      rx="6"
                      fill="#262626"
                      stroke="rgba(255,255,255,0.12)"
                      strokeWidth="1"
                    />
                    <text
                      x="60"
                      y="21.5"
                      fill="rgba(255,255,255,0.88)"
                      fontFamily="var(--ff-mono, 'IBM Plex Mono', monospace)"
                      fontSize="11"
                      fontWeight="500"
                      letterSpacing="0.02em"
                      textAnchor="middle"
                    >
                      INBOUND EMAIL
                    </text>
                  </g>

                  {/* Node 3: FORM SUBMIT */}
                  <g transform="translate(4, 176)">
                    <rect
                      width="120"
                      height="34"
                      rx="6"
                      fill="#262626"
                      stroke="rgba(255,255,255,0.12)"
                      strokeWidth="1"
                    />
                    <text
                      x="60"
                      y="21.5"
                      fill="rgba(255,255,255,0.88)"
                      fontFamily="var(--ff-mono, 'IBM Plex Mono', monospace)"
                      fontSize="11"
                      fontWeight="500"
                      letterSpacing="0.04em"
                      textAnchor="middle"
                    >
                      FORM SUBMIT
                    </text>
                  </g>
                </g>

                {/* ─── COLUMN 2: CENTER AI AGENT (64px circle, lime ring, spark, halo) ─── */}
                <g transform="translate(210, 115)">
                  {/* Soft pulsing halo (scale 1 -> 1.25, opacity .5 -> 0, 2s loop) */}
                  <circle
                    r="32"
                    fill="rgba(215,253,65,0.3)"
                    style={{
                      transformOrigin: "center",
                      animation: "hero-halo-pulse 2s cubic-bezier(0.2, 0.8, 0.4, 1) infinite",
                    }}
                  />

                  {/* Packet impact flash halo */}
                  <circle
                    ref={agentHaloRef}
                    r="32"
                    fill="rgba(215,253,65,0.4)"
                    style={{ transformOrigin: "center", opacity: 0 }}
                  />

                  {/* Slowly rotating dashed ring (20s) */}
                  <circle
                    r="37"
                    fill="none"
                    stroke="rgba(215,253,65,0.4)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    style={{
                      transformOrigin: "center",
                      animation: "hero-agent-dash-spin 20s linear infinite",
                    }}
                  />

                  {/* Inner Dark Circle with 2px Lime Ring */}
                  <circle
                    r="28"
                    fill="#1c1c1c"
                    stroke="#d7fd41"
                    strokeWidth="2"
                  />

                  {/* Spark / Asterisk Icon ✦ */}
                  <path
                    d="M 0 -10 L 2.5 -2.5 L 10 0 L 2.5 2.5 L 0 10 L -2.5 2.5 L -10 0 L -2.5 -2.5 Z"
                    fill="#d7fd41"
                  />

                  {/* Small Agent Tag */}
                  <text
                    x="0"
                    y="18"
                    fill="#d7fd41"
                    fontFamily="var(--ff-mono, 'IBM Plex Mono', monospace)"
                    fontSize="7"
                    fontWeight="700"
                    letterSpacing="0.06em"
                    textAnchor="middle"
                  >
                    AI AGENT
                  </text>
                </g>

                {/* ─── COLUMN 3: ACTION NODES (120x34, dark #262626, mono 11px label) ─── */}
                <g>
                  {/* Node 1: ROUTE TO OWNER */}
                  <g
                    transform="translate(296, 20)"
                    ref={(el) => {
                      actionNodeRefs.current[0] = el;
                    }}
                  >
                    <rect
                      width="120"
                      height="34"
                      rx="6"
                      fill="#262626"
                      stroke="rgba(255,255,255,0.12)"
                      strokeWidth="1"
                    />
                    <text
                      x="60"
                      y="21.5"
                      fill="rgba(255,255,255,0.88)"
                      fontFamily="var(--ff-mono, 'IBM Plex Mono', monospace)"
                      fontSize="11"
                      fontWeight="500"
                      letterSpacing="0.02em"
                      textAnchor="middle"
                    >
                      ROUTE TO OWNER
                    </text>
                  </g>

                  {/* Node 2: DRAFT REPLY */}
                  <g
                    transform="translate(296, 98)"
                    ref={(el) => {
                      actionNodeRefs.current[1] = el;
                    }}
                  >
                    <rect
                      width="120"
                      height="34"
                      rx="6"
                      fill="#262626"
                      stroke="rgba(255,255,255,0.12)"
                      strokeWidth="1"
                    />
                    <text
                      x="60"
                      y="21.5"
                      fill="rgba(255,255,255,0.88)"
                      fontFamily="var(--ff-mono, 'IBM Plex Mono', monospace)"
                      fontSize="11"
                      fontWeight="500"
                      letterSpacing="0.03em"
                      textAnchor="middle"
                    >
                      DRAFT REPLY
                    </text>
                  </g>

                  {/* Node 3: UPDATE CRM */}
                  <g
                    transform="translate(296, 176)"
                    ref={(el) => {
                      actionNodeRefs.current[2] = el;
                    }}
                  >
                    <rect
                      width="120"
                      height="34"
                      rx="6"
                      fill="#262626"
                      stroke="rgba(255,255,255,0.12)"
                      strokeWidth="1"
                    />
                    <text
                      x="60"
                      y="21.5"
                      fill="rgba(255,255,255,0.88)"
                      fontFamily="var(--ff-mono, 'IBM Plex Mono', monospace)"
                      fontSize="11"
                      fontWeight="500"
                      letterSpacing="0.04em"
                      textAnchor="middle"
                    >
                      UPDATE CRM
                    </text>
                  </g>
                </g>

                {/* ─── PACKETS (5px lime dots with glow traveling along paths) ─── */}
                <g>
                  {[0, 1, 2, 3].map((i) => (
                    <circle
                      key={i}
                      ref={(el) => {
                        packetCircleRefs.current[i] = el;
                      }}
                      r="2.5"
                      fill="#d7fd41"
                      stroke="#141414"
                      strokeWidth="0.5"
                      style={{
                        opacity: 0,
                        filter: "drop-shadow(0 0 4px #d7fd41)",
                        pointerEvents: "none",
                      }}
                    />
                  ))}
                </g>
              </svg>
            </div>

            {/* 1px Vertical Divider */}
            <div
              style={{
                width: "1px",
                height: "100%",
                background: "rgba(255, 255, 255, 0.08)",
              }}
            />

            {/* ─── RIGHT: EVENT FEED (4 ROWS, 44% WIDTH, FIXED 40PX HEIGHT, 8PX GAP) ─── */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                paddingLeft: "4px",
                overflow: "hidden",
              }}
            >
              {/* Title */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                  paddingBottom: "4px",
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
                    fontSize: "10px",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    color: "rgba(255,255,255,0.45)",
                    textTransform: "uppercase",
                  }}
                >
                  LIVE ACTIVITY
                </span>
                <span
                  style={{
                    width: "4px",
                    height: "4px",
                    borderRadius: "50%",
                    background: "#d7fd41",
                  }}
                />
              </div>

              {/* 4 Event Rows: fixed 40px height, 8px gap, evenly spaced */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  flex: 1,
                  justifyContent: "space-between",
                }}
              >
                {feedRows.map((row, idx) => (
                  <div
                    key={row.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "8px",
                      height: "40px",
                      padding: "0 8px",
                      borderRadius: "6px",
                      background: idx === 0 ? "rgba(255,255,255,0.04)" : "transparent",
                      border: idx === 0 ? "1px solid rgba(215,253,65,0.18)" : "1px solid transparent",
                      animation: row.isNew ? "hero-feed-slide-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards" : undefined,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", minWidth: 0 }}>
                      {/* Icon: spinning ring for 0.6s or lime check */}
                      {row.isNew ? (
                        <span
                          style={{
                            width: "14px",
                            height: "14px",
                            borderRadius: "50%",
                            border: "1.5px solid rgba(215,253,65,0.3)",
                            borderTopColor: "#d7fd41",
                            animation: "hero-icon-spin 0.6s linear infinite",
                            flexShrink: 0,
                          }}
                        />
                      ) : (
                        <span
                          style={{
                            width: "14px",
                            height: "14px",
                            borderRadius: "50%",
                            background: "#d7fd41",
                            color: "#141414",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "8.5px",
                            fontWeight: 800,
                            lineHeight: 1,
                            flexShrink: 0,
                          }}
                        >
                          ✓
                        </span>
                      )}

                      <span
                        style={{
                          fontFamily: "var(--ff-body, 'DM Sans', sans-serif)",
                          fontSize: "12px",
                          fontWeight: idx === 0 ? 600 : 400,
                          color: idx === 0 ? "#ffffff" : "rgba(255,255,255,0.72)",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {row.text}
                      </span>
                    </div>

                    {/* Timestamp: "just now" / "moments ago" (NO numbers) */}
                    <span
                      style={{
                        fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
                        fontSize: "9px",
                        color: idx === 0 ? "#d7fd41" : "rgba(255,255,255,0.3)",
                        whiteSpace: "nowrap",
                        marginLeft: "4px",
                        flexShrink: 0,
                      }}
                    >
                      {idx === 0 ? "just now" : "moments ago"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ─── 3. BOTTOM STRIP: CHIPS + 12-SEGMENT LOOPING PROGRESS BAR ─── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: "8px",
              borderTop: "1px solid rgba(255,255,255,0.08)",
              flexShrink: 0,
            }}
          >
            {/* Chips */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {["LEAD ROUTING", "REPORTING", "OUTREACH"].map((chip) => (
                <span
                  key={chip}
                  style={{
                    fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
                    fontSize: "8.5px",
                    fontWeight: 500,
                    letterSpacing: "0.06em",
                    color: "rgba(255,255,255,0.55)",
                  }}
                >
                  {chip}
                </span>
              ))}
            </div>

            {/* 12-Segment Progress Bar (loops fill with lime, 6s) */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "3px",
              }}
              title="Pipeline activity loop"
            >
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: "8px",
                    height: "3px",
                    borderRadius: "1.5px",
                    background: i <= progressStep ? "#d7fd41" : "rgba(255,255,255,0.12)",
                    transition: "background 0.2s ease",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ─── 4 DARK ROUNDED ICON TILES (56px, radius 8, with 1.5x parallax) ─── */}
        {/* Tile 1: Top-Left (Arrow Up Right) */}
        <div
          ref={(el) => {
            tileRefs.current[0] = el;
          }}
          style={{
            position: "absolute",
            top: "26px",
            left: "-72px",
            width: "56px",
            height: "56px",
            background: "#1c1c1c",
            borderRadius: "8px",
            border: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#d7fd41",
            fontSize: "18px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
            zIndex: 6,
          }}
          className="hidden sm:flex"
        >
          ↗
        </div>

        {/* Tile 2: Top-Right (Spark / Asterisk) */}
        <div
          ref={(el) => {
            tileRefs.current[1] = el;
          }}
          style={{
            position: "absolute",
            top: "34px",
            right: "-72px",
            width: "56px",
            height: "56px",
            background: "#1c1c1c",
            borderRadius: "8px",
            border: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#e8a25c",
            fontSize: "20px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
            zIndex: 6,
          }}
          className="hidden sm:flex"
        >
          ✦
        </div>

        {/* Tile 3: Bottom-Left (Cube icon) */}
        <div
          ref={(el) => {
            tileRefs.current[2] = el;
          }}
          style={{
            position: "absolute",
            bottom: "-22px",
            left: "-52px",
            width: "56px",
            height: "56px",
            background: "#1c1c1c",
            borderRadius: "8px",
            border: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "rgba(255,255,255,0.8)",
            fontSize: "18px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
            zIndex: 6,
          }}
          className="hidden sm:flex"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <line x1="12" y1="22.08" x2="12" y2="12" />
          </svg>
        </div>

        {/* Tile 4: Bottom-Right (Chevron / C-mark) */}
        <div
          ref={(el) => {
            tileRefs.current[3] = el;
          }}
          style={{
            position: "absolute",
            bottom: "-22px",
            right: "-52px",
            width: "56px",
            height: "56px",
            background: "#1c1c1c",
            borderRadius: "8px",
            border: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#d7fd41",
            fontSize: "18px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
            zIndex: 6,
          }}
          className="hidden sm:flex"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M16 18l-6-6 6-6" />
          </svg>
        </div>
      </div>

      {/* ─── SCOPED KEYFRAME ANIMATIONS ─── */}
      <style>{`
        .hero-workflow-panel {
          width: 576px;
          height: 416px;
          max-width: 94vw;
        }
        @media (max-width: 1199px) {
          .hero-workflow-panel {
            width: 456px;
            height: 376px;
          }
        }
        @media (max-width: 767px) {
          .hero-workflow-panel {
            width: calc(100vw - 32px);
            max-width: 456px;
            height: auto;
            min-height: 440px;
          }
          .hero-workflow-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }

        @keyframes hero-live-pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.35;
            transform: scale(1.35);
          }
        }

        @keyframes hero-halo-pulse {
          0% {
            transform: scale(1);
            opacity: 0.5;
          }
          100% {
            transform: scale(1.25);
            opacity: 0;
          }
        }

        @keyframes hero-agent-dash-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes hero-feed-slide-in {
          from {
            opacity: 0;
            transform: translateY(-12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes hero-icon-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
