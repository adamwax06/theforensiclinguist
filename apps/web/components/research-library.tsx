"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useSyncExternalStore, type CSSProperties } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Bookmark,
  BookOpen,
  Library,
  List,
  Search,
  X,
} from "lucide-react";
import { articles, categories, type Article } from "../content/articles";
import { ArticleReader } from "./article-reader";

const savedKey = "forensic-linguist:saved-papers";

function readSaved() {
  try {
    return localStorage.getItem(savedKey) ?? "[]";
  } catch {
    return "[]";
  }
}

function subscribeSaved(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("papers-saved", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("papers-saved", callback);
  };
}

function authorLabel(article: Article) {
  return `${article.authors[0]}${article.authors.length > 1 ? " et al." : ""}`;
}

export function ResearchLibrary() {
  const params = useSearchParams();
  const savedSnapshot = useSyncExternalStore(
    subscribeSaved,
    readSaved,
    () => "[]",
  );
  const [saveError, setSaveError] = useState("");
  let savedIds: string[] = [];
  try {
    const stored: unknown = JSON.parse(savedSnapshot);
    if (Array.isArray(stored))
      savedIds = stored.filter((id): id is string => typeof id === "string");
  } catch {
    /* An invalid local reading list starts empty. */
  }
  const query = params.get("q") ?? "";
  const categoryId = params.get("category") ?? "";
  const savedOnly = params.get("saved") === "1";
  const listView = params.get("view") === "list";
  const sort = params.get("sort") ?? "collection";
  const currentCategory = categories.find(
    (category) => category.id === categoryId,
  );
  const terms = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  const results = articles.filter((article) => {
    const searchable = [
      article.title,
      article.coverTitle,
      ...article.authors,
      article.year,
      article.publication,
      article.summary,
      ...article.takeaways,
      ...article.tags,
      ...article.categories.map(
        (id) => categories.find((category) => category.id === id)?.name,
      ),
    ]
      .join(" ")
      .toLocaleLowerCase();
    return (
      (!currentCategory || article.categories.includes(currentCategory.id)) &&
      (!savedOnly || savedIds.includes(article.id)) &&
      terms.every((term) => searchable.includes(term))
    );
  });
  if (sort === "newest") results.sort((a, b) => b.year - a.year);
  if (sort === "oldest") results.sort((a, b) => a.year - b.year);
  if (sort === "title") results.sort((a, b) => a.title.localeCompare(b.title));
  const selected =
    results.find((article) => article.id === params.get("article")) ??
    results[0];

  function update(values: Record<string, string | null>, replace = false) {
    const next = new URLSearchParams(params.toString());
    for (const [key, value] of Object.entries(values)) {
      if (value) next.set(key, value);
      else next.delete(key);
    }
    const url = `/library${next.size ? `?${next.toString()}` : ""}`;
    if (replace) window.history.replaceState(null, "", url);
    else window.history.pushState(null, "", url);
  }

  function selectArticle(id: string) {
    update({ article: id });
    requestAnimationFrame(() => {
      document.getElementById("reader-title")?.focus({ preventScroll: true });
      if (window.matchMedia("(max-width: 1000px)").matches) {
        document
          .getElementById("reading-desk")
          ?.scrollIntoView({ behavior: "instant", block: "start" });
      }
    });
  }

  function toggleSaved(id: string) {
    try {
      const next = savedIds.includes(id)
        ? savedIds.filter((saved) => saved !== id)
        : [...savedIds, id];
      localStorage.setItem(savedKey, JSON.stringify(next));
      window.dispatchEvent(new Event("papers-saved"));
      setSaveError("");
    } catch {
      setSaveError(
        "Your browser couldn’t save this paper. Allow local storage to use your reading list.",
      );
    }
  }

  function reset() {
    update({ q: null, category: null, saved: null, article: null });
  }

  return (
    <main id="main-content" className="library-page">
      <section className="library-intro">
        <div>
          <p className="eyebrow">THE RESEARCH LIBRARY</p>
          <h1>
            Language leaves <em>a trace.</em>
          </h1>
          <p>
            A shelf of ideas for making sense of it. Explore research,
            <br className="desktop-break" /> follow a thread, and find your next
            good question.
          </p>
        </div>
        <div className="intro-aside">
          <span aria-hidden="true">/ lɪŋˈɡwɪst /</span>
          <p>
            The details are
            <br />
            in the language.
          </p>
        </div>
      </section>
      <div className="library-workspace">
        <aside className="library-sidebar" aria-label="Library filters">
          <p className="eyebrow">YOUR SHELVES</p>
          <button
            className={`shelf-filter${!currentCategory && !savedOnly ? " active" : ""}`}
            onClick={() =>
              update({ category: null, saved: null, article: null })
            }
            aria-pressed={!currentCategory && !savedOnly}
          >
            <Library size={17} aria-hidden="true" />
            <span>All research</span>
            <span className="count">{articles.length}</span>
          </button>
          <button
            className={`shelf-filter${savedOnly ? " active" : ""}`}
            onClick={() =>
              update({
                saved: savedOnly ? null : "1",
                category: null,
                article: null,
              })
            }
            aria-pressed={savedOnly}
          >
            <Bookmark size={17} aria-hidden="true" />
            <span>Saved papers</span>
            <span className="count">
              {
                articles.filter((article) => savedIds.includes(article.id))
                  .length
              }
            </span>
          </button>
          <p className="eyebrow topics-label">BY DISCIPLINE</p>
          <div className="category-filters">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`category-filter${categoryId === category.id ? " active" : ""}`}
                onClick={() =>
                  update({
                    category: categoryId === category.id ? null : category.id,
                    saved: null,
                    article: null,
                  })
                }
                aria-pressed={categoryId === category.id}
              >
                <span
                  className="category-dot"
                  style={{ background: category.color }}
                />
                <span>{category.name}</span>
                <span className="count">
                  {
                    articles.filter((article) =>
                      article.categories.includes(category.id),
                    ).length
                  }
                </span>
              </button>
            ))}
          </div>
          <div className="sidebar-note">
            <BookOpen size={22} strokeWidth={1.3} aria-hidden="true" />
            <h2>A collection in progress.</h2>
            <p>
              Explore published research. Follow the references to keep
              exploring.
            </p>
            <Link href="/about">
              A note on the collection{" "}
              <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </aside>
        <section className="shelf-area" aria-label="Research papers">
          <div className="search-box">
            <Search size={19} aria-hidden="true" />
            <label className="sr-only" htmlFor="research-search">
              Search the research library
            </label>
            <input
              id="research-search"
              type="search"
              placeholder="A topic, an author, a question…"
              value={query}
              onChange={(event) =>
                update({ q: event.target.value, article: null }, true)
              }
            />
            {query && (
              <button
                aria-label="Clear search"
                onClick={() => update({ q: null, article: null }, true)}
              >
                <X size={16} aria-hidden="true" />
              </button>
            )}
          </div>
          <div className="shelf-toolbar">
            <div>
              <h2>
                {savedOnly
                  ? "Saved papers"
                  : (currentCategory?.name ?? "The bookshelf")}
              </h2>
              <p role="status">
                {results.length} {results.length === 1 ? "paper" : "papers"}
                {query ? ` matching “${query}”` : " to explore"}
              </p>
            </div>
            <div className="shelf-controls">
              <label className="sr-only" htmlFor="sort-papers">
                Sort papers
              </label>
              <select
                id="sort-papers"
                value={sort}
                onChange={(event) => update({ sort: event.target.value })}
              >
                <option value="collection">Collection order</option>
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
                <option value="title">Title A–Z</option>
              </select>
              <div className="view-toggle" aria-label="Paper display">
                <button
                  aria-label="Bookshelf view"
                  aria-pressed={!listView}
                  onClick={() => update({ view: null })}
                >
                  <Library size={17} aria-hidden="true" />
                </button>
                <button
                  aria-label="List view"
                  aria-pressed={listView}
                  onClick={() => update({ view: "list" })}
                >
                  <List size={17} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
          {(query || currentCategory || savedOnly) && (
            <div className="active-filters">
              <span>
                {savedOnly
                  ? "Your reading list"
                  : (currentCategory?.name ?? "Search results")}
              </span>
              <button onClick={reset}>
                Reset filters <X size={13} aria-hidden="true" />
              </button>
            </div>
          )}
          {results.length ? (
            <div className={listView ? "paper-list" : "bookshelf"}>
              {results.map((article, index) => {
                const category = categories.find(
                  (item) => item.id === article.categories[0],
                )!;
                const isSelected = selected?.id === article.id;
                const isSaved = savedIds.includes(article.id);
                return listView ? (
                  <div
                    key={article.id}
                    className={`paper-row${isSelected ? " selected" : ""}`}
                  >
                    <button
                      className="paper-row-main"
                      onClick={() => selectArticle(article.id)}
                      aria-pressed={isSelected}
                    >
                      <span className="row-number">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>
                        <strong>{article.title}</strong>
                        <span>
                          {authorLabel(article)} · {article.year} ·{" "}
                          {article.publication}
                        </span>
                      </span>
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </button>
                    <button
                      className="save-button"
                      aria-label={`${isSaved ? "Unsave" : "Save"} ${article.title}`}
                      aria-pressed={isSaved}
                      onClick={() => toggleSaved(article.id)}
                    >
                      <Bookmark
                        size={17}
                        fill={isSaved ? "currentColor" : "none"}
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                ) : (
                  <div
                    className="book-item"
                    key={article.id}
                    style={{ "--book-color": category.color } as CSSProperties}
                  >
                    <button
                      className={`book-cover${isSelected ? " selected" : ""}`}
                      onClick={() => selectArticle(article.id)}
                      aria-label={`Read summary: ${article.title}`}
                      aria-pressed={isSelected}
                    >
                      <span className="book-series">{category.name}</span>
                      <span className="book-cover-title">
                        {article.coverTitle}
                      </span>
                      <span
                        className={`book-motif motif-${article.categories[0]}`}
                        aria-hidden="true"
                      >
                        <span />
                        <span />
                        <span />
                      </span>
                      <span className="book-author">
                        {authorLabel(article)}
                      </span>
                      <span className="book-edition">
                        {article.publication}
                        <span>{article.year}</span>
                      </span>
                    </button>
                    <div className="book-caption">
                      <span>
                        {isSelected ? (
                          <>
                            <span className="selected-dot" />
                            On the reading desk
                          </>
                        ) : (
                          `${article.year} / ${article.publication}`
                        )}
                      </span>
                      <button
                        className="save-button"
                        aria-label={`${isSaved ? "Unsave" : "Save"} ${article.title}`}
                        aria-pressed={isSaved}
                        onClick={() => toggleSaved(article.id)}
                      >
                        <Bookmark
                          size={16}
                          fill={isSaved ? "currentColor" : "none"}
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="empty-state">
              <Search size={32} strokeWidth={1.3} aria-hidden="true" />
              <h3>
                {savedOnly && !savedIds.length
                  ? "Make room for a good read."
                  : "No papers on this shelf."}
              </h3>
              <p>
                {savedOnly && !savedIds.length
                  ? "Use the bookmark on any paper to add it to your reading list. Your list stays in this browser."
                  : "Try a broader topic, a different author, or another discipline."}
              </p>
              <button className="primary-button" onClick={reset}>
                Explore all research{" "}
                <ArrowUpRight size={16} aria-hidden="true" />
              </button>
            </div>
          )}
          <p className="save-error" role="status">
            {saveError}
          </p>
          {results.length > 0 && (
            <p className="shelf-hint">
              <ArrowDown size={14} aria-hidden="true" />
              <span>Pick a paper. Pull up a chair.</span>
              <span>Original sources, always linked.</span>
            </p>
          )}
        </section>
        <aside
          className="reading-desk"
          id="reading-desk"
          aria-label="Selected paper details"
        >
          <div className="desk-label">
            <span className="eyebrow">THE READING DESK</span>
            <a className="back-to-shelf" href="#research-search">
              Back to shelf
            </a>
            <BookOpen size={16} aria-hidden="true" />
          </div>
          {selected ? (
            <ArticleReader key={selected.id} article={selected} />
          ) : (
            <div className="desk-empty">
              <BookOpen size={36} strokeWidth={1} aria-hidden="true" />
              <p>
                Your next paper
                <br />
                belongs here.
              </p>
            </div>
          )}
        </aside>
      </div>
      <footer className="library-footer">
        <span>The Forensic Linguist</span>
        <span>Language. Context. Evidence.</span>
        <Link href="/">
          Close the toolkit <ArrowUpRight size={14} aria-hidden="true" />
        </Link>
      </footer>
    </main>
  );
}
