"use client";
import { useState } from "react";
import AsciiHalftoneCanvas from "@/components/ui/AsciiHalftoneCanvas";
import { Button } from "@/components/ui/shared";
import { siteContent } from "@/content/site";

const CURRENT_YEAR = 2026;

export default function Footer() {
  const [email, setEmail] = useState("");
  const showNewsletter = Boolean(siteContent.contact.newsletterAction);
  const socials = siteContent.socials ?? [];
  const legal = siteContent.legal ?? [];

  const footerCols = [
    {
      heading: "PAGES",
      links: [
        { label: "Home", href: "/" },
        { label: "About", href: "#about" },
        { label: "Services", href: "#services" },
        { label: "Process", href: "#process" },
        { label: "FAQ", href: "#faq" },
      ],
    },
    ...(legal.length > 0
      ? [
          {
            heading: "LEGAL",
            links: legal,
          },
        ]
      : []),
    {
      heading: "CONTACT",
      links: [
        ...(siteContent.contact.email
          ? [{ label: siteContent.contact.email, href: `mailto:${siteContent.contact.email}` }]
          : [{ label: "Contact Us", href: "#contact" }]),
        { label: "hegxai.com", href: "/" },
      ],
    },
  ];

  return (
    <footer style={{ background: "var(--bg)", borderTop: "1px solid var(--line)", position: "relative", overflow: "hidden" }}>
      {/* Background ASCII Halftone Matrix - reduced to 60% opacity with no orange */}
      <AsciiHalftoneCanvas
        theme="light"
        density="sparse"
        interactive={true}
        color="rgba(20, 20, 20, 0.12)"
        accentColor="rgba(20, 20, 20, 0.14)"
        wrapperStyle={{ opacity: 0.6 }}
      />

      {/* Newsletter block (only rendered if newsletterAction is configured) */}
      {showNewsletter && (
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "80px 24px 64px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "80px",
          alignItems: "center",
          borderBottom: "1px solid var(--line)",
          position: "relative",
          zIndex: 2,
        }}>
          <div>
            <h3
              style={{
                fontFamily: "var(--ff-display, 'Inter Tight', sans-serif)",
                fontSize: "clamp(22px, 2.2vw, 32px)",
                fontWeight: 500,
                letterSpacing: "-0.04em",
                lineHeight: 1.15,
                color: "var(--ink)",
                marginBottom: "16px",
              }}
            >
              <span className="reveal-mask">
                <span className="reveal-line" data-reveal-line>
                  Stay ahead with AI insights and industry updates
                </span>
              </span>
            </h3>
            <p
              style={{
                fontFamily: "var(--ff-body, 'DM Sans', sans-serif)",
                fontSize: "15px",
                fontWeight: 400,
                lineHeight: 1.65,
                color: "var(--muted)",
              }}
            >
              <span className="reveal-mask">
                <span className="reveal-line" data-reveal-line>
                  Get the latest on AI automation, workflow optimization, and practical
                  strategies to help your business grow.
                </span>
              </span>
            </p>
          </div>

          {/* Newsletter form */}
          <div style={{
            background: "var(--ink)",
            borderRadius: "var(--r-card, 12px)",
            padding: "32px",
          }}>
            <span style={{
              fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.4)",
              display: "block",
              marginBottom: "20px",
            }}>
              OUR NEWSLETTER
            </span>

            <form
              action={siteContent.contact.newsletterAction}
              onSubmit={(e) => { e.preventDefault(); setEmail(""); }}
              style={{ marginBottom: "16px" }}
            >
              <div style={{
                display: "flex",
                alignItems: "center",
                borderBottom: "1px solid rgba(255,255,255,0.12)",
                paddingBottom: "12px",
                gap: "12px",
              }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  required
                  style={{
                    flex: 1,
                    background: "none",
                    border: "none",
                    outline: "none",
                    fontFamily: "var(--ff-body, 'DM Sans', sans-serif)",
                    fontSize: "15px",
                    fontWeight: 400,
                    color: "#fff",
                    caretColor: "var(--accent)",
                  }}
                />
                <button
                  type="submit"
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "rgba(255,255,255,0.6)",
                    fontSize: "18px",
                    transition: "color 0.2s ease",
                    flexShrink: 0,
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = "var(--accent)"}
                  onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.6)"}
                  aria-label="Subscribe"
                >
                  →
                </button>
              </div>
            </form>

            <p style={{
              fontFamily: "var(--ff-body, 'DM Sans', sans-serif)",
              fontSize: "13px",
              fontWeight: 400,
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.35)",
            }}>
              Get the latest insights on AI automation, intelligent agents, workflow
              optimization, and practical strategies to help your business grow.
            </p>
          </div>
        </div>
      )}

      {/* Footer columns */}
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "48px 24px",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "48px",
        borderBottom: "1px solid var(--line)",
        alignItems: "start",
        position: "relative",
        zIndex: 2,
      }}>
        {/* Social (only rendered if non-empty) */}
        {socials.length > 0 && (
          <div>
            <span style={{
              fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--muted)",
              display: "block",
              marginBottom: "16px",
            }}>
              OUR SOCIAL:
            </span>
            <div style={{ display: "flex", gap: "8px" }}>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "0",
                    border: "1px solid var(--line)",
                    background: "var(--surface)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--ff-display, 'Inter Tight', sans-serif)",
                    fontSize: "13px",
                    color: "var(--muted)",
                    textDecoration: "none",
                    transition: "background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = "var(--ink)"; e.currentTarget.style.color = "var(--bg)"; e.currentTarget.style.borderColor = "var(--ink)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "var(--surface)"; e.currentTarget.style.color = "var(--muted)"; e.currentTarget.style.borderColor = "var(--line)"; }}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Link columns */}
        {footerCols.map((col) => (
          <div key={col.heading}>
            <span style={{
              fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--muted)",
              display: "block",
              marginBottom: "16px",
            }}>
              {col.heading}
            </span>
            <nav aria-label={col.heading}>
              {col.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  style={{
                    display: "block",
                    fontFamily: "var(--ff-body, 'DM Sans', sans-serif)",
                    fontSize: "14px",
                    fontWeight: 400,
                    color: "var(--ink)",
                    textDecoration: "none",
                    marginBottom: "10px",
                    opacity: 0.75,
                    transition: "opacity 0.2s ease",
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = "1"}
                  onMouseLeave={e => e.currentTarget.style.opacity = "0.75"}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        ))}
      </div>

      {/* Giant wordmark spans the full container width with inline SVG */}
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "32px 24px 0",
        position: "relative",
        zIndex: 2,
      }}>
        <svg
          viewBox="0 0 1200 170"
          width="100%"
          height="auto"
          style={{ display: "block" }}
          aria-hidden="true"
        >
          <text
            x="0"
            y="145"
            textLength="1200"
            lengthAdjust="spacingAndGlyphs"
            fill="var(--ink)"
            opacity="0.08"
            fontFamily="var(--ff-logo, 'Anton', sans-serif)"
            fontSize="170"
            letterSpacing="-0.02em"
          >
            HEGXAI
          </text>
        </svg>
      </div>

      {/* Bottom bar - no crossing line */}
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "16px 24px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "relative",
        zIndex: 2,
      }}>
        <span style={{
          fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
          fontSize: "11px",
          color: "var(--muted)",
          letterSpacing: "0.06em",
        }}>
          © {CURRENT_YEAR} HEGXAI. All rights reserved.
        </span>

        <Button
          variant="secondary"
          size="sm"
          arrow="↑"
          href="#main"
          onClick={(e) => {
            e.preventDefault();
            const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number) => void } }).__lenis;
            if (lenis) lenis.scrollTo(0);
            else window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          style={{
            padding: "8px 18px",
            fontSize: "13px",
            fontFamily: "var(--ff-display, 'Inter Tight', sans-serif)",
            fontWeight: 500,
            letterSpacing: "0.04em",
          }}
        >
          BACK TO TOP
        </Button>
      </div>
    </footer>
  );
}
