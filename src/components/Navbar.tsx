"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();

  const [expanded, setExpanded] = useState<string | null>(null);

  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('EN');

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const match = document.cookie.match(/googtrans=\/en\/([a-z]{2})/);
      if (match && match[1]) {
        const code = match[1];
        if (code === 'mr') setCurrentLang('MR');
        else if (code === 'hi') setCurrentLang('HI');
        else setCurrentLang('EN');
      }
    }
  }, []);

  const changeLanguage = (langCode: string, display: string) => {
    setLangDropdownOpen(false);
    document.cookie = `googtrans=/en/${langCode}; path=/`;
    document.cookie = `googtrans=/en/${langCode}; domain=.${window.location.hostname}; path=/`;
    setCurrentLang(display);
    window.location.reload();
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
    { 
      name: "Others", 
      href: "#", 
      subItems: [
        { name: "Team", href: "/team" },
        { name: "Contact", href: "/contact" }
      ]
    },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-4 px-4 md:px-6 flex items-center justify-between pointer-events-none"
      >
        {/* Logo / Branding */}
        <Link
          href="/"
          className="flex flex-col items-center space-y-1 group interactive-hover pointer-events-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.img
            src="/logo.png"
            alt="NEXORESHA Logo"
            className="w-14 h-14 md:w-16 md:h-16 object-contain"
            animate={isHovered ? {
              scale: 1.1,
              rotate: 12,
              filter: "drop-shadow(0 0 16px rgba(168, 85, 247, 0.95)) drop-shadow(0 0 28px rgba(168, 85, 247, 0.5))",
            } : {
              scale: 1,
              rotate: 0,
              filter: "drop-shadow(0 0 4px rgba(168, 85, 247, 0.3))",
            }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          />
          <motion.span
            className="text-xs md:text-sm font-display font-bold text-gradient-beige uppercase tracking-[0.15em]"
            animate={isHovered ? {
              y: -1,
              letterSpacing: "0.25em",
              filter: "brightness(1.25) drop-shadow(0 0 8px rgba(168, 85, 247, 0.4))",
            } : {
              y: 0,
              letterSpacing: "0.15em",
              filter: "brightness(1)",
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            NEXORESHA
          </motion.span>
          </Link>

          {/* Right Side: Language Switcher + Menu Toggle */}
          <div className="flex items-center space-x-2 pointer-events-auto">
            
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="px-3 py-1.5 rounded-full border border-warm-beige/10 bg-maroon-black/30 backdrop-blur-md flex items-center space-x-2 text-xs font-display font-bold text-warm-beige hover:border-warm-beige/40 transition-all interactive-hover"
              >
                <span>{currentLang}</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {langDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full mt-2 right-0 flex flex-col bg-maroon-black/95 backdrop-blur-md border border-warm-beige/10 rounded-xl overflow-hidden shadow-2xl py-2 w-32 z-50"
                  >
                    <button onClick={() => changeLanguage('en', 'EN')} className="px-4 py-2 text-left text-xs font-display text-warm-beige hover:bg-warm-beige/10 transition-colors">English</button>
                    <button onClick={() => changeLanguage('mr', 'MR')} className="px-4 py-2 text-left text-xs font-display text-warm-beige hover:bg-warm-beige/10 transition-colors">मराठी</button>
                    <button onClick={() => changeLanguage('hi', 'HI')} className="px-4 py-2 text-left text-xs font-display text-warm-beige hover:bg-warm-beige/10 transition-colors">हिंदी</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Menu Toggle Button (3 Dash / Hamburger Menu) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-warm-beige hover:text-luxury-gold transition-colors duration-300 interactive-hover"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
      </motion.header>

      {/* Drawer Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-maroon-black/95 backdrop-blur-lg flex flex-col items-center justify-center space-y-8 px-6"
          >
            <div className="w-full flex flex-col items-center space-y-6">
              {navLinks.map((link) => (
                link.subItems ? (
                  <div key={link.name} className="flex flex-col items-center w-full">
                    <button
                      onClick={() => setExpanded(expanded === link.name ? null : link.name)}
                      className="text-xl font-display font-medium text-warm-beige/70 hover:text-warm-beige transition-colors duration-300 py-2 flex items-center space-x-2"
                    >
                      <span>{link.name}</span>
                      <svg className={`w-4 h-4 transition-transform ${expanded === link.name ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </button>
                    <AnimatePresence>
                      {expanded === link.name && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="flex flex-col items-center space-y-4 pt-4 overflow-hidden"
                        >
                          {link.subItems.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              onClick={() => {
                                setMobileMenuOpen(false);
                                setExpanded(null);
                              }}
                              className="text-lg font-display text-warm-beige/50 hover:text-luxury-gold transition-colors duration-300"
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setExpanded(null);
                    }}
                    className="text-xl font-display font-medium text-warm-beige/70 hover:text-warm-beige transition-colors duration-300 py-2"
                  >
                    {link.name}
                  </Link>
                )
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
