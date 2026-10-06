import { socialImage } from "../lib/social-image";

export const alt =
  "The Forensic Linguist — a field guide to language as evidence";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return socialImage(
    "Every word leaves a trace.",
    "A FIELD GUIDE TO LANGUAGE AS EVIDENCE",
  );
}
