"use client";
import { useState } from "react";
import AsciiHalftoneCanvas from "@/components/ui/AsciiHalftoneCanvas";
import { siteContent } from "@/content/site";

const CURRENT_YEAR = 2026;

const SOCIAL_LINKS = [
  { label: "X", href: "#", icon: "𝕏" },
  { label: "LinkedIn", href: "#", icon: "in" },
  { label: "Instagram", href: "#", icon: "⊕" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const showNewsletter = Boolean(siteContent.contact.newsletterAction);

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
    {
      heading: "LEGAL",
      links: [
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
        { label: "Cookie Policy", href: "#" },
      ],
    },
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
      {/* Background ASCII Halftone Matrix */}
      <AsciiHalftoneCanvas theme="light" density="sparse" interactive={true} />

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
        display: "grid",
        gridTemplateColumns: "1fr auto auto auto",
        gap: "48px",
        borderBottom: "1px solid var(--line)",
        alignItems: "start",
      }}>
        {/* Social */}
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
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  border: "1px solid var(--line)",
                  background: "var(--surface)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "serif",
                  fontSize: "13px",
                  color: "var(--muted)",
                  textDecoration: "none",
                  transition: "background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "var(--ink)"; e.currentTarget.style.color = "var(--bg)"; e.currentTarget.style.borderColor = "var(--ink)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "var(--surface)"; e.currentTarget.style.color = "var(--muted)"; e.currentTarget.style.borderColor = "var(--line)"; }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

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

      {/* Giant wordmark */}
      <div style={{
        maxWidth: "100%",
        overflow: "hidden",
        padding: "0 24px 20px",
        position: "relative",
      }}>
        <div style={{
          fontFamily: "var(--ff-logo, 'Anton', sans-serif)",
          fontSize: "clamp(80px, 18vw, 280px)",
          fontWeight: 400,
          lineHeight: 0.85,
          textTransform: "uppercase",
          letterSpacing: "-0.02em",
          color: "var(--ink)",
          opacity: 0.08,
          whiteSpace: "nowrap",
          userSelect: "none",
        }}>
          HEGXAI
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "16px 24px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderTop: "1px solid var(--line)",
      }}>
        <span style={{
          fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
          fontSize: "11px",
          color: "var(--muted)",
          letterSpacing: "0.06em",
        }}>
          © {CURRENT_YEAR} HEGXAI. All rights reserved.
        </span>

        <a
          href="#main"
          onClick={(e) => {
            e.preventDefault();
            const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number) => void } }).__lenis;
            if (lenis) lenis.scrollTo(0);
            else window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 18px",
            borderRadius: "var(--r-pill, 999px)",
            border: "1px solid var(--line)",
            background: "var(--surface)",
            fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--muted)",
            textDecoration: "none",
            transition: "background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "var(--ink)"; e.currentTarget.style.color = "var(--bg)"; e.currentTarget.style.borderColor = "var(--ink)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "var(--surface)"; e.currentTarget.style.color = "var(--muted)"; e.currentTarget.style.borderColor = "var(--line)"; }}
        >
          ↑ Back to Top
        </a>
      </div>
    </footer>
  );
}
