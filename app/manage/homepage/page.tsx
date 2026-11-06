import type { Metadata } from "next";
import { requireCatalogAdmin } from "../../admin-auth";
import { getHomeShowcase } from "../../../db/products";
import { homeShowcaseLinkSuggestions } from "../../../db/home-showcase-defaults";
import { ConfirmButton } from "./ConfirmButton";

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

  const [showcase, params] = await Promise.all([getHomeShowcase(), searchParams]);
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
          <div className="manage-card-title"><span>01</span><div><h2>Feature block</h2><p>The large block with a picture, title, text and button.</p></div></div>
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
          <div className="manage-card-title"><span>02</span><div><h2>Product cards</h2><p>{cards.length} cards under the feature block, shown in this order.</p></div></div>

          <div className="showcase-card-list">
            {cards.map((card, index) => (
              <div className="showcase-card-row" key={card.id}>
                <span className="showcase-card-number">{String(index + 1).padStart(2, "0")}</span>
                <img src={card.imagePath} alt="" />
                <form className="showcase-card-form" action="/api/home-showcase" method="post" encType="multipart/form-data">
                  <input type="hidden" name="id" value={card.id} />
                  <label><span>Name</span><input name="title" required maxLength={80} defaultValue={card.title} /></label>
                  <label><span>Link</span><input name="href" required list="showcase-links" defaultValue={card.href} /></label>
                  <label><span>New picture</span><input type="file" name="image" accept="image/png,image/jpeg,image/webp" /></label>
                  <div className="showcase-card-actions">
                    <button type="submit" name="action" value="update-card" className="showcase-save">Save</button>
                    <button type="submit" name="action" value="move-up" disabled={index === 0} aria-label={`Move ${card.title} up`} formNoValidate>↑</button>
                    <button type="submit" name="action" value="move-down" disabled={index === cards.length - 1} aria-label={`Move ${card.title} down`} formNoValidate>↓</button>
                    <ConfirmButton name="action" value="delete-card" className="showcase-delete" message={`Remove the "${card.title}" card from the homepage?`}>Delete</ConfirmButton>
                  </div>
                </form>
              </div>
            ))}
          </div>

          <form className="showcase-add-form" action="/api/home-showcase" method="post" encType="multipart/form-data">
            <input type="hidden" name="action" value="add-card" />
            <h3>Add a card</h3>
            <div className="form-row">
              <label><span>Name *</span><input name="title" required maxLength={80} placeholder="e.g. Gear Motor" /></label>
              <label><span>Link *</span><input name="href" required list="showcase-links" placeholder="/products?category=Pumps" /></label>
            </div>
            <div className="form-row">
              <label><span>Picture *</span><input type="file" name="image" required accept="image/png,image/jpeg,image/webp" /></label>
              <label><span>Position</span><input type="number" name="position" min="1" step="1" placeholder={`Last (${cards.length + 1})`} /></label>
            </div>
            <button className="primary-btn form-submit" type="submit">Add card <span>→</span></button>
          </form>
        </div>
      </section>
    </main>
  );
}
