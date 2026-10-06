"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ArrowUpRight, Fingerprint, Pause, Play } from "lucide-react";
import { Zipper } from "./codepen/zipper";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";

const SignalArt = dynamic(() => import("./signal-art"), { ssr: false });

export function ToolkitCover() {
  const [opening, setOpening] = useState(false);
  const [split, setSplit] = useState(false);
  const coverRef = useRef<HTMLElement>(null);
  const topClip = useId();
  const bottomClip = useId();
  const progress = useMotionValue(0);
  const tipStart = useMotionValue(0.96);
  const curve = useTransform(() => {
    const p = progress.get();
    const tip = (tipStart.get() - p * 1.1) * 100;
    const first = tip + (100 - tip) * 0.3;
    const second = tip + (100 - tip) * 0.66;
    const depth = p * 92;
    return {
      top: `M0 0 H100 V${100 - depth} C${second} ${100 - depth} ${first} 100 ${tip} 100 H0 Z`,
      bottom: `M0 0 H${tip} C${first} 0 ${second} ${depth} 100 ${depth} V100 H0 Z`,
      topEdge: `M0 100 H${tip} C${first} 100 ${second} ${100 - depth} 100 ${100 - depth}`,
      bottomEdge: `M0 0 H${tip} C${first} 0 ${second} ${depth} 100 ${depth}`,
    };
  });
  const topShape = useTransform(curve, (paths) => paths.top);
  const bottomShape = useTransform(curve, (paths) => paths.bottom);
  const topEdge = useTransform(curve, (paths) => paths.topEdge);
  const bottomEdge = useTransform(curve, (paths) => paths.bottomEdge);
  useEffect(() => {
    const cover = coverRef.current;
    if (!cover) return;
    const observer = new ResizeObserver(() => {
      const body = cover.querySelector(".zipper.body")?.getBoundingClientRect();
      if (body)
        tipStart.set(
          (body.left + body.width / 2) / cover.clientWidth +
            progress.get() * 1.1,
        );
    });
    observer.observe(cover);
    return () => observer.disconnect();
  }, [progress, tipStart]);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion();
  const router = useRouter();
  function open() {
    if (reducedMotion) router.push("/library", { scroll: false });
    else setOpening(true);
  }
  useEffect(() => {
    if (!opening) return;
    const playback = animate(progress, 1, {
      duration: 1.1,
      ease: [0.45, 0, 0.55, 1],
      onComplete: () => setSplit(true),
    });
    return () => playback.stop();
  }, [opening, progress]);
  const splitTransition = {
    duration: 0.6,
    ease: [0.22, 1, 0.36, 1] as const,
  };
  return (
    <main
      ref={coverRef}
      id="main-content"
      className={`toolkit-cover zipperable${opening ? " is-opening" : ""}`}
    >
      <svg width="0" height="0" aria-hidden="true" focusable="false">
        <defs>
          <clipPath id={topClip} clipPathUnits="objectBoundingBox">
            <motion.path d={topShape} transform="scale(0.01)" />
          </clipPath>
          <clipPath id={bottomClip} clipPathUnits="objectBoundingBox">
            <motion.path d={bottomShape} transform="scale(0.01)" />
          </clipPath>
        </defs>
      </svg>
      <motion.div
        className="cover-top"
        initial={false}
        animate={{ y: split ? "-100%" : "0%" }}
        style={{ clipPath: `url(#${topClip})` }}
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
        <svg
          className="cover-seam"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <motion.path d={topEdge} vectorEffect="non-scaling-stroke" />
        </svg>
      </motion.div>
      <Zipper opening={opening} progress={progress} onOpen={open} />
      <motion.div
        className="cover-bottom"
        initial={false}
        animate={{ y: split ? "100%" : "0%" }}
        style={{ clipPath: `url(#${bottomClip})` }}
        transition={splitTransition}
        onAnimationComplete={() => {
          if (split) router.push("/library", { scroll: false });
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
        <svg
          className="cover-seam"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <motion.path d={bottomEdge} vectorEffect="non-scaling-stroke" />
        </svg>
      </motion.div>
    </main>
  );
}
