"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";
import Footer from "./Footer";
import { toast } from "sonner";

const contactInfo = [
    {
        icon: Phone,
        label: "Phone",
        valueText: "+62 812 3456 7890",
        bgImage: "https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51?auto=format&fit=crop&q=80&w=800"
    },
    {
        icon: Mail,
        label: "Email",
        valueText: "hello@wildan.dev",
        bgImage: "https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&q=80&w=800"
    },
    {
        icon: MapPin,
        label: "Location",
        valueText: "Jakarta, Indonesia",
        bgImage: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=800"
    },
];

export default function Contact() {
    const [status, setStatus] = useState<'idle' | 'loading'>('idle');
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
                toast.success("Message Sent Successfully", {
                    description: "We'll get back to you as soon as possible.",
                });
                setFormData({ name: '', email: '', subject: '', message: '' });
                setStatus('idle');
            } else {
                toast.error("Error! Please try again");
                setStatus('idle');
            }
        } catch (error) {
            toast.error("Error! Please try again");
            setStatus('idle');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const inputClasses = "w-full bg-[#0F0F0F] border border-white/5 px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-all text-base font-medium shadow-inner";

    return (
        <div className="h-full w-full bg-noise overflow-y-auto no-scrollbar">
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 md:py-32 space-y-12">
                {/* Header */}
                <div className="text-center space-y-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-block"
                    >
                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white leading-none relative">
                            Contact Us
                            <div className="h-1 w-24 mx-auto bg-accent mt-6" />
                        </h1>
                        <p className="text-accent text-xs md:text-sm uppercase tracking-[0.5em] font-bold mt-6">Get In Touch</p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
                    {/* Inquiry Form: Minimalist Glassmorphism (Targeted Design) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-7 flex flex-col justify-center h-full"
                    >
                        <div className="mb-10 pl-1">
                            <h2 className="text-center md:text-left text-xl md:text-3xl font-bold text-white uppercase tracking-tight">
                                How we can help you ?
                            </h2>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <input
                                    name="name"
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={inputClasses}
                                    placeholder="Your Name"
                                />
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={inputClasses}
                                    placeholder="Your Email"
                                />
                            </div>

                            <input
                                name="subject"
                                type="text"
                                required
                                value={formData.subject}
                                onChange={handleChange}
                                className={inputClasses}
                                placeholder="Subject"
                            />

                            <textarea
                                name="message"
                                required
                                rows={8}
                                value={formData.message}
                                onChange={handleChange}
                                className={`${inputClasses} resize-none`}
                                placeholder="Message"
                            />

                            <div className="flex flex-col gap-6">
                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="w-full md:w-auto px-12 py-4 bg-[#666666] text-white font-bold text-lg hover:bg-[#777777] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                                >
                                    {status === 'loading' ? (
                                        <div className="h-5 w-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <span>Submit</span>
                                    )}
                                </button>
                            </div>
                        </form>
                    </motion.div>

                    {/* Vertical Info Cards: Now side-by-side with form on desktop */}
                    <div className="lg:col-span-5 flex flex-col gap-8 h-full">
                        {contactInfo.map((item, idx) => (
                            <motion.div
                                key={item.label}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="group relative overflow-hidden p-8 border border-white/10 bg-white/5 hover:border-accent/40 transition-all duration-500 flex-1 min-h-[160px] flex flex-col justify-center"
                            >
                                {/* Background Image with low opacity */}
                                <div
                                    className="absolute inset-0 z-0 opacity-10 grayscale group-hover:opacity-20 group-hover:grayscale-0 transition-all duration-700 bg-cover bg-center scale-105 group-hover:scale-100"
                                    style={{ backgroundImage: `url(${item.bgImage})` }}
                                />

                                <div className="relative z-10 space-y-4">
                                    <div className="text-accent">
                                        <item.icon size={28} />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] uppercase tracking-widest text-white/40 font-black">{item.label}</p>
                                        <p className="text-base md:text-lg text-white tracking-tight font-black uppercase leading-tight">{item.valueText}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
                {/* Map Section with Header */}
                <div className="pt-24 space-y-12">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="text-center"
                    >
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">
                            Our Location
                        </h2>
                        <div className="h-0.5 w-24 bg-accent mx-auto mt-6" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="aspect-video lg:aspect-21/9 w-full border border-white/10 grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-700"
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
                </div>
                {/* Integrated Footer */}
                <div className="pt-20">
                    <Footer />
                </div>
            </div>
        </div>
    );
}
