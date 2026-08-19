"use client";

import { useEffect, useRef } from "react";

export function HeroVisual() {
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const visual = visualRef.current;

    if (!visual) {
      return;
    }

    const supportsFinePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    /*
     * Touch device 或 Reduce Motion 模式下，
     * 不启动 mouse parallax。
     */
    if (!supportsFinePointer || prefersReducedMotion) {
      return;
    }

    let frameId: number | null = null;

    let targetX = 0;
    let targetY = 0;

    let currentX = 0;
    let currentY = 0;

    const applyMotion = (x: number, y: number) => {
      const style = visual.style;

      /*
       * 产品图移动幅度最大。
       */
      style.setProperty(
        "--hero-product-x",
        `${(x * 22).toFixed(2)}px`,
      );

      style.setProperty(
        "--hero-product-y",
        `${(y * 16).toFixed(2)}px`,
      );

      /*
       * 背景网格往相反方向移动。
       */
      style.setProperty(
        "--hero-grid-x",
        `${(x * -10).toFixed(2)}px`,
      );

      style.setProperty(
        "--hero-grid-y",
        `${(y * -8).toFixed(2)}px`,
      );

      /*
       * 编号和产品说明轻微反向移动。
       */
      style.setProperty(
        "--hero-detail-x",
        `${(x * -12).toFixed(2)}px`,
      );

      style.setProperty(
        "--hero-detail-y",
        `${(y * -9).toFixed(2)}px`,
      );

      /*
       * 光晕跟随鼠标。
       */
      style.setProperty(
        "--hero-light-x",
        `${(x * 48).toFixed(2)}px`,
      );

      style.setProperty(
        "--hero-light-y",
        `${(y * 38).toFixed(2)}px`,
      );

      /*
       * 产品非常轻微地做 3D 倾斜。
       */
      style.setProperty(
        "--hero-tilt-x",
        `${(y * -2.2).toFixed(2)}deg`,
      );

      style.setProperty(
        "--hero-tilt-y",
        `${(x * 2.8).toFixed(2)}deg`,
      );
    };

    const animate = () => {
      /*
       * 数值逐渐接近目标，而不是直接跳过去。
       */
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;

      const distanceX = Math.abs(targetX - currentX);
      const distanceY = Math.abs(targetY - currentY);

      if (distanceX < 0.001 && distanceY < 0.001) {
        currentX = targetX;
        currentY = targetY;

        applyMotion(currentX, currentY);

        frameId = null;
        return;
      }

      applyMotion(currentX, currentY);

      frameId = window.requestAnimationFrame(animate);
    };

    const queueAnimation = () => {
      if (frameId !== null) {
        return;
      }

      frameId = window.requestAnimationFrame(animate);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = visual.getBoundingClientRect();

      if (!bounds.width || !bounds.height) {
        return;
      }

      const relativeX =
        (event.clientX - bounds.left) / bounds.width;

      const relativeY =
        (event.clientY - bounds.top) / bounds.height;

      /*
       * 转换成 -1 到 1。
       */
      targetX = Math.max(
        -1,
        Math.min(1, (relativeX - 0.5) * 2),
      );

      targetY = Math.max(
        -1,
        Math.min(1, (relativeY - 0.5) * 2),
      );

      visual.classList.add("is-interacting");

      queueAnimation();
    };

    const resetPointer = () => {
      targetX = 0;
      targetY = 0;

      visual.classList.remove("is-interacting");

      queueAnimation();
    };

    applyMotion(0, 0);

    visual.addEventListener(
      "pointermove",
      handlePointerMove,
    );

    visual.addEventListener(
      "pointerleave",
      resetPointer,
    );

    visual.addEventListener(
      "pointercancel",
      resetPointer,
    );

    return () => {
      visual.removeEventListener(
        "pointermove",
        handlePointerMove,
      );

      visual.removeEventListener(
        "pointerleave",
        resetPointer,
      );

      visual.removeEventListener(
        "pointercancel",
        resetPointer,
      );

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }

      visual.classList.remove("is-interacting");

      applyMotion(0, 0);
    };
  }, []);

  return (
    <div
      className="hero-visual"
      ref={visualRef}
      aria-label="Featured worm gear reducer"
    >
      <div
        className="visual-grid"
        aria-hidden="true"
      />

      <div
        className="hero-light"
        aria-hidden="true"
      />

      <p className="visual-index">
        / 01
      </p>

      <div className="hero-product-parallax">
        <img
          src="/products/worm-reducer.png"
          alt="Worm gear speed reducer"
        />
      </div>

      <div className="product-note">
        <span>FEATURED</span>
        <strong>WP Series</strong>
        <small>Worm Gear Reducer</small>
      </div>

      <div className="orbit-label">
        TORQUE • CONTROL • RELIABILITY •
      </div>
    </div>
  );
}
