import { chatGPTSignOutPath, requireChatGPTUser } from "../chatgpt-auth";
import { claimOrCheckAdmin, listEnquiries, listProducts } from "../../db/products";

export const dynamic = "force-dynamic";

export default async function ManagePage() {
  const user = await requireChatGPTUser("/manage");
  const allowed = await claimOrCheckAdmin(user);
  if (!allowed) {
    return (
      <main className="manage-denied">
        <img src="/mpe-logo.png" alt="MP&E Technology" />
        <h1>Catalog access is restricted.</h1>
        <p>This signed-in account is not the catalog owner.</p>
        <a className="text-link" href="/">Return to website ↗</a>
      </main>
    );
  }

  const [products, enquiries] = await Promise.all([listProducts(), listEnquiries()]);
  return (
    <main className="manage-shell">
      <header className="manage-header">
        <a className="brand" href="/"><img src="/mpe-logo.png" alt="" /><span>MP&amp;E <small>CATALOG MANAGER</small></span></a>
        <div><span>{user.displayName}</span><a href={chatGPTSignOutPath("/")}>Sign out</a></div>
      </header>
      <section className="manage-intro">
        <div><p>CATALOG / ADMIN</p><h1>Manage products.</h1></div>
        <a className="text-link" href="/products" target="_blank">View live catalog ↗</a>
      </section>

      <section className="manage-grid">
        <div className="manage-card add-product">
          <div className="manage-card-title"><span>01</span><div><h2>Add a product</h2><p>New items appear automatically in the catalog and get their own detail page.</p></div></div>
          <form action="/api/products" method="post" encType="multipart/form-data">
            <div className="form-row">
              <label><span>Product name *</span><input name="name" required /></label>
              <label><span>Category *</span>
                <select name="category" required defaultValue="Gear Reducers">
                  <option>Gear Reducers</option><option>Motors</option><option>Couplings</option>
                  <option>Pulleys</option><option>V-Belts</option><option>Other</option>
                </select>
              </label>
            </div>
            <label><span>Short subtitle *</span><input name="subtitle" required placeholder="One-line product summary" /></label>
            <label><span>Description *</span><textarea name="description" required rows={4} /></label>
            <label><span>Features</span><textarea name="features" rows={3} placeholder="One feature per line" /></label>
            <label><span>Specifications</span><textarea name="specs" rows={4} placeholder={"Series: WPX\nSize: 50\nMounting: Foot mounted"} /></label>
            <div className="form-row">
              <label><span>Product image</span><input type="file" name="image" accept="image/png,image/jpeg,image/webp" /></label>
              <label><span>External / Shopee URL</span><input type="url" name="externalUrl" /></label>
            </div>
            <label className="check-label"><input type="checkbox" name="featured" value="1" /><span>Feature this product on the homepage</span></label>
            <button className="primary-btn form-submit" type="submit">Add product <span>→</span></button>
          </form>
        </div>

        <div className="manage-card current-products">
          <div className="manage-card-title"><span>02</span><div><h2>Current products</h2><p>{products.length} products in the catalog.</p></div></div>
          <div className="manage-product-list">
            {products.map((product) => (
              <div key={product.id}>
                {product.imagePath ? <img src={product.imagePath} alt="" /> : <span className="mini-placeholder">MP&amp;E</span>}
                <p><small>{product.category}</small><strong>{product.name}</strong></p>
                <a href={`/products/${product.slug}`} target="_blank" aria-label={`View ${product.name}`}>↗</a>
                <form action={`/api/products/${product.id}`} method="post">
                  <button type="submit" aria-label={`Delete ${product.name}`}>Delete</button>
                </form>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="manage-card enquiry-card">
        <div className="manage-card-title"><span>03</span><div><h2>Recent enquiries</h2><p>Latest website contact requests.</p></div></div>
        {enquiries.length ? (
          <div className="enquiry-table">
            {enquiries.map((enquiry) => (
              <article key={enquiry.id}>
                <div><small>{new Date(enquiry.createdAt).toLocaleDateString("en-MY")}</small><strong>{enquiry.name}</strong><span>{enquiry.company || "—"}</span></div>
                <div><small>CONTACT</small><a href={`mailto:${enquiry.email}`}>{enquiry.email}</a><span>{enquiry.phone || "—"}</span></div>
                <div><small>INTEREST</small><strong>{enquiry.productInterest || "General enquiry"}</strong><p>{enquiry.message}</p></div>
              </article>
            ))}
          </div>
        ) : <p className="manage-empty">No enquiries yet.</p>}
      </section>
    </main>
  );
}
