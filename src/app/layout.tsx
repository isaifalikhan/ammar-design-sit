import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./footer/page";
import Navbar from "./navbar/page";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ammar Designz | Creative Studio",
  description:
    "Ammar Designz Creative Studio brings books to life with expert cover design, interior layout, eBooks, and print-ready formatting.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#111111] text-[#1f2933]`}
      >
        <div className="min-h-screen flex flex-col items-center">
        <Navbar />
          <main className="w-full flex-1 flex justify-center bg-[#f5f5f5]">
            <div className="w-full max-w-[1400px] px-4 sm:px-6 md:px-8 py-10 sm:py-12 md:py-16">
              {children}
            </div>
          </main>
        <Footer/>
        </div>
      </body>
    </html>
  );
}
