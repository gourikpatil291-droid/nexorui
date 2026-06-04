import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";
import ScrollToTop from "@/components/ScrollToTop";
import ParticleBackground from "@/components/ParticleBackground";
import Script from "next/script";
import React from "react";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NEXORESHA — Intelligent Digital Experiences",
  description: "We build AI-powered platforms, scalable web systems, immersive digital products, and futuristic experiences for next-generation businesses.",
  metadataBase: new URL("https://nexoresha.tech"),
  openGraph: {
    title: "NEXORESHA — Intelligent Digital Experiences",
    description: "Futuristic AI Agency creating luxury digital SaaS platforms and immersive 3D experiences.",
    type: "website",
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
      className={`${outfit.variable} ${plusJakarta.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body 
        className="min-h-full flex flex-col relative overflow-x-clip bg-maroon-black selection:bg-maroon selection:text-warm-beige"
        suppressHydrationWarning
      >
        <div id="google_translate_element" style={{ display: 'none' }}></div>
        
        {/* Preloader Intro Animation */}
        <Preloader />
        <ScrollToTop />

        {/* Cinematic Film Grain Overlay */}
        <div className="grain-overlay" />
        
        {/* Global 3D Particle Background */}
        <ParticleBackground />
        
        {/* Custom Glowing Cursor */}
        <CustomCursor />
        
        {/* Core App View */}
        <main className="flex-grow flex flex-col">{children}</main>
        
        {/* Google Translate Scripts */}
        <Script 
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" 
          strategy="afterInteractive" 
        />
        <Script id="google-translate-init" strategy="afterInteractive">
          {`
            function googleTranslateElementInit() {
              new google.translate.TranslateElement({
                pageLanguage: 'en',
                includedLanguages: 'en,mr,hi',
                autoDisplay: false
              }, 'google_translate_element');
            }
          `}
        </Script>
      </body>
    </html>
  );
}
