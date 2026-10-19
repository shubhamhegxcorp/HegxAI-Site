# HEGXAI Design System Specification (Avande Framer Replica)

## 1. Brand & Theme Tokens
- **Canvas Base (--bg)**: `#F4EFE6` (Warm Architectural Cream)
- **Card Surface (--surface)**: `#FBF8F2` (Soft Off-White Cream)
- **Primary Ink (--ink)**: `#141414` (Deep Technical Charcoal Black)
- **Muted Text (--muted)**: `rgba(20, 20, 20, 0.60)`
- **Border Hairline (--line)**: `rgba(20, 20, 20, 0.10)`
- **Accent Highlight (--accent)**: `#E8A25C` (Warm Amber, used sparingly for active states and indicators)
- **Neon Chartreuse (--lime)**: `#D7FD41` (Signature highlight tag color from Avande)
- **Neon Glow (--lime-glow)**: `rgba(215, 253, 65, 0.35)`

## 2. Typography Hierarchy
- **Display Font (`--font-display`)**: `Anton`, sans-serif
  - Headline Large: `clamp(64px, 13vw, 190px)`, uppercase, line-height `0.92`, letter-spacing `-0.01em`
  - Section Title: `clamp(36px, 4.5vw, 68px)`, uppercase, line-height `0.96`, letter-spacing `0.01em`
  - Big Wordmark: `clamp(90px, 18vw, 240px)`, letter-spacing `-0.02em`
- **Body Font (`--font-body`)**: `DM Sans`, sans-serif
  - Large Body: `18px - 22px`, line-height `1.45`, weight `400`
  - Regular Body: `15px - 16px`, line-height `1.65`, weight `400`
  - Small Body: `13px - 14px`, line-height `1.60`, weight `400`
- **Mono Technical Font (`--font-mono`)**: `IBM Plex Mono`, monospace
  - Labels & Section Numbers: `11px`, weight `500`, tracking `0.12em`, uppercase
  - Badges & Buttons: `12px`, weight `500`, tracking `0.08em`, uppercase

## 3. Geometric Components & Surfacing
- **Corner Radii**:
  - Small (`--r-sm`): `12px`
  - Medium (`--r-md`): `20px`
  - Large (`--r-lg`): `28px`
  - Extra Large (`--r-xl`): `36px`
  - Pill (`--r-full`): `9999px`
- **Borders & Dividers**:
  - Precision hairlines: `1px solid var(--line)`
  - Terminal anchor squares: `6px × 6px` solid ink boxes `[▪]` on horizontal section dividing rules
- **Chamfered Corner Tags**:
  - Polygon cut corner: `clip-path: polygon(0 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%)`
  - Background `#D7FD41` with `#141414` text and `■ ›››` chevrons
- **Corner Brackets**:
  - Technical framing `┌ ┐ └ ┘` with `8px × 8px` crosshairs on interactive CTA buttons and modules
- **Procedural Background**:
  - ASCII halftone matrix sampling 4-point astroid / super-ellipse contours with characters `[' ', '.', '·', '+', '?', '*', '%', '@']`
  - SVG blueprint dashed guidelines `stroke-dasharray="6 6"` with rotating crosshair reticle target `┼` and floating 3D technical badges (`↗`, `☍`, `❇`, `⬡`)

## 4. Section Order & Structure
1. `Nav`: Floating pill navigation with blur backdrop, section links, and "BOOK A FREE AUDIT" pill
2. `Hero`: Giant Anton headline, lime highlight on "AUTOMATED.", blueprint guides, floating active task cards, live circular speedometer gauge, client logo marquee strip
3. `001 About Us`: Chamfered lime tag, text illumination scrubber on scroll, team/founder badge
4. `002 The Features`: Pinned "DEPLOY AI AGENT" card with counter-rotating avatar cluster, rolling digits pager `01/03`, mock analytics card, and giant "INTELLIGENT" Anton marquee
5. `003 The Statistics (Why Automate)`: Dark section in `#141414`, dark ASCII matrix background, qualitative columns ("LESS", "FEWER", "FASTER"), chamfered "BOOK A CALL ›››" tag
6. `004 Benefits ("Scale Your Team")`: "SCALE YOUR TEAM" banner with chevron indicators, left sticky label/title, right 3 stacking sticky cards (`01 AI Discovery`, `02 Custom AI Build`, `03 Scale & Optimize`)
7. `005 Services`: "BEST FOR..." marquee strip, huge Anton rows with tag chips and ink hover wipe, "(our clients)" logo marquee row
8. `006 Testimonials`: Portrait card with neutral gradient, quote placeholder, pager `01/03`, metric slots
9. `007 The Process`: Pinned 4-step workflow tracker (01 Discovery, 02 Strategy, 03 Development, 04 Deployment) with progress connector line and interactive step cards
10. `008 Blog`: List-style article rows with date placeholder `[DATE]`, category chips, excerpt, hover background wipe
11. `009 Pricing`: "FLEXIBLE AI SOLUTIONS" with Monthly/Yearly animated pill slider, Starter & Growth cards, "Custom / scoped to your needs" price slots
12. `Second Statistics / Agent Showcase`: "AI Workflow Automation" with 2-3 floating CSS phone mockups showing agent list, progress bar, and staggered rows
13. `Contact CTA`: Card scaling `0.92 -> 1` on scroll with corner crosshair brackets
14. `FAQ`: 2-column layout with Anton headline and 5 smooth animated accordions
15. `Footer`: Newsletter block, 4 link columns, giant masked "HEGXAI" wordmark with letter stagger, "BACK TO TOP" smooth scroll
