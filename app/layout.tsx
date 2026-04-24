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
