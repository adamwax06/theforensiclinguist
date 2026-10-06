"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

export function ToolkitCover() {
  const [opening, setOpening] = useState(false);
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
        <div className="cover-title">
          <p className="eyebrow">A field guide to language as evidence</p>
          <h1>
            The forensic
            <br />
            linguist’s <em>toolkit.</em>
          </h1>
          <p>
            Follow the words. Explore the research.
            <br />
            Find the patterns that tell a story.
          </p>
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
