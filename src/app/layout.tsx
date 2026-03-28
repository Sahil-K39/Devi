import type { Metadata } from "next";
import {
  Noto_Serif_Devanagari,
  Tiro_Devanagari_Hindi,
} from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const display = Tiro_Devanagari_Hindi({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-display",
});

const body = Noto_Serif_Devanagari({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-body",
});

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
    <html
      lang="en"
      className={`${display.variable} ${body.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-base text-ink antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
