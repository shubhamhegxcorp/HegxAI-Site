# HEGXAI Motion & Interaction Specification (Avande Framer Replica)

## 1. Global Animation Engine
- **Lenis Smooth Scroll**:
  - Duration: `1.2s`
  - Easing: `(t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))`
  - Integration: `lenis.on('scroll', ScrollTrigger.update)`, `gsap.ticker.add((time) => lenis.raf(time * 1000))`
  - Lag smoothing: `gsap.ticker.lagSmoothing(0)`
  - Cleanup with `gsap.context()` on component unmount
- **Custom Cursor**:
  - Smooth lerp `(x, y)` follower (smoothing factor `0.18`)
  - Scaling from `12px` dot to `48px` subtle ring with blend mode on interactive links, buttons, and cards
- **Reduced Motion Support**:
  - `prefers-reduced-motion: reduce` query disables pinned triggers, heavy parallax, and marquees while maintaining instant opacity visibility.

## 2. Load & Scroll Triggers
- **Page Load Hero Sequence**:
  - Nav pill drops in: `y: -30 -> 0`, `opacity: 0 -> 1`, `duration: 0.8s`
  - Headline mask reveal: `y: 110% -> 0%`, `duration: 1.1s`, `stagger: 0.12s`, `ease: power4.out`
  - Subtext & CTA fade up: `y: 20 -> 0`, `opacity: 0 -> 1`, `duration: 0.8s`
  - Floating cards entry: `x/y translation -> 0`, `opacity: 0 -> 1`, `duration: 0.9s`
  - Continuous float: sinusoidal `y +-10px`, `4-6s`, alternating reverse directions
- **Heading Line-by-Line Mask Reveal**:
  - Overflow clip container
  - Inner element: `translateY(110%) -> translateY(0%)`
  - Trigger: `top 85%` of viewport
  - Easing: `power3.out` / `cubic-bezier(0.22, 1, 0.36, 1)`, duration `0.9s`
- **Card / Block Entrance**:
  - `y: 40px -> 0px`, `opacity: 0 -> 1`, `stagger: 0.1s`, `ease: power3.out`

## 3. Micro-Interactions & Hover Physics
- **Pill Buttons**:
  - Hover background color transition with wipe effect
  - Arrow slide: outgoing arrow `translateX(8px)`, incoming arrow slides from `translateX(-8px)` to `0`
  - Press scale: `0.97`
  - Magnetic pull: subtle `8px` translation towards cursor on mouse move
- **Marquees**:
  - Hardware-accelerated CSS keyframe / GSAP ticker translation
  - Pause on hover: `animation-play-state: paused`
  - Alternate rows run in opposite directions
- **Accordion Components (FAQ & Services)**:
  - Height transition: `grid-template-rows: 0fr -> 1fr`, duration `0.45s`, `ease: cubic-bezier(0.16, 1, 0.3, 1)`
  - Indicator: `+` rotates `45deg` into `×` smoothly
- **Text Scrubber on Scroll (About 001)**:
  - GSAP ScrollTrigger with `scrub: true`
  - Text color transitions from `rgba(20, 20, 20, 0.25)` to `rgba(20, 20, 20, 1.0)` as user scrolls through the section
- **Stacking Sticky Cards (Benefits 004)**:
  - Previous cards scale down to `0.94` and dim as the next card scrolls over them
- **4-Step Process Tracker (Process 007)**:
  - Left step indicator pins while right card details crossfade on scrub
  - Progress line fills proportionally to scroll progress
- **Pricing Monthly / Yearly Toggle**:
  - Animated slider pill translating between toggle options
  - Price text changes with a vertical rolling mask transition
- **Phone Mockups (Agent Showcase)**:
  - Floating 3D perspective cards with staggered list item entrance and animated task progress bar

## 4. Background Canvas & Vector Motion
- **AsciiHalftoneCanvas**:
  - Concentric astroid wave phase updating at `60fps` (`time += 0.015`)
  - Mouse ripple field exerting radial wave modulation within `180px` radius
- **TechnicalGridOverlay**:
  - SVG dashed connector line draw: `strokeDashoffset: 1000 -> 0`, `duration: 2.2s`
  - Center reticle: continuous 360-degree rotation (`duration: 40s`, linear infinite)
  - 4 floating technical badges (`↗`, `☍`, `❇`, `⬡`) floating independently on sine waves
