"use client";

import { useEffect } from "react";

export function CursorEffects() {
  useEffect(() => {
    const supportsPointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!supportsPointer || reducedMotion) {
      return;
    }

    const cards = Array.from(
      document.querySelectorAll<HTMLElement>(
        "[data-cursor-effect]",
      ),
    );

    const cleanups: Array<() => void> = [];

    cards.forEach((card) => {
      const handleMove = (event: PointerEvent) => {
        const bounds = card.getBoundingClientRect();

        if (!bounds.width || !bounds.height) {
          return;
        }

        const x = event.clientX - bounds.left;
        const y = event.clientY - bounds.top;

        const normalizedX =
          x / bounds.width - 0.5;

        const normalizedY =
          y / bounds.height - 0.5;

        /*
         * Spotlight position
         */
        card.style.setProperty(
          "--spot-x",
          `${x.toFixed(2)}px`,
        );

        card.style.setProperty(
          "--spot-y",
          `${y.toFixed(2)}px`,
        );

        /*
         * Magnetic movement
         * 故意保持非常轻微。
         */
        card.style.setProperty(
          "--mag-x",
          `${(normalizedX * 12).toFixed(2)}px`,
        );

        card.style.setProperty(
          "--mag-y",
          `${(normalizedY * 9).toFixed(2)}px`,
        );

        card.classList.add("is-cursor-active");
      };

      const handleLeave = () => {
        card.style.setProperty(
          "--spot-x",
          "50%",
        );

        card.style.setProperty(
          "--spot-y",
          "50%",
        );

        card.style.setProperty(
          "--mag-x",
          "0px",
        );

        card.style.setProperty(
          "--mag-y",
          "0px",
        );

        card.classList.remove(
          "is-cursor-active",
        );
      };

      card.addEventListener(
        "pointermove",
        handleMove,
      );

      card.addEventListener(
        "pointerleave",
        handleLeave,
      );

      cleanups.push(() => {
        card.removeEventListener(
          "pointermove",
          handleMove,
        );

        card.removeEventListener(
          "pointerleave",
          handleLeave,
        );
      });
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return null;
}
