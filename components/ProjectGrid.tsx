"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { Github, Eye, ChevronUp, ChevronDown, X, Play } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Footer from "./Footer";

const initialEvents = [
    {
        title: "Luxury Wedding Gala",
        description: "An elegant evening celebrating love with premium decor and immersive lighting design.",
        location: "The Ritz-Carlton, Jakarta",
        date: "2024-06-15",
        image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop",
        tags: ["Wedding", "Luxury", "Event Design"],
        category: "WEDDING",
        youtubeId: "dQw4w9WgXcQ" // Placeholder
    },
    {
        title: "International Tech Summit",
        description: "A three-day symposium featuring world-class speakers and cutting-edge tech demonstrations.",
        location: "ICE BSD City, Tangerang",
        date: "2023-11-10",
        image: "https://images.unsplash.com/photo-1540575861501-7ad060e29ad3?q=80&w=2070&auto=format&fit=crop",
        tags: ["Corporate", "Conference", "Tech"],
        category: "CORPORATE",
        youtubeId: "dQw4w9WgXcQ" // Placeholder
    },
    {
        title: "Vogue Fashion Night",
        description: "An exclusive fashion showcase featuring independent designers and high-street brands.",
        location: "Senayan City, Jakarta",
        date: "2024-02-28",
        image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=2076&auto=format&fit=crop",
        tags: ["Fashion", "Exhibition", "Nightlife"],
        category: "FASHION",
        youtubeId: "dQw4w9WgXcQ" // Placeholder
    },
    {
        title: "Summer Music Festival",
        description: "A vibrant outdoor music festival with leading artists and immersive stage production.",
        location: "Ancol, Jakarta",
        date: "2023-08-12",
        image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=2070&auto=format&fit=crop",
        tags: ["Music", "Festival", "Production"],
        category: "ENTERTAINMENT",
        youtubeId: "dQw4w9WgXcQ" // Placeholder
    },
];

export default function ProjectGrid() {
    const [events, setEvents] = useState(initialEvents);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const loaderRef = useRef(null);
    const isVisible = useInView(loaderRef);

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

    // Dynamic loading simulation
    useEffect(() => {
        if (isVisible && hasMore && !loading) {
            loadMoreEvents();
        }
    }, [isVisible, hasMore, loading]);

    const loadMoreEvents = () => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            const nextBatch = initialEvents.map((e, i) => ({
                ...e,
                title: `${e.title} (Vol ${Math.floor(events.length / 4) + 1} - ${i + 1})`,
            }));

            setEvents(prev => [...prev, ...nextBatch]);
            setLoading(false);

            // Stop after some batches for demo
            if (events.length >= 12) {
                setHasMore(false);
            }
        }, 1500);
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
                <div className="max-w-7xl mx-auto space-y-16">
                    {/* Header */}
                    <div className="text-center space-y-8">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="inline-block"
                        >
                            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white leading-none relative">
                                Event Archive
                                <div className="h-1 w-full bg-accent mt-4" />
                            </h1>
                            <p className="text-accent text-xs uppercase tracking-[0.5em] font-bold mt-4">Selected Event Documentation</p>
                        </motion.div>
                        <p className="max-w-md mx-auto text-white/40 text-sm leading-relaxed">
                            A curated documentation of premium events, from grand weddings to high-profile corporate summits.
                        </p>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20 lg:gap-20">
                        {events.map((event, idx) => (
                            <motion.div
                                key={`${event.title}-${idx}`}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                viewport={{ once: true, margin: "-100px" }}
                                className={`group relative ${idx % 2 === 1 ? 'md:mt-32' : ''}`}
                            >
                                <div className="absolute -top-12 -left-4 md:-left-8 text-7xl md:text-9xl font-black text-white/5 select-none pointer-events-none">
                                    {String(idx + 1).padStart(2, '0')}
                                </div>

                                <Card className="bg-transparent border-none overflow-visible group">
                                    <CardContent className="p-0 space-y-8">
                                        <div className="relative aspect-4/5 md:aspect-square overflow-hidden bg-[#0A0A0A]">
                                            <div className="absolute inset-4 border border-white/10 z-20 pointer-events-none group-hover:inset-2 transition-all duration-500" />

                                            <div className="relative w-full h-full">
                                                <Image
                                                    src={event.image}
                                                    alt={event.title}
                                                    fill
                                                    className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100"
                                                />
                                            </div>

                                            <div
                                                onClick={() => setSelectedVideo(event.youtubeId || null)}
                                                className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-center items-center text-center p-6 space-y-4 cursor-pointer"
                                            >
                                                <motion.div
                                                    initial={{ scale: 0.5, opacity: 0 }}
                                                    whileHover={{ scale: 1.1 }}
                                                    className="w-16 h-16 rounded-full border border-accent flex items-center justify-center text-accent mb-4"
                                                >
                                                    <Play size={32} fill="currentColor" />
                                                </motion.div>
                                                <div className="space-y-2">
                                                    <h4 className="text-xl md:text-2xl font-black uppercase tracking-tighter text-accent">
                                                        {event.title}
                                                    </h4>
                                                    <div className="h-px w-12 bg-white/20 mx-auto" />
                                                </div>

                                                <div className="space-y-1">
                                                    <p className="text-xs uppercase tracking-[0.2em] font-bold text-white">
                                                        {event.location}
                                                    </p>
                                                    <p className="text-[10px] uppercase tracking-[0.3em] font-medium text-white/60">
                                                        {new Date(event.date).toLocaleDateString('en-GB', {
                                                            day: 'numeric',
                                                            month: 'long',
                                                            year: 'numeric'
                                                        })}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4 px-2">
                                            <div className="flex items-center justify-between">
                                                <Badge className="bg-white/5 text-white/40 text-[9px] tracking-[0.2em] font-medium border-none rounded-none py-1 px-3">
                                                    {event.category}
                                                </Badge>
                                                <div className="h-px flex-1 bg-white/5 mx-4" />
                                            </div>

                                            <h3 className="text-3xl font-bold text-white tracking-tight group-hover:text-accent transition-colors duration-300">
                                                {event.title}
                                            </h3>

                                            <p className="text-white/40 text-sm leading-relaxed max-w-sm">
                                                {event.description}
                                            </p>

                                            <div className="flex flex-wrap gap-x-4 gap-y-2 pt-2">
                                                {event.tags.map(tag => (
                                                    <span key={tag} className="text-[10px] text-accent/60 font-medium uppercase tracking-widest">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    {/* Loader */}
                    <div
                        ref={loaderRef}
                        className="flex flex-col items-center justify-center py-24 space-y-4"
                    >
                        {loading && (
                            <div className="flex space-x-2">
                                {[0, 1, 2].map((i) => (
                                    <motion.div
                                        key={i}
                                        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                                        transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                                        className="w-1.5 h-1.5 bg-accent rounded-full"
                                    />
                                ))}
                            </div>
                        )}
                        {!hasMore && (
                            <div className="text-center space-y-4">
                                <div className="h-px w-24 bg-white/10 mx-auto" />
                                <p className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-bold">
                                    End of Archive
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-32">
                    <Footer />
                </div>
            </div>
            {/* Video Modal */}
            <AnimatePresence>
                {selectedVideo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-200 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
                    >
                        <motion.button
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                            onClick={() => setSelectedVideo(null)}
                            className="absolute top-8 right-8 z-50 flex items-center gap-3 px-6 py-3 bg-black/50 backdrop-blur-xl border border-white/10 text-white/70 hover:text-white transition-all rounded-full group"
                        >
                            <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Close</span>
                            <X size={20} className="group-hover:rotate-90 transition-transform duration-500" />
                        </motion.button>

                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            className="w-full max-w-6xl aspect-video bg-black border border-white/10 relative shadow-2xl overflow-hidden"
                        >
                            <iframe
                                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                                className="w-full h-full"
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
