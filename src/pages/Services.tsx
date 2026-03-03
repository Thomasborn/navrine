import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Plus, Minus } from "lucide-react";

const servicesData = [
    {
        title: "AI & Web Development",
        description: "We build scalable, intelligent, and visually striking web applications powered by cutting-edge AI integrations.",
        features: ["Custom SaaS Development", "AI-Powered Automations", "High-Performance Next.js/React", "Seamless API Integrations"]
    },
    {
        title: "Data-Driven Operations",
        description: "Transform your business processes with tailored data systems designed to optimize efficiency and decision-making.",
        features: ["Workflow Automation", "Business Intelligence Dashboards", "Cloud Infrastructure", "Systems Architecture"]
    },
    {
        title: "Creative Branding",
        description: "Establish a compelling and memorable identity that resonates with your target audience and distinguishes you from competitors.",
        features: ["Brand Identity Design", "UI/UX System Design", "Interactive Prototyping", "Motion Graphics"]
    },
    {
        title: "Strategic Marketing",
        description: "Scale your reach and maximize ROI through targeted, data-backed marketing initiatives and growth hacking.",
        features: ["Technical SEO", "Conversion Rate Optimization (CRO)", "Performance Campaigns", "Growth Consulting"]
    }
];

export function Services() {
    const [openIdx, setOpenIdx] = useState<number | null>(null);

    return (
        <main className="min-h-screen bg-white text-black font-sans pt-32 px-6 md:px-12 lg:px-24 pb-24" aria-label="Services Overview">
            <div className="max-w-7xl mx-auto">
                <header className="mb-24">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[10vw] md:text-[6vw] font-bold tracking-tighter uppercase leading-[0.85] mb-8"
                    >
                        Our <br />
                        <span className="text-black/40">Services</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-2xl max-w-2xl font-medium"
                    >
                        We build comprehensive digital solutions designed to accelerate growth and optimize operations.
                    </motion.p>
                </header>

                <section className="border-t border-black/10" aria-label="Detailed Service Offerings">
                    {servicesData.map((service, idx) => {
                        const isOpen = openIdx === idx;

                        return (
                            <article
                                key={idx}
                                className="group border-b border-black/10 overflow-hidden"
                            >
                                <div
                                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                                    className="py-8 md:py-12 flex items-center justify-between cursor-pointer hover:bg-black/5 transition-colors px-4 -mx-4"
                                >
                                    <h3 className={`text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter transition-transform duration-300 ${isOpen ? 'translate-x-4' : 'group-hover:translate-x-4'}`}>
                                        {service.title}
                                    </h3>
                                    <div className="relative w-8 h-8 md:w-12 md:h-12 flex items-center justify-center">
                                        <Plus className={`absolute w-full h-full transition-all duration-300 ${isOpen ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}`} />
                                        <Minus className={`absolute w-full h-full transition-all duration-300 ${isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'}`} />
                                    </div>
                                </div>

                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                            className="px-4 -mx-4 overflow-hidden"
                                        >
                                            <div className="pb-12 pt-4 grid grid-cols-1 md:grid-cols-2 gap-12">
                                                <div>
                                                    <p className="text-xl md:text-2xl text-black/70 font-medium leading-relaxed max-w-xl">
                                                        {service.description}
                                                    </p>
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-bold uppercase tracking-widest text-black/40 mb-6">Capabilities</h4>
                                                    <ul className="space-y-4">
                                                        {service.features.map((feature, fIdx) => (
                                                            <motion.li
                                                                key={fIdx}
                                                                initial={{ opacity: 0, x: -10 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                transition={{ delay: 0.1 + (fIdx * 0.05) }}
                                                                className="flex items-center text-lg md:text-xl font-medium"
                                                            >
                                                                <ArrowUpRight className="w-5 h-5 mr-3 text-black/40" />
                                                                {feature}
                                                            </motion.li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </article>
                        );
                    })}
                </section>
            </div>
        </main>
    );
}
