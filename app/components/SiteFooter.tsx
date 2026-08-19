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
          <a href="/">Home</a>
          <a href="/products">All products</a>
          <a href="/contact">Contact</a>
        </div>
        <div>
          <strong>Product range</strong>
          <a href="/products?category=Gear%20Reducers">Gear reducers</a>
          <a href="/products?category=Motors">Motors</a>
          <a href="/products?category=Couplings">Couplings</a>
          <a href="/products?category=V-Belts">V-belts</a>
        </div>
        <div>
          <strong>Connect</strong>
          <a href={shopee} target="_blank" rel="noreferrer">Shopee store ↗</a>
          <a href="/manage">Manage catalog</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} MP&amp;E Technology. Malaysia.</span>
        <span>Industrial components • Product enquiry only</span>
      </div>
    </footer>
  );
}
