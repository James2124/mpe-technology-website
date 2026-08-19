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

    const magneticButtons = Array.from(
      document.querySelectorAll<HTMLElement>(
        "[data-magnetic]",
      ),
    );
    
    magneticButtons.forEach((button) => {
      const handleMove = (event: PointerEvent) => {
        const bounds = button.getBoundingClientRect();
    
        if (!bounds.width || !bounds.height) {
          return;
        }
    
        const x =
          (event.clientX - bounds.left) /
            bounds.width -
          0.5;
    
        const y =
          (event.clientY - bounds.top) /
            bounds.height -
          0.5;
    
        /*
         * 整个按钮轻微跟随。
         */
        button.style.setProperty(
          "--button-magnetic-x",
          `${(x * 12).toFixed(2)}px`,
        );
    
        button.style.setProperty(
          "--button-magnetic-y",
          `${(y * 8).toFixed(2)}px`,
        );
    
        /*
         * Arrow 移动幅度稍微大一点，
         * 制造 layer/depth 感。
         */
        button.style.setProperty(
          "--button-arrow-x",
          `${(x * 10).toFixed(2)}px`,
        );
    
        button.style.setProperty(
          "--button-arrow-y",
          `${(y * 6).toFixed(2)}px`,
        );
    
        button.classList.add(
          "is-magnetic-active",
        );
      };
    
      const handleLeave = () => {
        button.style.setProperty(
          "--button-magnetic-x",
          "0px",
        );
    
        button.style.setProperty(
          "--button-magnetic-y",
          "0px",
        );
    
        button.style.setProperty(
          "--button-arrow-x",
          "0px",
        );
    
        button.style.setProperty(
          "--button-arrow-y",
          "0px",
        );
    
        button.classList.remove(
          "is-magnetic-active",
        );
      };
    
      button.addEventListener(
        "pointermove",
        handleMove,
      );
    
      button.addEventListener(
        "pointerleave",
        handleLeave,
      );
    
      cleanups.push(() => {
        button.removeEventListener(
          "pointermove",
          handleMove,
        );
    
        button.removeEventListener(
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
