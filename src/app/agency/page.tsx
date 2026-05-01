"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Code, Database, Eye } from "lucide-react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import "@/translations/i18n";

export default function Agency() {
    const { t } = useTranslation();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const pillarsListData = t('agency.pillarsList', { returnObjects: true }) as any[];

    if (!mounted || !Array.isArray(pillarsListData)) return <div className="min-h-screen bg-black" />;

    const icons = [
        <Code key="code" className="w-8 h-8 text-white/50" />,
        <Database key="db" className="w-8 h-8 text-white/50" />,
        <Eye key="eye" className="w-8 h-8 text-white/50" />
    ];

    const values = pillarsListData.map((item: any, idx: number) => ({
        ...item,
        icon: icons[idx]
    }));

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-white selection:text-black font-sans pt-32 px-6 md:px-12 lg:px-24 overflow-hidden relative pb-24">
            <div className="absolute top-0 right-0 w-1/2 h-screen bg-gradient-to-l from-white/5 to-transparent blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[10vw] md:text-[6vw] font-bold tracking-tighter uppercase leading-[0.85] mb-16"
                >
                    {t('agency.title')} <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">{t('agency.subtitle')}</span>
                </motion.h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-40">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-2xl md:text-5xl font-medium leading-tight tracking-tight"
                    >
                        {t('agency.description')}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-xl text-white/70 space-y-8"
                    >
                        <p>
                            {t('agency.history1')}
                        </p>
                        <p>
                            {t('agency.history2')}
                        </p>
                    </motion.div>
                </div>

                <div className="mb-40">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-sm font-bold uppercase tracking-widest text-white/50 mb-12"
                    >
                        {t('agency.pillars')}
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/10 pt-12">
                        {values.map((value: any, idx: number) => (
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

                {/* Visual Identity Section */}
                <div className="mb-40">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[600px]">
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative rounded-3xl overflow-hidden border border-white/10 h-full"
                        >
                            <Image 
                                src="/agency/sign-blue.png" 
                                alt="Navrine Studio Branding Blue" 
                                fill 
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </motion.div>
                        <div className="grid grid-rows-2 gap-6 h-full">
                            <motion.div 
                                initial={{ opacity: 0, y: -20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="relative rounded-3xl overflow-hidden border border-white/10"
                            >
                                <Image 
                                    src="/agency/sign-yellow.png" 
                                    alt="Navrine Studio Branding Yellow" 
                                    fill 
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 25vw"
                                />
                            </motion.div>
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="relative rounded-3xl overflow-hidden border border-white/10"
                            >
                                <Image 
                                    src="/agency/sign-street.png" 
                                    alt="Navrine Studio Street Presence" 
                                    fill 
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 25vw"
                                />
                            </motion.div>
                        </div>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="p-12 md:p-24 bg-white/5 border border-white/10 rounded-3xl text-center relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-50 pointer-events-none" />
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                            {t('agency.joinTitle')}
                        </h2>
                        <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto">
                            {t('agency.joinDesc')}
                        </p>
                        <a href="mailto:hello@navrine.com" className="inline-flex items-center justify-center px-10 py-5 bg-white text-black font-bold uppercase tracking-widest text-sm rounded-full hover:bg-white/90 transition-all hover:scale-105 active:scale-95">
                            {t('agency.joinButton')} <ArrowRight className="ml-2 w-4 h-4" />
                        </a>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
