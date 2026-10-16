"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export function useReveal(scopeRef?: React.RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      const container = scopeRef?.current || (typeof document !== "undefined" ? document.body : null);
      if (!container) return;

      const revealElements = container.querySelectorAll<HTMLElement>("[data-reveal]");
      if (!revealElements.length) return;

      revealElements.forEach((el) => {
        // Ensure overflow is hidden to act as a line mask
        el.style.overflow = "hidden";

        let targets: HTMLElement[] = [];
        const existingLines = el.querySelectorAll<HTMLElement>(".reveal-line");

        if (existingLines.length > 0) {
          targets = Array.from(existingLines);
        } else {
          // Wrap all child nodes (text nodes, <br/>, spans, etc.) in a block mask wrapper
          const wrapper = document.createElement("span");
          wrapper.className = "reveal-line";
          wrapper.style.display = "block";
          while (el.firstChild) {
            wrapper.appendChild(el.firstChild);
          }
          el.appendChild(wrapper);
          targets = [wrapper];
        }

        // Apply line mask reveal
        gsap.fromTo(
          targets,
          { y: "110%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      if (typeof document !== "undefined" && document.fonts) {
        document.fonts.ready.then(() => {
          ScrollTrigger.refresh();
        });
      }
    },
    { scope: scopeRef || undefined }
  );
}
