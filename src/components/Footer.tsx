"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { cn } from '../utils/cn';
import { useTranslation } from 'react-i18next';
import "@/translations/i18n";

export function Footer() {
    const pathname = usePathname();
    const { t } = useTranslation();

    // Determine background color based on route to match the page background seamlessly
    const isLightPage = pathname === '/services';

    return (
        <footer className={cn(
            "py-32 px-6 md:px-12 lg:px-24 text-center border-t border-black/10 transition-colors duration-500",
            isLightPage ? "bg-white text-black border-black/10" : "bg-[#050505] text-white selection:bg-white selection:text-black border-white/10"
        )}>
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-[8vw] md:text-[6vw] font-bold tracking-tighter uppercase leading-[0.9] mb-12"
            >
                {t('footer.title1')} <br />
                <span className={cn(
                    "text-transparent bg-clip-text bg-gradient-to-r",
                    isLightPage ? "from-black to-black/40" : "from-white to-white/40"
                )}>
                    {t('footer.title2')}
                </span>{" "}
                <br />
                {t('footer.title3')}
            </motion.h2>

            <motion.a
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                href="mailto:hello@navrine.com"
                className={cn(
                    "inline-block px-10 py-5 font-bold uppercase tracking-widest text-sm rounded-full transition-all mb-24 hover:scale-105 active:scale-95",
                    isLightPage ? "bg-black text-white hover:bg-black/90" : "bg-white text-black hover:bg-white/90"
                )}
            >
                {t('footer.cta')}
            </motion.a>

            <div className={cn(
                "flex flex-col md:flex-row justify-between items-center gap-6 text-sm font-medium uppercase tracking-widest",
                isLightPage ? "text-black/50" : "text-white/50"
            )}>
                <div>{t('footer.rights')}</div>
                <div className="flex gap-6">
                    <a href="https://instagram.com/navrine.studio" target="_blank" rel="noreferrer" className={isLightPage ? "hover:text-black transition-colors" : "hover:text-white transition-colors"}>
                        Instagram
                    </a>
                    <a href="https://linkedin.com/company/navrine" target="_blank" rel="noreferrer" className={isLightPage ? "hover:text-black transition-colors" : "hover:text-white transition-colors"}>
                        LinkedIn
                    </a>
                    <a href="mailto:hello@navrine.com" className={isLightPage ? "hover:text-black transition-colors" : "hover:text-white transition-colors"}>
                        Email
                    </a>
                </div>
            </div>
        </footer>
    );
}
