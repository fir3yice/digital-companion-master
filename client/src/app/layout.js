import { Francois_One, Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const francois = Francois_One({ subsets: ["latin"], weight: "400", variable: "--font-francois"});

export const metadata = {
  title: "Limbotomy Digital Companion",
  description: "A digital companion for Limbotomy",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${francois.variable}`}>{children}</body>
    </html>
  );
}
