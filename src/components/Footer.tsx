"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socials = [
    { 
      name: "Twitter", 
      href: "https://x.com/Nexoresha_Tech", 
      svg: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    },
    { 
      name: "LinkedIn", 
      href: "https://www.linkedin.com/in/nexoresha-technologies-9121763b7/", 
      svg: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      )
    },
    { 
      name: "Instagram", 
      href: "https://www.instagram.com/nexoresha/", 
      svg: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
        </svg>
      )
    }
  ];

  return (
    <footer className="w-full bg-maroon-black pt-16 pb-12 overflow-hidden border-t border-warm-beige/5">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Animated Line Separator with Shifting Gold Highlight */}
        <div className="relative w-full h-[1px] bg-warm-beige/5 mb-16 overflow-hidden">
          <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-transparent via-luxury-gold to-transparent animate-marquee" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 items-start mb-16">
          
          {/* Column 1: Branding */}
          <div className="flex flex-col md:col-span-2">
            <a href="/" className="flex items-center space-x-3 mb-6 group interactive-hover">
              <img 
                src="/logo.png" 
                alt="NEXORESHA Logo" 
                className="w-16 h-16 object-contain transition-all duration-500 group-hover:scale-115 group-hover:rotate-12 group-hover:drop-shadow-[0_0_12px_rgba(168,85,247,0.85)]"
              />
              <span className="text-xl md:text-2xl font-display font-bold tracking-widest text-gradient-beige transition-all duration-300 group-hover:text-luxury-gold group-hover:translate-x-1">
                NEXORESHA
              </span>
            </a>
            <p className="text-xs md:text-sm font-sans text-warm-beige/45 max-w-sm leading-relaxed">
              We design and engineer luxury web platforms, automated cloud infrastructures, and interactive 3D SaaS products for tomorrow's businesses.
            </p>
          </div>

          {/* Column 2: Studio links */}
          <div className="flex flex-col">
            <h5 className="text-[10px] font-display font-bold uppercase tracking-widest text-luxury-gold mb-6">
              Navigation
            </h5>
            <div className="flex flex-col space-y-3">
              <Link href="/" className="text-xs font-sans text-warm-beige/50 hover:text-warm-beige transition-colors duration-300 interactive-hover">Home</Link>
              <Link href="/services" className="text-xs font-sans text-warm-beige/50 hover:text-warm-beige transition-colors duration-300 interactive-hover">Services</Link>
              <Link href="/portfolio" className="text-xs font-sans text-warm-beige/50 hover:text-warm-beige transition-colors duration-300 interactive-hover">Portfolio</Link>
              <Link href="/team" className="text-xs font-sans text-warm-beige/50 hover:text-warm-beige transition-colors duration-300 interactive-hover">Team</Link>
              <Link href="/contact" className="text-xs font-sans text-warm-beige/50 hover:text-warm-beige transition-colors duration-300 interactive-hover">Contact</Link>
            </div>
          </div>

          {/* Column 3: Socials */}
          <div className="flex flex-col">
            <h5 className="text-[10px] font-display font-bold uppercase tracking-widest text-luxury-gold mb-6">
              Social Links
            </h5>
            <div className="flex items-center space-x-4">
              {socials.map((soc, idx) => {
                return (
                  <a
                    key={idx}
                    href={soc.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full flex items-center justify-center bg-deep-gray border border-warm-beige/10 hover:border-warm-beige/45 text-warm-beige/65 hover:text-warm-beige shadow-sm transition-all duration-300 hover:scale-115 interactive-hover"
                    aria-label={soc.name}
                  >
                    {soc.svg}
                  </a>
                );
              })}
            </div>
          </div>

        </div>

        {/* Footer Base */}
        <div className="pt-8 border-t border-warm-beige/5 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-[10px] font-sans text-warm-beige/35 text-center sm:text-left select-none">
            © Copyright 2026 - Nexoresha Technologies. All Rights Reserved.
          </div>

          {/* Scroll to Top Arrow Button */}
          <button
            onClick={scrollToTop}
            className="flex items-center space-x-2 text-[10px] font-display font-bold uppercase tracking-widest text-warm-beige/40 hover:text-warm-beige transition-colors duration-300 group interactive-hover"
            aria-label="Scroll to top"
          >
            <span>Scroll To Top</span>
            <div className="p-1.5 rounded-full border border-warm-beige/10 group-hover:border-warm-beige/35 transition-colors duration-300">
              <ArrowUp className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </div>
          </button>
        </div>

      </div>
    </footer>
  );
}
