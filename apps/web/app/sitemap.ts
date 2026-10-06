import type { MetadataRoute } from "next";
import { articles } from "../content/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/library",
    "/about",
    ...articles.map(({ id }) => `/papers/${id}`),
  ].map((path) => ({ url: `https://theforensiclinguist.com${path}` }));
}
