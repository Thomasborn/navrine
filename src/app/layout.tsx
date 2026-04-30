import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://navrine.com'),
  title: "Navrine Studio | High-End AI Infrastructure & Digital Agency",
  description: "A multi-disciplinary digital agency crafting high-end AI infrastructure, scalable web applications, data-driven systems, and brand identities that are impossible to ignore.",
  openGraph: {
    title: "Navrine Studio | High-End AI Infrastructure & Digital Agency",
    description: "Crafting high-end AI infrastructure and brand identities that are impossible to ignore.",
    url: "https://navrine.com",
    siteName: "Navrine",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Navrine Studio",
    description: "High-End AI Infrastructure & Digital Agency",
    images: ["/images/og-image.jpg"],
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#050505] text-white">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
