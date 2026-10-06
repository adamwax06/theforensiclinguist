import { describe, expect, test } from "bun:test";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { articles, categories } from "./articles";

describe("research catalog", () => {
  test("paper URLs are unique and safe route segments", () => {
    expect(new Set(articles.map(({ id }) => id)).size).toBe(articles.length);
    for (const article of articles)
      expect(article.id).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  });

  test("every paper has a source, citation, summary, and valid discipline", () => {
    for (const article of articles) {
      expect(article.title.length).toBeGreaterThan(0);
      expect(article.authors.length).toBeGreaterThan(0);
      expect(article.summary.length).toBeGreaterThan(0);
      expect(article.takeaways.length).toBeGreaterThan(0);
      expect(article.citation).toContain(String(article.year));
      expect(article.year).toBeLessThanOrEqual(new Date().getFullYear());
      expect(article.categories.length).toBeGreaterThan(0);
      for (const id of article.categories)
        expect(categories.some((category) => category.id === id)).toBe(true);
      expect(new URL(article.sourceUrl).protocol).toBe("https:");
      if (article.pdfUrl?.startsWith("/papers/")) {
        expect(existsSync(resolve("public", article.pdfUrl.slice(1)))).toBe(
          true,
        );
      } else if (article.pdfUrl) {
        expect(new URL(article.pdfUrl).protocol).toBe("https:");
      }
    }
  });
});
