import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Header } from "../../../components/header";
import { ArticleReader } from "../../../components/article-reader";
import { articles } from "../../../content/articles";

export function generateStaticParams() {
  return articles.map(({ id }) => ({ id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const article = articles.find((paper) => paper.id === id);
  return {
    title: article
      ? `${article.title} | The Forensic Linguist`
      : "Paper not found",
    description: article?.summary,
    alternates: { canonical: `/papers/${id}` },
  };
}

export default async function PaperPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = articles.find((paper) => paper.id === id);
  if (!article) notFound();
  return (
    <>
      <Header active="library" />
      <main id="main-content" className="paper-page">
        <Link href={`/library?article=${id}`} className="back-link">
          <ArrowLeft size={16} aria-hidden="true" />
          Back to the bookshelf
        </Link>
        <ArticleReader article={article} standalone />
      </main>
      <footer className="simple-footer">
        The Forensic Linguist · Language. Context. Evidence.
      </footer>
    </>
  );
}
