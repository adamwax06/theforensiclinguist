import { notFound } from "next/navigation";
import { articles, categories } from "../../../content/articles";
import { socialImage } from "../../../lib/social-image";

export const alt = "Paper from The Forensic Linguist research library";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = articles.find((paper) => paper.id === id);
  if (!article) notFound();
  const category = categories.find((item) => item.id === article.categories[0]);
  return socialImage(
    article.title,
    `${category?.name.toUpperCase()} / ${article.year}`,
  );
}
