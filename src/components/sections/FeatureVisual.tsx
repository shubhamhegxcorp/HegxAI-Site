"use client";

import { useEffect, useRef } from "react";
import styles from "./FeatureVisual.module.css";
import { siteContent } from "@/content/site";

export default function FeatureVisual({ index }: { index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const nodes = siteContent.features[index]?.nodes || ["Input", "Process", "Automate", "Output"];

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      element.dataset.visible = String(entry.isIntersecting);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const nodeCenters = [45, 135, 225, 315];

  return (
    <div ref={ref} className={styles.visual} data-visible="false" aria-hidden="true">
      <svg viewBox="0 0 360 120" width="100%" height="120" fill="none">
        {/* Dashed connector line */}
        <path
          d="M 45 60 L 315 60"
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />

        {/* 4 Labelled Nodes (labels >= 10px, from site.ts) */}
        {nodes.map((label, i) => {
          const cx = nodeCenters[i];
          return (
            <g key={i}>
              {/* Rounded node box 72x42 */}
              <rect
                x={cx - 36}
                y={60 - 21}
                width="72"
                height="42"
                rx="6"
                fill="#222222"
                stroke="rgba(255, 255, 255, 0.16)"
                strokeWidth="1"
              />
              {/* Node label text: >= 10px */}
              <text
                x={cx}
                y={64}
                textAnchor="middle"
                fill="rgba(255, 255, 255, 0.92)"
                fontFamily="var(--ff-mono, 'IBM Plex Mono', monospace)"
                fontSize="10.5"
                fontWeight="500"
                letterSpacing="0.02em"
              >
                {label}
              </text>
            </g>
          );
        })}

        {/* Travelling active accent dot */}
        <circle
          className={styles.activeDot}
          cx="0"
          cy="60"
          r="4.5"
          fill="var(--accent)"
          stroke="#141414"
          strokeWidth="1"
          style={{
            filter: "drop-shadow(0 0 6px var(--accent))",
          }}
        />
      </svg>
    </div>
  );
}
