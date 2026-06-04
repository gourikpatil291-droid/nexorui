"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Share2, ExternalLink, Mail, Globe, MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Map out the team data
const teamMembers = [
  {
    name: "Ayush Choudhary",
    role: "Founder",
    image: "/faces/ayush.png",
    socials: [
      { icon: <Globe className="w-4 h-4" />, link: "#" },
      { icon: <Share2 className="w-4 h-4" />, link: "https://x.com/Nexoresha_Tech" },
      { icon: <ExternalLink className="w-4 h-4" />, link: "#" },
    ]
  },
  {
    name: "Aditya Choudhary",
    role: "Co-Founder",
    image: "/faces/aditya.png",
    socials: [
      { icon: <Globe className="w-4 h-4" />, link: "#" },
      { icon: <Share2 className="w-4 h-4" />, link: "https://x.com/Nexoresha_Tech" },
      { icon: <ExternalLink className="w-4 h-4" />, link: "#" },
    ]
  },
  {
    name: "Yusuf Kondkari",
    role: "Chief Technical Officer",
    image: "/faces/yusuf.png",
    socials: [
      { icon: <Globe className="w-4 h-4" />, link: "#" },
      { icon: <Share2 className="w-4 h-4" />, link: "https://x.com/Nexoresha_Tech" },
      { icon: <ExternalLink className="w-4 h-4" />, link: "#" },
    ]
  },
  {
    name: "Arpit Padhy",
    role: "Chief Operational Officer",
    image: "/faces/arpit.png",
    socials: [
      { icon: <Globe className="w-4 h-4" />, link: "#" },
      { icon: <Share2 className="w-4 h-4" />, link: "https://x.com/Nexoresha_Tech" },
      { icon: <ExternalLink className="w-4 h-4" />, link: "#" },
    ]
  },
  {
    name: "Hassan Patel",
    role: "Java Developer",
    image: "/faces/hassan.png",
    socials: [
      { icon: <Globe className="w-4 h-4" />, link: "#" },
      { icon: <Share2 className="w-4 h-4" />, link: "https://x.com/Nexoresha_Tech" },
      { icon: <ExternalLink className="w-4 h-4" />, link: "#" },
    ]
  },
  {
    name: "Kavya Narkar",
    role: "Front-End Developer",
    image: "/faces/kavya.png",
    socials: [
      { icon: <Globe className="w-4 h-4" />, link: "#" },
      { icon: <Share2 className="w-4 h-4" />, link: "https://x.com/Nexoresha_Tech" },
      { icon: <ExternalLink className="w-4 h-4" />, link: "#" },
    ]
  },
  {
    name: "Khushi Pandey",
    role: "HR Manager",
    image: "/faces/khushi.png",
    socials: [
      { icon: <Globe className="w-4 h-4" />, link: "#" },
      { icon: <Share2 className="w-4 h-4" />, link: "https://x.com/Nexoresha_Tech" },
      { icon: <ExternalLink className="w-4 h-4" />, link: "#" },
    ]
  },
  {
    name: "Sneha Kolindawel",
    role: "Chief Marketing Officer",
    image: "/faces/sneha.png",
    socials: [
      { icon: <MessageCircle className="w-4 h-4" />, link: "https://www.instagram.com/nexoresha/" },
    ]
  }
];

export default function TeamPage() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if ((window as any).preloaderFinished) {
        setIsReady(true);
      }
      const handlePreloader = () => setIsReady(true);
      window.addEventListener("preloader-done", handlePreloader);
      return () => {
        window.removeEventListener("preloader-done", handlePreloader);
      };
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={isReady ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="flex flex-col min-h-screen bg-maroon-black w-full overflow-x-hidden relative"
    >
      <Navbar />

      {/* Decorative background glows */}
      <div className="absolute top-[10%] left-[5%] w-[350px] h-[350px] rounded-full bg-maroon/10 blur-[130px] pointer-events-none" />
      <div className="absolute top-[35%] right-[5%] w-[300px] h-[300px] rounded-full bg-luxury-gold/5 blur-[120px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-36 pb-12 md:pt-44 md:pb-24">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          {/* Breadcrumbs */}
          <div className="flex items-center justify-center space-x-3 mb-8 text-[10px] md:text-xs font-display font-bold uppercase tracking-widest text-warm-beige/45 select-none text-center">
            <Link 
              href="/" 
              className="hover:text-luxury-gold transition-colors duration-300"
            >
              Homepage
            </Link>
            <span className="text-luxury-gold/30">/</span>
            <span className="text-luxury-gold">
              Team
            </span>
          </div>

          {/* Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold text-gradient-beige leading-[1.1] max-w-4xl mx-auto text-center mb-8"
          >
            Meet <span className="font-light">Our</span><br />Creative <span className="font-light">Team</span>
          </motion.h1>
          
          <div className="flex justify-center mt-12">
            <a 
              href="#team"
              className="inline-flex items-center justify-center px-8 py-3 rounded-full font-display font-bold uppercase tracking-widest text-xs glass-panel border border-warm-beige/10 hover:border-warm-beige/35 text-warm-beige hover:bg-warm-beige/5 transition-all duration-300 interactive-hover"
            >
              Our Team ↓
            </a>
          </div>
        </div>
      </section>

      {/* Team Grid Section */}
      <section id="team" className="relative py-16 md:py-24 border-t border-warm-beige/5 bg-maroon-black/30">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group relative flex flex-col items-center"
              >
                {/* Image Container */}
                <div className="w-full aspect-[4/5] relative rounded-3xl overflow-hidden glass-panel border border-warm-beige/10 mb-6 shadow-xl">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-center filter group-hover:scale-105 transition-all duration-700 ease-out"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-maroon-black via-maroon-black/60 to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-500" />
                  
                  {/* Overlay Content (Name + Role + Socials) */}
                  <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col items-center justify-end h-full">
                    <div className="translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out flex flex-col items-center w-full">
                      
                      {/* Info */}
                      <div className="text-center mb-5">
                        <h3 className="text-xl md:text-2xl font-display font-bold text-warm-beige mb-1 group-hover:text-luxury-gold transition-colors duration-300">
                          {member.name}
                        </h3>
                        <p className="text-[10px] md:text-xs font-display font-bold uppercase tracking-widest text-warm-beige/50">
                          {member.role}
                        </p>
                      </div>

                      {/* Social Icons */}
                      <div className="flex justify-center space-x-3 w-full">
                        {member.socials.map((social, sIdx) => (
                          <Link 
                            key={sIdx}
                            href={social.link}
                            target="_blank"
                            className="w-10 h-10 rounded-full glass-panel border border-warm-beige/20 flex items-center justify-center text-warm-beige hover:text-luxury-gold hover:border-luxury-gold/50 bg-maroon-black/80 hover:bg-maroon-black transition-all duration-300 interactive-hover"
                          >
                            {social.icon}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 md:py-32 border-t border-warm-beige/5">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <span className="text-[10px] font-display font-bold uppercase tracking-widest text-warm-beige/50 mb-6 block">
            Looking to make your mark? We'll help you turn your project into a success story.
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-gradient-beige mb-12 leading-tight">
            Ready to bring your <span className="font-light">ideas to</span> life? <br /> We're <span className="font-light">here to help</span>
          </h2>
          <div className="flex justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-10 py-4 rounded-full font-display font-bold uppercase tracking-widest text-xs bg-warm-beige text-maroon-black hover:bg-transparent hover:text-warm-beige border border-warm-beige transition-all duration-300 interactive-hover"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </motion.div>
  );
}
