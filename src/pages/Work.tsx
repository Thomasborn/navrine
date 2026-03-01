import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Play, X } from "lucide-react";
import { cn } from "../utils/cn";

export function Work() {
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

    const projects = [
        {
            title: "AI Infrastructure",
            client: "Next-Gen Web Development",
            image: "https://picsum.photos/seed/navrine-ai/800/1000",
            tags: ["AI", "Web"],
        },
        {
            title: "Financial Clarity",
            client: "Data-Driven Operations",
            image: "https://picsum.photos/seed/navrine-data/800/1000",
            tags: ["Data", "Strategy"],
        },
        {
            title: "Brand Identity",
            client: "Creative Branding & Strategy",
            image: "https://picsum.photos/seed/navrine-brand/800/1000",
            tags: ["Branding", "Marketing"],
        },
        {
            title: "E-commerce Optimization",
            client: "Conversion rate scaling",
            image: "https://picsum.photos/seed/navrine-ecom/800/1000",
            tags: ["Web", "Strategy"],
        }
    ];

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-white selection:text-black font-sans pt-32 px-6 md:px-12 lg:px-24">
            <AnimatePresence>
                {isVideoModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center p-6"
                        onClick={() => setIsVideoModalOpen(false)}
                    >
                        <button
                            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
                            onClick={() => setIsVideoModalOpen(false)}
                        >
                            <X className="w-8 h-8" />
                        </button>
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="w-full max-w-5xl aspect-video bg-[#111] border border-white/10 rounded-2xl flex items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="text-center">
                                <Play className="w-16 h-16 text-white/20 mx-auto mb-4" />
                                <p className="text-white/50 uppercase tracking-widest text-sm font-bold">Interactive Case Study Coming Soon</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="max-w-7xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[10vw] md:text-[6vw] font-bold tracking-tighter uppercase leading-[0.85] mb-12"
                >
                    Selected <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">Work</span>
                </motion.h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
                    {projects.map((project, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                            onClick={() => setIsVideoModalOpen(true)}
                            className="group cursor-pointer"
                        >
                            <div className="relative aspect-[4/5] overflow-hidden bg-white/5 mb-6 rounded-lg">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    referrerPolicy="no-referrer"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                    <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 scale-50 group-hover:scale-100 transition-transform duration-500">
                                        <ArrowUpRight className="w-8 h-8 text-white" />
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-3">
                                {project.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-[10px] uppercase tracking-widest px-3 py-1 border border-white/20 rounded-full"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <h3 className="text-2xl font-bold mb-1">{project.title}</h3>
                            <p className="text-white/50 text-sm">{project.client}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
