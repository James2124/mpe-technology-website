import { DeleteProductButton } from "./DeleteProductButton";
import { ProductOrderForm } from "./ProductOrderForm";
import type { Metadata } from "next";
import { requireCatalogAdmin } from "../admin-auth";
import { listEnquiries, listProducts } from "../../db/products";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title:
    "Catalog Manager | MP&E Technology",

  robots: {
    index: false,
    follow: false,
    noarchive: true,
  },
};

export default async function ManagePage() {
  const admin = await requireCatalogAdmin("/manage");
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

  const [products, enquiries] = await Promise.all([listProducts(), listEnquiries()]);
  const categories = Array.from(
    new Set(products.map((product) => product.category).filter(Boolean))
  ).sort();
  return (
    <main className="manage-shell">
      <header className="manage-header">
        <a className="brand" href="/"><img src="/mpe-logo.png" alt="" /><span>MP&amp;E <small>CATALOG MANAGER</small></span></a>
        <div>
          <span>{admin.displayName}</span>
          {admin.signOutPath ? <a href={admin.signOutPath}>Sign out</a> : <small>Password protected</small>}
        </div>
      </header>
      <section className="manage-intro">
        <div><p>CATALOG / ADMIN</p><h1>Manage products.</h1></div>
        <a className="text-link" href="/products" target="_blank" rel="noreferrer">View live catalog ↗</a>
      </section>

      <section className="manage-grid">
        <div className="manage-card add-product">
          <div className="manage-card-title"><span>01</span><div><h2>Add a product</h2><p>New items appear automatically in the catalog and get their own detail page.</p></div></div>
          <form action="/api/products" method="post" encType="multipart/form-data">
            <div className="form-row">
              <label><span>Product name *</span><input name="name" required /></label>
              <label>
                <span>Category *</span>
              
                <input
                  name="category"
                  required
                  list="product-categories"
                  placeholder="Select or type a new category"
                  autoComplete="off"
                />
              
                <datalist id="product-categories">
                  {categories.map((category) => (
                    <option key={category} value={category} />
                  ))}
                </datalist>
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
            <label>
              <span>Display Order</span>
              <input
                type="number"
                name="sortOrder"
                min="1"
                step="1"
                placeholder="1 = first, 2 = second"
              />
            </label>
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
                <p>
                  <small>{product.category}</small>
                  <strong>{product.name}</strong>
                </p>
                <ProductOrderForm
                  productId={product.id}
                  currentOrder={product.sortOrder}
                />
                <a href={`/products/${product.slug}`} target="_blank" rel="noreferrer" aria-label={`View ${product.name}`}>↗</a>
                <a
                  href={`/manage/edit/${product.id}`}
                  aria-label={`Edit ${product.name}`}
                >
                  Edit
                </a>
                <DeleteProductButton
                  productId={product.id}
                  productName={product.name}
                />
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
