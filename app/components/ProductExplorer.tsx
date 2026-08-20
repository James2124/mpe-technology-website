"use client";
 
import { useMemo, useState } from "react";
import type { Product } from "../lib/types";

export function ProductExplorer({
  products,
  initialCategory = "All",
}: {
  products: Product[];
  initialCategory?: string;
}) {
  const categories = ["All", ...Array.from(new Set(products.map((product) => product.category)))];
  const [category, setCategory] = useState(categories.includes(initialCategory) ? initialCategory : "All");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory = category === "All" || product.category === category;
      const matchesQuery =
        !keyword ||
        [product.name, product.category, product.subtitle, product.description]
          .join(" ")
          .toLowerCase()
          .includes(keyword);
      return matchesCategory && matchesQuery;
    });
  }, [category, products, query]);

  return (
    <>
      <div className="catalog-tools">
        <div className="filter-tabs" role="group" aria-label="Filter by category">
          {categories.map((item) => (
            <button
              className={category === item ? "active" : ""}
              key={item}
              onClick={() => setCategory(item)}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>
        <label className="catalog-search">
          <span>Search</span>
          <input
            type="search"
            placeholder="Search products..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
      </div>
      <p className="result-count">{String(visible.length).padStart(2, "0")} products</p>
      {visible.length ? (
        <div className="product-grid" data-reveal="stagger" data-reveal-delay="1">
          {visible.map((product, index) => (
            <article className="product-card" key={product.id}>
              <a className="product-image" href={`/products/${product.slug}`}>
                <span className="product-number">/{String(index + 1).padStart(2, "0")}</span>
                {product.imagePath ? <img src={product.imagePath} alt={product.name} loading="lazy" decoding="async" /> : <span className="image-placeholder">MP&amp;E</span>}
                <span className="view-product">View product ↗</span>
              </a>
              <div className="product-card-copy">
                <span>{product.category}</span>
                <h2><a href={`/products/${product.slug}`}>{product.name}</a></h2>
                <p>{product.subtitle}</p>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <strong>No matching products.</strong>
          <p>Try another category or a shorter search term.</p>
        </div>
      )}
    </>
  );
}
