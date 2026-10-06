import type { Metadata } from "next";

export function pageMetadata(
  title: string,
  description: string,
  path: string,
  imagePath = "/opengraph-image",
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: "The Forensic Linguist",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: imagePath,
          width: 1200,
          height: 630,
          alt: "The Forensic Linguist — language as evidence",
        },
      ],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
