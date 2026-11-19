import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Adam Ragač | Developer Portfolio",
  description:
    "Programmer, instructor, and cybersecurity student from Prague. Building web apps, mobile solutions, and AI models.",
  keywords: [
    "Adam Ragač",
    "developer",
    "portfolio",
    "cybersecurity",
    "web development",
    "Flutter",
    "TypeScript",
    "React",
    "Next.js",
    "Prague",
  ],
  authors: [{ name: "Adam Ragač" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
