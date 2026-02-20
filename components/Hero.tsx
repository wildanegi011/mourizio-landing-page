"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

const titles = [
    "Event Organizer",
    "Creative Director",
    "Design Specialist",
    "Fullstack Developer"
];

export default function Hero() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % titles.length);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center bg-noise">
            <div className="flex flex-col items-center space-y-12">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    className="relative w-40 h-40 flex items-center justify-center group pointer-events-none"
                >
                    {/* Stylized Logo Background */}
                    <div className="absolute inset-0 border border-white/5 bg-white/2 backdrop-blur-sm rounded-full scale-110 group-hover:scale-125 transition-transform duration-1000" />
                    <div className="absolute inset-0 border border-accent/20 rounded-full animate-[ping_3s_linear_infinite] opacity-20" />

                    {/* Professional Logoipsum SVG */}
                    <svg width="80" height="80" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                        <motion.path
                            d="M20 5L25 15H15L20 5Z"
                            fill="white"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.2 }}
                        />
                        <motion.path
                            d="M20 35L15 25H25L20 35Z"
                            fill="white"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.4 }}
                        />
                        <motion.path
                            d="M5 20L15 15V25L5 20Z"
                            fill="var(--color-accent)"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, delay: 0.6 }}
                        />
                        <motion.path
                            d="M35 20L25 25V15L35 20Z"
                            fill="var(--color-accent)"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, delay: 0.8 }}
                        />
                        {/* Center Accent */}
                        <motion.circle
                            cx="20" cy="20" r="3"
                            fill="white"
                            initial={{ scale: 0 }}
                            animate={{ scale: [0, 1.2, 1] }}
                            transition={{ duration: 0.5, delay: 1 }}
                        />
                    </svg>

                    {/* Glowing Accents */}
                    <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-accent to-transparent opacity-50 shadow-[0_0_20px_rgba(0,255,242,0.5)]" />
                </motion.div>

                <div className="text-center">
                    <div className="h-16 flex justify-center items-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={index}
                                initial={{ y: 20, opacity: 0, scale: 0.9 }}
                                animate={{ y: 0, opacity: 1, scale: 1 }}
                                exit={{ y: -20, opacity: 0, scale: 1.1 }}
                                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <Badge
                                    variant="outline"
                                    className="px-8 py-3 text-2xl md:text-3xl uppercase tracking-[0.5em] font-black border-accent/50 text-accent bg-black/60 backdrop-blur-xl shadow-[0_0_30px_rgba(0,255,242,0.25)] ring-1 ring-accent/20"
                                >
                                    {titles[index]}
                                </Badge>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=2000"
                    alt="Hero Background"
                    fill
                    priority
                    className="object-cover opacity-40 grayscale"
                />
                <div className="absolute inset-0 bg-linear-to-b from-background via-transparent to-background" />
                <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Background Texture/Grid */}
            <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none z-1" />
        </section>
    );
}
