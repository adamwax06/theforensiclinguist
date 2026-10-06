"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowUpRight, Fingerprint, Pause, Play } from "lucide-react";
import { Zipper } from "./codepen/zipper";
import { motion, useReducedMotion } from "motion/react";

const SignalArt = dynamic(() => import("./signal-art"), { ssr: false });

export function ToolkitCover() {
  const [opening, setOpening] = useState(false);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion();
  const router = useRouter();
  function open() {
    if (reducedMotion) router.push("/library", { scroll: false });
    else setOpening(true);
  }
  const splitTransition = {
    delay: 0.55,
    duration: 0.8,
    ease: [0.22, 1, 0.36, 1] as const,
  };
  return (
    <main
      id="main-content"
      className={`toolkit-cover zipperable${opening ? " is-opening" : ""}`}
    >
      <motion.div
        className="cover-top"
        initial={false}
        animate={{ y: opening ? "-100%" : "0%" }}
        transition={splitTransition}
      >
        <header className="cover-header">
          <Link href="/" className="cover-brand">
            fl.<span>The Forensic Linguist</span>
          </Link>
          <button onClick={open} disabled={opening}>
            Step inside <ArrowUpRight size={16} aria-hidden="true" />
          </button>
        </header>
        <div className="cover-composition">
          <div className="cover-title">
            <p className="eyebrow">A field guide to language as evidence</p>
            <h1>
              The forensic
              <br />
              linguist’s
              <br />
              <em>toolkit.</em>
            </h1>
            <p>
              Follow the words. Explore the research.
              <br />
              Find the patterns that tell a story.
            </p>
          </div>
        </div>
        <span className="cover-index" aria-hidden="true">
          LANGUAGE / CONTEXT / EVIDENCE
        </span>
      </motion.div>
      <Zipper opening={opening} onOpen={open} />
      <motion.div
        className="cover-bottom"
        initial={false}
        animate={{ y: opening ? "100%" : "0%" }}
        transition={splitTransition}
        onAnimationComplete={() => {
          if (opening) router.push("/library", { scroll: false });
        }}
      >
        <div className="cover-bottom-copy">
          <p>
            <span>01 / THE RESEARCH LIBRARY</span>Good questions begin
            <br />
            with a well-stocked shelf.
          </p>
          <p className="cover-note">
            Papers, perspectives, and a place to connect the dots.
            <br />
            An open collection for the linguistically curious.
          </p>
          <Link href="/about" className="cover-about">
            About the toolkit <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
        <div className="signal-figure">
          <div className="signal-frame" aria-hidden="true">
            <div className="signal-art">
              <SignalArt paused={paused || opening || !!reducedMotion} />
            </div>
            <Fingerprint className="signal-fingerprint" strokeWidth={0.6} />
          </div>
          <div className="signal-caption">
            <span>01 — EVERY VOICE LEAVES A PATTERN</span>
            <button
              onClick={() => setPaused(!paused)}
              aria-label={
                paused
                  ? "Play background animation"
                  : "Pause background animation"
              }
            >
              {paused ? (
                <Play size={13} aria-hidden="true" />
              ) : (
                <Pause size={13} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
