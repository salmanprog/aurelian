import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { ExperienceShell } from "@/components/system/ExperienceShell";
import { Nav } from "@/components/system/Nav";
import { BagDrawer } from "@/components/system/BagDrawer";
import { BagProvider } from "@/components/system/BagProvider";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const ui = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AURELIAN — Every man has his own version of chaos.",
  description:
    "AURELIAN is a men's object house. Bracelets, wallets, journals, hats and numbered editions for men who refuse to live a cookie-cutter life. Individuality without noise.",
  openGraph: {
    title: "AURELIAN — Men's Objects / 001",
    description:
      "Objects for men who refuse to live a cookie-cutter life. Individuality without noise.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#070707",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${ui.variable}`}>
      <body className="grain bg-obsidian text-ivory antialiased">
        <BagProvider>
          <ExperienceShell />
          <Nav />
          {children}
          <BagDrawer />
        </BagProvider>
      </body>
    </html>
  );
}
