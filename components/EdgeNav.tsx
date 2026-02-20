"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Section = "home" | "about" | "projects" | "services" | "contact";

interface EdgeNavProps {
    activeSection: Section;
    onNavigate: (section: Section) => void;
}

export default function EdgeNav({ activeSection, onNavigate }: EdgeNavProps) {
    return (
        <div className="fixed inset-0 pointer-events-none z-100 hidden md:flex items-center justify-center p-12 uppercase font-bold tracking-[0.3em] text-[14px]">
            {/* Top: ABOUT */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 pointer-events-auto">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onNavigate("about")}
                    className={cn(
                        "h-auto p-0 uppercase font-black tracking-[0.4em] text-[14px] hover:bg-transparent hover:text-accent hover:tracking-[0.6em] transition-all duration-500 ease-out drop-shadow-sm cursor-pointer",
                        activeSection === "about" ? "text-accent scale-110" : "text-white/90"
                    )}
                >
                    About
                </Button>
            </div>

            {/* Right: CONTACT */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 rotate-90 pointer-events-auto">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onNavigate("contact")}
                    className={cn(
                        "h-auto p-0 uppercase font-black tracking-[0.4em] text-[14px] hover:bg-transparent hover:text-accent hover:tracking-[0.6em] transition-all duration-500 ease-out drop-shadow-sm cursor-pointer",
                        activeSection === "contact" ? "text-accent scale-110" : "text-white/90"
                    )}
                >
                    Contact
                </Button>
            </div>

            {/* Bottom: SERVICES */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-auto">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onNavigate("services")}
                    className={cn(
                        "h-auto p-0 uppercase font-black tracking-[0.4em] text-[14px] hover:bg-transparent hover:text-accent hover:tracking-[0.6em] transition-all duration-500 ease-out drop-shadow-sm cursor-pointer",
                        activeSection === "services" ? "text-accent scale-110" : "text-white/90"
                    )}
                >
                    Services
                </Button>
            </div>

            {/* Left: PORTFOLIO / PROJECTS */}
            <div className="absolute left-8 top-1/2 -translate-y-1/2 -rotate-90 pointer-events-auto">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onNavigate("projects")}
                    className={cn(
                        "h-auto p-0 uppercase font-black tracking-[0.4em] text-[14px] hover:bg-transparent hover:text-accent hover:tracking-[0.6em] transition-all duration-500 ease-out drop-shadow-sm cursor-pointer",
                        activeSection === "projects" ? "text-accent scale-110" : "text-white/90"
                    )}
                >
                    Portfolio
                </Button>
            </div>
        </div>
    );
}
