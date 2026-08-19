"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>(
        "[data-reveal]",
      ),
    );

    const prefersReducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

    if (
      prefersReducedMotion ||
      !("IntersectionObserver" in window)
    ) {
      targets.forEach((target) => {
        target.classList.add("is-visible");
      });

      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add(
            "is-visible",
          );

          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.14,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    root.classList.add("reveal-ready");

    targets.forEach((target) => {
      observer.observe(target);
    });

    return () => {
      observer.disconnect();

      root.classList.remove(
        "reveal-ready",
      );
    };
  }, [pathname]);

  return null;
}
