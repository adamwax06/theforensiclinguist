import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { pageMetadata } from "../lib/metadata";

const fraunces = localFont({
  src: [
    {
      path: "./fonts/Fraunces72pt-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    { path: "./fonts/Fraunces72pt-Italic.ttf", weight: "400", style: "italic" },
  ],
  variable: "--font-fraunces",
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://theforensiclinguist.com"),
  ...pageMetadata(
    "The Forensic Linguist",
    "A field guide to language as evidence. Explore research on authorship, sociolinguistics, discourse, and forensic speech science.",
    "/",
  ),
  applicationName: "The Forensic Linguist",
  category: "education",
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable}`}
      >
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
