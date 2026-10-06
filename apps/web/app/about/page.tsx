import { pageMetadata } from "../../lib/metadata";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Header } from "../../components/header";
import { categories } from "../../content/articles";

export const metadata = pageMetadata(
  "About the toolkit | The Forensic Linguist",
  "An open research library for exploring language, its patterns, and its place in the world of evidence.",
  "/about",
);

export default function About() {
  return (
    <>
      <Header active="about" />
      <main id="main-content" className="about-page">
        <p className="eyebrow">ABOUT THE TOOLKIT</p>
        <h1>
          Every word has
          <br />
          <em>something to tell us.</em>
        </h1>
        <p className="about-lede">
          The Forensic Linguist is an open research library for exploring
          language, its patterns, and its place in the world of evidence.
        </p>
        <div className="about-columns">
          <section>
            <h2>A place to follow a thread.</h2>
            <p>
              A writing habit. A turn of phrase. A voice. Language is shaped by
              people and contexts, and understanding it starts with asking
              careful questions.
            </p>
            <p>
              This toolkit brings papers together by linguistic discipline, with
              short editorial summaries, reading notes, and links to the
              original research. Browse a shelf, search a topic, or build a
              reading list for later.
            </p>
            <h2>Begin with the source.</h2>
            <p>
              The first six entries are a starter collection of published,
              openly accessible research. The summaries introduce a paper; they
              don’t replace it. Each entry includes the original source and
              citation so you can read further.
            </p>
            <p>Saved papers stay in your browser. No account is needed.</p>
            <Link className="primary-button" href="/library">
              Explore the library <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </section>
          <aside>
            <p className="eyebrow">FIVE WAYS IN</p>
            {categories.map((category, index) => (
              <Link key={category.id} href={`/library?category=${category.id}`}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {category.name}
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            ))}
            <p className="about-aside-note">
              The collection will grow.
              <br />
              So will the questions.
            </p>
          </aside>
        </div>
      </main>
      <footer className="simple-footer">
        The Forensic Linguist · Language. Context. Evidence.
      </footer>
    </>
  );
}
