"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const links = [
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Services", href: "#services" },
    { name: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-8 left-0 right-0 z-50 flex justify-center px-6"
        >
            <div
                className={cn(
                    "flex items-center gap-2 p-2 transition-all duration-300 rounded-full border border-white/10 glass",
                    scrolled ? "bg-black/40 backdrop-blur-xl py-2 px-6" : "bg-transparent"
                )}
            >
                <div className="flex items-center gap-1">
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

                <div className="h-4 w-[1px] bg-white/10 mx-2" />

                <a
                    href="#contact"
                    className="px-5 py-2 text-sm font-medium transition-all bg-white rounded-full text-black hover:bg-white/90"
                >
                    Let&apos;s talk
                </a>
            </div>
        </motion.nav>
    );
}
