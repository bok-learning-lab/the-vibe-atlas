import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import { Nav } from "@/components/nav";
import "./globals.css";

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono-space",
});

export const metadata: Metadata = {
  title: "the vibe atlas",
  description: "a guide to vibe coding tools for students",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${spaceMono.variable} antialiased`}>
        <Nav />
        {children}
      </body>
    </html>
  );
}