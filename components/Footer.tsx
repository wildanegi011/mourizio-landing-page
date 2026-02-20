"use client";

import { motion } from "framer-motion";
import { Youtube, Instagram, MessageCircle } from "lucide-react";

const socialLinks = [
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Youtube, href: "https://youtube.com", label: "Youtube" },
    { icon: MessageCircle, href: "https://wa.me/123456789", label: "WhatsApp" },
];

export default function Footer() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full max-w-7xl mx-auto px-8 py-12 flex flex-col md:flex-row items-center justify-between border-t border-white/5 space-y-6 md:space-y-0"
        >
            <div className="text-center md:text-right space-y-2">
                <p className="text-[10px] uppercase tracking-[0.4em] text-white/50 font-black">
                    © 2024 Company. ALL RIGHTS RESERVED.
                </p>
                <p className="text-[8px] uppercase tracking-[0.2em] text-white/40 italic">
                    Artistry & Engineering in Perfect Symmetry.
                </p>
            </div>
            <div className="flex items-center space-x-8">
                {socialLinks.map((social) => (
                    <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/30 hover:text-accent transition-all duration-300 transform hover:scale-110"
                        aria-label={social.label}
                    >
                        <social.icon size={20} />
                    </a>
                ))}
            </div>
        </motion.div>
    );
}
