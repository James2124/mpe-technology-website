import type { Metadata } from "next";
import { requireCatalogAdmin } from "../../admin-auth";
import { findPhotoPage, getPagePhotoGroups, photoPages } from "../../../db/page-photos";
import { ConfirmButton } from "../homepage/ConfirmButton";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Page Photos | MP&E Technology",
  robots: { index: false, follow: false, noarchive: true },
};

const SAVED_MESSAGES: Record<string, string> = {
  added: "Photos added.",
  deleted: "Photo deleted.",
  order: "Order updated.",
};

export default async function ManagePhotosPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; saved?: string }>;
}) {
  const admin = await requireCatalogAdmin("/manage/photos");
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

  const params = await searchParams;
  const selected = findPhotoPage(params.page ?? "") ?? photoPages[0];
  const [groups, counts] = await Promise.all([
    getPagePhotoGroups(selected.path),
    Promise.all(photoPages.map(async (page) => (await getPagePhotoGroups(page.path)).reduce((sum, group) => sum + group.photos.length, 0))),
  ]);
  const saved = params.saved ? SAVED_MESSAGES[params.saved] : null;

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
        <div><p>PAGES / PHOTOS</p><h1>Page photos.</h1></div>
        <a className="text-link" href={selected.path} target="_blank" rel="noreferrer">View {selected.title} page ↗</a>
      </section>

      {saved && <p className="showcase-saved" role="status">✓ {saved}</p>}

      <section className="photos-manage">
        <nav className="manage-card photos-page-list" aria-label="Pages with photos">
          {photoPages.map((page, index) => (
            <a key={page.path} href={`/manage/photos?page=${encodeURIComponent(page.path)}`} className={page.path === selected.path ? "active" : ""}>
              <span>{page.title}</span>
              <small>{counts[index]}</small>
            </a>
          ))}
        </nav>

        <div className="photos-groups">
          {groups.map((group, groupIndex) => (
            <div className="manage-card" key={groupIndex}>
              <div className="manage-card-title">
                <span>{String(groupIndex + 1).padStart(2, "0")}</span>
                <div>
                  <h2>{group.title ? `${selected.title} · ${group.title}` : selected.title}</h2>
                  <p>{group.photos.length} photos, shown in this order at the bottom of the page.</p>
                </div>
              </div>

              <form className="photos-upload" action="/api/page-photos" method="post" encType="multipart/form-data">
                <input type="hidden" name="action" value="add" />
                <input type="hidden" name="page" value={selected.path} />
                <input type="hidden" name="group" value={groupIndex} />
                <label>
                  <span>Upload photos</span>
                  <input type="file" name="photos" required multiple accept="image/png,image/jpeg,image/webp" />
                  <small>Select several at once (up to 20). PNG, JPEG or WebP, up to 8 MB each.</small>
                </label>
                <label>
                  <span>Add to</span>
                  <select name="where" defaultValue="end">
                    <option value="end">End of the list</option>
                    <option value="start">Start of the list</option>
                  </select>
                </label>
                <button className="primary-btn form-submit" type="submit">Upload <span>→</span></button>
              </form>

              {group.photos.length > 0 ? (
                <div className="photos-grid">
                  {group.photos.map((photo, index) => (
                    <form key={photo} action="/api/page-photos" method="post" className="photos-item">
                      <input type="hidden" name="page" value={selected.path} />
                      <input type="hidden" name="group" value={groupIndex} />
                      <input type="hidden" name="photo" value={photo} />
                      <a href={photo} target="_blank" rel="noreferrer"><img src={photo} alt={`${group.title ?? selected.title} ${index + 1}`} loading="lazy" /></a>
                      <div>
                        <button type="submit" name="action" value="move-earlier" disabled={index === 0} aria-label="Move earlier">←</button>
                        <button type="submit" name="action" value="move-later" disabled={index === group.photos.length - 1} aria-label="Move later">→</button>
                        <ConfirmButton name="action" value="delete" className="showcase-delete" message="Delete this photo from the page?">Delete</ConfirmButton>
                      </div>
                    </form>
                  ))}
                </div>
              ) : (
                <p className="manage-empty">No photos in this group. Upload some above, or leave it empty to hide this section.</p>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
