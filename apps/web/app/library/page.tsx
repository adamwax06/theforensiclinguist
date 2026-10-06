import { pageMetadata } from "../../lib/metadata";
import { Suspense } from "react";
import { Header } from "../../components/header";
import { ResearchLibrary } from "../../components/research-library";

export const metadata = pageMetadata(
  "Research library | The Forensic Linguist",
  "Explore research on authorship, sociolinguistics, discourse, and forensic speech science. Browse by topic, read summaries, and find the original papers.",
  "/library",
);

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
