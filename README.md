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

The visual effects come from existing open-source components. The custom CSS zipper, book geometry, textile patterns, and orbit decoration have been removed.

| Visual                     | Source                                                                                                                                                    | License    | X discovery / creator                                                                       |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------- |
| Animated cover artwork     | [Paper Shaders Warp](https://github.com/paper-design/shaders) (`@paper-design/shaders-react` 0.0.81)                                                      | Apache 2.0 | [Stephen Haney](https://x.com/stephenhaney), [Ksenia Kondrashova](https://x.com/uuuuuulala) |
| Entrance button and reveal | [Magic UI Shimmer Button and Blur Fade](https://github.com/magicuidesign/magicui/tree/cdb348cb4c72a9b54b554d8617801e479fbc8714/apps/www/registry/magicui) | MIT        | [Dillion Verma’s launch post](https://x.com/dillionverma/status/1793401212114801097)        |
| Interactive book covers    | [useLayouts 3D Book](https://github.com/iurvish/uselayouts/blob/07cc4f4fb8e064643168e6fc8792127af92637f5/registry/default/example/3d-book.tsx)            | MIT        | [Urvish Mali](https://x.com/0xUrvish)                                                       |

Magic UI and useLayouts are copy-and-paste registries: their source is retained in `apps/web/components/magicui` and `apps/web/components/uselayouts`, with the complete upstream licenses in `apps/web/licenses`. Magic UI’s imports were adapted to this workspace; its shimmer keyframes are taken from the official registry. useLayouts retains its 15-page fan, perspective, front-cover rotation, spine, and shadows. Integration changes add article content, responsive sizing, semantic buttons, keyboard support, reduced motion, touch scrolling, and a bounded opening angle so neighboring books stay readable. The fixed demo notebook labels and texture were removed. Tailwind supplies the registry components’ styling.

Paper Shaders loads only on the cover, with a plain-color fallback, a pause control, and reduced-motion support. [Motion](https://motion.dev/docs/react) (MIT) supplies layout transitions. Ordinary page layout, typography, and content styling remain site CSS. Direct X pages blocked automated access during research; the launch post and creator links were cross-checked against public indexed posts and the authors’ repositories.

[Lucide](https://lucide.dev) supplies the illustrations and fingerprint identity; its license is retained in `apps/web/LUCIDE-LICENSE.txt`. [Fraunces](https://github.com/undercasetype/Fraunces) is served locally through `next/font`, with its OFL license alongside the fonts.

Next.js metadata conventions generate the Open Graph images (including a unique card for every paper), Twitter cards, Apple touch icon, manifest, sitemap, and robots file. The SVG favicon and ICO use the same Lucide fingerprint. Page metadata lives in `apps/web/lib/metadata.ts`; share-card styling lives in `apps/web/lib/social-image.tsx`.
