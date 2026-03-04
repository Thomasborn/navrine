import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const servicesData = [
    {
        title: "AI & Web Development",
        description: "We build scalable, intelligent, and visually striking web applications powered by cutting-edge AI integrations.",
        features: ["Custom SaaS Development", "AI-Powered Automations", "High-Performance Next.js/React", "Seamless API Integrations"],
        image: "/services/ai_web_dev.png"
    },
    {
        title: "Data-Driven Operations",
        description: "Transform your business processes with tailored data systems designed to optimize efficiency and decision-making.",
        features: ["Workflow Automation", "Business Intelligence Dashboards", "Cloud Infrastructure", "Systems Architecture"],
        image: "/services/data_ops.png"
    },
    {
        title: "Creative Branding",
        description: "Establish a compelling and memorable identity that resonates with your target audience and distinguishes you from competitors.",
        features: ["BRAND IDENTITY DESIGN", "UI/UX SYSTEM DESIGN", "INTERACTIVE PROTOTYPING"],
        image: "/services/creative_branding.png"
    },
    {
        title: "Strategic Marketing",
        description: "Scale your reach and maximize ROI through targeted, data-backed marketing initiatives and growth hacking.",
        features: ["Technical SEO", "Conversion Rate Optimization (CRO)", "Performance Campaigns", "Growth Consulting"],
        image: "/services/strategic_marketing.png"
    }
];

export function Services() {
    const [activeIdx, setActiveIdx] = useState<number>(2);

    return (
        <main className="min-h-screen bg-white text-black font-sans pt-32 px-6 md:px-12 lg:px-24 pb-24 overflow-hidden" aria-label="Services Overview">
            <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                {/* Left Side: Services List */}
                <div className="flex flex-col justify-center space-y-12">
                    {servicesData.map((service, idx) => {
                        const isActive = activeIdx === idx;
                        return (
                            <div
                                key={idx}
                                className="cursor-pointer group flex flex-col items-start"
                                onClick={() => setActiveIdx(idx)}
                            >
                                <motion.h2
                                    layout
                                    className={`text-4xl md:text-5xl lg:text-5xl font-extrabold tracking-tighter transition-colors duration-500 ${isActive ? 'text-black' : 'text-black/40 hover:text-black/60'}`}
                                >
                                    {service.title}
                                </motion.h2>
                                <AnimatePresence mode="popLayout">
                                    {isActive && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                            animate={{ opacity: 1, height: "auto", marginTop: "1.5rem" }}
                                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                            className="overflow-hidden"
                                        >
                                            <p className="text-sm md:text-base text-black/70 font-medium leading-relaxed max-w-lg mb-6">
                                                {service.description}
                                            </p>
                                            <div className="flex flex-wrap gap-2 md:gap-3">
                                                {service.features.map((feature, fIdx) => (
                                                    <motion.span
                                                        key={fIdx}
                                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                                        transition={{ delay: 0.1 + (fIdx * 0.05) }}
                                                        className="px-4 py-2 bg-black text-white text-[10px] md:text-xs font-bold uppercase tracking-widest rounded-full leading-none"
                                                    >
                                                        {feature}
                                                    </motion.span>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )
                    })}
                </div>

                {/* Right Side: Illustration Box */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square bg-[#f2f2f2] rounded-l-[4rem] rounded-r-2xl overflow-hidden p-8 flex flex-col justify-between shadow-xl"
                >
                    {/* Illustration Background Image */}
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={activeIdx}
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            src={servicesData[activeIdx].image}
                            alt={servicesData[activeIdx].title}
                            className="absolute inset-0 w-full h-full object-cover z-0"
                        />
                    </AnimatePresence>

                    {/* Gradient Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/40 z-[5] pointer-events-none" />

                    <div className="text-sm font-medium text-white/90 z-10 relative drop-shadow-md">Service Illustration</div>

                    {/* Top Right Circular Text */}
                    <div className="absolute -top-32 -right-32 w-[350px] h-[350px] pointer-events-none opacity-40 z-10">
                        <svg viewBox="0 0 200 200" className="w-full h-full animate-[spin_40s_linear_infinite]">
                            <path id="circlePath" d="M 100, 100 m -80, 0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0" fill="none" />
                            <text className="text-[12px] font-bold uppercase tracking-[0.25em] fill-white drop-shadow-md">
                                <textPath href="#circlePath" startOffset="0%">
                                    STRATEGIC • EXCELLENCE • STRATEGIC • EXCELLENCE •
                                </textPath>
                            </text>
                        </svg>
                    </div>
                    {/* Inner Target Center */}
                    <div className="absolute top-10 right-10 w-16 h-16 rounded-full border-[3px] border-white/30 flex items-center justify-center opacity-60 z-10 drop-shadow-md">
                        <div className="w-5 h-5 rounded-full bg-white/40"></div>
                    </div>

                    {/* Bottom Right Lime Green Circle */}
                    <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-[#B5FF14] rounded-full flex items-center justify-center p-8 text-center sm:shadow-2xl hover:scale-105 transition-transform duration-500 cursor-pointer overflow-hidden z-20">
                        <span className="text-[11px] font-bold uppercase tracking-widest text-black leading-snug drop-shadow-sm">
                            Premium<br />Digital<br />Solutions
                        </span>
                    </div>

                    {/* Faded Large Number Indicating Current Service */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIdx}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 mix-blend-overlay opacity-30"
                        >
                            <span className="text-white font-black text-[250px] md:text-[350px] tracking-tighter drop-shadow-2xl">
                                {activeIdx + 1}
                            </span>
                        </motion.div>
                    </AnimatePresence>
                </motion.div>

            </div>
        </main>
    );
}
