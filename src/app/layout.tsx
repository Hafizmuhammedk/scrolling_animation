import type { Metadata } from "next";
import "./globals.css";
import "lenis/dist/lenis.css";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "iPhone Air — Lightness Reimagined | Apple",
  description:
    "Introducing iPhone Air. The thinnest, lightest iPhone ever made. Featuring the A20 Pro chip, aerospace-grade titanium, and a revolutionary ultra-slim design.",
  keywords: [
    "iPhone Air",
    "Apple",
    "thin iPhone",
    "lightweight",
    "A20 Pro",
    "titanium",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
