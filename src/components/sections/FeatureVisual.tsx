"use client";

import { useEffect, useRef } from "react";
import styles from "./FeatureVisual.module.css";

export default function FeatureVisual({ index }: { index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      element.dataset.visible = String(entry.isIntersecting);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={styles.visual} data-visible="false" aria-hidden="true">
      <svg viewBox="0 0 300 180" width="100%" height="180" fill="none">
        {index === 0 ? (
          <>
            <circle cx="150" cy="90" r="62" stroke="white" strokeOpacity=".15" strokeDasharray="3 4" />
            <circle cx="150" cy="90" r="28" fill="var(--accent)" />
            <path d="m150 78 3 9 9 3-9 3-3 9-3-9-9-3 9-3Z" fill="var(--ink)" />
            <g className={styles.orbit}>
              <circle cx="212" cy="90" r="12" fill="hsl(30,60%,65%)" stroke="var(--ink)" strokeWidth="2" />
              <circle cx="119" cy="144" r="12" fill="hsl(70,60%,65%)" stroke="var(--ink)" strokeWidth="2" />
              <circle cx="119" cy="36" r="12" fill="hsl(110,60%,65%)" stroke="var(--ink)" strokeWidth="2" />
            </g>
          </>
        ) : index === 1 ? (
          <>
            <path d="M42 90H258" stroke="white" strokeOpacity=".3" strokeDasharray="4 5" />
            {[42, 114, 186, 258].map((x) => <rect key={x} x={x - 20} y="70" width="40" height="40" rx="8" fill="#262626" stroke="white" strokeOpacity=".25" />)}
            <circle className={styles.workflowDot} cx="42" cy="90" r="5" fill="var(--lime)" />
          </>
        ) : (
          <>
            <path d="M75 72C110 8 190 8 225 72m0 36c-35 64-115 64-150 0" stroke="white" strokeOpacity=".4" />
            <path d="m214 68 11 4 2-12M86 112l-11-4-2 12" stroke="white" strokeOpacity=".6" />
            {[55, 205].map((x) => <rect key={x} x={x} y="70" width="40" height="40" rx="8" fill="#262626" stroke="white" strokeOpacity=".25" />)}
            <circle className={styles.syncForward} r="4" fill="var(--lime)" />
            <circle className={styles.syncBack} r="4" fill="var(--lime)" />
          </>
        )}
      </svg>
    </div>
  );
}
