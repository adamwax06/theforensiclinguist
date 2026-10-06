"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Check, Copy, FileText } from "lucide-react";
import { type Article, categories } from "../content/articles";

export function ArticleReader({
  article,
  standalone = false,
}: {
  article: Article;
  standalone?: boolean;
}) {
  const [copyStatus, setCopyStatus] = useState("");
  const Title = standalone ? "h1" : "h2";

  async function copyCitation() {
    try {
      await navigator.clipboard.writeText(article.citation);
      setCopyStatus("Citation copied");
    } catch {
      setCopyStatus("Select the citation below to copy it.");
    }
  }

  return (
    <article
      className={`article-reader${standalone ? " standalone-reader" : ""}`}
    >
      <div className="paper-meta">
        <span>{article.publication}</span>
        <span>{article.year}</span>
      </div>
      <Title id="reader-title" tabIndex={-1}>
        {article.title}
      </Title>
      <p className="paper-authors">{article.authors.join(" · ")}</p>
      <div className="paper-categories">
        {article.categories.map((id) => (
          <span key={id}>
            {categories.find((category) => category.id === id)?.name}
          </span>
        ))}
      </div>
      <div className="paper-links">
        {article.pdfUrl && (
          <a
            className="primary-button"
            href={article.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FileText size={16} aria-hidden="true" />
            Read the PDF
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        )}
        <a
          className="source-link"
          href={article.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Original source <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </div>
      <section className="summary-section">
        <h3>The short version</h3>
        <p>{article.summary}</p>
      </section>
      <section className="takeaways-section">
        <h3>Notes for the reading desk</h3>
        <ol>
          {article.takeaways.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ol>
      </section>
      <section className="tags-section">
        <h3>Explore the themes</h3>
        <div className="tag-list">
          {article.tags.map((tag) => (
            <Link key={tag} href={`/library?q=${encodeURIComponent(tag)}`}>
              {tag}
            </Link>
          ))}
        </div>
      </section>
      <section className="citation-section">
        <div className="citation-heading">
          <h3>Citation</h3>
          <button onClick={copyCitation} aria-label="Copy citation">
            {copyStatus === "Citation copied" ? (
              <Check size={14} aria-hidden="true" />
            ) : (
              <Copy size={14} aria-hidden="true" />
            )}
            Copy
          </button>
        </div>
        <p>{article.citation}</p>
        <span role="status" className="copy-status">
          {copyStatus}
        </span>
      </section>
      {!standalone && (
        <a className="permalink" href={`/papers/${article.id}`}>
          Open paper details <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      )}
      <p className="editorial-note">
        Summary and reading notes are editorial guides. The linked paper is the
        original source.
      </p>
    </article>
  );
}
