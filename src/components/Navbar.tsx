import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 mix-blend-difference text-white pointer-events-none">
                <Link to="/" className="text-2xl font-bold tracking-tighter pointer-events-auto">NAVRINE</Link>
                <button
                    onClick={() => setIsMenuOpen(true)}
                    className="flex items-center gap-2 text-sm font-medium uppercase tracking-widest hover:opacity-70 transition-opacity pointer-events-auto"
                >
                    Menu <Menu className="w-5 h-5" />
                </button>
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
                            <button
                                onClick={closeMenu}
                                className="flex items-center gap-2 text-sm font-medium uppercase tracking-widest hover:opacity-70 transition-opacity text-white"
                            >
                                Close <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex flex-col gap-6 text-4xl md:text-7xl font-bold tracking-tighter uppercase">
                            <Link to="/work" className="hover:text-white/50 transition-colors w-max" onClick={closeMenu}>Work</Link>
                            <Link to="/services" className="hover:text-white/50 transition-colors w-max" onClick={closeMenu}>Services</Link>
                            <Link to="/agency" className="hover:text-white/50 transition-colors w-max" onClick={closeMenu}>Agency</Link>
                            <Link to="/contact" className="hover:text-white/50 transition-colors w-max" onClick={closeMenu}>Contact</Link>
                            <Link to="/blog" className="hover:text-white/50 transition-colors w-max" onClick={closeMenu}>Blog</Link>
                            <Link to="/admin" className="text-sm font-mono text-white/20 hover:text-[#bdfb54] transition-colors w-max mt-4" onClick={closeMenu}>[Admin CMS]</Link>
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
