import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Send, Mail, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SEO } from "../components/SEO";

export function Contact() {
    const { t } = useTranslation();
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate form submission
        setTimeout(() => setIsSubmitting(false), 1500);
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-white selection:text-black font-sans pt-32 px-6 md:px-12 lg:px-24">
            <SEO title={t('seo.contact.title')} description={t('seo.contact.description')} />
            <div className="max-w-7xl mx-auto pb-24">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[12vw] md:text-[8vw] font-bold tracking-tighter uppercase leading-[0.85] mb-16"
                >
                    {t('contact.title')} <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">{t('contact.subtitle')}</span>
                </motion.h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
                    {/* Left side: Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <p className="text-2xl font-medium mb-12 text-white/80 leading-relaxed max-w-md">
                            {t('contact.description')}
                        </p>

                        <div className="space-y-8">
                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-widest text-white/50 mb-3 flex items-center gap-2">
                                    <Mail className="w-4 h-4" /> {t('contact.email')}
                                </h3>
                                <a href="mailto:hello@navrine.studio" className="text-2xl font-medium hover:text-white/70 transition-colors">
                                    hello@navrine.studio
                                </a>
                            </div>

                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-widest text-white/50 mb-3 flex items-center gap-2">
                                    <MapPin className="w-4 h-4" /> {t('contact.location')}
                                </h3>
                                <p className="text-2xl font-medium">
                                    {t('contact.locationVal')}
                                </p>
                            </div>

                            <div className="pt-8">
                                <h3 className="text-sm font-bold uppercase tracking-widest text-white/50 mb-4">
                                    {t('contact.socials')}
                                </h3>
                                <div className="flex gap-4">
                                    <a
                                        href="https://instagram.com/navrine.studio"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                                    >
                                        In
                                    </a>
                                    <a
                                        href="https://linkedin.com/company/navrine"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                                    >
                                        Li
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right side: Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="relative group">
                                <input
                                    type="text"
                                    required
                                    value={formState.name}
                                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                    className="w-full bg-transparent border-b border-white/20 py-4 text-xl focus:outline-none focus:border-white transition-colors peer"
                                    placeholder=" "
                                />
                                <label className="absolute left-0 top-4 text-white/50 text-xl transition-all peer-focus:-top-4 peer-focus:text-sm peer-focus:text-white peer-valid:-top-4 peer-valid:text-sm pointer-events-none">
                                    {t('contact.form.name')}
                                </label>
                            </div>

                            <div className="relative group">
                                <input
                                    type="email"
                                    required
                                    value={formState.email}
                                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                    className="w-full bg-transparent border-b border-white/20 py-4 text-xl focus:outline-none focus:border-white transition-colors peer"
                                    placeholder=" "
                                />
                                <label className="absolute left-0 top-4 text-white/50 text-xl transition-all peer-focus:-top-4 peer-focus:text-sm peer-focus:text-white peer-valid:-top-4 peer-valid:text-sm pointer-events-none">
                                    {t('contact.form.email')}
                                </label>
                            </div>

                            <div className="relative group">
                                <textarea
                                    required
                                    rows={4}
                                    value={formState.message}
                                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                    className="w-full bg-transparent border-b border-white/20 py-4 text-xl focus:outline-none focus:border-white transition-colors peer resize-none"
                                    placeholder=" "
                                />
                                <label className="absolute left-0 top-4 text-white/50 text-xl transition-all peer-focus:-top-4 peer-focus:text-sm peer-focus:text-white peer-valid:-top-4 peer-valid:text-sm pointer-events-none">
                                    {t('contact.form.message')}
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-5 bg-white text-black font-bold uppercase tracking-widest text-sm rounded-full hover:bg-white/90 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
                            >
                                {isSubmitting ? (
                                    t('contact.form.sending')
                                ) : (
                                    <>
                                        {t('contact.form.send')} <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
