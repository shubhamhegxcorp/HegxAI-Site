import { ImageResponse } from "next/og";

export const alt = "HEGXAI — Every Task. Automated.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          backgroundColor: "#0E1020",
          color: "#F4EFE6",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Star Motif SVG in background */}
        <div
          style={{
            position: "absolute",
            right: "-120px",
            top: "-120px",
            width: "800px",
            height: "800px",
            display: "flex",
            opacity: 0.12,
          }}
        >
          <svg viewBox="0 0 100 100" width="800" height="800" fill="none">
            <path
              d="M50 0 C50 28 72 50 100 50 C72 50 50 72 50 100 C50 72 28 50 0 50 C28 50 50 28 50 0 Z"
              stroke="#5170FF"
              strokeWidth="1"
            />
          </svg>
        </div>

        {/* Top: Logo with Sparkle */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", width: 44, height: 44 }}>
            <svg viewBox="0 0 100 100" width="44" height="44" fill="none">
              <path
                d="M50 0 C50 28 72 50 100 50 C72 50 50 72 50 100 C50 72 28 50 0 50 C28 50 50 28 50 0 Z"
                fill="none"
                stroke="#7D93FF"
                strokeWidth="2"
              />
              <polygon points="50,15 80,50 50,85 20,50" fill="#5170FF" />
            </svg>
          </div>
          <span
            style={{
              fontSize: 44,
              fontWeight: 900,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              color: "#F4EFE6",
            }}
          >
            HEGXAI
          </span>
        </div>

        {/* Center: Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <span
              style={{
                fontSize: 64,
                fontWeight: 700,
                letterSpacing: "-0.04em",
                textTransform: "uppercase",
                lineHeight: 1,
                color: "#F4EFE6",
              }}
            >
              EVERY TASK.
            </span>
            <span
              style={{
                background: "linear-gradient(90deg, #194EB4 0%, #5170FF 50%, #B368DF 100%)",
                color: "#ffffff",
                padding: "6px 20px",
                fontSize: 64,
                fontWeight: 700,
                letterSpacing: "-0.04em",
                textTransform: "uppercase",
                lineHeight: 1,
              }}
            >
              AUTOMATED.
            </span>
          </div>

          <p
            style={{
              fontSize: 26,
              color: "#7D93FF",
              margin: 0,
              fontWeight: 400,
            }}
          >
            AI agents and workflow automation for businesses
          </p>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255,255,255,0.12)",
            paddingTop: 24,
            fontSize: 16,
            color: "rgba(244,239,230,0.6)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          <span>hegxai.com</span>
          <span>B2B AI Automation Agency</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
