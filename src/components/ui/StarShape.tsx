import React, { useId } from "react";

export interface StarShapeProps {
  size?: number | string;
  strokeWidth?: number;
  variant?: "outline" | "fill" | "gradient";
  className?: string;
  opacity?: number;
  color?: string;
  style?: React.CSSProperties;
}

export default function StarShape({
  size = 100,
  strokeWidth = 1,
  variant = "outline",
  className = "",
  opacity,
  color,
  style,
}: StarShapeProps) {
  const gradId = useId();
  const widthVal = typeof size === "number" ? `${size}px` : size;
  const heightVal = typeof size === "number" ? `${size}px` : size;

  const pathD =
    "M50 0 C50 28 72 50 100 50 C72 50 50 72 50 100 C50 72 28 50 0 50 C28 50 50 28 50 0 Z";

  return (
    <svg
      viewBox="0 0 100 100"
      width={widthVal}
      height={heightVal}
      aria-hidden="true"
      className={className}
      style={{
        width: widthVal,
        height: heightVal,
        pointerEvents: "none",
        opacity: opacity !== undefined ? opacity : undefined,
        display: "inline-block",
        flexShrink: 0,
        ...style,
      }}
    >
      {variant === "gradient" && (
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--accent-deep, #194EB4)" />
            <stop offset="50%" stopColor="var(--accent, #5170FF)" />
            <stop offset="100%" stopColor="var(--accent-violet, #B368DF)" />
          </linearGradient>
        </defs>
      )}

      {variant === "outline" && (
        <path
          d={pathD}
          fill="none"
          stroke={color || "currentColor"}
          strokeWidth={strokeWidth}
          vectorEffect="non-scaling-stroke"
        />
      )}

      {variant === "fill" && (
        <path
          d={pathD}
          fill={color || "currentColor"}
          stroke="none"
        />
      )}

      {variant === "gradient" && (
        <path
          d={pathD}
          fill={`url(#${gradId})`}
          stroke="none"
        />
      )}
    </svg>
  );
}

