"use client";

import { motion } from "motion/react";

export function Zipper({
  opening,
  onOpen,
}: {
  opening: boolean;
  onOpen: () => void;
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
      <motion.span
        className="zip-slider"
        aria-hidden="true"
        initial={false}
        animate={{ x: opening ? "-110vw" : "0vw" }}
        transition={{ duration: 0.65, ease: [0.45, 0, 0.55, 1] }}
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
      </motion.span>
    </button>
  );
}
