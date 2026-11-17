import type { HomeShowcaseCard } from "../../lib/types";
import { ConfirmButton } from "./ConfirmButton";

/** Edit, reorder, delete and add items of one homepage list ("cards" under the feature block or "hero" products). */
export function CardListEditor({
  list,
  cards,
  itemNoun,
  addPlaceholder,
}: {
  list: "cards" | "hero";
  cards: HomeShowcaseCard[];
  itemNoun: string;
  addPlaceholder: string;
}) {
  return (
    <>
      <div className="showcase-card-list">
        {cards.map((card, index) => (
          <div className="showcase-card-row" key={card.id}>
            <span className="showcase-card-number">{String(index + 1).padStart(2, "0")}</span>
            <img src={card.imagePath} alt="" />
            <form className="showcase-card-form" action="/api/home-showcase" method="post" encType="multipart/form-data">
              <input type="hidden" name="list" value={list} />
              <input type="hidden" name="id" value={card.id} />
              <label><span>Name</span><input name="title" required maxLength={80} defaultValue={card.title} /></label>
              <label><span>Link</span><input name="href" required list="showcase-links" defaultValue={card.href} /></label>
              <label><span>New picture</span><input type="file" name="image" accept="image/png,image/jpeg,image/webp" /></label>
              <div className="showcase-card-actions">
                <button type="submit" name="action" value="update-card" className="showcase-save">Save</button>
                <button type="submit" name="action" value="move-up" disabled={index === 0} aria-label={`Move ${card.title} up`} formNoValidate>↑</button>
                <button type="submit" name="action" value="move-down" disabled={index === cards.length - 1} aria-label={`Move ${card.title} down`} formNoValidate>↓</button>
                <ConfirmButton name="action" value="delete-card" className="showcase-delete" message={`Remove "${card.title}" from the homepage?`}>Delete</ConfirmButton>
              </div>
            </form>
          </div>
        ))}
      </div>

      <form className="showcase-add-form" action="/api/home-showcase" method="post" encType="multipart/form-data">
        <input type="hidden" name="list" value={list} />
        <input type="hidden" name="action" value="add-card" />
        <h3>Add {itemNoun}</h3>
        <div className="form-row">
          <label><span>Name *</span><input name="title" required maxLength={80} placeholder={addPlaceholder} /></label>
          <label><span>Link *</span><input name="href" required list="showcase-links" placeholder="/products?category=Pumps" /></label>
        </div>
        <div className="form-row">
          <label><span>Picture *</span><input type="file" name="image" required accept="image/png,image/jpeg,image/webp" /></label>
          <label><span>Position</span><input type="number" name="position" min="1" step="1" placeholder={`Last (${cards.length + 1})`} /></label>
        </div>
        <button className="primary-btn form-submit" type="submit">Add {itemNoun} <span>→</span></button>
      </form>
    </>
  );
}
