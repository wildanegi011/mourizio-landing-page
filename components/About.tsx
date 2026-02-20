"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronUp, ChevronDown, Eye, Download } from "lucide-react";
import Footer from "./Footer";

const timeline = [
    { year: "2020", title: "Inception", description: "Founded with a vision to merge art and engineering." },
    { year: "2021", title: "Global Expansion", description: "Established our digital footprint across three continents." },
    { year: "2022", title: "Innovation Award", description: "Recognized as the most innovative agency in digital arts." },
    { year: "2023", title: "Platform Alpha", description: "Launched our proprietary liquid-motion framework." },
    { year: "2024", title: "The Future", description: "Pioneering the next generation of spatial computing experiences." },
];

export default function About() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        container: containerRef,
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

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

    const containerVariants: any = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const itemVariants: any = {
        hidden: { opacity: 0, y: 30 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    return (
        <div className="relative h-full w-full bg-noise overflow-hidden">
            {/* Scroll Progress Bar */}
            <motion.div
                className="fixed top-0 right-0 w-1 h-full bg-accent origin-top z-50 opacity-20"
                style={{ scaleY }}
            />

            {/* Floating Scroll Navigation */}
            <div className="fixed bottom-6 right-6 md:bottom-12 md:right-12 flex flex-col space-y-4 z-50">
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
                className="h-full w-full py-20 px-4 md:py-32 md:px-8 overflow-y-auto no-scrollbar scroll-smooth"
            >
                <div className="max-w-7xl mx-auto space-y-16 md:space-y-24">
                    {/* Header */}
                    <div className="text-center space-y-8">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="inline-block"
                        >
                            <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-white leading-none relative">
                                About Us
                                <div className="h-1 w-full bg-accent mt-4" />
                            </h1>
                            <p className="text-accent text-xs uppercase tracking-[0.5em] font-bold mt-4">Technological Excellence</p>
                        </motion.div>
                        <p className="max-w-3xl mx-auto text-white/60 text-lg md:text-xl leading-relaxed font-light">
                            We are a collective of designers, thinkers, and engineers dedicated to defining the future of digital interaction.
                        </p>
                    </div>

                    {/* Section 2: CTO Spotlight */}
                    <motion.section
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
                        viewport={{ once: true }}
                        className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-24 items-start"
                    >
                        {/* Background Decoration */}
                        <div className="absolute -top-8 -left-8 md:-top-24 md:-left-24 text-[8rem] md:text-[20rem] font-serif opacity-[0.03] select-none pointer-events-none text-white leading-none">
                            &ldquo;
                        </div>

                        <div className="lg:col-span-5 relative group order-2 lg:order-1">
                            {/* Multi-layered image frame */}
                            <div className="absolute -inset-2 border border-accent/20 translate-x-3 translate-y-3 md:translate-x-4 md:translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-700" />
                            <div className="absolute -inset-2 border border-white/5 -translate-x-3 -translate-y-3 md:-translate-x-4 md:-translate-y-4 group-hover:-translate-x-2 group-hover:-translate-y-2 transition-transform duration-700" />

                            <div className="relative aspect-3/4 w-full border border-white/10 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] z-10 bg-black">
                                <Image
                                    src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1000&auto=format&fit=crop"
                                    alt="CTO Portrait"
                                    fill
                                    className="object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 scale-105 group-hover:scale-100"
                                />
                                {/* Scanning Glow Effect */}
                                <motion.div
                                    animate={{ top: ["-100%", "200%"] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-x-0 h-1/2 bg-linear-to-b from-transparent via-accent/10 to-transparent pointer-events-none"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-90" />

                                <div className="absolute bottom-6 left-6 flex items-center space-x-3">
                                    <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                                    <span className="text-[10px] uppercase tracking-[0.3em] text-white/50 font-black">Verified Identity</span>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-7 space-y-12 order-1 lg:order-2 pt-12">
                            <div className="space-y-6">
                                <div className="flex items-center space-x-4">
                                    <div className="h-px w-12 bg-accent" />
                                    <Badge variant="secondary" className="bg-white/5 text-accent border border-accent/20 font-black uppercase tracking-[0.3em] px-3 py-1 text-[10px]">
                                        Visionary Leadership
                                    </Badge>
                                </div>
                                <h3 className="text-center md:text-left text-3xl md:text-6xl font-black text-white uppercase tracking-tighter leading-[0.9] font-serif italic">
                                    &ldquo;Precision <span className="text-accent">defines</span> <br /> our legacy.&rdquo;
                                </h3>
                            </div>

                            <div className="relative">
                                <p className="text-white/60 text-base md:text-2xl leading-relaxed font-light italic max-w-2xl">
                                    &ldquo;Technology is the canvas, and code is our brush. We don't just solve problems;
                                    we create digital experiences that resonate with the human soul through uncompromising
                                    technical integrity.&rdquo;
                                </p>
                            </div>

                            <motion.div
                                variants={itemVariants}
                                className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-4"
                            >
                                <button className="group relative px-6 md:px-8 py-4 bg-accent text-black font-black uppercase tracking-[0.2em] text-[10px] md:text-xs transition-all duration-500 overflow-hidden w-full sm:w-auto">
                                    <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                                    <div className="relative flex items-center justify-center space-x-3">
                                        <Eye size={16} />
                                        <span>View Profile</span>
                                    </div>
                                </button>
                                <button className="group relative px-6 md:px-8 py-4 bg-white/5 border border-white/10 text-white font-black uppercase tracking-[0.2em] text-[10px] md:text-xs transition-all duration-500 overflow-hidden w-full sm:w-auto">
                                    <div className="absolute inset-0 bg-white -translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                                    <div className="relative flex items-center justify-center space-x-3 group-hover:text-black transition-colors duration-500">
                                        <Download size={16} />
                                        <span>Download PDF</span>
                                    </div>
                                </button>
                            </motion.div>

                            <div className="pt-12 border-t border-white/5 flex items-end justify-between text-center md:text-left">
                                <div className="space-y-1">
                                    <p className="text-2xl font-black text-white uppercase tracking-tighter">Aurelius Thorne</p>
                                    <p className="text-accent/60 text-[10px] uppercase tracking-[0.4em] font-bold">Co-Founder & Chief Technology Officer</p>
                                </div>
                                <div className="hidden sm:block text-white/5 text-5xl font-serif italic select-none">
                                    A. Thorne
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* Section 3: Vision & Mission */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <Card className="bg-white/5 border-white/10 rounded-none backdrop-blur-md hover:border-accent/30 transition-colors">
                            <CardContent className="p-6 md:p-10 space-y-4">
                                <h3 className="text-xs uppercase tracking-[0.5em] text-accent font-bold">Vision</h3>
                                <p className="text-2xl text-white font-black uppercase tracking-tighter">
                                    To become the global standard for luxury digital craftsmanship.
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="bg-white/5 border-white/10 rounded-none backdrop-blur-md hover:border-accent/30 transition-colors">
                            <CardContent className="p-6 md:p-10 space-y-4">
                                <h3 className="text-xs uppercase tracking-[0.5em] text-accent font-bold">Mission</h3>
                                <p className="text-base md:text-lg text-white/70 leading-relaxed">
                                    To empower visionary brands through relentless innovation, uncompromising design standards,
                                    and future-proof engineering solutions.
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Section 4: History Timeline */}
                    <div className="space-y-12 pb-40">
                        <div className="text-center">
                            <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Company Evolution</h3>
                            <div className="h-px w-24 bg-accent mx-auto mt-4" />
                        </div>
                        <div className="relative pt-12 pb-12">
                            <div className="flex flex-col md:flex-row md:space-x-12 space-y-12 md:space-y-0 md:justify-center px-4">
                                {timeline.map((stage, idx) => (
                                    <motion.div
                                        key={stage.year}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1, ease: "easeOut" }}
                                        className="relative md:min-w-[280px] space-y-4 group"
                                    >
                                        <span className="text-3xl md:text-6xl font-black text-white/5 absolute -top-8 -left-4 group-hover:text-accent/10 transition-colors">
                                            {stage.year}
                                        </span>
                                        <div className="space-y-2 relative z-10 pl-4 md:pl-0 border-l md:border-l-0 border-white/5 md:border-transparent">
                                            <h4 className="text-accent font-black uppercase tracking-widest text-sm">{stage.title}</h4>
                                            <p className="text-white/50 text-xs leading-relaxed max-w-full md:max-w-[200px]">
                                                {stage.description}
                                            </p>
                                        </div>
                                        {idx < timeline.length - 1 && (
                                            <div className="hidden lg:block absolute top-[1.4rem] left-full w-12 h-px bg-white/10" />
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>

                {/* Integrated Footer */}
                <div className="mt-32">
                    <Footer />
                </div>
            </div>
        </div>
    );
}
