"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionBar, SectionColumn, Button } from "@/components/ui/shared";

gsap.registerPlugin(ScrollTrigger);

const AGENTS = [
  { name: "Support Agent", role: "Triage & Resolution", dot: "#D7FD41" },
  { name: "Sales Agent", role: "Lead Enrichment & Sync", dot: "#D7FD41" },
  { name: "Ops Agent", role: "Cross-Platform Routing", dot: "#D7FD41" },
  { name: "Finance Agent", role: "Ledger Reconciliation", dot: "rgba(20,20,20,0.3)" },
  { name: "Content Agent", role: "Asset Drafting & Prep", dot: "rgba(20,20,20,0.3)" },
  { name: "Data Agent", role: "ETL Pipeline Validation", dot: "#D7FD41" },
];

export default function AgentShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const phone1Ref = useRef<HTMLDivElement>(null);
  const phone2Ref = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Fade in section
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Stagger agent rows in phone 1
      if (rowsRef.current) {
        const rows = rowsRef.current.children;
        gsap.fromTo(
          rows,
          { opacity: 0, x: -16 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: rowsRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Floating Parallax on phones
      if (phone1Ref.current && phone2Ref.current) {
        gsap.to(phone1Ref.current, {
          y: -24,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });

        gsap.to(phone2Ref.current, {
          y: 24,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="agents-showcase"
      ref={sectionRef}
      style={{
        background: "var(--bg)",
        padding: "0 24px 140px",
        opacity: 0,
        position: "relative",
      }}
    >
      <SectionColumn style={{ padding: "0 var(--col-pad, 24px) 140px" }}>
        <SectionBar label="AI WORKFLOW AUTOMATION" sectionId="agent-showcase" />

        {/* Top Split: Title + Intro CTA */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "48px",
            alignItems: "flex-end",
            marginBottom: "64px",
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "var(--ff-display, 'Inter Tight', sans-serif)",
                fontSize: "clamp(32px, 3.6vw, 56px)",
                fontWeight: 500,
                lineHeight: 1.04,
                letterSpacing: "-0.02em",
                color: "var(--ink)",
                margin: 0,
              }}
            >
              <span className="reveal-mask">
                <span className="reveal-line" data-reveal-line>
                  AI agents help businesses automate repetitive work, faster than ever
                </span>
              </span>
            </h2>
          </div>

          <div>
            <p
              style={{
                fontFamily: "var(--ff-body, 'DM Sans', sans-serif)",
                fontSize: "16px",
                lineHeight: 1.7,
                color: "var(--muted)",
                marginBottom: "28px",
              }}
            >
              <span className="reveal-mask">
                <span className="reveal-line" data-reveal-line>
                  Deploy intelligent software agents that understand context, execute multi-step
                  business logic, and collaborate directly with your team. Turn manual queues into
                  autonomous, self-healing workflows.
                </span>
              </span>
            </p>

            <Button href="#contact" variant="dark">
              Deploy An Agent
            </Button>
          </div>
        </div>

        {/* Interactive CSS Phone Mockups Arena */}
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--line)",
            borderRadius: "var(--r-card, 12px)",
            padding: "64px 32px",
            display: "flex",
            flexWrap: "wrap",
            gap: "40px",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 8px 40px rgba(20,20,20,0.04)",
          }}
        >
          {/* Subtle Halftone Pattern */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `radial-gradient(circle, rgba(20,20,20,0.03) 1px, transparent 1px)`,
              backgroundSize: "20px 20px",
              pointerEvents: "none",
            }}
          />

          {/* Phone Mockup 1: AGENT LIST UI */}
          <div
            ref={phone1Ref}
            style={{
              width: "320px",
              borderRadius: "40px",
              background: "var(--ink)",
              border: "8px solid #282828",
              boxShadow: "0 24px 60px rgba(20,20,20,0.25)",
              padding: "20px 16px 24px",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              position: "relative",
              zIndex: 2,
            }}
          >
            {/* Notch / Speaker bar */}
            <div
              style={{
                width: "90px",
                height: "18px",
                borderRadius: "10px",
                background: "#000",
                margin: "0 auto 6px",
              }}
            />

            {/* Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0 6px",
              }}
            >
              <div>
                <span
                  style={{
                    fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--bg)",
                    display: "block",
                  }}
                >
                  AGENT FLEET
                </span>
                <span
                  style={{
                    fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
                    fontSize: "9px",
                    color: "#D7FD41",
                    letterSpacing: "0.06em",
                  }}
                >
                  ● ORCHESTRATION ACTIVE
                </span>
              </div>
              <span
                style={{
                  fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
                  fontSize: "9px",
                  color: "rgba(244,239,230,0.5)",
                }}
              >
                HEGXAI-OS
              </span>
            </div>

            {/* 6 Agent Rows */}
            <div
              ref={rowsRef}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              {AGENTS.map((agent, i) => (
                <div
                  key={i}
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "14px",
                    padding: "10px 12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: agent.dot,
                      }}
                    />
                    <div>
                      <span
                        style={{
                          display: "block",
                          fontFamily: "var(--ff-body, 'DM Sans', sans-serif)",
                          fontSize: "12px",
                          fontWeight: 500,
                          color: "var(--bg)",
                        }}
                      >
                        {agent.name}
                      </span>
                      <span
                        style={{
                          display: "block",
                          fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
                          fontSize: "9px",
                          color: "rgba(244,239,230,0.5)",
                        }}
                      >
                        {agent.role}
                      </span>
                    </div>
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
                      fontSize: "9px",
                      color: "rgba(244,239,230,0.4)",
                    }}
                  >
                    RUNNING
                  </span>
                </div>
              ))}
            </div>

            {/* Start NOW Button */}
            <div
              style={{
                marginTop: "4px",
                background: "#D7FD41",
                borderRadius: "14px",
                padding: "12px",
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#141414",
                }}
              >
                START NOW ››
              </span>
            </div>
          </div>

          {/* Phone Mockup 2: ACTIONS & PROGRESS UI */}
          <div
            ref={phone2Ref}
            style={{
              width: "300px",
              borderRadius: "40px",
              background: "var(--surface)",
              border: "8px solid #E5DEC9",
              boxShadow: "0 20px 50px rgba(20,20,20,0.12)",
              padding: "20px 16px 24px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              position: "relative",
              zIndex: 1,
            }}
          >
            {/* Notch */}
            <div
              style={{
                width: "80px",
                height: "16px",
                borderRadius: "10px",
                background: "rgba(20,20,20,0.15)",
                margin: "0 auto 6px",
              }}
            />

            <div>
              <span
                style={{
                  fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--ink)",
                  display: "block",
                }}
              >
                ACTIONS / PIPELINE
              </span>
              <span
                style={{
                  fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
                  fontSize: "9px",
                  color: "var(--muted)",
                }}
              >
                REAL-TIME SYNCHRONIZATION
              </span>
            </div>

            {/* Progress bar with NO fake percentages (clean indicator) */}
            <div style={{ background: "rgba(20,20,20,0.06)", borderRadius: "9999px", height: "8px", overflow: "hidden" }}>
              <div
                style={{
                  width: "68%",
                  height: "100%",
                  background: "var(--accent)",
                  borderRadius: "9999px",
                }}
              />
            </div>

            {/* Tasks list */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                { title: "Cross-System CRM Enrichment", status: "PROCESSING", tag: "CRM" },
                { title: "Inbound Lead Qualification", status: "VALIDATED", tag: "INBOX" },
                { title: "Weekly Financial Reconciliation", status: "SCHEDULED", tag: "OPS" },
              ].map((task, i) => (
                <div
                  key={i}
                  style={{
                    background: "var(--bg)",
                    border: "1px solid var(--line)",
                    borderRadius: "14px",
                    padding: "12px",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                    <span
                      style={{
                        fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
                        fontSize: "9px",
                        fontWeight: 600,
                        color: "var(--accent)",
                      }}
                    >
                      [{task.tag}]
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
                        fontSize: "9px",
                        color: "var(--muted)",
                      }}
                    >
                      {task.status}
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--ff-body, 'DM Sans', sans-serif)",
                      fontSize: "12px",
                      color: "var(--ink)",
                      fontWeight: 500,
                    }}
                  >
                    {task.title}
                  </span>
                </div>
              ))}
            </div>

            {/* Status notification */}
            <div
              style={{
                marginTop: "auto",
                background: "rgba(20,20,20,0.05)",
                borderRadius: "12px",
                padding: "10px 12px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <div
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "var(--accent)",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
                  fontSize: "9px",
                  color: "var(--muted)",
                }}
              >
                Telemetry synchronized across endpoints
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Paragraph in HEGXAI voice */}
        <div style={{ textAlign: "center", maxWidth: "680px", margin: "48px auto 0" }}>
          <p
            style={{
              fontFamily: "var(--ff-body, 'DM Sans', sans-serif)",
              fontSize: "15px",
              lineHeight: 1.7,
              color: "var(--muted)",
              margin: 0,
            }}
          >
            Our solutions connect with your existing tools to execute mission-critical processes autonomously — maintaining continuous data integrity without altering your core workflows.
          </p>
        </div>
      </SectionColumn>
    </section>
  );
}
