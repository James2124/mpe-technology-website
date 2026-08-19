const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/#why-us", label: "Why MP&E" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="MP&E Technology home">
        <img src="/mpe-logo.png" alt="" />
        <span>MP&amp;E <small>TECHNOLOGY</small></span>
      </a>
      <nav className="desktop-nav" aria-label="Main navigation">
        {links.map((link) => <a href={link.href} key={link.href}>{link.label}</a>)}
      </nav>
      <a className="header-cta" href="/contact">Request a quote <span>↗</span></a>
      <details className="mobile-nav">
        <summary aria-label="Open menu">Menu</summary>
        <nav aria-label="Mobile navigation">
          {links.map((link) => <a href={link.href} key={link.href}>{link.label}</a>)}
        </nav>
      </details>
    </header>
  );
}
