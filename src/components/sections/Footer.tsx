"use client";
import { useLayoutEffect, useRef, useState } from "react";
import AsciiHalftoneCanvas from "@/components/ui/AsciiHalftoneCanvas";
import { Button } from "@/components/ui/shared";
import { siteContent } from "@/content/site";

const CURRENT_YEAR = 2026;

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const update = () => {
      if (footerRef.current && linksRef.current) footerRef.current.style.setProperty("--footer-wordmark-end", `${linksRef.current.getBoundingClientRect().top - footerRef.current.getBoundingClientRect().top}px`);
    };
    const observer = new ResizeObserver(update);
    if (footerRef.current) observer.observe(footerRef.current);
    update();
    return () => observer.disconnect();
  }, []);
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
    <footer ref={footerRef} className="site-footer" style={{
      background: "var(--bg)",
      borderTop: "1px solid var(--line)",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background ASCII Halftone Matrix - reduced to 60% opacity with no orange */}
      <AsciiHalftoneCanvas
        theme="light"
        density="sparse"
        interactive={true}
        color="rgba(20, 20, 20, 0.12)"
        accentColor="rgba(20, 20, 20, 0.14)"
        wrapperStyle={{ opacity: 0.6, maskImage: "var(--footer-ascii-mask, none)" }}
      />

      {/* Newsletter block (only rendered if newsletterAction is configured) */}
      {showNewsletter && (
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "var(--col-pad, 24px)",
          paddingTop: "64px",
          paddingBottom: "48px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "40px",
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
              <span className="reveal-mask" style={{ padding: "4px 0", overflow: "visible" }}>
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
              <span className="reveal-mask" style={{ padding: "4px 0", overflow: "visible" }}>
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
            padding: "24px",
          }}>
            <span style={{
              fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.4)",
              display: "block",
              marginBottom: "16px",
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
                    minWidth: "44px",
                    minHeight: "44px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
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

      {/* Main Footer Wrapper: Single column on mobile with wordmark above link columns */}
      <div className="flex flex-col" style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 2 }}>
        
        {/* Giant wordmark: Order 1 on mobile (above links), Order 2 on desktop */}
        <div
          className="order-1 md:order-2"
          style={{
            padding: "16px 0 8px",
            width: "100%",
          }}
        >
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

        {/* Footer link columns: Order 2 on mobile (below wordmark), Order 1 on desktop */}
        <div
          ref={linksRef}
          className="footer-links-area order-2 md:order-1"
          style={{
            position: "relative",
            padding: "24px 0 28px",
            borderBottom: "1px solid var(--line)",
          }}
        >
          {/* Social (only rendered if non-empty) */}
          {socials.length > 0 && (
            <div style={{ marginBottom: "32px" }}>
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
                      width: "44px",
                      height: "44px",
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

          {/* Link columns in 2 columns grid on mobile (PAGES / CONTACT) */}
          <div className="grid grid-cols-2 md:flex md:justify-between gap-8 md:gap-16 items-start">
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
                      className="footer-link"
                      href={link.href}
                      style={{
                        display: "block",
                        fontFamily: "var(--ff-body, 'DM Sans', sans-serif)",
                        fontSize: "15px",
                        fontWeight: 400,
                        color: "var(--ink)",
                        textDecoration: "none",
                        padding: "4px 0",
                        marginBottom: "6px",
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
        </div>

        {/* Bottom bar: Order 3 */}
        <div
          className="order-3 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{
            padding: "16px 0 0",
          }}
        >
          {/* Back to top button: full width on mobile */}
          <div className="w-full md:w-auto order-1 md:order-2">
            <Button
              variant="secondary"
              arrow="↑"
              href="#main"
              className="btn-mobile-full"
              onClick={(e) => {
                e.preventDefault();
                const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number) => void } }).__lenis;
                if (lenis) lenis.scrollTo(0);
                else window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              style={{
                width: "100%",
                minHeight: "44px",
                padding: "10px 20px",
                fontSize: "13px",
                fontFamily: "var(--ff-display, 'Inter Tight', sans-serif)",
                fontWeight: 500,
                letterSpacing: "0.04em",
              }}
            >
              BACK TO TOP
            </Button>
          </div>

          <span
            className="order-2 md:order-1 text-center md:text-left"
            style={{
              fontFamily: "var(--ff-mono, 'IBM Plex Mono', monospace)",
              fontSize: "12px",
              color: "var(--muted)",
              letterSpacing: "0.06em",
            }}
          >
            © {CURRENT_YEAR} HEGXAI. All rights reserved.
          </span>
        </div>

      </div>
      <style>{`
        @media (max-width: 767px) {
          footer.site-footer {
            padding: 48px 16px 32px !important;
          }
          footer { --footer-ascii-mask: linear-gradient(to bottom, black var(--footer-wordmark-end, 100px), rgba(0,0,0,.583333) var(--footer-wordmark-end, 100px)); }
        }
      `}</style>
    </footer>
  );
}
