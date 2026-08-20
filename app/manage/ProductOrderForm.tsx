"use client";

import { useState } from "react";

export function ProductOrderForm({
  productId,
  currentOrder,
}: {
  productId: number;
  currentOrder?: number;
}) {
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setSaving(true);
    setSaved(false);

    const form = new FormData(event.currentTarget);

    const response = await fetch(
      `/api/products/${productId}/order`,
      {
        method: "POST",
        body: form,
      }
    );

    setSaving(false);

    if (response.ok) {
      setSaved(true);

      setTimeout(() => {
        window.location.reload();
      }, 500);
    } else {
      alert("Unable to save display order.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="product-order-form"
    >
      <input
        type="number"
        name="sortOrder"
        min="1"
        step="1"
        defaultValue={currentOrder ?? ""}
        placeholder="—"
        aria-label="Display order"
      />

      <button type="submit">
        {saving
          ? "Saving..."
          : saved
            ? "Saved"
            : "Save"}
      </button>
    </form>
  );
}
