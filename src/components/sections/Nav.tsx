"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/shared";

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { label: "ABOUT", href: "#about" },
  { label: "SERVICES", href: "#services-list" },
  { label: "PROCESS", href: "#process" },
  { label: "BLOG", href: "#blog" },
];

export default function Nav() {
  const headerRef = useRef<HTMLElement>(null);

  // Line segment refs
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const mobileLine1Ref = useRef<HTMLDivElement>(null);
  const mobileLine2Ref = useRef<HTMLDivElement>(null);

  // Content fade refs
  const logoContentRef = useRef<HTMLDivElement>(null);
  const navContentRef = useRef<HTMLElement>(null);
  const buttonContentRef = useRef<HTMLDivElement>(null);

  // Mobile menu overlay state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileLinksRef = useRef<HTMLDivElement>(null);

  // Ref tracking scroll navigation lock to prevent hiding while auto-scrolling
  const isNavScrollingRef = useRef(false);
  const isHiddenRef = useRef(false);

  // Helper functions for show/hide with strict overwrite & ease
  const showHeader = () => {
    if (!headerRef.current) return;
    isHiddenRef.current = false;
    gsap.to(headerRef.current, {
      yPercent: 0,
      duration: 0.45,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  const hideHeader = () => {
    if (!headerRef.current) return;
    isHiddenRef.current = true;
    gsap.to(headerRef.current, {
      yPercent: -100,
      duration: 0.45,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      if (headerRef.current) {
        gsap.set(headerRef.current, { yPercent: 0, opacity: 1 });
      }
      return;
    }

    // 1. Page-load animation: draw in lines from left, then fade up items
    const tl = gsap.timeline();
    const desktopLines = [line1Ref.current, line2Ref.current, line3Ref.current].filter(Boolean);
    const mobileLines = [mobileLine1Ref.current, mobileLine2Ref.current].filter(Boolean);
    const allLines = [...desktopLines, ...mobileLines];

    tl.fromTo(
      allLines,
      { scaleX: 0, transformOrigin: "left" },
      {
        scaleX: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.inOut",
      }
    );

    const fadeTargets = [
      logoContentRef.current,
      navContentRef.current,
      buttonContentRef.current,
    ].filter(Boolean);

    if (fadeTargets.length > 0) {
      tl.fromTo(
        fadeTargets,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          clearProps: "transform,opacity",
        },
        "-=0.4"
      );
    }

    // 2. ScrollTrigger direction detection (clean & synced with Lenis)
    let lastScroll = window.scrollY;

    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        if (isNavScrollingRef.current) return;

        const currentScroll = self.scroll();
        const delta = currentScroll - lastScroll;

        // If scroll < 80px: always show
        if (currentScroll < 80) {
          showHeader();
        } else if (self.direction === 1 && delta > 4) {
          // Scrolling DOWN past 80px: hide
          hideHeader();
        } else if (self.direction === -1 || delta < -4) {
          // Scrolling UP (threshold >= 4px): show immediately
          showHeader();
        }

        lastScroll = currentScroll;
      },
    });

    // 3. Force show listeners:
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Home" || e.key === "ArrowUp" || e.key === "PageUp") {
        showHeader();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    const handleHashChange = () => {
      showHeader();
    };
    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("popstate", handleHashChange);

    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY <= 60) {
        showHeader();
      }
    };
    window.addEventListener("mousemove", handleMouseMove);

    if (document.fonts) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }

    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      st.kill();
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("popstate", handleHashChange);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Smooth scroll handler for nav clicks
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    showHeader();
    isNavScrollingRef.current = true;
    closeMobileMenu();

    if (href === "/") {
      const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number, opts: unknown) => void } }).__lenis;
      if (lenis) {
        lenis.scrollTo(0, {
          duration: 1.2,
          onComplete: () => {
            setTimeout(() => {
              isNavScrollingRef.current = false;
            }, 100);
          },
        });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setTimeout(() => {
          isNavScrollingRef.current = false;
        }, 800);
      }
      return;
    }

    const lenis = (window as unknown as { __lenis?: { scrollTo: (target: string, opts: unknown) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(href, {
        offset: -120,
        duration: 1.2,
        onComplete: () => {
          setTimeout(() => {
            isNavScrollingRef.current = false;
          }, 100);
        },
      });
    } else {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
      setTimeout(() => {
        isNavScrollingRef.current = false;
      }, 800);
    }
  };

  // Mobile Menu open/close with Lenis scroll lock
  const openMobileMenu = () => {
    setIsMobileMenuOpen(true);
    const lenis = (window as unknown as { __lenis?: { stop: () => void } }).__lenis;
    lenis?.stop();
    document.body.style.overflow = "hidden";

    setTimeout(() => {
      if (mobileLinksRef.current) {
        const links = mobileLinksRef.current.children;
        gsap.fromTo(
          links,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: "power3.out",
          }
        );
      }
    }, 50);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    const lenis = (window as unknown as { __lenis?: { start: () => void } }).__lenis;
    lenis?.start();
    document.body.style.overflow = "";
  };

  return (
    <>
      {/* Scoped CSS guaranteeing strict desktop/mobile separation and 2-row CSS grid */}
      <style>{`
        .hegxai-desktop-nav-grid {
          display: grid !important;
          grid-template-columns: auto 1fr auto !important;
          grid-template-rows: auto 4px !important;
          column-gap: 12px !important;
          row-gap: 16px !important;
          align-items: center !important;
          padding: 24px 40px 0 !important;
          width: 100% !important;
          height: var(--header-h, 92px) !important;
          box-sizing: border-box !important;
        }
        .hegxai-mobile-nav-grid {
          display: none !important;
        }

        @media (max-width: 767px) {
          .hegxai-desktop-nav-grid {
            display: none !important;
          }
          .hegxai-mobile-nav-grid {
            display: grid !important;
            grid-template-columns: auto auto !important;
            justify-content: space-between !important;
            grid-template-rows: auto 4px !important;
            column-gap: 12px !important;
            row-gap: 14px !important;
            align-items: center !important;
            padding: 16px 20px 0 !important;
            width: 100% !important;
            height: var(--header-h, 72px) !important;
            box-sizing: border-box !important;
          }
        }
      `}</style>

      {/* Top 60px hover zone trigger for desktop */}
      <div
        aria-hidden="true"
        onMouseEnter={showHeader}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "60px",
          zIndex: 999,
          pointerEvents: "auto",
        }}
      />

      <header
        ref={headerRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          width: "100%",
          height: "var(--header-h, 92px)",
          zIndex: 1000,
          background: "var(--bg, #F4EFE6)", // solid cream
        }}
      >
        {/* DESKTOP 2-ROW GRID: Row 1 = [Logo, Nav, Button], Row 2 = [Line 1, Line 2, Line 3] */}
        <div className="hegxai-desktop-nav-grid">
          {/* Row 1, Col 1: Logo */}
          <div ref={logoContentRef} style={{ display: "flex", alignItems: "center" }}>
            <Link
              href="/"
              onClick={(e) => handleLinkClick(e, "/")}
              style={{
                fontFamily: "var(--ff-logo, 'Anton', sans-serif)",
                fontSize: "40px",
                lineHeight: 1,
                letterSpacing: "0.02em",
                color: "var(--ink)",
                textDecoration: "none",
                textTransform: "uppercase",
                display: "inline-flex",
                alignItems: "flex-start",
              }}
            >
              HEGXAI
              <span
                style={{
                  width: "9px",
                  height: "9px",
                  border: "1.5px solid var(--ink)",
                  display: "inline-block",
                  marginLeft: "6px",
                  marginTop: "3px",
                  flexShrink: 0,
                }}
                aria-hidden="true"
              />
            </Link>
          </div>

          {/* Row 1, Col 2: Center Nav */}
          <nav
            ref={navContentRef}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "24px",
              width: "100%",
            }}
          >
            {NAV_LINKS.map((link, idx) => (
              <div key={link.label} style={{ display: "flex", alignItems: "center", gap: "24px" }}>
                <a
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="header-nav-link"
                  style={{
                    fontFamily: "var(--ff-body, 'DM Sans', sans-serif)",
                    fontSize: "15px",
                    fontWeight: 500,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "var(--ink)",
                  }}
                >
                  {link.label}
                </a>
                {idx < NAV_LINKS.length - 1 && (
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      background: "var(--ink)",
                      display: "inline-block",
                    }}
                    aria-hidden="true"
                  />
                )}
              </div>
            ))}
          </nav>

          {/* Row 1, Col 3: Right Button */}
          <div ref={buttonContentRef} style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              href="#contact"
              variant="primary"
              size="sm"
              onClick={(e) => handleLinkClick(e, "#contact")}
            >
              Book a free audit
            </Button>
          </div>

          {/* Row 2, Col 1: Line 1 (directly under logo) */}
          <div
            ref={line1Ref}
            style={{
              height: "4px",
              background: "var(--ink)",
              transformOrigin: "left",
              width: "100%",
            }}
          />

          {/* Row 2, Col 2: Line 2 (directly under center nav) */}
          <div
            ref={line2Ref}
            style={{
              height: "4px",
              background: "var(--ink)",
              transformOrigin: "left",
              width: "100%",
            }}
          />

          {/* Row 2, Col 3: Line 3 (directly under right button) */}
          <div
            ref={line3Ref}
            style={{
              height: "4px",
              background: "var(--ink)",
              transformOrigin: "left",
              width: "100%",
            }}
          />
        </div>

        {/* MOBILE 2-ROW GRID (< 768px): Row 1 = [Logo, Menu], Row 2 = [Line 1, Line 2] */}
        <div className="hegxai-mobile-nav-grid">
          {/* Row 1, Col 1: Logo */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <Link
              href="/"
              onClick={(e) => handleLinkClick(e, "/")}
              style={{
                fontFamily: "var(--ff-logo, 'Anton', sans-serif)",
                fontSize: "30px",
                lineHeight: 1,
                letterSpacing: "0.02em",
                color: "var(--ink)",
                textDecoration: "none",
                textTransform: "uppercase",
                display: "inline-flex",
                alignItems: "flex-start",
              }}
            >
              HEGXAI
              <span
                style={{
                  width: "7px",
                  height: "7px",
                  border: "1.5px solid var(--ink)",
                  display: "inline-block",
                  marginLeft: "4px",
                  marginTop: "2px",
                  flexShrink: 0,
                }}
                aria-hidden="true"
              />
            </Link>
          </div>

          {/* Row 1, Col 2: MENU button */}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              onClick={openMobileMenu}
              aria-label="Open Navigation Menu"
              style={{
                border: "2px solid var(--ink)",
                background: "transparent",
                color: "var(--ink)",
                padding: "8px 20px",
                borderRadius: 0,
                fontFamily: "var(--ff-body, 'DM Sans', sans-serif)",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                cursor: "pointer",
              }}
            >
              MENU
            </button>
          </div>

          {/* Row 2, Col 1: Mobile Line 1 (under logo) */}
          <div
            ref={mobileLine1Ref}
            style={{
              height: "4px",
              background: "var(--ink)",
              transformOrigin: "left",
              width: "100%",
            }}
          />

          {/* Row 2, Col 2: Mobile Line 2 (under menu button) */}
          <div
            ref={mobileLine2Ref}
            style={{
              height: "4px",
              background: "var(--ink)",
              transformOrigin: "left",
              width: "100%",
            }}
          />
        </div>
      </header>

      {/* MOBILE FULL-SCREEN CREAM OVERLAY */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1100,
            background: "var(--bg, #F4EFE6)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "24px 20px 36px",
          }}
        >
          {/* Top Bar: Logo + Close button */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "4px solid var(--ink)",
              paddingBottom: "16px",
            }}
          >
            <span
              style={{
                fontFamily: "var(--ff-logo, 'Anton', sans-serif)",
                fontSize: "30px",
                color: "var(--ink)",
                letterSpacing: "0.02em",
                textTransform: "uppercase",
              }}
            >
              HEGXAI
            </span>
            <button
              onClick={closeMobileMenu}
              aria-label="Close Navigation Menu"
              style={{
                border: "2px solid var(--ink)",
                background: "transparent",
                color: "var(--ink)",
                padding: "8px 18px",
                borderRadius: 0,
                fontFamily: "var(--ff-body, 'DM Sans', sans-serif)",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                cursor: "pointer",
              }}
            >
              ✕ CLOSE
            </button>
          </div>

          {/* Stacked big links */}
          <div
            ref={mobileLinksRef}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              padding: "40px 0",
            }}
          >
            {NAV_LINKS.map((link) => (
              <div key={link.label} style={{ overflow: "hidden" }}>
                <a
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  style={{
                    display: "block",
                    fontFamily: "var(--ff-display, 'Inter Tight', sans-serif)",
                    fontSize: "clamp(40px, 10vw, 56px)",
                    fontWeight: 500,
                    lineHeight: 0.95,
                    textTransform: "uppercase",
                    letterSpacing: "-0.04em",
                    color: "var(--ink)",
                    textDecoration: "none",
                  }}
                >
                  {link.label}
                </a>
              </div>
            ))}
          </div>

          {/* Bottom sharp ink CTA */}
          <div>
            <Button
              href="#contact"
              variant="primary"
              style={{ width: "100%" }}
              onClick={(e) => handleLinkClick(e, "#contact")}
            >
              Book a free audit
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
