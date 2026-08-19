"use client";

import { useEffect, useRef } from "react";

export function WhyVisual() {
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const visual = visualRef.current;

    if (!visual) {
      return;
    }

    const prefersReducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

    const coarsePointer =
      window.matchMedia(
        "(pointer: coarse)",
      ).matches;

    /*
     * Mobile / touch / reduced-motion
     * 不执行 scroll parallax。
     *
     * Ring rotation 和 badge floating
     * 仍然由 CSS 控制。
     */
    if (
      prefersReducedMotion ||
      coarsePointer ||
      window.innerWidth <= 680
    ) {
      return;
    }

    let frameId: number | null = null;
    let isActive = false;

    const updateParallax = () => {
      const bounds =
        visual.getBoundingClientRect();

      const viewportHeight =
        window.innerHeight ||
        document.documentElement.clientHeight;

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

      /*
       * JS 直接计算 pixel value，
       * CSS 不需要再做乘法。
       */
      visual.style.setProperty(
        "--why-ring-outer-y",
        `${(progress * 24).toFixed(2)}px`,
      );

      visual.style.setProperty(
        "--why-ring-inner-y",
        `${(progress * -18).toFixed(2)}px`,
      );

      visual.style.setProperty(
        "--why-type-y",
        `${(progress * -34).toFixed(2)}px`,
      );

      visual.style.setProperty(
        "--why-badge-y",
        `${(progress * 42).toFixed(2)}px`,
      );

      frameId = null;
    };

    const requestUpdate = () => {
      /*
       * Section 不在附近时，
       * 完全不做 layout calculation。
       */
      if (
        !isActive ||
        frameId !== null
      ) {
        return;
      }

      frameId =
        window.requestAnimationFrame(
          updateParallax,
        );
    };

    /*
     * Why section 靠近 viewport
     * 才开启 parallax computation。
     */
    const observer =
      new IntersectionObserver(
        ([entry]) => {
          isActive =
            entry.isIntersecting;

          visual.classList.toggle(
            "is-parallax-active",
            isActive,
          );

          if (isActive) {
            requestUpdate();
          }
        },
        {
          rootMargin: "200px 0px",
          threshold: 0,
        },
      );

    observer.observe(visual);

    window.addEventListener(
      "scroll",
      requestUpdate,
      { passive: true },
    );

    window.addEventListener(
      "resize",
      requestUpdate,
    );

    return () => {
      observer.disconnect();

      window.removeEventListener(
        "scroll",
        requestUpdate,
      );

      window.removeEventListener(
        "resize",
        requestUpdate,
      );

      visual.classList.remove(
        "is-parallax-active",
      );

      if (frameId !== null) {
        window.cancelAnimationFrame(
          frameId,
        );
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
