"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MapPin, Send, CheckCircle2, AlertCircle } from "lucide-react";
import Footer from "./Footer";

const contactInfo = [
    {
        icon: Phone,
        label: "Phone",
        valueText: "+62 812 3456 7890",
    },
    {
        icon: Mail,
        label: "Email",
        valueText: "hello@wildan.dev",
    },
    {
        icon: MapPin,
        label: "Location",
        valueText: "Jakarta, Indonesia",
    },
];

export default function Contact() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', subject: '', message: '' });
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="h-full w-full bg-noise overflow-y-auto no-scrollbar">
            <div className="max-w-7xl mx-auto px-8 py-32 space-y-16">
                {/* Header */}
                <div className="text-center space-y-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-block"
                    >
                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white leading-none relative">
                            Contact Us
                            <div className="h-1 w-full bg-accent mt-4" />
                        </h1>
                        <p className="text-accent text-xs uppercase tracking-[0.5em] font-bold mt-4">Get In Touch</p>
                    </motion.div>
                </div>

                {/* Main Content: Clean Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                    {/* Inquiry Form: Minimalist Glassmorphism */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-10 bg-white/5 backdrop-blur-md border border-white/10 p-8 md:p-12 relative"
                    >
                        <form onSubmit={handleSubmit} className="space-y-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="group relative">
                                    <input
                                        name="name"
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full bg-transparent border-b border-white/10 py-3 text-white placeholder:text-white/20 outline-hidden transition-all text-base"
                                        placeholder="NAME"
                                    />
                                    <div className="absolute bottom-0 left-0 w-0 h-px bg-accent transition-all duration-300 group-focus-within:w-full" />
                                </div>
                                <div className="group relative">
                                    <input
                                        name="email"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full bg-transparent border-b border-white/10 py-3 text-white placeholder:text-white/20 outline-hidden transition-all text-base"
                                        placeholder="EMAIL"
                                    />
                                    <div className="absolute bottom-0 left-0 w-0 h-px bg-accent transition-all duration-300 group-focus-within:w-full" />
                                </div>
                            </div>

                            <div className="group relative">
                                <input
                                    name="subject"
                                    type="text"
                                    required
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full bg-transparent border-b border-white/10 py-3 text-white placeholder:text-white/20 outline-hidden transition-all text-base"
                                    placeholder="SUBJECT"
                                />
                                <div className="absolute bottom-0 left-0 w-0 h-px bg-accent transition-all duration-300 group-focus-within:w-full" />
                            </div>

                            <div className="group relative">
                                <textarea
                                    name="message"
                                    required
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full bg-transparent border-b border-white/10 py-3 text-white placeholder:text-white/20 outline-hidden transition-all text-base resize-none"
                                    placeholder="MESSAGE"
                                />
                                <div className="absolute bottom-0 left-0 w-0 h-px bg-accent transition-all duration-300 group-focus-within:w-full" />
                            </div>

                            <div className="flex items-center space-x-6">
                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="px-10 py-4 bg-accent text-black font-bold uppercase tracking-widest text-[10px] hover:bg-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                                >
                                    {status === 'loading' ? (
                                        <div className="h-4 w-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                                    ) : (
                                        <Send size={14} />
                                    )}
                                    <span>{status === 'loading' ? 'Sending...' : 'Send Message'}</span>
                                </button>

                                <AnimatePresence>
                                    {status === 'success' && (
                                        <motion.div
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0 }}
                                            className="flex items-center space-x-2 text-accent text-[10px] font-bold uppercase tracking-wider"
                                        >
                                            <CheckCircle2 size={16} />
                                            <span>Message Sent Successfully</span>
                                        </motion.div>
                                    )}
                                    {status === 'error' && (
                                        <motion.div
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0 }}
                                            className="flex items-center space-x-2 text-red-500 text-[10px] font-bold uppercase tracking-wider"
                                        >
                                            <AlertCircle size={16} />
                                            <span>Error! Please try again</span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </form>
                    </motion.div>

                    {/* Right Side: Map & Simple Info */}
                    <div className="space-y-12">
                        {/* Map */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="aspect-video w-full border border-white/10 grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-700"
                        >
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.273752531054!2d106.8306071758674!3d-6.227566260991958!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3f17d23f731%3A0x62723366cc3173d5!2sEpicentrum%20Walk!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </motion.div>

                        {/* Minimal Info Cards */}
                        <div className="grid grid-cols-1 gap-6">
                            {contactInfo.map((item, idx) => (
                                <motion.div
                                    key={item.label}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    viewport={{ once: true }}
                                    className="flex items-center space-x-6 p-6 border border-white/5 bg-white/2 hover:bg-white/5 transition-colors"
                                >
                                    <div className="text-accent">
                                        <item.icon size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold">{item.label}</p>
                                        <p className="text-white text-sm tracking-wide mt-1">{item.valueText}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Integrated Footer */}
                <div className="pt-20">
                    <Footer />
                </div>
            </div>
        </div>
    );
}
