import { notFound } from "next/navigation";
import { requireCatalogAdmin } from "../../../admin-auth";
import { listProducts } from "../../../../db/products";

export const dynamic = "force-dynamic";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
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

  const { id } = await params;

  const products = await listProducts();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    notFound();
  }

  const categories = Array.from(
    new Set(
      products
        .map((item) => item.category)
        .filter(Boolean)
    )
  ).sort();

  const features = product.features.join("\n");

  const specs = Object.entries(product.specs)
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");

  return (
    <main className="manage-shell">
      <header className="manage-header">
        <a className="brand" href="/manage">
          <img src="/mpe-logo.png" alt="" />

          <span>
            MP&amp;E
            <small>CATALOG MANAGER</small>
          </span>
        </a>

        <div>
          <a href="/manage">← Back to manager</a>
        </div>
      </header>

      <section className="manage-intro">
        <div>
          <p>CATALOG / EDIT</p>
          <h1>Edit product.</h1>
        </div>

        <a
          className="text-link"
          href={`/products/${product.slug}`}
          target="_blank"
          rel="noreferrer"
        >
          View live product ↗
        </a>
      </section>

      <section className="manage-card add-product">
        <div className="manage-card-title">
          <span>EDIT</span>

          <div>
            <h2>{product.name}</h2>
            <p>
              Update the product information below.
            </p>
          </div>
        </div>

        <form
          action={`/api/products/${product.id}/update`}
          method="post"
          encType="multipart/form-data"
        >
          <div className="form-row">
            <label>
              <span>Product name *</span>

              <input
                name="name"
                required
                defaultValue={product.name}
              />
            </label>

            <label>
              <span>Category *</span>

              <input
                name="category"
                required
                list="product-categories"
                defaultValue={product.category}
                autoComplete="off"
              />

              <datalist id="product-categories">
                {categories.map((category) => (
                  <option
                    key={category}
                    value={category}
                  />
                ))}
              </datalist>
            </label>
          </div>

          <label>
            <span>Short subtitle *</span>

            <input
              name="subtitle"
              required
              defaultValue={product.subtitle}
            />
          </label>

          <label>
            <span>Description *</span>

            <textarea
              name="description"
              required
              rows={5}
              defaultValue={product.description}
            />
          </label>

          <label>
            <span>Features</span>

            <textarea
              name="features"
              rows={5}
              defaultValue={features}
              placeholder="One feature per line"
            />
          </label>

          <label>
            <span>Specifications</span>

            <textarea
              name="specs"
              rows={6}
              defaultValue={specs}
              placeholder={
                "Series: WPX\nSize: 50\nMounting: Foot mounted"
              }
            />
          </label>

          <div className="form-row">
            <label>
              <span>Replace product image</span>

              {product.imagePath ? (
                <img
                  src={product.imagePath}
                  alt={product.name}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "contain",
                    marginBottom: "10px",
                    display: "block",
                  }}
                />
              ) : null}

              <input
                type="file"
                name="image"
                accept="image/png,image/jpeg,image/webp"
              />
            </label>

            <label>
              <span>External / Shopee URL</span>

              <input
                type="url"
                name="externalUrl"
                defaultValue={
                  product.externalUrl ?? ""
                }
              />
            </label>
          </div>

          <div>
            <span>Add additional product images</span>
          
            {product.galleryImages?.length ? (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "12px",
                  margin: "10px 0 16px",
                }}
              >
                {product.galleryImages.map((image, index) => (
                  <label
                    key={image}
                    style={{
                      width: "100px",
                      display: "grid",
                      gap: "6px",
                    }}
                  >
                    <img
                      src={image}
                      alt={`${product.name} gallery ${index + 1}`}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "contain",
                        background: "#eceae2",
                      }}
                    />
          
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        fontSize: "10px",
                      }}
                    >
                      <input
                        type="checkbox"
                        name="removeGalleryImages"
                        value={image}
                      />
          
                      Delete
                    </span>
                  </label>
                ))}
              </div>
            ) : null}
          
            <label>
              <span>Upload more images</span>
          
              <input
                type="file"
                name="galleryImages"
                accept="image/png,image/jpeg,image/webp"
                multiple
              />
            </label>
          
            <small>
              Maximum 8 gallery images total.
            </small>
          </div>
          
          <label>
            <span>Video URLs</span>
          
            <textarea
              name="videoUrls"
              rows={4}
              defaultValue={(product.videoUrls ?? []).join("\n")}
              placeholder={
                "https://www.youtube.com/watch?v=...\nhttps://youtu.be/..."
              }
            />
          
            <small>
              One YouTube or Vimeo link per line. Maximum 3 videos.
            </small>
          </label>

          
          <label>
            <span>Display Order</span>
          
            <input
              type="number"
              name="sortOrder"
              min="1"
              step="1"
              defaultValue={product.sortOrder ?? ""}
              placeholder="1 = first, 2 = second"
            />
          </label>

          <label className="check-label">
            <input
              type="checkbox"
              name="featured"
              value="1"
              defaultChecked={product.featured}
            />

            <span>
              Feature this product on the homepage
            </span>
          </label>

          <button
            className="primary-btn form-submit"
            type="submit"
          >
            Save changes <span>→</span>
          </button>
        </form>
      </section>
    </main>
  );
}
