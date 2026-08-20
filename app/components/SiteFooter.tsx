const shopee =
  "https://shopee.com.my/mimax_indsup?categoryId=102187&entryPoint=ShopByPDP&itemId=22587403565";

const whatsapp =
  "https://wa.me/60162012201?text=Hi%20MP%26E%20Technology%2C%20I%20would%20like%20to%20enquire%20about%20your%20products.";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <img src="/mpe-logo.png" alt="MP&E Technology" />

        <p>
          Reliable industrial power-transmission components,
          backed by practical product guidance.
        </p>
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

          <a href="/products?category=Gear%20Reducers">
            Gear reducers
          </a>

          <a href="/products?category=Motors">
            Motors
          </a>

          <a href="/products?category=Couplings">
            Couplings
          </a>

          <a href="/products?category=V-Belts">
            V-belts
          </a>
        </div>

        <div>
          <strong>Connect</strong>

          <a
            href={whatsapp}
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp: 016-201 2201 ↗
          </a>

          <a href="tel:+60162012201">
            Tel: 016-201 2201
          </a>

          <a href="mailto:mptech.works@gmail.com">
            mptech.works@gmail.com
          </a>

          <a
            href={shopee}
            target="_blank"
            rel="noreferrer"
          >
            Shopee store ↗
          </a>

          <a href="/manage">
            Manage catalog
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} MP&amp;E Technology. Malaysia.
        </span>

        <span>
          Industrial components • Product enquiry only
        </span>
      </div>
    </footer>
  );
}
