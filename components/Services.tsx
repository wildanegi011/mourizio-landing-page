"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronUp, ChevronDown, CheckCircle2, Zap, Layout, Monitor, Globe, Users, Trophy } from "lucide-react";
import Image from "next/image";
import Footer from "./Footer";

const coreServices = [
    {
        title: "Event Concept and Design",
        description: "We work with our clients to create a unique and memorable concept for their event, from the theme to the overall design.",
        icon: Layout,
        color: "text-accent"
    },
    {
        title: "Planning and Coordination",
        description: "We take care of all the details, including venue selection, vendor management, budgeting, and timeline management.",
        icon: Globe,
        color: "text-white"
    },
    {
        title: "On-site Execution",
        description: "We ensure that the event runs smoothly by managing all aspects of the event on-site, including setup, staffing, and logistics.",
        icon: Zap,
        color: "text-accent"
    },
    {
        title: "Post-Event Evaluation",
        description: "We conduct a comprehensive evaluation after the event to identify areas for improvement and ensure that our clients' goals are met.",
        icon: Trophy,
        color: "text-white"
    },
    {
        title: "Virtual and Hybrid Events",
        description: "We provide virtual and hybrid event solutions that enable our clients to connect with their audience from anywhere in the world.",
        icon: Monitor,
        color: "text-accent"
    },
];

const additionalServices = [
    { name: "Registration Management", percentage: 90, image: "https://images.unsplash.com/photo-1517245385161-1e9988296a67?q=80&w=2070&auto=format&fit=crop" },
    { name: "Entertainment", percentage: 80, image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop" },
    { name: "Content Creation", percentage: 75, image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop" },
    { name: "Sponsorship Management", percentage: 70, image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2070&auto=format&fit=crop" },
];

const clients = [
    { name: "PT. ASABA", logo: "https://via.placeholder.com/150/000000/FFFFFF?text=ASABA" },
    { name: "AVRIST", logo: "https://via.placeholder.com/150/000000/FFFFFF?text=AVRIST" },
    { name: "BAKMI", logo: "https://via.placeholder.com/150/000000/FFFFFF?text=BAKMI" },
    { name: "BINAR", logo: "https://via.placeholder.com/150/000000/FFFFFF?text=BINAR" },
    { name: "BANK BJB", logo: "https://via.placeholder.com/150/000000/FFFFFF?text=BJB" },
];

export default function Services() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ container: containerRef });
    const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    const [showScrollTop, setShowScrollTop] = useState(false);
    const [showScrollBottom, setShowScrollBottom] = useState(true);

    const handleScroll = () => {
        if (!containerRef.current) return;
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        setShowScrollTop(scrollTop > 100);
        setShowScrollBottom(scrollTop + clientHeight < scrollHeight - 100);
    };

    const scrollTo = (direction: "top" | "bottom") => {
        if (!containerRef.current) return;
        containerRef.current.scrollTo({
            top: direction === "top" ? 0 : containerRef.current.scrollHeight,
            behavior: "smooth"
        });
    };

    return (
        <div className="relative h-full w-full bg-noise overflow-hidden font-montserrat">
            {/* Scroll Progress Bar */}
            <motion.div
                className="fixed top-0 right-0 w-1 h-full bg-accent origin-top z-50 opacity-20"
                style={{ scaleY }}
            />

            {/* Floating Scroll Navigation */}
            <div className="fixed bottom-12 right-12 flex flex-col space-y-4 z-50">
                <motion.button
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: showScrollTop ? 1 : 0, scale: showScrollTop ? 1 : 0.5 }}
                    onClick={() => scrollTo("top")}
                    className="p-3 bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-full hover:bg-accent hover:text-black transition-all group"
                >
                    <ChevronUp size={20} className="group-hover:-translate-y-1 transition-transform" />
                </motion.button>
                <motion.button
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: showScrollBottom ? 1 : 0, scale: showScrollBottom ? 1 : 0.5 }}
                    onClick={() => scrollTo("bottom")}
                    className="p-3 bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-full hover:bg-accent hover:text-black transition-all group"
                >
                    <ChevronDown size={20} className="group-hover:translate-y-1 transition-transform" />
                </motion.button>
            </div>

            <div
                ref={containerRef}
                onScroll={handleScroll}
                className="h-full w-full py-32 px-8 overflow-y-auto no-scrollbar scroll-smooth"
            >
                <div className="max-w-7xl mx-auto space-y-32">

                    {/* Header */}
                    <div className="text-center space-y-8">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="inline-block"
                        >
                            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white leading-none relative">
                                Our Services
                                <div className="h-1 w-full bg-accent mt-4" />
                            </h1>
                            <p className="text-accent text-xs uppercase tracking-[0.5em] font-bold mt-4">Crafting Immersive Experiences</p>
                        </motion.div>
                    </div>

                    {/* Core Services Section */}
                    <section className="space-y-16">
                        <div className="grid grid-cols-1 gap-12">
                            {coreServices.map((service, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8, delay: idx * 0.1 }}
                                    className="group relative flex flex-col md:flex-row items-center gap-8 p-8 border-l border-white/10 hover:border-accent transition-colors bg-white/2 hover:bg-white/5"
                                >
                                    <div className="shrink-0">
                                        <service.icon size={64} className={`${service.color} opacity-40 group-hover:opacity-100 transition-opacity duration-500`} />
                                    </div>
                                    <div className="space-y-4 flex-1">
                                        <h3 className="text-3xl font-black uppercase tracking-tight text-white group-hover:text-accent transition-colors">
                                            {service.title}
                                        </h3>
                                        <p className="text-white/40 text-lg leading-relaxed max-w-4xl group-hover:text-white/60 transition-colors">
                                            {service.description}
                                        </p>
                                    </div>
                                    <div className="hidden md:block">
                                        <div className="w-12 h-px bg-white/10 group-hover:w-24 group-hover:bg-accent transition-all duration-700" />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    {/* Additional Services Section */}
                    <section className="space-y-24">
                        <div className="text-center space-y-4">
                            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">Additional Services</h2>
                            <div className="h-px w-32 bg-accent mx-auto" />
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
                            {additionalServices.map((service, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="flex flex-col items-center space-y-8"
                                >
                                    {/* Circular Progress Display */}
                                    <div className="relative w-48 h-48 md:w-56 md:h-56 group">
                                        <div className="absolute inset-0 rounded-full border border-white/5 scale-110 group-hover:border-accent/30 transition-all duration-700" />

                                        <div className="w-full h-full rounded-full overflow-hidden border-4 border-accent relative p-2">
                                            <div className="absolute inset-0 z-10 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
                                            <div className="relative w-full h-full rounded-full overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                                                <Image
                                                    src={service.image}
                                                    alt={service.name}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-1000"
                                                />
                                            </div>
                                            <div className="absolute inset-0 flex items-center justify-center z-20">
                                                <span className="text-4xl md:text-6xl font-black text-white drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]">
                                                    {service.percentage}%
                                                </span>
                                            </div>
                                        </div>

                                        {/* Rotating Ring */}
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                            className="absolute inset-0 h-full w-full rounded-full border-t-2 border-accent/40 pointer-events-none"
                                        />
                                    </div>

                                    <div className="text-center space-y-2">
                                        <h4 className="text-lg font-black uppercase tracking-widest text-white group-hover:text-accent transition-colors">
                                            {service.name}
                                        </h4>
                                        <p className="text-[10px] text-white/40 uppercase tracking-[0.3em] font-bold">Performance Standard</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    {/* Clients & Partners Section */}
                    <section className="space-y-32">
                        <div className="space-y-16">
                            <div className="text-center space-y-4">
                                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">Clients</h2>
                                <div className="h-px w-32 bg-accent mx-auto" />
                            </div>
                            <div className="flex flex-wrap justify-center gap-16 md:gap-24 items-center opacity-40 hover:opacity-100 transition-opacity duration-1000">
                                {clients.map((client, idx) => (
                                    <div key={idx} className="relative w-32 md:w-48 h-12 grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer group">
                                        <p className="text-center text-white/20 font-black group-hover:text-accent tracking-tighter text-2xl uppercase">
                                            {client.name}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-16">
                            <div className="text-center space-y-4">
                                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">Partners</h2>
                                <div className="h-px w-32 bg-accent mx-auto" />
                                <p className="text-[10px] text-accent/60 uppercase tracking-[0.5em] font-black">Worked With</p>
                            </div>
                            <div className="flex flex-wrap justify-center gap-8 md:gap-12 items-center">
                                {[1, 2, 3, 4, 5].map((_, idx) => (
                                    <div key={idx} className="px-8 py-4 bg-white/5 border border-white/10 hover:border-accent/40 transition-all duration-500">
                                        <p className="text-white/20 font-bold uppercase tracking-[0.2em] text-xs">Partner Entity {idx + 1}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <Footer />
                </div>
            </div>
        </div>
    );
}
