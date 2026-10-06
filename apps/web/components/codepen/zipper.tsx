"use client";

import { motion, useTransform, type MotionValue } from "motion/react";

export function Zipper({
  opening,
  progress,
  onOpen,
}: {
  opening: boolean;
  progress: MotionValue<number>;
  onOpen: () => void;
}) {
  const pullX = useTransform(progress, [0, 1], ["0vw", "-110vw"]);
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
        style={{ x: pullX }}
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
