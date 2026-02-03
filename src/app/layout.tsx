import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Poliklinika Kinetis",
  description: "Medicinska poliklinika Kinetis",
  viewport: null,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hr">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
