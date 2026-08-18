import Link from "next/link";

const shopee =
  "https://shopee.com.my/mimax_indsup?categoryId=102187&entryPoint=ShopByPDP&itemId=22587403565";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <img src="/mpe-logo.png" alt="MP&E Technology" />
        <p>Reliable industrial power-transmission components, backed by practical product guidance.</p>
      </div>
      <div className="footer-links">
        <div>
          <strong>Explore</strong>
          <Link href="/">Home</Link>
          <Link href="/products">All products</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div>
          <strong>Product range</strong>
          <Link href="/products?category=Gear%20Reducers">Gear reducers</Link>
          <Link href="/products?category=Motors">Motors</Link>
          <Link href="/products?category=Couplings">Couplings</Link>
          <Link href="/products?category=V-Belts">V-belts</Link>
        </div>
        <div>
          <strong>Connect</strong>
          <a href={shopee} target="_blank" rel="noreferrer">Shopee store ↗</a>
          <Link href="/manage">Manage catalog</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} MP&amp;E Technology. Malaysia.</span>
        <span>Industrial components • Product enquiry only</span>
      </div>
    </footer>
  );
}
