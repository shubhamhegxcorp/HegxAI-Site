"use client";

import React, { createContext, useContext, useCallback, useRef } from "react";
import { siteContent, getCalLink } from "@/content/site";

import type { GlobalCal, GlobalCalWithoutNs } from "@calcom/embed-core";

export interface BookingOptions {
  name?: string;
  email?: string;
  event?: React.MouseEvent | React.SyntheticEvent;
}

interface BookingContextType {
  openBooking: (options?: BookingOptions) => void;
  preloadBooking: () => void;
  bookingUrl: string;
  calLink: string;
}

const BookingContext = createContext<BookingContextType | null>(null);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const calPromiseRef = useRef<Promise<GlobalCal | GlobalCalWithoutNs> | null>(null);
  const bookingUrl = siteContent.contact.bookingUrl || "";
  const calLink = getCalLink(bookingUrl);

  const initCal = useCallback(() => {
    if (typeof window === "undefined") return Promise.reject(new Error("SSR"));
    if (!calPromiseRef.current) {
      calPromiseRef.current = (async () => {
        const { getCalApi } = await import("@calcom/embed-react");
        const cal = await getCalApi();
        cal("ui", {
          theme: "light",
          styles: {
            branding: { brandColor: "#141414" },
          },
        });
        return cal;
      })();
    }
    return calPromiseRef.current;
  }, []);

  const preloadBooking = useCallback(() => {
    if (bookingUrl) {
      initCal().catch((err) => {
        console.warn("Failed to preload Cal embed", err);
      });
    }
  }, [bookingUrl, initCal]);

  const openBooking = useCallback(
    async (options?: BookingOptions) => {
      if (options?.event) {
        options.event.preventDefault();
      }

      if (!bookingUrl) {
        const contactEl = document.getElementById("contact");
        if (contactEl) {
          contactEl.scrollIntoView({ behavior: "smooth" });
        } else {
          window.location.hash = "contact";
        }
        return;
      }

      // Read form input values if available and not explicitly provided
      let prefillName = options?.name?.trim();
      let prefillEmail = options?.email?.trim();

      if (!prefillName && typeof document !== "undefined") {
        const nameInput = document.querySelector<HTMLInputElement>('input[name="name"]');
        if (nameInput?.value) prefillName = nameInput.value.trim();
      }
      if (!prefillEmail && typeof document !== "undefined") {
        const emailInput = document.querySelector<HTMLInputElement>('input[name="email"]');
        if (emailInput?.value) prefillEmail = emailInput.value.trim();
      }

      try {
        // Fallback to opening bookingUrl in a new tab if embed doesn't initialize within 6s
        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error("Cal.com embed loading timed out")), 6000)
        );

        const cal = await Promise.race([initCal(), timeoutPromise]);

        const config: Record<string, string> = {};
        if (prefillName) config.name = prefillName;
        if (prefillEmail) config.email = prefillEmail;

        cal("modal", {
          calLink,
          config,
        });
      } catch (err) {
        console.warn("Cal embed failed to open modal, falling back to new tab", err);
        window.open(bookingUrl, "_blank", "noopener,noreferrer");
      }
    },
    [bookingUrl, calLink, initCal]
  );

  return (
    <BookingContext.Provider value={{ openBooking, preloadBooking, bookingUrl, calLink }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking(): BookingContextType {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
}
