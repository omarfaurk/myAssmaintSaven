import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Marquee from "@/component/Marquee";
import Footer from "@/component/Footer";
import Navbar from "@/component/Navbar";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে",
  description: "দৈনন্দিন বাজারের পণ্যের আজকের দর ও দামের পরিবর্তন দেখুন।",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      suppressHydrationWarning
      lang="bn"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
        cz-shortcut-listen="true"
        className="flex min-h-full flex-col bg-[#f6f8f6] text-slate-900"
      >
        <ToastContainer />
        <Navbar />
        <Marquee />
        <main className="flex-1">
          {children}</main>
        <Footer />
      </body>
    </html>
  );
}
