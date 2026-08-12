import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  metadataBase: new URL("https://sarahandmatt.wedding"),
  title: "Sarah & Matt — August 28, 2026",
  description: "Join us as we celebrate our wedding at Excelsior, Lancaster, PA.",
  // The share image itself is NOT listed here. It comes from the app/opengraph-image.png
  // and app/twitter-image.png file conventions, which always win over an `images` entry
  // in this object — listing it in both places let the two copies drift apart, which is
  // how the old colourway kept getting served. Next hashes the file's contents into the
  // emitted URL, so replacing the file busts every downstream cache on its own.
  openGraph: {
    type: "website",
    url: "https://sarahandmatt.wedding",
    title: "Sarah & Matt — August 28, 2026",
    description: "Join us as we celebrate our wedding at Excelsior, Lancaster, PA.",
    siteName: "sarahandmatt.wedding",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sarah & Matt — August 28, 2026",
    description: "Join us as we celebrate our wedding at Excelsior, Lancaster, PA.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ backgroundColor: "#EAC5C0" }}>
      <head>
        {/* Blush is hard-coded here rather than read from --blush on purpose: this
            inline style paints the first frame, which happens before globals.css
            has been parsed and therefore before any custom property exists. Without
            it the browser paints its default white canvas first. Keep in sync with
            --blush in globals.css. */}
        {/* Preload invite card SVG colour maps — InviteCanvas needs both before
            it can decode textures and signal onReady, so fetching early cuts the
            visible loading-bar time. */}
        <link rel="preload" href="/images/hero-invite-front.svg" as="image" type="image/svg+xml" />
        <link rel="preload" href="/images/hero-invite-back.svg" as="image" type="image/svg+xml" />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
