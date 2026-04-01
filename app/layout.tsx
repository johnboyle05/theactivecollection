import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FavouritesProvider } from "@/components/favourites-provider";
import { SiteNav } from "@/components/site-nav";
import { getBrands } from "@/lib/brands";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Active Collection — Move Beyond Mainstream",
  description: "Emerging activewear brands curated for performance, comfort, and modern everyday style. Discover the best gym wear, running gear, and athleisure brands.",
  openGraph: {
    title: "The Active Collection — Move Beyond Mainstream",
    description: "Emerging activewear brands curated for performance, comfort, and modern everyday style.",
    type: "website",
    url: "https://theactivecollection.co",
    siteName: "The Active Collection",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Active Collection — Move Beyond Mainstream",
    description: "Emerging activewear brands curated for performance, comfort, and modern everyday style.",
  },
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
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-HCGQYF9W00" strategy="afterInteractive" />
        <Script id="ga4-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-HCGQYF9W00');
        `}</Script>
      </body>
    </html>
  );
}
