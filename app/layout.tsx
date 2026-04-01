import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FavouritesProvider } from "@/components/favourites-provider";
import { SiteNav } from "@/components/site-nav";
import { getBrands } from "@/lib/brands";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Move Beyond Mainstream",
  description: "Emerging activewear brands curated for performance, comfort, and modern everyday style.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const brands = await getBrands();

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <FavouritesProvider>
          <SiteNav brands={brands} />
          {children}
        </FavouritesProvider>
        <Analytics />
      </body>
    </html>
  );
}
