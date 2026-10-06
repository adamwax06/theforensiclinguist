# The Forensic Linguist

A minimal Bun + Turborepo + Next.js + TypeScript monorepo, based on the [official Turborepo basic starter](https://github.com/vercel/turborepo/tree/main/examples/basic).

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
```

## Structure

- `apps/web`: Next.js App Router website.
- `packages/typescript-config`: shared TypeScript configuration.
- `packages/eslint-config`: shared ESLint configuration.

The starter's second app and demo UI package are omitted. No database or authentication is required. The public page is a temporary coming-soon page.

## Hosting

Vercel project: `theforensiclinguist`, in Adam's personal Vercel team.

- Root directory: `apps/web`.
- Framework: Next.js.
- Install command: `bun install`.
- Build command: `bun run build`.
- DNS provider: Cloudflare; keep the existing Cloudflare nameservers.

Vercel is connected to this GitHub repository. Pushes to `main` deploy to production automatically. For a manual deployment, run `vercel deploy --prod --scope adams-projects-938383af` from the repository root.

`theforensiclinguist.com` is connected, and `www.theforensiclinguist.com` permanently redirects to it. When changing DNS, use the exact targets shown in Vercel's domain settings and keep unrelated mail records intact.

## Website direction

The next phase is a research library with PDF/article uploads through a CMS, manual linguistic-category tags, and topic search. The visual direction is a library/bookshelf with article details and summaries, entered through a zipper-style “Forensic Linguist Toolkit” cover. Speech analysis, spectrograms, and the microphone-driven mouth visualization are a later project.

## DNS

Both records use DNS-only mode and automatic TTL:

| Type  | Name | Target                              |
| ----- | ---- | ----------------------------------- |
| A     | @    | 216.198.79.1                        |
| CNAME | www  | da01a73406eef0e3.vercel-dns-017.com |

Vercel handles HTTPS and the permanent `www` redirect to the apex domain.
