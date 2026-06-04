"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Sparkles } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [activeField, setActiveField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      
      // Reset success state after a few seconds
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="relative w-full py-24 md:py-32 bg-maroon-black overflow-hidden">
      {/* Soft ambient glowing background */}
      <div className="absolute bottom-0 right-[15%] w-[350px] h-[350px] rounded-full bg-maroon/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-[10%] left-[5%] w-[250px] h-[250px] rounded-full bg-warm-beige/5 blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Text & Info Column */}
          <div className="flex flex-col">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass-panel border-warm-beige/10 mb-4 w-fit">
              <Sparkles className="w-3.5 h-3.5 text-luxury-gold" />
              <span className="text-[10px] font-display font-bold uppercase tracking-widest text-warm-beige/85">
                Get In Touch
              </span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-display font-bold text-gradient-beige mb-6 leading-tight">
              Ready to Build the Future?
            </h2>
            
            <p className="text-sm md:text-base font-sans text-warm-beige/65 mb-8 leading-relaxed max-w-md">
              Whether you need an immersive 3D interface, automated cloud system, or a custom AI deployment, we are ready to bring your vision to life.
            </p>

            {/* Email Contact Detail */}
            <div className="mt-8 pt-8 border-t border-warm-beige/10 flex flex-col space-y-4">
              <div>
                <div className="text-[10px] font-display font-bold uppercase tracking-widest text-warm-beige/40 mb-1">
                  General Inquiries
                </div>
                <a 
                  href="mailto:hello@nexoresha.tech" 
                  className="text-base md:text-lg font-display text-warm-beige hover:text-luxury-gold transition-colors duration-300 interactive-hover"
                >
                  hello@nexoresha.tech
                </a>
              </div>
            </div>
          </div>

          {/* Right Form Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full glass-card p-8 md:p-10 rounded-3xl border border-warm-beige/10 relative overflow-hidden"
          >
            {/* Ambient inner form glows */}
            <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-luxury-gold/5 blur-2xl" />

            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              
              {/* Name Input Group */}
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  onFocus={() => setActiveField("name")}
                  onBlur={() => setActiveField(null)}
                  required
                  autoComplete="off"
                  className="w-full bg-transparent border-b border-warm-beige/20 focus:border-warm-beige text-warm-beige py-3 px-1 text-sm font-sans focus:outline-none transition-all duration-300"
                />
                <label
                  htmlFor="name"
                  className={`absolute left-1 top-3 text-xs md:text-sm font-sans text-warm-beige/40 pointer-events-none transition-all duration-300 ${
                    activeField === "name" || formData.name
                      ? "-translate-y-6 text-[10px] tracking-widest uppercase text-luxury-gold"
                      : ""
                  }`}
                >
                  Your Name
                </label>
              </div>

              {/* Email Input Group */}
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  onFocus={() => setActiveField("email")}
                  onBlur={() => setActiveField(null)}
                  required
                  autoComplete="off"
                  className="w-full bg-transparent border-b border-warm-beige/20 focus:border-warm-beige text-warm-beige py-3 px-1 text-sm font-sans focus:outline-none transition-all duration-300"
                />
                <label
                  htmlFor="email"
                  className={`absolute left-1 top-3 text-xs md:text-sm font-sans text-warm-beige/40 pointer-events-none transition-all duration-300 ${
                    activeField === "email" || formData.email
                      ? "-translate-y-6 text-[10px] tracking-widest uppercase text-luxury-gold"
                      : ""
                  }`}
                >
                  Your Email Address
                </label>
              </div>

              {/* Message Input Group */}
              <div className="relative">
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  onFocus={() => setActiveField("message")}
                  onBlur={() => setActiveField(null)}
                  required
                  rows={4}
                  className="w-full bg-transparent border-b border-warm-beige/20 focus:border-warm-beige text-warm-beige py-3 px-1 text-sm font-sans focus:outline-none transition-all duration-300 resize-none"
                />
                <label
                  htmlFor="message"
                  className={`absolute left-1 top-3 text-xs md:text-sm font-sans text-warm-beige/40 pointer-events-none transition-all duration-300 ${
                    activeField === "message" || formData.message
                      ? "-translate-y-6 text-[10px] tracking-widest uppercase text-luxury-gold"
                      : ""
                  }`}
                >
                  Tell Us About Your Project
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center space-x-2.5 py-4 rounded-full font-display font-bold uppercase tracking-widest text-xs bg-warm-beige text-maroon-black border border-warm-beige hover:bg-transparent hover:text-warm-beige transition-all duration-300 group interactive-hover"
              >
                {isSubmitting ? (
                  <span>Sending Brief...</span>
                ) : submitted ? (
                  <span>Message Sent Successfully</span>
                ) : (
                  <>
                    <span>Submit Project Brief</span>
                    <Send className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </>
                )}
              </button>

            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
