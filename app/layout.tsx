import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

export const metadata: Metadata = {
  title: "Sarah & Matt — August 28, 2026",
  description: "Join us as we celebrate our wedding at Excelsior, Lancaster, PA.",
  openGraph: {
    title: "Sarah & Matt — August 28, 2026",
    description: "Join us as we celebrate our wedding at Excelsior, Lancaster, PA.",
    siteName: "sarahandmatt.wedding",
    images: [
      {
        url: "/images/wedding-site--meta-image.png",
        width: 1200,
        height: 630,
        alt: "Sarah Petrokonis & Matt Plays — Friday, August 28th, 2026",
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
    <html lang="en">
      <body suppressHydrationWarning>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
