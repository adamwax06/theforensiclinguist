"use client";

import { useEffect, useEffectEvent, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Bookmark } from "lucide-react";
import { articles, categories } from "../content/articles";
import type { ShelfEngine } from "./mint-bookshelf/ShelfEngine";
import type { CatalogBook, BookMotif } from "./mint-bookshelf/catalog";

const motifs: Record<string, BookMotif> = {
  authorship: "lattice",
  sociolinguistics: "network",
  discourse: "maze",
  speech: "wave",
  methods: "schematic",
};

export function PhysicalBookshelf({
  ids,
  selectedId,
  savedIds,
  onSelect,
  onSave,
  onListView,
}: {
  ids: string[];
  selectedId?: string;
  savedIds: string[];
  onSelect: (id: string, focusReader?: boolean) => void;
  onSave: (id: string) => void;
  onListView: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<ShelfEngine | null>(null);
  const pendingRef = useRef<number | null>(null);
  const [active, setActive] = useState(0);
  const [unavailable, setUnavailable] = useState(false);
  const collectionKey = ids.join(",");
  const catalog = useMemo<CatalogBook[]>(
    () =>
      collectionKey.split(",").map((id) => {
        const article = articles.find((item) => item.id === id)!;
        const category = categories.find(
          (item) => item.id === article.categories[0],
        )!;
        return {
          id,
          title: article.coverTitle,
          shortTitle: article.coverTitle,
          author: `${article.authors[0]}${article.authors.length > 1 ? " et al." : ""}`,
          description: article.summary,
          quote: "",
          quoteBy: "",
          format: article.publication,
          availability: String(article.year),
          url: article.sourceUrl,
          cover: category.color,
          accent: "#dfc48e",
          ink: "#f4ead7",
          motif: motifs[category.id]!,
          height: 2.05 + articles.indexOf(article) * 0.06,
          thickness: 0.26 + (articles.indexOf(article) % 3) * 0.04,
        };
      }),
    [collectionKey],
  );
  const select = useEffectEvent(
    (index: number) =>
      selectedId !== catalog[index]!.id && onSelect(catalog[index]!.id, false),
  );

  const initialIndex = useEffectEvent(() =>
    Math.max(
      0,
      catalog.findIndex((book) => book.id === selectedId),
    ),
  );

  useEffect(() => {
    let cancelled = false;
    let engine: ShelfEngine | undefined;
    async function start() {
      try {
        await document.fonts.ready;
        const { ShelfEngine } = await import("./mint-bookshelf/ShelfEngine");
        if (cancelled || !canvasRef.current) return;
        engine = new ShelfEngine(canvasRef.current, catalog, {
          onActiveIndex: setActive,
          onMode: (mode, index) => {
            if (canvasRef.current)
              canvasRef.current.style.touchAction =
                mode === "inspect" ? "none" : "pan-y";
            if (mode === "focusing" && index !== null) select(index);
            if (mode === "browse" && pendingRef.current !== null) {
              const next = pendingRef.current;
              pendingRef.current = null;
              requestAnimationFrame(() => engine?.focusBook(next));
            }
          },
          onStatus: () => {},
          onReady: () => {},
        });
        canvasRef.current.style.touchAction = "pan-y";
        engineRef.current = engine;
        engine.browseTo(initialIndex());
      } catch {
        setUnavailable(true);
      }
    }
    void start();
    return () => {
      cancelled = true;
      pendingRef.current = null;
      engine?.dispose();
      engineRef.current = null;
    };
  }, [catalog]);

  return (
    <div className="physical-library">
      <div className="physical-stage">
        <canvas
          ref={canvasRef}
          className="physical-canvas"
          tabIndex={0}
          role="application"
          aria-label="Three-dimensional bookshelf. Drag or use left and right arrow keys to browse. Press Enter to pull a book from the shelf. Press Escape to return it."
        />
        {unavailable && (
          <button className="physical-fallback" onClick={onListView}>
            Explore the papers in list view
          </button>
        )}
      </div>
      <div className="physical-controls">
        <button
          aria-label="Previous book"
          onClick={() => engineRef.current?.browseTo(Math.max(0, active - 1))}
        >
          <ArrowLeft size={17} aria-hidden="true" />
        </button>
        <span>Drag the shelf. Pull up a paper.</span>
        <button
          aria-label="Next book"
          onClick={() =>
            engineRef.current?.browseTo(
              Math.min(catalog.length - 1, active + 1),
            )
          }
        >
          <ArrowRight size={17} aria-hidden="true" />
        </button>
        <button
          className="return-to-shelf"
          onClick={() => engineRef.current?.returnToShelf()}
        >
          Return book
        </button>
      </div>
      <div className="physical-index">
        {catalog.map((book, index) => (
          <div
            key={book.id}
            className={selectedId === book.id ? "selected" : ""}
          >
            <button
              className="physical-title"
              aria-pressed={selectedId === book.id}
              aria-label={`Read summary: ${articles.find((article) => article.id === book.id)!.title}`}
              onClick={() => {
                onSelect(book.id);
                const engine = engineRef.current;
                if (!engine) return;
                if (engine.getDiagnostics().mode === "browse")
                  engine.focusBook(index);
                else {
                  pendingRef.current = index;
                  engine.returnToShelf();
                }
              }}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              {book.shortTitle}
            </button>
            <button
              className="save-button"
              aria-label={`${savedIds.includes(book.id) ? "Unsave" : "Save"} ${articles.find((article) => article.id === book.id)!.title}`}
              aria-pressed={savedIds.includes(book.id)}
              onClick={() => onSave(book.id)}
            >
              <Bookmark
                size={16}
                fill={savedIds.includes(book.id) ? "currentColor" : "none"}
                aria-hidden="true"
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
