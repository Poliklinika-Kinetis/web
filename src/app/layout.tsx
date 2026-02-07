import type { Metadata } from "next";
import { Source_Sans_3, Playfair_Display } from "next/font/google";
import CookieBanner from "@/components/CookieBanner";
import "./globals.css";

const sourceSans = Source_Sans_3({
  subsets: ["latin", "latin-ext"],
  variable: "--font-source-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://poliklinika-kinetis.hr"),
  title: "Poliklinika Kinetis – Fizikalna terapija i rehabilitacija",
  description: "Poliklinika Kinetis – fizikalna terapija i rehabilitacija u Zagrebu. Individualan pristup, stručna dijagnostika i tretmani za brži oporavak.",
  viewport: null,
  alternates: {
    canonical: "https://poliklinika-kinetis.hr",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Poliklinika Kinetis – Fizikalna terapija i rehabilitacija",
    description: "Fizikalna terapija i rehabilitacija u Zagrebu. Individualan pristup, stručna dijagnostika i tretmani za brži oporavak.",
    url: "https://poliklinika-kinetis.hr",
    siteName: "Poliklinika Kinetis",
    locale: "hr_HR",
    type: "website",
    images: [
      {
        url: "/images/hero.jpg",
        width: 1300,
        height: 640,
        alt: "Poliklinika Kinetis",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hr" className={`${sourceSans.variable} ${playfair.variable}`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalBusiness",
              name: "Poliklinika Kinetis",
              description:
                "Fizikalna terapija i rehabilitacija u Zagrebu. Individualan pristup, stručna dijagnostika i tretmani za brži oporavak.",
              url: "https://poliklinika-kinetis.hr",
              telephone: "+385958189160",
              email: "kinetisfizikalna@gmail.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Ružmarinka 23",
                addressLocality: "Zagreb",
                postalCode: "10000",
                addressCountry: "HR",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 45.815,
                longitude: 15.9819,
              },
              medicalSpecialty: "PhysicalTherapy",
              image: "https://poliklinika-kinetis.hr/images/hero.jpg",
            }),
          }}
        />
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
