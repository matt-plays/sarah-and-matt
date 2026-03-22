import type { Metadata } from "next";
import { Instrument_Sans, DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  weight: ["400", "500", "600"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  weight: ["700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sarah & Matt — August 28, 2026",
  description: "Join us as we celebrate our wedding at Excelsior, Lancaster, PA.",
  openGraph: {
    title: "Sarah & Matt — August 28, 2026",
    description: "Join us as we celebrate our wedding at Excelsior, Lancaster, PA.",
    siteName: "sarahandmatt.wedding",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${instrumentSans.variable} ${dmSans.variable}`}>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
