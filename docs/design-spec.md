# HEGXAI Design System Specification

## 1. Brand & Color Tokens

- **Canvas Base (`--bg`)**: `#F4EFE6` (Warm Architectural Cream)
- **Card Surface (`--surface`)**: `#FBF8F2` (Soft Off-White Cream)
- **Primary Ink (`--ink`)**: `#141414` (Deep Technical Charcoal Black)
- **Muted Text (`--muted`)**: `rgba(20, 20, 20, 0.55)` (Optimized contrast ratio >= 4.5:1 on cream)
- **Border Hairline (`--line`)**: `rgba(20, 20, 20, 0.10)`
- **Accent Highlight (`--accent`)**: `#E8A25C` (Warm Amber for status dots and secondary indicators)
- **Neon Chartreuse (`--lime`)**: `#D7FD41` (Signature technical highlight color)
- **Lime Glow (`--lime-glow`)**: `rgba(215, 253, 65, 0.25)`

---

## 2. Typography Hierarchy

- **Display Heading Font (`--font-display` / `--ff-display`)**: `Inter Tight`, sans-serif (weights: 500, 600)
  - Hero H1: `clamp(44px, 5.5vw, 88px)`, weight 500, letter-spacing `-0.04em`, line-height `0.92`, uppercase
  - Section H2: `clamp(32px, 3.6vw, 56px)`, weight 500, letter-spacing `-0.02em`, line-height `1.04`
  - Section H3: `clamp(20px, 1.8vw, 28px)`, weight 500, letter-spacing `-0.02em`, line-height `1.15`
  - Text Reveal Masks: `padding-bottom: 0.14em` and `margin-bottom: -0.14em` to prevent clipping of descenders (`g`, `y`, `p`, `q`).
- **Brand Wordmark Font (`--font-logo` / `--ff-logo`)**: `Anton`, sans-serif
  - Used **EXCLUSIVELY** for the `HEGXAI` logo wordmark in the header and footer.
- **Body Font (`--font-body` / `--ff-body`)**: `DM Sans`, sans-serif (weights: 300, 400, 500, 600)
  - Regular Body: `15px - 16px`, weight 400, color `#5f5b52` / `var(--muted)`
  - Small Body: `13px - 14px`, weight 400
- **Technical Mono Font (`--font-mono` / `--ff-mono`)**: `IBM Plex Mono`, monospace (weights: 400, 500)
  - Section Labels: `11px`, weight 500, letter-spacing `0.12em`, uppercase
  - Status Indicators & Badges: `11px - 13px`, weight 500, letter-spacing `0.06em - 0.08em`

---

## 3. Radius System Tokens

A unified geometric corner system defined via CSS variables:
- **`--r-0`**: `0px` (All buttons, section bars, input fields, and tags)
- **`--r-card`**: `12px` (All interactive cards, dashboard panels, and modals)
- **`--r-pill`**: `999px` (Pills, badges, and floating status indicators only)
- **Circles**: `50%` (Avatars, radio dots, and circular icon nodes)

All stray radius values (2px, 6px, 8px, 10px, 14px, 32px, 40px) have been refactored to use the above tokens.

---

## 4. Single Button System

Only one `<Button>` system is used across the entire application:
- **Style**: Square (`--r-0`), `Inter Tight 500`, `13px`, uppercase, `0.04em` tracking, padding `16px 24px`, animated arrow glyph (`→`) with `4px` hover translation.
- **Variants**:
  - `primary`: Solid black background (`var(--ink)`), white text.
  - `secondary`: Transparent background, `1px solid var(--ink)` border, ink text.
  - `inverse`: For dark sections (`#141414`), chartreuse lime background (`var(--lime)`), black text.
- **Hero CTA**: Keeps square corner crosshair brackets (`┌ ┐ └ ┘`).

---

## 5. Section Layout & Structural Grid

- **Column Width**: Standard `1320px` max-width centered column with `--col-pad: 24px`.
- **Vertical Line Guides**: 1px vertical borders at `25%` ink on left and right column boundaries, starting from the About section downwards.
- **Section Bars (`<SectionBar>`)**: 34px height, `#0f0f0f` background, white Inter Tight 500 13px uppercase label with 3-digit padded number (`001`, `002`, ...).

### Section Sequence:
1. `Nav`: 2-row grid header with scroll-direction auto-hide, ScrollTrigger active-link underline, and Lenis offset.
2. `Hero`: Full-width hero with single H1, lime highlight box on "AUTOMATED.", interactive dashed connector SVG, live workflow visual card, and GSAP ticker Marquee.
3. `001 About Us`: Chamfered lime tag (`#d7fd41`), coordinate-aligned headline, and conditional founder card.
4. `002 The Features`: Pinned agent card and feature copy pager with rolling indicators.
5. `003 Why Automate`: Dark background (`#141414`), additive-masked ASCII halftone canvas, qualitative value propositions.
6. `004 Services`: Interactive accordion with ink row expansion, plus live partner Marquee.
7. `005 The Process`: Step-by-step methodology tabbed walkthrough.
8. `006 Flexible Engagement`: Transparent pricing tiers and scoping cards.
9. `007 FAQ`: Accessible accordion items with `aria-expanded` and `aria-controls`.
10. `008 Contact`: Final conversion CTA block with dynamic "Booking opens soon" fallback.
11. `Footer`: ASCII matrix background, navigation links, and optional newsletter subscription.
