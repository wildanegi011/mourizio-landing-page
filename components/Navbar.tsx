"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const links = [
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Services", href: "#services" },
    { name: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className="fixed top-8 left-0 right-0 z-50 flex justify-center px-6"
            >
                <div
                    className={cn(
                        "flex items-center gap-2 p-2 transition-all duration-300 rounded-full border border-white/10 glass",
                        scrolled || isOpen ? "bg-black/40 backdrop-blur-xl py-2 px-6" : "bg-transparent"
                    )}
                >
                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-1">
                        {links.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="px-4 py-2 text-sm font-medium transition-colors rounded-full text-secondary hover:text-white hover:bg-white/5"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 text-secondary hover:text-white transition-colors"
                    >
                        {isOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>

                    <div className="h-4 w-[1px] bg-white/10 mx-2" />

                    <a
                        href="#contact"
                        className="px-5 py-2 text-sm font-medium transition-all bg-white rounded-full text-black hover:bg-white/90"
                    >
                        Let&apos;s talk
                    </a>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-x-6 top-24 z-40 md:hidden overflow-hidden rounded-3xl border border-white/10 bg-black/80 backdrop-blur-2xl p-6"
                    >
                        <div className="flex flex-col gap-4">
                            {links.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="p-4 text-lg font-medium text-secondary hover:text-white hover:bg-white/5 rounded-2xl transition-all"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
