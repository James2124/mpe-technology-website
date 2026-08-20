"use client";

export function DeleteProductButton({
  productId,
  productName,
}: {
  productId: number;
  productName: string;
}) {
  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    const confirmed = window.confirm(
      `Delete "${productName}"?\n\nThis action cannot be undone.`
    );

    if (!confirmed) {
      event.preventDefault();
    }
  }

  return (
    <form
      action={`/api/products/${productId}`}
      method="post"
      onSubmit={handleSubmit}
    >
      <button
        type="submit"
        aria-label={`Delete ${productName}`}
      >
        Delete
      </button>
    </form>
  );
}
