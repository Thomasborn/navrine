import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Globe } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { t, i18n } = useTranslation();
    const language = i18n.language;
    const setLanguage = (lang: string) => i18n.changeLanguage(lang);

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 mix-blend-difference text-white pointer-events-none">
                <Link to="/" className="text-2xl font-bold tracking-tighter pointer-events-auto">NAVRINE</Link>
                
                <div className="flex items-center gap-6 pointer-events-auto">
                    {/* Language Switcher */}
                    <div className="hidden md:flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full">
                        <button 
                            onClick={() => setLanguage('en')}
                            className={`transition-colors ${language === 'en' ? 'text-white' : 'text-white/30 hover:text-white/60'}`}
                        >
                            EN
                        </button>
                        <span className="w-[1px] h-3 bg-white/10"></span>
                        <button 
                            onClick={() => setLanguage('id')}
                            className={`transition-colors ${language === 'id' ? 'text-white' : 'text-white/30 hover:text-white/60'}`}
                        >
                            ID
                        </button>
                    </div>

                    <button
                        onClick={() => setIsMenuOpen(true)}
                        className="flex items-center gap-2 text-sm font-medium uppercase tracking-widest hover:opacity-70 transition-opacity"
                    >
                        {t('nav.menu')} <Menu className="w-5 h-5" />
                    </button>
                </div>
            </nav>

            {/* Fullscreen Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: "-100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "-100%" }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed inset-0 z-[60] bg-[#050505] flex flex-col justify-between px-6 md:px-12 lg:px-24 py-12 text-white"
                    >
                        <div className="flex items-center justify-between">
                            <Link to="/" onClick={closeMenu} className="text-2xl font-bold tracking-tighter text-white">NAVRINE</Link>
                            
                            <div className="flex items-center gap-8">
                                {/* Mobile Language Switcher (inside menu) */}
                                <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest">
                                    <button 
                                        onClick={() => setLanguage('en')}
                                        className={`transition-colors ${language === 'en' ? 'text-white' : 'text-white/30'}`}
                                    >
                                        English
                                    </button>
                                    <button 
                                        onClick={() => setLanguage('id')}
                                        className={`transition-colors ${language === 'id' ? 'text-white' : 'text-white/30'}`}
                                    >
                                        Bahasa
                                    </button>
                                </div>

                                <button
                                    onClick={closeMenu}
                                    className="flex items-center gap-2 text-sm font-medium uppercase tracking-widest hover:opacity-70 transition-opacity text-white"
                                >
                                    {t('nav.close')} <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col gap-6 text-4xl md:text-7xl font-bold tracking-tighter uppercase">
                            <Link to="/work" className="hover:text-white/50 transition-colors w-max" onClick={closeMenu}>{t('nav.work')}</Link>
                            <Link to="/services" className="hover:text-white/50 transition-colors w-max" onClick={closeMenu}>{t('nav.services')}</Link>
                            <Link to="/agency" className="hover:text-white/50 transition-colors w-max" onClick={closeMenu}>{t('nav.agency')}</Link>
                            <Link to="/blog" className="hover:text-white/50 transition-colors w-max" onClick={closeMenu}>{t('nav.insights')}</Link>
                            <Link to="/contact" className="hover:text-white/50 transition-colors w-max" onClick={closeMenu}>{t('nav.contact')}</Link>
                        </div>

                        <div className="flex gap-6 text-sm text-white/50 font-medium uppercase tracking-widest">
                            <a href="https://instagram.com/navrine.studio" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Instagram</a>
                            <a href="https://linkedin.com/company/navrine" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
