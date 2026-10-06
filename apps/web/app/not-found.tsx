import Link from "next/link";
import { Header } from "../components/header";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="not-found-page">
        <p className="eyebrow">404 / A MISSING PAGE</p>
        <h1>
          This thread
          <br />
          ends here.
        </h1>
        <p>That page isn’t in the toolkit. There’s plenty more on the shelf.</p>
        <Link className="primary-button" href="/library">
          Back to the research library
        </Link>
      </main>
    </>
  );
}
