"use client";

import { useEffect, useRef } from "react";

export function WhyVisual() {
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const visual = visualRef.current;

    if (!visual) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    let frameId: number | null = null;

    const updateParallax = () => {
      const bounds = visual.getBoundingClientRect();

      const viewportHeight =
        window.innerHeight || document.documentElement.clientHeight;

      /*
       * 0 = section 正好在 viewport 中间。
       * 范围限制在 -1 ~ 1。
       */
      const sectionCenter =
        bounds.top + bounds.height / 2;

      const viewportCenter =
        viewportHeight / 2;

      const distance =
        (sectionCenter - viewportCenter) /
        viewportHeight;

      const progress = Math.max(
        -1,
        Math.min(1, distance),
      );

      visual.style.setProperty(
        "--why-scroll",
        progress.toFixed(3),
      );

      frameId = null;
    };

    const handleScroll = () => {
      if (frameId !== null) {
        return;
      }

      frameId = window.requestAnimationFrame(
        updateParallax,
      );
    };

    updateParallax();

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true },
    );

    window.addEventListener(
      "resize",
      handleScroll,
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll,
      );

      window.removeEventListener(
        "resize",
        handleScroll,
      );

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return (
    <div
      className="why-visual"
      data-reveal="left"
      ref={visualRef}
    >
      <div
        className="why-ring why-ring-outer"
        aria-hidden="true"
      />

      <div
        className="why-ring why-ring-inner"
        aria-hidden="true"
      />

      <span className="big-type">
        MP&amp;E
      </span>

      <div className="why-badge">
        <span>
          EST.
          <br />
          FOR
          <br />
          INDUSTRY
        </span>
      </div>
    </div>
  );
}
