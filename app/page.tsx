"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Hero from "@/components/Hero";
import ProjectGrid from "@/components/ProjectGrid";
import About from "@/components/About";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import EdgeNav from "@/components/EdgeNav";
import { cn } from "@/lib/utils";

import { X, Youtube, Instagram, MessageCircle, Menu } from "lucide-react";

type Section = "home" | "about" | "projects" | "services" | "contact";

const sectionConfig: Record<Section, { component: React.FC; x: string; y: string }> = {
  home: { component: Hero, x: "0%", y: "0%" },
  about: { component: About, x: "0%", y: "-100%" },
  projects: { component: ProjectGrid, x: "-100%", y: "0%" },
  services: { component: Services, x: "0%", y: "100%" },
  contact: { component: Contact, x: "100%", y: "0%" },
};

const socialLinks = [
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Youtube, href: "https://youtube.com", label: "Youtube" },
  { icon: MessageCircle, href: "https://wa.me/123456789", label: "WhatsApp" },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [direction, setDirection] = useState({ x: "0%", y: "0%" });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavigate = (section: Section) => {
    setIsMobileMenuOpen(false);
    if (section === activeSection) {
      setActiveSection("home");
      setDirection({ x: "0%", y: "0%" });
    } else {
      setActiveSection(section);
      setDirection(sectionConfig[section]);
    }
  };

  const ActiveComponent = sectionConfig[activeSection].component;

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-background">
      <AnimatePresence>
        {activeSection === "home" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <EdgeNav activeSection={activeSection} onNavigate={handleNavigate} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial={{
            opacity: 0,
            x: activeSection === "home" ? "0%" : sectionConfig[activeSection].x,
            y: activeSection === "home" ? "0%" : sectionConfig[activeSection].y
          }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{
            opacity: 0,
            x: activeSection === "home" ? "0%" : sectionConfig[activeSection].x,
            y: activeSection === "home" ? "0%" : sectionConfig[activeSection].y
          }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <ActiveComponent />
        </motion.div>
      </AnimatePresence>

      {/* Floating UI Elements */}
      <div className="fixed top-8 left-8 z-9999">
        <button
          onClick={() => handleNavigate("home")}
          className="relative w-10 h-10 flex items-center justify-center group"
          aria-label="Home"
        >
          <div className="absolute inset-0 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg group-hover:bg-white/10 group-hover:border-accent/50 transition-all duration-300" />
          <svg width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10">
            <path d="M20 2L38 20L20 38L2 20L20 2Z" stroke="white" strokeWidth="2.5" />
            <path d="M20 10L30 20L20 30L10 20L20 10Z" fill="#00FFF2" fillOpacity="0.6" />
          </svg>
        </button>
      </div>

      {/* Mobile Hamburger Button - Right Aligned */}
      <div className="fixed top-8 right-8 z-9999 md:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full hover:bg-white/10 transition-all text-white"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {activeSection !== "home" && !isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 20 }}
            className="fixed top-8 right-8 z-9999 hidden md:block"
          >
            <button
              onClick={() => {
                handleNavigate("home");
              }}
              className="p-3 bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-full hover:bg-accent hover:text-black transition-all group"
            >
              <X size={24} className="group-hover:rotate-90 transition-transform duration-500" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(24px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-9998 bg-black/60 md:hidden flex items-center justify-center p-8"
          >
            <div className="flex flex-col items-center gap-8 w-full max-w-sm">
              {(["about", "projects", "services", "contact"] as Section[]).map((section) => (
                <button
                  key={section}
                  onClick={() => handleNavigate(section)}
                  className={cn(
                    "text-4xl font-black uppercase tracking-tighter transition-all hover:text-accent",
                    activeSection === section ? "text-accent" : "text-white"
                  )}
                >
                  {section === "projects" ? "Portfolio" : section}
                </button>
              ))}

              <div className="h-px w-24 bg-white/10 mt-8" />

              <div className="flex gap-8">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    className="text-white/40 hover:text-white transition-colors"
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
