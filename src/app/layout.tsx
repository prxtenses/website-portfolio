import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import LiquidBackground from "@/components/ui/LiquidBackground";
import AppProviders from "@/components/layout/AppProviders";
import AnimatedTitle from "@/components/layout/AnimatedTitle";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sonka — Full Stack Developer & Reverse Engineer",
  description:
    "Full Stack Developer with expertise in React, Node.js, C++, Assembly and Reverse Engineering. I build software at every layer of the stack.",
  keywords: [
    "developer", "portfolio", "react", "node.js", "c++", "reverse engineering", "assembly", "full stack"
  ],
  authors: [{ name: "Sonka" }],
  metadataBase: new URL("https://sonka.dev"),
  icons: {
    icon: [
      { url: "/images/favicon.png", sizes: "128x128", type: "image/png" },
    ],
    shortcut: "/images/favicon.png",
    apple: "/images/favicon.png",
  },
  openGraph: {
    title: "Sonka — Full Stack Developer",
    description: "Full Stack Developer with expertise in React, Node.js, C++, Assembly and Reverse Engineering.",
    type: "website",
  },
};

export const viewport = {
  themeColor: "#0a0a0c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} dark h-full antialiased`}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <head>
        <link
          rel="preload"
          href="/images/logo.webp"
          as="image"
          type="image/webp"
          fetchPriority="high"
        />
        {}
        <style>{`
          @font-face {
            font-family: 'Space Grotesk';
            font-display: optional;
          }
        `}</style>
      </head>
      <body 
        className="min-h-screen bg-[#0a0a0c] text-foreground selection:bg-primary/30"
        suppressHydrationWarning
        style={{ position: "relative" }}
      >
        <AnimatedTitle />
        <LiquidBackground />
        <AppProviders>
          {children}
        </AppProviders>
        
        {}
        <svg className="pointer-events-none fixed h-0 w-0 hidden md:block" aria-hidden="true">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </svg>
      </body>
    </html>
  );
}
