"use client";

import { useEffect, useRef } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/#why-us", label: "Why MP&E" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const header = headerRef.current;

    if (!header) {
      return;
    }

    let lastScrollY = Math.max(window.scrollY, 0);
    let accumulatedDistance = 0;
    let lastDirection: "up" | "down" | null = null;
    let frameId: number | null = null;

    const updateHeader = () => {
      const currentScrollY = Math.max(window.scrollY, 0);
      const delta = currentScrollY - lastScrollY;

      const direction =
        delta > 0
          ? "down"
          : delta < 0
            ? "up"
            : lastDirection;

      if (direction && direction !== lastDirection) {
        lastDirection = direction;
        accumulatedDistance = 0;
      }

      accumulatedDistance += Math.abs(delta);

      const mobileMenuOpen =
        header.querySelector<HTMLDetailsElement>(".mobile-nav")?.open ??
        false;

      /*
       * 滑过一点距离后，缩小 Header。
       */
      header.classList.toggle(
        "is-scrolled",
        currentScrollY > 24,
      );

      /*
       * 靠近网页顶部，或者 Mobile menu 打开时，
       * Header 必须保持显示。
       */
      if (currentScrollY <= 120 || mobileMenuOpen) {
        header.classList.remove("is-hidden");
        accumulatedDistance = 0;
      } else if (
        direction === "down" &&
        accumulatedDistance >= 14
      ) {
        /*
         * 向下滑时隐藏。
         */
        header.classList.add("is-hidden");
        accumulatedDistance = 0;
      } else if (
        direction === "up" &&
        accumulatedDistance >= 10
      ) {
        /*
         * 向上滑时重新显示。
         */
        header.classList.remove("is-hidden");
        accumulatedDistance = 0;
      }

      lastScrollY = currentScrollY;
    };

    const handleScroll = () => {
      if (frameId !== null) {
        return;
      }

      frameId = window.requestAnimationFrame(() => {
        updateHeader();
        frameId = null;
      });
    };

    updateHeader();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }

      header.classList.remove(
        "is-scrolled",
        "is-hidden",
      );
    };
  }, []);

  return (
    <header className="site-header" ref={headerRef}>
      <a
        className="brand"
        href="/"
        aria-label="MP&E Technology home"
      >
        <img src="/mpe-logo.png" alt="" />

        <span>
          MP&amp;E
          <small>TECHNOLOGY</small>
        </span>
      </a>

      <nav
        className="desktop-nav"
        aria-label="Main navigation"
      >
        {links.map((link) => (
          <a href={link.href} key={link.href}>
            {link.label}
          </a>
        ))}
      </nav>

      <a className="header-cta" href="/contact" data-magnetic>
        Request a quote <span>↗</span>
      </a>

      <details className="mobile-nav">
        <summary aria-label="Open menu">
          Menu
        </summary>

        <nav aria-label="Mobile navigation">
          {links.map((link) => (
            <a href={link.href} key={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      </details>
    </header>
  );
}
