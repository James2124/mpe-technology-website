"use client";

import { useState } from "react";
import type { ProductCatalog } from "../lib/types";

export function CatalogUploadFields({
  existingCatalogs = [],
}: {
  existingCatalogs?: ProductCatalog[];
}) {
  const [rows, setRows] = useState<string[]>([crypto.randomUUID()]);

  return (
    <div className="catalog-upload-fields">
      {existingCatalogs.length > 0 && (
        <div className="catalog-existing-list">
          {existingCatalogs.map((catalog, index) => (
            <label key={catalog.pdfPath} className="catalog-existing-item">
              <img src={catalog.coverImagePath} alt={`Catalog ${index + 1} cover`} />
              <span>
                <input type="checkbox" name="removeCatalogs" value={catalog.pdfPath} />
                Delete
              </span>
            </label>
          ))}
        </div>
      )}

      {rows.map((rowKey, index) => (
        <div className="catalog-upload-row" key={rowKey}>
          <label>
            <span>Catalog PDF {existingCatalogs.length + index + 1}</span>
            <input type="file" name={`catalogPdf-${rowKey}`} accept="application/pdf" />
          </label>

          <label>
            <span>Cover image</span>
            <input type="file" name={`catalogCoverImage-${rowKey}`} accept="image/png,image/jpeg,image/webp" />
          </label>

          {rows.length > 1 && (
            <button
              type="button"
              onClick={() => setRows((current) => current.filter((key) => key !== rowKey))}
            >
              Remove
            </button>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={() => setRows((current) => [...current, crypto.randomUUID()])}
      >
        + Add another catalog
      </button>
    </div>
  );
}
