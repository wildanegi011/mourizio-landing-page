"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Hero from "@/components/Hero";
import ProjectGrid from "@/components/ProjectGrid";
import About from "@/components/About";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import EdgeNav from "@/components/EdgeNav";

import { X, Youtube, Instagram, MessageCircle } from "lucide-react";

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

  const handleNavigate = (section: Section) => {
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
          className="text-xl font-black border-2 border-white px-3 py-1 hover:bg-white hover:text-black transition-all"
        >
          W
        </button>
      </div>

      <AnimatePresence>
        {activeSection !== "home" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 20 }}
            className="fixed top-8 right-8 z-9999"
          >
            <button
              onClick={() => handleNavigate("home")}
              className="p-3 bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-full hover:bg-accent hover:text-black transition-all group"
            >
              <X size={24} className="group-hover:rotate-90 transition-transform duration-500" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
