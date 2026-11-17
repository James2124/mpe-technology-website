import type { Metadata } from "next";
import { requireCatalogAdmin } from "../../admin-auth";
import { getHomeShowcase } from "../../../db/products";
import { homeShowcaseLinkSuggestions } from "../../../db/home-showcase-defaults";
import { CardListEditor } from "./CardListEditor";
import { getHeroProducts } from "../../../db/hero-products";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Homepage Highlights | MP&E Technology",
  robots: { index: false, follow: false, noarchive: true },
};

const SAVED_MESSAGES: Record<string, string> = {
  feature: "Feature block saved.",
  added: "Card added.",
  card: "Card saved.",
  order: "Order updated.",
  deleted: "Card deleted.",
  "hero-added": "Product added around the logo.",
  "hero-card": "Product saved.",
  "hero-order": "Order updated.",
  "hero-deleted": "Product removed from around the logo.",
};

export default async function ManageHomepagePage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const admin = await requireCatalogAdmin("/manage/homepage");
  if (!admin) {
    return (
      <main className="manage-denied">
        <img src="/mpe-logo.png" alt="MP&E Technology" />
        <h1>Catalog access is restricted.</h1>
        <p>Please reload this page and enter the catalog administrator password.</p>
        <a className="text-link" href="/">Return to website ↗</a>
      </main>
    );
  }

  const [showcase, heroProducts, params] = await Promise.all([getHomeShowcase(), getHeroProducts(), searchParams]);
  const saved = params.saved ? SAVED_MESSAGES[params.saved] : null;
  const { feature, cards } = showcase;

  return (
    <main className="manage-shell">
      <header className="manage-header">
        <a className="brand" href="/manage"><img src="/mpe-logo.png" alt="" /><span>MP&amp;E <small>CATALOG MANAGER</small></span></a>
        <div>
          <span>{admin.displayName}</span>
          <a href="/manage">← Products</a>
        </div>
      </header>

      <section className="manage-intro">
        <div><p>HOMEPAGE / ADMIN</p><h1>Homepage highlights.</h1></div>
        <a className="text-link" href="/#product-specialist" target="_blank" rel="noreferrer">View on homepage ↗</a>
      </section>

      {saved && <p className="showcase-saved" role="status">✓ {saved}</p>}

      <datalist id="showcase-links">
        {homeShowcaseLinkSuggestions.map((link) => <option key={link} value={link} />)}
      </datalist>

      <section className="showcase-manage">
        <div className="manage-card">
          <div className="manage-card-title"><span>01</span><div><h2>Products around the logo</h2><p>{heroProducts.length} products on the ring around the MP&amp;E logo in the homepage hero, clockwise from the top. Transparent PNG or WebP pictures look best.</p></div></div>
          <CardListEditor list="hero" cards={heroProducts} itemNoun="a product" addPlaceholder="e.g. Gear Motor" />
        </div>

        <div className="manage-card">
          <div className="manage-card-title"><span>02</span><div><h2>Feature block</h2><p>The large block with a picture, title, text and button.</p></div></div>
          <form className="showcase-feature-form" action="/api/home-showcase" method="post" encType="multipart/form-data">
            <input type="hidden" name="action" value="feature" />
            <div className="showcase-feature-preview">
              <img src={feature.imagePath} alt="" />
              <label>
                <span>Replace picture</span>
                <input type="file" name="image" accept="image/png,image/jpeg,image/webp" />
                <small>PNG, JPEG or WebP, up to 8 MB. A transparent PNG looks best.</small>
              </label>
            </div>
            <div className="showcase-feature-fields">
              <label><span>Title *</span><input name="title" required maxLength={120} defaultValue={feature.title} /></label>
              <label><span>Text</span><textarea name="text" rows={4} maxLength={600} defaultValue={feature.text} /></label>
              <div className="form-row">
                <label><span>Button text</span><input name="buttonLabel" maxLength={40} defaultValue={feature.buttonLabel} /></label>
                <label><span>Button link *</span><input name="href" required list="showcase-links" defaultValue={feature.href} /></label>
              </div>
              <button className="primary-btn form-submit" type="submit">Save feature block <span>→</span></button>
            </div>
          </form>
        </div>

        <div className="manage-card">
          <div className="manage-card-title"><span>03</span><div><h2>Product cards</h2><p>{cards.length} cards under the feature block, shown in this order.</p></div></div>

          <CardListEditor list="cards" cards={cards} itemNoun="a card" addPlaceholder="e.g. Gear Motor" />
        </div>
      </section>
    </main>
  );
}
