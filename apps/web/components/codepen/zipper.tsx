"use client";

export function Zipper({
  opening,
  onOpen,
  onComplete,
}: {
  opening: boolean;
  onOpen: () => void;
  onComplete: () => void;
}) {
  return (
    <button
      className={`zip-entry${opening ? " is-opening" : ""}`}
      aria-label="Unzip the toolkit and enter the research library"
      disabled={opening}
      onClick={onOpen}
    >
      <span className="zip-entry-label">
        {opening ? "Opening the toolkit…" : "Unzip the toolkit"}
      </span>
      <span
        className="zip-slider"
        aria-hidden="true"
        onTransitionEnd={(event) => {
          if (
            opening &&
            event.target === event.currentTarget &&
            event.propertyName === "right"
          )
            onComplete();
        }}
      >
        <span className="metal-zipper">
          <span className="zipper wrap">
            <span className="zipper back" />
            <span className="zipper body" />
            <span className="zipper cuff" />
            <span className="zipper pull">
              <span className="zipper bottom-hole" />
              <span className="zipper grip">
                <span className="inner-fill" />
              </span>
              <span className="zipper top-hole" />
            </span>
          </span>
        </span>
      </span>
    </button>
  );
}
