"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowUpRight, Fingerprint, Pause, Play } from "lucide-react";
import { BlurFade } from "./magicui/blur-fade";
import { ShimmerButton } from "./magicui/shimmer-button";
import { MotionConfig, useReducedMotion } from "motion/react";

const SignalArt = dynamic(() => import("./signal-art"), { ssr: false });

export function ToolkitCover() {
  const [opening, setOpening] = useState(false);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion();
  const router = useRouter();
  return (
    <MotionConfig reducedMotion="user">
      <main id="main-content" className="toolkit-cover">
        <BlurFade
          initial={false}
          animate={opening ? "hidden" : "visible"}
          duration={reducedMotion ? 0 : 0.4}
          blur={reducedMotion ? "0px" : "6px"}
          offset={reducedMotion ? 0 : 6}
          onAnimationComplete={(state) => {
            if (state === "hidden" && opening) router.push("/library");
          }}
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
                <div className="signal-frame" aria-hidden="true">
                  <div className="signal-art">
                    <SignalArt paused={paused || !!reducedMotion} />
                  </div>
                  <Fingerprint
                    className="signal-fingerprint"
                    strokeWidth={0.6}
                  />
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
          <div className="cover-entry">
            <ShimmerButton
              background="#233c32"
              shimmerColor="#dfc48e"
              borderRadius="8px"
              onClick={() => setOpening(true)}
              disabled={opening}
            >
              <span>
                {opening ? "Opening the toolkit…" : "Open the toolkit"}
              </span>
              <ArrowUpRight size={18} aria-hidden="true" />
            </ShimmerButton>
          </div>
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
        </BlurFade>
      </main>
    </MotionConfig>
  );
}
