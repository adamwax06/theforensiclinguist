import type { Metadata } from "next";
import { Suspense } from "react";
import { Header } from "../../components/header";
import { ResearchLibrary } from "../../components/research-library";

export const metadata: Metadata = {
  title: "Research library | The Forensic Linguist",
  description:
    "Explore research on authorship, sociolinguistics, discourse, and forensic speech science. Browse by topic, read summaries, and find the original papers.",
};

export default function LibraryPage() {
  return (
    <>
      <Header active="library" />
      <Suspense
        fallback={
          <main className="library-loading">Opening the research library…</main>
        }
      >
        <ResearchLibrary />
      </Suspense>
    </>
  );
}
