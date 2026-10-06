import Link from "next/link";

export function Header({ active }: { active?: "library" | "about" }) {
  return (
    <header className="site-header">
      <Link href="/" className="brand" aria-label="The Forensic Linguist home">
        <span className="brand-mark" aria-hidden="true">
          fl.
        </span>
        <span>
          The Forensic
          <br />
          Linguist
        </span>
      </Link>
      <nav aria-label="Main navigation">
        <Link
          href="/library"
          aria-current={active === "library" ? "page" : undefined}
        >
          Research library
        </Link>
        <Link
          href="/about"
          aria-current={active === "about" ? "page" : undefined}
        >
          About the toolkit
        </Link>
      </nav>
    </header>
  );
}
