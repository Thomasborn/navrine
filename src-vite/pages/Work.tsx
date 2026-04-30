import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SEO } from "../components/SEO";

export function Work() {
    const { t } = useTranslation();
    const worksData = t('work.projects', { returnObjects: true }) as any[];

    // Extend worksData with image, year, and color from original if needed, 
    // but we can just map the translation onto the original structure
    const originalWorksData = [
        { year: "2026", image: "/Content1.png", color: "#6b38ff" },
        { year: "2025", image: "/FINANCIAL.png", color: "#bdfb54" },
        { year: "2025", image: "/Content2.png", color: "#ff386b" },
        { year: "2024", image: "/Content3.png", color: "#ffffff" }
    ];

    const localizedWorksData = worksData.map((work, idx) => ({
        ...work,
        ...originalWorksData[idx]
    }));

    return (
        <main className="min-h-screen bg-[#050505] text-white font-sans pt-32 px-6 md:px-12 lg:px-24 pb-24 selection:bg-[#bdfb54] selection:text-black relative overflow-hidden">
            <SEO title={t('seo.work.title')} description={t('seo.work.description')} />
            <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" aria-hidden="true" />

            <div className="max-w-[1400px] mx-auto relative z-10">
                <header className="mb-24 lg:mb-40 md:flex items-end justify-between border-b border-white/10 pb-16">
                    <div className="max-w-4xl">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-[12vw] md:text-[8vw] font-bold tracking-tighter uppercase leading-[0.85] mb-8"
                        >
                            {t('work.title')} <br />
                            <span className="text-white/40">{t('work.subtitle')}</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl md:text-3xl text-white/70 max-w-2xl font-medium"
                        >
                            {t('work.description')}
                        </motion.p>
                    </div>
                </header>

                <div className="space-y-32 md:space-y-48">
                    {localizedWorksData.map((work, idx) => (
                        <ProjectCard key={idx} work={work} index={idx} t={t} />
                    ))}
                </div>

                {/* Minimal CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-48 text-center"
                >
                    <h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-12 uppercase">{t('work.ctaTitle')} <br /> <span className="text-[#bdfb54]">{t('work.ctaHighlight')}</span></h2>
                    <button className="px-12 py-6 bg-white text-black rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform active:scale-95 text-lg">
                        {t('work.ctaButton')}
                    </button>
                </motion.div>
            </div>
        </main>
    );
}

function ProjectCard({ work, index, t }: { work: any, index: number, t: any }) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

    return (
        <motion.article
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-24 group`}
        >
            <div className="w-full lg:w-3/5 overflow-hidden rounded-[2rem] md:rounded-[3rem] aspect-[4/3] md:aspect-[16/10] relative bg-[#111] ring-1 ring-white/10 group-hover:ring-white/30 transition-all duration-700">
                <motion.img
                    style={{ y, scale: 1.15 }}
                    src={work.image}
                    alt={work.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                />

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none">
                    <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 scale-50 group-hover:scale-100 transition-transform duration-[1s] ease-[cubic-bezier(0.16,1,0.3,1)]">
                        <ArrowUpRight className="w-10 h-10 text-white" />
                    </div>
                </div>
            </div>

            <div className="w-full lg:w-2/5 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-6 text-xs md:text-sm font-bold uppercase tracking-widest text-white/50">
                    <span>{work.year}</span>
                    <span className="w-1 h-1 rounded-full bg-white/50"></span>
                    <span>{work.category}</span>
                </div>

                <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6 group-hover:text-[#bdfb54] transition-colors duration-500">
                    {work.title}
                </h3>

                <p className="text-lg md:text-xl text-white/60 mb-10 leading-relaxed max-w-md">
                    {work.description}
                </p>

                <button className="self-start inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:opacity-70 transition-opacity border-b border-white/20 pb-1">
                    {t('work.viewCase')} <ArrowUpRight className="w-4 h-4" />
                </button>
            </div>
        </motion.article>
    );
}