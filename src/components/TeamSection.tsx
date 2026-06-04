"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

export default function TeamSection() {
  const leaders: TeamMember[] = [
    {
      name: "Ayush Choudhary",
      role: "Founder",
      image: "/img/faces/ayush.png",
    },
    {
      name: "Yusuf Kondkari",
      role: "Chief Technical Officer",
      image: "/img/faces/yusuf.png",
    },
    {
      name: "Aditya Choudhary",
      role: "Co-Founder",
      image: "/img/faces/aditya.png",
    },
    {
      name: "Arpit Padhy",
      role: "Chief Operational Officer",
      image: "/img/faces/arpit.png",
    },
  ];

  return (
    <section id="team" className="relative w-full py-24 md:py-32 bg-maroon-black/30 border-t border-warm-beige/5 overflow-hidden">
      {/* Background glow highlights */}
      <div className="absolute top-[20%] right-[10%] w-[450px] h-[450px] rounded-full bg-maroon/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[10%] w-[450px] h-[450px] rounded-full bg-luxury-gold/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Title and Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex flex-col justify-center"
          >
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass-panel border-warm-beige/10 mb-6 self-start">
              <Sparkles className="w-3.5 h-3.5 text-luxury-gold" />
              <span className="text-[10px] font-display font-bold uppercase tracking-widest text-warm-beige/85">
                Our Team
              </span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-display font-bold text-gradient-beige mb-8 leading-tight">
              Meet The <br />
              <span className="font-light italic text-warm-beige/70">Leaders</span>
            </h2>
            
            <p className="text-sm font-sans text-warm-beige/60 mb-6 leading-relaxed">
              Our Board of Directors is a group of experienced leaders who bring strong expertise in technology, business, and strategy. They guide the company with a clear vision, ensuring long-term growth, innovation, and value for our clients and partners.
            </p>
            
            <p className="text-sm font-sans text-warm-beige/60 mb-10 leading-relaxed">
              With their leadership and industry insight, the board supports key decisions, promotes ethical practices, and helps shape a strong and sustainable future for the organization.
            </p>
            
            <div className="mb-12">
              <Link
                href="/team"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-full text-xs font-display font-bold uppercase tracking-widest bg-warm-beige text-maroon-black border border-warm-beige hover:bg-transparent hover:text-warm-beige transition-all duration-300 group interactive-hover"
              >
                <span>Read more</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
            
            <h4 className="text-lg md:text-xl font-display text-warm-beige/90 tracking-wide font-semibold border-t border-warm-beige/10 pt-8">
              <span className="font-light italic text-luxury-gold">We</span> deliver <br />
              <span className="font-light italic text-luxury-gold">exceptional</span> results.
            </h4>
          </motion.div>

          {/* Right Column: Cards Grid */}
          <div className="lg:col-span-7 flex flex-col">
            {/* Founders label */}
            <div className="text-[10px] font-display font-bold uppercase tracking-widest text-luxury-gold/50 mb-6 flex items-center justify-end">
              <span className="text-luxury-gold mr-1.5">*</span> The founders of our agency
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {leaders.map((member, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: idx * 0.15 }}
                  className="group relative rounded-2xl overflow-hidden glass-card aspect-[4/5] flex flex-col justify-end interactive-hover shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
                >
                  {/* Photo container */}
                  <div className="absolute inset-0 w-full h-full">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-110 filter brightness-[0.85] contrast-[1.05]"
                    />
                    
                    {/* Glowing bottom overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-maroon-black via-maroon-black/30 to-transparent opacity-90 transition-all duration-500 group-hover:from-maroon/80" />
                    
                    {/* Gold lighting line effect on top of card inside card bounds */}
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-luxury-gold/30 to-transparent transition-all duration-500 group-hover:via-luxury-gold" />
                  </div>

                  {/* Text details */}
                  <div className="relative z-10 p-6 md:p-8 flex flex-col justify-end w-full">
                    <h3 className="text-lg md:text-xl font-display font-bold text-warm-beige mb-2 tracking-wide group-hover:text-luxury-gold transition-colors duration-300">
                      {member.name}
                    </h3>
                    <p className="text-xs font-sans text-warm-beige/50 group-hover:text-warm-beige/85 transition-colors duration-300">
                      {member.role}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
