"use client";

import { useMemo, useState } from "react";

type MediaItem =
  | {
      type: "image";
      url: string;
    }
  | {
      type: "video";
      url: string;
      embedUrl: string;
    };

function getVideoEmbedUrl(url: string) {
  try {
    const parsed = new URL(url);

    if (
      parsed.hostname === "youtu.be"
    ) {
      const id = parsed.pathname
        .replace("/", "")
        .trim();

      return id
        ? `https://www.youtube.com/embed/${id}`
        : null;
    }

    if (
      parsed.hostname === "youtube.com" ||
      parsed.hostname === "www.youtube.com"
    ) {
      if (
        parsed.pathname.startsWith(
          "/shorts/"
        )
      ) {
        const id =
          parsed.pathname.split("/")[2];

        return id
          ? `https://www.youtube.com/embed/${id}`
          : null;
      }

      const id =
        parsed.searchParams.get("v");

      return id
        ? `https://www.youtube.com/embed/${id}`
        : null;
    }

    if (
      parsed.hostname === "vimeo.com" ||
      parsed.hostname === "www.vimeo.com"
    ) {
      const id = parsed.pathname
        .split("/")
        .filter(Boolean)[0];

      return id
        ? `https://player.vimeo.com/video/${id}`
        : null;
    }

    return null;
  } catch {
    return null;
  }
}

export function ProductMediaGallery({
  productName,
  mainImage,
  galleryImages = [],
  videoUrls = [],
}: {
  productName: string;
  mainImage: string | null;
  galleryImages?: string[];
  videoUrls?: string[];
}) {
  const media = useMemo<MediaItem[]>(() => {
    const items: MediaItem[] = [];

    if (mainImage) {
      items.push({
        type: "image",
        url: mainImage,
      });
    }

    galleryImages.forEach((url) => {
      if (
        url &&
        url !== mainImage
      ) {
        items.push({
          type: "image",
          url,
        });
      }
    });

    videoUrls.forEach((url) => {
      const embedUrl =
        getVideoEmbedUrl(url);

      if (embedUrl) {
        items.push({
          type: "video",
          url,
          embedUrl,
        });
      }
    });

    return items;
  }, [
    mainImage,
    galleryImages,
    videoUrls,
  ]);

  const [activeIndex, setActiveIndex] =
    useState(0);

  const active =
    media[activeIndex];

  if (!media.length) {
    return (
      <span className="image-placeholder">
        MP&amp;E
      </span>
    );
  }

  return (
    <div className="product-media-gallery">
      <div className="product-media-main">
        {active.type === "image" ? (
          <img
            src={active.url}
            alt={productName}
            fetchPriority="high"
            decoding="async"
          />
        ) : (
          <iframe
            src={active.embedUrl}
            title={`${productName} video`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>

      {media.length > 1 && (
        <div className="product-media-thumbnails">
          {media.map((item, index) => (
            <button
              key={`${item.url}-${index}`}
              type="button"
              className={
                index === activeIndex
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveIndex(index)
              }
              aria-label={
                item.type === "video"
                  ? `View video ${index + 1}`
                  : `View image ${index + 1}`
              }
            >
              {item.type === "image" ? (
                <img
                  src={item.url}
                  alt=""
                  loading="lazy"
                />
              ) : (
                <span className="media-video-thumb">
                  ▶
                  <small>VIDEO</small>
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
