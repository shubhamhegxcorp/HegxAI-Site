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
          backgroundColor: "#F4EFE6",
          color: "#141414",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <span
            style={{
              fontSize: 44,
              fontWeight: 900,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            HEGXAI
          </span>
          <span
            style={{
              width: 12,
              height: 12,
              border: "2px solid #141414",
              marginLeft: 8,
              display: "flex",
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span
              style={{
                fontSize: 64,
                fontWeight: 700,
                letterSpacing: "-0.04em",
                textTransform: "uppercase",
                lineHeight: 1,
              }}
            >
              EVERY TASK.
            </span>
            <span
              style={{
                backgroundColor: "#d7fd41",
                padding: "4px 18px",
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
              color: "#5f5b52",
              margin: 0,
              fontWeight: 400,
            }}
          >
            AI agents and workflow automation for businesses
          </p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(20,20,20,0.15)",
            paddingTop: 24,
            fontSize: 16,
            color: "rgba(20,20,20,0.6)",
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
