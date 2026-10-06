"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowUpRight, Fingerprint, Pause, Play } from "lucide-react";
import { useReducedMotion } from "motion/react";

const SignalArt = dynamic(() => import("./signal-art"), { ssr: false });

export function ToolkitCover() {
  const [opening, setOpening] = useState(false);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion();
  const router = useRouter();
  return (
    <main
      id="main-content"
      className={`toolkit-cover${opening ? " is-opening" : ""}`}
    >
      <div className="cover-top">
        <header className="cover-header">
          <Link href="/" className="cover-brand">
            fl.<span>The Forensic Linguist</span>
          </Link>
          <Link href="/library">
            Step inside <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
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
          <div className="signal-figure">
            <div className="signal-orbit" aria-hidden="true">
              <div className="signal-art">
                <SignalArt paused={paused || !!reducedMotion} />
              </div>
              <Fingerprint className="signal-fingerprint" strokeWidth={0.6} />
              <span className="signal-cross cross-top">+</span>
              <span className="signal-cross cross-bottom">+</span>
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
        </div>
        <span className="cover-index" aria-hidden="true">
          LANGUAGE / CONTEXT / EVIDENCE
        </span>
      </div>
      <button
        className="zipper"
        onClick={() => setOpening(true)}
        disabled={opening}
        aria-label="Unzip the toolkit and enter the research library"
      >
        <span className="zipper-teeth" aria-hidden="true" />
        <span
          className="zipper-pull"
          aria-hidden="true"
          onAnimationEnd={() => router.push("/library")}
        >
          <span />
        </span>
        <span className="zipper-label">
          {opening ? "Opening the toolkit…" : "Unzip the toolkit"}
          <ArrowUpRight size={17} aria-hidden="true" />
        </span>
      </button>
      <div className="cover-bottom">
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
    </main>
  );
}
