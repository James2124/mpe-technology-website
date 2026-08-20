import {
  getCatalogAdmin,
  unauthorizedAdminResponse,
} from "../../../../admin-auth";

import {
  listProducts,
  removeProductImage,
  saveProductImage,
  updateProduct,
} from "../../../../../db/products";

function field(form: FormData, key: string) {
  return String(form.get(key) ?? "").trim();
}

function lines(value: string) {
  return value
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 12);
}

function specs(value: string) {
  return Object.fromEntries(
    lines(value)
      .map((line) => {
        const separator = line.indexOf(":");

        return separator > 0
          ? [
              line.slice(0, separator).trim(),
              line.slice(separator + 1).trim(),
            ]
          : null;
      })
      .filter(
        (item): item is [string, string] =>
          Boolean(item?.[0] && item?.[1])
      )
  );
}

export async function POST(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  if (!(await getCatalogAdmin())) {
    return unauthorizedAdminResponse();
  }

  const { id } = await params;

  const productId = Number(id);

  if (!Number.isFinite(productId)) {
    return new Response(
      "Invalid product ID.",
      { status: 400 }
    );
  }

  const products = await listProducts();

  const current = products.find(
    (product) => product.id === productId
  );

  if (!current) {
    return new Response(
      "Product not found.",
      { status: 404 }
    );
  }

  const form = await request.formData();

  const name = field(form, "name");
  const category = field(form, "category");
  const subtitle = field(form, "subtitle");
  const description = field(form, "description");

  if (
    !name ||
    !category ||
    !subtitle ||
    !description
  ) {
    return new Response(
      "Missing required fields.",
      { status: 400 }
    );
  }

  let imagePath = current.imagePath;

const image = form.get("image");

if (
  image instanceof File &&
  image.size > 0
) {
  if (
    ![
      "image/png",
      "image/jpeg",
      "image/webp",
    ].includes(image.type) ||
    image.size > 8_000_000
  ) {
    return new Response(
      "Image must be PNG, JPEG or WebP and under 8 MB.",
      { status: 400 }
    );
  }

  const key =
    await saveProductImage(image);

  imagePath =
    `/api/product-images/${key}`;

  if (
    current.imagePath?.startsWith(
      "/api/product-images/"
    )
  ) {
    await removeProductImage(
      current.imagePath.slice(
        "/api/product-images/".length
      )
    );
  }
}

/* Gallery images */

const removeGalleryImages =
  form
    .getAll("removeGalleryImages")
    .map((value) => String(value));

const currentGallery =
  current.galleryImages ?? [];

const validRemoveImages =
  removeGalleryImages.filter((image) =>
    currentGallery.includes(image)
  );

for (const image of validRemoveImages) {
  if (
    image.startsWith(
      "/api/product-images/"
    )
  ) {
    await removeProductImage(
      image.slice(
        "/api/product-images/".length
      )
    );
  }
}

let galleryImages =
  currentGallery.filter(
    (image) =>
      !validRemoveImages.includes(image)
  );

const newGalleryFiles =
  form.getAll("galleryImages");

for (const file of newGalleryFiles) {
  if (
    !(file instanceof File) ||
    file.size === 0
  ) {
    continue;
  }

  if (galleryImages.length >= 8) {
    break;
  }

  if (
    ![
      "image/png",
      "image/jpeg",
      "image/webp",
    ].includes(file.type) ||
    file.size > 8_000_000
  ) {
    return new Response(
      "Gallery images must be PNG, JPEG or WebP and under 8 MB each.",
      { status: 400 }
    );
  }

  const key =
    await saveProductImage(file);

  galleryImages.push(
    `/api/product-images/${key}`
  );
}

/* Videos */

const videoUrls = lines(
  field(form, "videoUrls")
)
  .filter((url) => {
    try {
      const parsed = new URL(url);

      return [
        "youtube.com",
        "www.youtube.com",
        "youtu.be",
        "vimeo.com",
        "www.vimeo.com",
      ].includes(parsed.hostname);
    } catch {
      return false;
    }
  })
  .slice(0, 3);
  

  const updated = await updateProduct(
    productId,
    {
      name: name.slice(0, 180),
      category: category.slice(0, 80),
      subtitle: subtitle.slice(0, 220),

      description:
        description.slice(0, 4000),

      features: lines(
        field(form, "features")
      ),

      specs: specs(
        field(form, "specs")
      ),

      imagePath,

      galleryImages,
      videoUrls,
      
      externalUrl:
        field(form, "externalUrl")
          .slice(0, 1000) || null,

      featured:
        form.get("featured") === "1",
      
      sortOrder:
        Number(field(form, "sortOrder")) > 0
          ? Number(field(form, "sortOrder"))
          : undefined,
    }
  );

  if (!updated) {
    return new Response(
      "Unable to update product.",
      { status: 404 }
    );
  }

  return Response.redirect(
    new URL(
      `/products/${updated.slug}`,
      request.url
    ),
    303
  );
}
