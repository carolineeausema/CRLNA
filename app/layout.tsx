import type { Metadata } from "next";
import { Hanken_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-hanken",
  display: "swap",
});

const grovana = localFont({
  src: "./fonts/Grovana-Medium-Rough.otf",
  variable: "--font-grovana",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CRLNA",
  description: "Strategy and design in critical spaces.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${hanken.variable} ${grovana.variable}`}><body>{children}</body></html>
  );
}
