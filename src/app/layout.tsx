import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Devi Divine — Rituals that feel like silk",
  description:
    "Flagship experience for Devi Divine: elevated rituals, smooth scrolling, and a luxe checkout.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-full flex flex-col bg-base text-ink antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
