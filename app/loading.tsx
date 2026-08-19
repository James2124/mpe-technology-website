export default function Loading() {
  return (
    <div
      className="route-loading"
      role="status"
      aria-label="Loading page"
    >
      <div className="route-loading-mark">
        <span>MP&amp;E</span>

        <div
          className="route-loading-ring"
          aria-hidden="true"
        />
      </div>

      <p>LOADING INDUSTRIAL SOLUTIONS</p>
    </div>
  );
}
