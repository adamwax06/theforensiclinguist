# The Forensic Linguist

An open research library built with Bun + Turborepo + Next.js + TypeScript, based on the [official Turborepo basic starter](https://github.com/vercel/turborepo/tree/main/examples/basic).

## Run locally

Requires Bun 1.4.1 and Node.js 24 or newer.

```sh
bun install
bun run dev
```

Open http://localhost:3000.

```sh
bun run build
bun run lint
bun run check-types
bun run --cwd apps/web test
```

## Structure

- `apps/web`: Next.js App Router website.
- `packages/typescript-config`: shared TypeScript configuration.
- `packages/eslint-config`: shared ESLint configuration.

The starter's second app and demo UI package are omitted. The site is public and statically generated, with content edited in this repository. No CMS, database, account, or environment variables are needed.

## Hosting

Vercel project: `theforensiclinguist`, in Adam's personal Vercel team.

- Root directory: `apps/web`.
- Framework: Next.js.
- Install command: `bun install`.
- Build command: `bun run build`.
- DNS provider: Cloudflare; keep the existing Cloudflare nameservers.

Vercel is connected to this GitHub repository. Pushes to `main` deploy to production automatically. For a manual deployment, run `vercel deploy --prod --scope adams-projects-938383af` from the repository root.

`theforensiclinguist.com` is connected, and `www.theforensiclinguist.com` permanently redirects to it. When changing DNS, use the exact targets shown in Vercel's domain settings and keep unrelated mail records intact.

## The toolkit

- `/`: a fabric-style toolkit cover with an animated zipper entry.
- `/library`: bookshelf and list views, topic/author/year search, discipline filters, sorting, and an article reading desk.
- `/papers/[id]`: permanent paper pages with editorial summaries, reading notes, citations, and original-source/PDF links.
- `/about`: the collection's purpose and browsing guide.

Bookmarks are stored only in the visitor's browser. Search and filters appear in the URL, so filtered collections can be shared and browser navigation works. Reduced-motion preferences are respected. Speech analysis, spectrograms, and the microphone-driven mouth visualization remain a later project.

## Add or edit research

Edit `apps/web/content/articles.ts`. The `categories` array defines the disciplines and book colors; the `articles` array defines the papers. Copy an existing entry and change:

- `id`: a unique URL slug, such as `language-in-interviews`.
- `title`: the full paper title; `coverTitle`: a short display title for the book cover.
- `authors`, `year`, and `publication`: publication metadata.
- `categories`: one or more category IDs; the first sets the book's color.
- `tags`: search keywords.
- `summary`, `takeaways`, and `citation`: editorial text and attribution.
- `sourceUrl`: the original publication or DOI URL.
- `pdfUrl`: an external HTTPS PDF link or a local path; omit it when no PDF is available.

For a PDF stored in this repo, add it to `apps/web/public/papers/` and set `pdfUrl` to `/papers/your-filename.pdf`. Keep publisher attribution with each paper. PDF text itself is not indexed: search covers the metadata, summaries, tags, and reading notes.

Run the checks above, then commit and push to `main`. Vercel publishes the content automatically. GitHub Actions runs the same checks on pushes and pull requests. The catalog tests catch duplicate/slash-containing IDs, missing metadata, invalid categories, unsafe links, and missing local PDF files.

The six initial entries are a starter collection verified against ACL Anthology and the ISCA Archive. They are not Dara's personal collection. Their summaries and reading notes are editorial introductions, with links to the original papers. Replace or extend them as Dara's material is added.

## DNS

Both records use DNS-only mode and automatic TTL:

| Type  | Name | Target                              |
| ----- | ---- | ----------------------------------- |
| A     | @    | 216.198.79.1                        |
| CNAME | www  | da01a73406eef0e3.vercel-dns-017.com |

Vercel handles HTTPS and the permanent `www` redirect to the apex domain.

## Visuals and sharing

The toolkit opens with a literal zipper. The library uses a wooden 3D shelf with upright book spines, pull-out inspection, and an accessible title index connected to the reading desk.

| Visual                 | Source                                                                                                                                                                          | License    |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| Animated cover artwork | [Paper Shaders Warp](https://github.com/paper-design/shaders) (`@paper-design/shaders-react` 0.0.81)                                                                            | Apache 2.0 |
| Metal zipper pull      | [Jonjoe’s CSS Zipper](https://codepen.io/jonjoe/pen/bNZrqV)                                                                                                                     | MIT        |
| Zipper seam            | [Igal Steklov’s CSS animated page zipper](https://codepen.io/igalst/pen/ApeEQV)                                                                                                 | MIT        |
| Physical bookshelf     | [Mint Playground Complete Shelf](https://github.com/mintdotgg/mint-playground/tree/5ab1b942b6bb5169a0460b3cc682fe34fae76293/experiences/complete-shelf), using Three.js 0.186.1 | MIT        |

The bookshelf engine, motion, and procedural cover artwork are vendored in `apps/web/components/mint-bookshelf`. Integration replaces the demo catalog with the site's papers, adjusts imprint text, and supports this workspace's stricter TypeScript configuration. The original optional Stripe asset archive is disabled; no Stripe images, models, PDFs, branding, or demo catalog are redistributed. Complete upstream license and asset notices are retained in `apps/web/licenses`.

The zipper pull uses Jonjoe's licensed CSS geometry; the dashed seam treatment is adapted from Igal Steklov's page zipper. Motion drives a shared progress value for the pull and native SVG Bézier clip paths: the cover peels apart to the right of the moving pull, then the upper panel exits upward and the lower panel exits downward. The home and library routes share a persistent Next.js layout, so the actual bookshelf is already behind the cover and its canvas survives the reveal. Integration supplies scoped selectors, a semantic entry button, and immediate navigation for reduced motion. Public CodePen pens carry an [MIT license](https://blog.codepen.io/documentation/licensing/). The original demo's external denim image is omitted.

Paper Shaders loads only on the cover, with a plain-color fallback, a pause control, and reduced-motion support. [Motion](https://motion.dev/docs/react) (MIT) supplies the zipper and split-cover animation as well as layout transitions. Ordinary page layout, typography, and content styling remain site CSS. Paper Shaders was researched through its creators [Stephen Haney](https://x.com/stephenhaney) and [Ksenia Kondrashova](https://x.com/uuuuuulala); Mint Playground appeared in indexed X discussion. Direct X pages blocked automated access, and no X post was verified for the zipper itself. The linked repositories and CodePen sources establish provenance and licensing.

[Lucide](https://lucide.dev) supplies the illustrations and fingerprint identity; its license is retained in `apps/web/LUCIDE-LICENSE.txt`. [Fraunces](https://github.com/undercasetype/Fraunces) is served locally through `next/font`, with its OFL license alongside the fonts.

Next.js metadata conventions generate the Open Graph images (including a unique card for every paper), Twitter cards, Apple touch icon, manifest, sitemap, and robots file. The SVG favicon and ICO use the same Lucide fingerprint. Page metadata lives in `apps/web/lib/metadata.ts`; share-card styling lives in `apps/web/lib/social-image.tsx`.
