import React from "react";
import { motion } from "motion/react";
import { ArrowRight, Code, Database, Eye } from "lucide-react";

export function Agency() {
    const values = [
        {
            title: "Technically Driven",
            description: "We don't just use tools; we build the infrastructure. From custom dashboards to complex AI workflows.",
            icon: <Code className="w-8 h-8 text-white/50" />
        },
        {
            title: "Data Obsessed",
            description: "Every decision is backed by analytics. We optimize for conversion, retention, and scalable growth.",
            icon: <Database className="w-8 h-8 text-white/50" />
        },
        {
            title: "Design Forward",
            description: "Aesthetics matter. We craft brand identities and user interfaces that demand attention and evoke emotion.",
            icon: <Eye className="w-8 h-8 text-white/50" />
        }
    ];

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-white selection:text-black font-sans pt-32 px-6 md:px-12 lg:px-24 overflow-hidden relative pb-24">
            <div className="absolute top-0 right-0 w-1/2 h-screen bg-gradient-to-l from-white/5 to-transparent blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[10vw] md:text-[6vw] font-bold tracking-tighter uppercase leading-[0.85] mb-16"
                >
                    We Are <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">Navrine</span>
                </motion.h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-40">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-2xl md:text-5xl font-medium leading-tight tracking-tight"
                    >
                        A multi-disciplinary digital agency helping brands scale through AI infrastructure, modern web development, and data-driven strategies.
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-xl text-white/70 space-y-8"
                    >
                        <p>
                            We believe in building brand identities that are impossible to ignore. Our approach combines technical excellence with strategic creative thinking to deliver results that compound over time.
                        </p>
                        <p>
                            Founded on the principle of continuous innovation, we're not just order-takers. We are your technical and creative partners, guiding you through the shifting digital landscape with precision and bold execution.
                        </p>
                    </motion.div>
                </div>

                {/* Values Section */}
                <div className="mb-40">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-sm font-bold uppercase tracking-widest text-white/50 mb-12"
                    >
                        Our Core Pillars
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/10 pt-12">
                        {values.map((value, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <div className="mb-6">{value.icon}</div>
                                <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                                <p className="text-white/60 leading-relaxed text-lg">
                                    {value.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Join Us CTA */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="p-12 md:p-24 bg-white/5 border border-white/10 rounded-3xl text-center relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-50 pointer-events-none" />
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                            Want to build the future with us?
                        </h2>
                        <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto">
                            We are always looking for exceptional talent in engineering, design, and growth. If you are passionate about pushing boundaries, we want to hear from you.
                        </p>
                        <a href="mailto:hello@navrine.studio" className="inline-flex items-center justify-center px-10 py-5 bg-white text-black font-bold uppercase tracking-widest text-sm rounded-full hover:bg-white/90 transition-all hover:scale-105 active:scale-95">
                            Join Our Team <ArrowRight className="ml-2 w-4 h-4" />
                        </a>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
