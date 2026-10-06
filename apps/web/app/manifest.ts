import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "The Forensic Linguist",
    short_name: "Forensic Linguist",
    description: "A field guide to language as evidence.",
    start_url: "/library",
    display: "standalone",
    background_color: "#f6f4ed",
    theme_color: "#233c32",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
    ],
  };
}
