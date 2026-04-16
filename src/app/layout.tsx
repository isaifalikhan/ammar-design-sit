import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import localFont from "next/font/local";
import { Cormorant_Garamond, DM_Sans, Poppins } from "next/font/google";
import "./globals.css";
import Footer from "./footer/page";
import Navbar from "./navbar/page";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

const powerGrotesk = localFont({
  src: [
    { path: "../../public/TTF/PowerGrotesk-Light.ttf", weight: "300", style: "normal" },
    { path: "../../public/TTF/PowerGrotesk-Regular.ttf", weight: "400", style: "normal" },
    { path: "../../public/TTF/PowerGrotesk-Medium.ttf", weight: "500", style: "normal" },
    { path: "../../public/TTF/PowerGrotesk-Bold.ttf", weight: "700", style: "normal" },
    { path: "../../public/TTF/PowerGrotesk-UltraBold.ttf", weight: "800", style: "normal" },
    { path: "../../public/TTF/PowerGrotesk-Black.ttf", weight: "900", style: "normal" },
    { path: "../../public/TTF/PowerGrotesk-Italic.ttf", weight: "400", style: "italic" },
  ],
  variable: "--font-power-grotesk",
});

export const metadata: Metadata = {
  title: "Ammar Designz | Creative Studio",
  description:
    "Ammar Designz Creative Studio brings books to life with expert cover design, interior layout, eBooks, and print-ready formatting.",
  // Favicon: use `src/app/icon.png` + `apple-icon.png` (App Router file convention — more reliable than linking /image.png alone).
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${cormorant.variable} ${dmSans.variable} ${powerGrotesk.variable} antialiased bg-[#fdfcfa] text-[#1f2933] font-sans`}
      >
        <div className="min-h-screen flex flex-col w-full max-w-[100vw] overflow-x-hidden">
          <Navbar />
          <main className="w-full flex-1 max-w-full overflow-x-hidden">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
