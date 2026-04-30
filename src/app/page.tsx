"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, Play, Star, ArrowUpRight, X, Plus, Minus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { cn } from "@/utils/cn";
import { useTranslation } from "react-i18next";
import "@/translations/i18n";

export default function Home() {
  const router = useRouter();
  const { t } = useTranslation();
  const { scrollYProgress } = useScroll();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);
  const [activeServiceIdx, setActiveServiceIdx] = useState<number | null>(0);

  const exploreRef = useRef<HTMLElement>(null);

  const scrollToExplore = () => {
    exploreRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const servicesData = t('landing.servicesData', { returnObjects: true }) as any[];
  const processSteps = t('landing.process.steps', { returnObjects: true }) as any[];
  const faqs = t('landing.faq.list', { returnObjects: true }) as any[];

  const videoY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -300]);

  if (!mounted || !Array.isArray(servicesData) || !Array.isArray(processSteps) || !Array.isArray(faqs)) return <div className="min-h-screen bg-black" />;

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-[#bdfb54] selection:text-black font-sans relative">
      {/* Grain Overlay */}
      <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" aria-hidden="true" />
      
      {/* Video Modal Overlay */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl flex items-center justify-center p-6 md:p-12"
            onClick={() => setIsVideoModalOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Video Player Modal"
          >
            <button
              className="absolute top-8 right-8 text-white/40 hover:text-white transition-all hover:scale-110 active:scale-95"
              onClick={() => setIsVideoModalOpen(false)}
              aria-label="Close Video Modal"
            >
              <X className="w-10 h-10" aria-hidden="true" />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="w-full max-w-6xl aspect-video bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-[2rem] flex items-center justify-center overflow-hidden shadow-2xl relative group"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute inset-0 bg-[#6b38ff]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-3xl" />
              
              <div className="text-center relative z-10 px-6">
                <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-700">
                  <Play className="w-10 h-10 text-[#bdfb54]" aria-hidden="true" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-4 uppercase">{t('landing.latest.newArticle')}</h3>
                <p className="text-white/40 uppercase tracking-[0.3em] text-sm font-bold max-w-md mx-auto leading-relaxed">
                  {t('landing.latest.addedWeekly')}
                </p>
                <div className="mt-12 flex items-center justify-center gap-4 text-[10px] font-bold uppercase tracking-widest text-white/20">
                  <span className="w-8 h-[1px] bg-white/10"></span>
                  <span>NAVRINE STUDIO © 2026</span>
                  <span className="w-8 h-[1px] bg-white/10"></span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <header className="relative h-screen flex flex-col justify-start px-6 md:px-12 lg:px-24 overflow-hidden pt-32 md:pt-48 bg-black">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <motion.div
            style={{ y: videoY, scale: 1.1 }}
            className="absolute inset-0 opacity-40 mix-blend-screen"
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/video/0417.mp4" type="video/mp4" />
            </video>
          </motion.div>

          <motion.div
            style={{ y: imageY, scale: 1.2 }}
            className="absolute inset-0 opacity-30 mix-blend-overlay"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[#6b38ff]/20 to-transparent" />
            <Image
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000"
              alt="Abstract Light Effect"
              fill
              sizes="100vw"
              priority
              className="object-cover grayscale brightness-150"
            />
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-[#050505]/60 to-[#050505]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_black_90%)] opacity-60" />
        </div>

        <div className="relative z-10 max-w-6xl">
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.12,
                  delayChildren: 0.2,
                },
              },
            }}
            className="text-[14vw] md:text-[9vw] lg:text-[8.5vw] leading-[0.8] font-bold tracking-tighter uppercase mb-12"
          >
            {[t('landing.hero.title1'), t('landing.hero.title2'), t('landing.hero.title3'), t('landing.hero.title4'), t('landing.hero.title5')].map((word, i) => (
              <React.Fragment key={i}>
                <motion.span
                  variants={{
                    hidden: { opacity: 0, y: 40, rotateX: 45 },
                    visible: { opacity: 1, y: 0, rotateX: 0 },
                  }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className={cn(
                    "inline-block",
                    (i === 1 || i === 2) && "text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/20 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                  )}
                >
                  {word}
                </motion.span>
                {i === 0 && <br />}
                {i === 2 && <br />}
                {" "}
              </React.Fragment>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl md:text-3xl text-white/60 max-w-2xl mb-16 leading-[1.4] font-medium tracking-tight border-l border-white/10 pl-8"
          >
            {t('landing.hero.description').split(" ").map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 + i * 0.03, duration: 0.5 }}
                className="inline-block mr-[0.2em]"
              >
                {word}
              </motion.span>
            ))}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="flex items-center gap-4"
          >
            <button
              onClick={scrollToExplore}
              className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors group"
              aria-label={t('landing.hero.scroll')}
            >
              <ArrowRight className="w-6 h-6 rotate-90 transition-transform duration-300 group-hover:translate-y-1" aria-hidden="true" />
            </button>
            <span className="text-sm font-medium uppercase tracking-widest opacity-60">
              {t('landing.hero.scroll')}
            </span>
          </motion.div>

          {/* Trusted By Marquee */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-24 pt-12 border-t border-white/10"
            aria-label={t('landing.hero.trusted')}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-8" id="trusted-by-heading">{t('landing.hero.trusted')}</p>
            <div className="flex flex-wrap gap-x-12 gap-y-6 opacity-40 grayscale" aria-labelledby="trusted-by-heading">
              {["BOSS Creator", "Mesana Investama", "PT Gajah Tunggal Tbk", "Next-Gen Tech"].map((logo) => (
                <span key={logo} className="text-xl md:text-2xl font-bold tracking-tighter whitespace-nowrap">{logo}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </header>

      {/* What We've Built */}
      <section ref={exploreRef} className="py-24 px-6 md:px-12 lg:px-24" aria-labelledby="case-studies-heading">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6 relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute right-0 top-0 md:top-1/2 md:-translate-y-1/2 w-32 h-32 md:w-48 md:h-48 opacity-20 pointer-events-none mix-blend-screen hidden md:block"
            aria-hidden="true"
          >
            <Image
              src={`data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><path id='curve' d='M 50,50 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0' fill='none' stroke='white' stroke-width='0.5'/><text fill='white' font-size='10' letter-spacing='3' font-family='monospace' font-weight='bold'><textPath href='%23curve'>• CORE STRENGTH • SYSTEM ARCHITECTURE • DATA DRIVEN  </textPath></text><circle cx='50' cy='50' r='10' fill='none' stroke='white' stroke-width='1'/><circle cx='50' cy='50' r='5' fill='white'/></svg>`}
              alt="Decorative Futuristic Sticker"
              width={192}
              height={192}
              className="object-contain"
            />
          </motion.div>

          <header>
            <h2 className="text-sm font-bold uppercase tracking-widest text-white/50 mb-4" id="case-studies-heading">
              {t('landing.caseStudies.heading')}
            </h2>
            <p className="text-2xl md:text-4xl font-medium max-w-2xl leading-tight">
              {t('landing.caseStudies.subheading')}
            </p>
          </header>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:opacity-70 transition-opacity border-b border-white/20 pb-1 relative z-10"
            aria-label={t('landing.caseStudies.viewAll')}
          >
            {t('landing.caseStudies.viewAll')} <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        <article>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => router.push("/work")}
            className="relative w-full aspect-[4/3] md:aspect-[21/9] bg-white/5 rounded-2xl md:rounded-[2rem] overflow-hidden group cursor-pointer border border-white/10"
            role="button"
            tabIndex={0}
            aria-label="Navigate to projects"
          >
            <Image
              src="/projects/bisniesgo.jpg"
              alt="Bisniesgo Showcase"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              className="object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 opacity-70 group-hover:opacity-90 mix-blend-luminosity group-hover:mix-blend-normal"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500" />

            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
              <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 scale-50 group-hover:scale-100 transition-transform duration-[1s] ease-[cubic-bezier(0.16,1,0.3,1)] delay-100">
                <ArrowUpRight className="w-10 h-10 text-white" />
              </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 lg:p-16 z-10 flex flex-col gap-6 md:gap-8 justify-end">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 border-t border-white/20 pt-6 md:pt-8 w-full max-w-5xl">
                {[
                  {
                    title: t('landing.caseStudies.categories.ai'),
                    client: t('landing.caseStudies.clients.ai'),
                  },
                  {
                    title: t('landing.caseStudies.categories.data'),
                    client: t('landing.caseStudies.clients.data'),
                  },
                  {
                    title: t('landing.caseStudies.categories.branding'),
                    client: t('landing.caseStudies.clients.branding'),
                  },
                ].map((item, idx) => (
                  <div key={idx} className="group/item translate-y-4 group-hover:translate-y-0 transition-transform duration-700" style={{ transitionDelay: `${idx * 100}ms` }}>
                    <h3 className="text-xl md:text-2xl font-bold mb-1 group-hover/item:text-[#bdfb54] transition-colors">{item.title}</h3>
                    <p className="text-white/60 text-xs md:text-sm font-mono tracking-widest uppercase">{item.client}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </article>
      </section>

      {/* Services */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-white text-black relative overflow-hidden">
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute right-[-2rem] top-[-2rem] md:right-10 md:top-10 w-40 h-40 md:w-56 md:h-56 opacity-10 pointer-events-none mix-blend-multiply hidden md:block"
        >
          <Image
            src={`data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><path id='curve' d='M 50,50 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0' fill='none' stroke='black' stroke-width='0.5'/><text fill='black' font-size='10' letter-spacing='3' font-family='monospace' font-weight='bold'><textPath href='%23curve'>${t('landing.services.sticker')}</textPath></text><circle cx='50' cy='50' r='10' fill='none' stroke='black' stroke-width='1'/><circle cx='50' cy='50' r='5' fill='black'/></svg>`}
            alt="Futuristic Sticker"
            width={224}
            height={224}
            className="object-contain"
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          <div className="space-y-6 md:space-y-12">
            {servicesData.map((service, idx) => (
              <motion.div
                key={idx}
                onMouseEnter={() => setActiveServiceIdx(idx)}
                className={cn(
                  "group cursor-pointer border-l-2 pl-8 py-4 transition-all duration-500",
                  activeServiceIdx === idx ? "border-black" : "border-black/10 opacity-40 hover:opacity-100"
                )}
              >
                <h3 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">
                  {service.title}
                </h3>
                <p className={cn(
                  "text-lg text-black/60 transition-all duration-500 overflow-hidden",
                  activeServiceIdx === idx ? "max-h-40 opacity-100 mb-6" : "max-h-0 opacity-0"
                )}>
                  {service.description}
                </p>
                <div className={cn(
                  "flex flex-wrap gap-2 transition-all duration-500",
                  activeServiceIdx === idx ? "opacity-100" : "opacity-0"
                )}>
                  {service.features.map((feature, fIdx) => (
                    <span key={fIdx} className="text-[10px] md:text-xs font-bold uppercase tracking-widest bg-black text-white px-3 py-1.5 rounded-full">
                      {feature}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="hidden lg:block relative aspect-square">
            <div className="absolute inset-0 bg-black/5 rounded-[4rem] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeServiceIdx}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={['/projects/vora.png', '/projects/paceflux.png', '/projects/digclic.png'][activeServiceIdx ?? 0]}
                    alt="Service Illustration"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover mix-blend-multiply"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-8 -right-8 w-48 h-48 bg-[#bdfb54] rounded-full flex items-center justify-center shadow-2xl p-8 text-center"
            >
              <p className="text-xs font-bold uppercase tracking-widest">{t('landing.services.floating')}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-32 px-6 md:px-12 lg:px-24">
        <motion.div
          className="relative max-w-6xl mx-auto rounded-[3rem] p-12 md:p-24 overflow-hidden group cursor-default border border-white/5 bg-[#0a0a0a] shadow-2xl"
          whileHover="hover"
          initial="initial"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#6b38ff]/10 via-transparent to-[#bdfb54]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ease-out" />

          <motion.div
            variants={{
              initial: { rotate: 0, scale: 1, opacity: 0.15 },
              hover: { rotate: 180, scale: 1.15, opacity: 0.5 }
            }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-[-4rem] top-[-4rem] md:right-8 md:top-8 w-64 h-64 md:w-96 md:h-96 pointer-events-none mix-blend-screen hidden md:block"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="relative w-full h-full"
            >
              <Image
                src={`data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><defs><linearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'><stop offset='0%25' stop-color='%236b38ff' /><stop offset='100%25' stop-color='%23bdfb54' /></linearGradient></defs><polygon points='50,15 85,80 15,80' fill='none' stroke='url(%23grad)' stroke-width='0.5' /><polygon points='50,25 75,70 25,70' fill='none' stroke='white' stroke-width='0.2' stroke-dasharray='1,3' /><polygon points='50,35 65,60 35,60' fill='url(%23grad)' opacity='0.1' /><circle cx='50' cy='15' r='1.5' fill='white' /><circle cx='85' cy='80' r='1.5' fill='white' /><circle cx='15' cy='80' r='1.5' fill='white' /><text fill='white' font-size='4' letter-spacing='3' font-family='monospace' font-weight='300' transform='rotate(30, 50, 10)'><textPath href='%23curve'>NAVRINE X FUTURE</textPath></text><path id='triangle-path-1' d='M 15 80 L 50 15' fill='none' /><path id='triangle-path-2' d='M 50 15 L 85 80' fill='none' /><path id='triangle-path-3' d='M 85 80 L 15 80' fill='none' /><text fill='white' font-size='4' letter-spacing='3' font-family='monospace' font-weight='300'><textPath href='%23triangle-path-1' startOffset='10%25'>• AGENCY • </textPath></text><text fill='white' font-size='4' letter-spacing='3' font-family='monospace' font-weight='300'><textPath href='%23triangle-path-2' startOffset='20%25'> DIGITAL </textPath></text><text fill='white' font-size='4' letter-spacing='3' font-family='monospace' font-weight='300'><textPath href='%23triangle-path-3' startOffset='30%25'>FRONTIER</textPath></text></svg>`}
                alt="Futuristic Hover Sticker"
                fill
                className="object-contain"
              />
            </motion.div>
          </motion.div>

          <div className="max-w-3xl relative z-10 transition-transform duration-700 ease-out group-hover:translate-x-4">
            <h2 className="text-xs md:text-sm font-medium uppercase tracking-[0.3em] text-white/40 group-hover:text-white/80 mb-8 transition-colors duration-500">
              {t('landing.about.badge')}
            </h2>
            <p className="text-2xl md:text-4xl lg:text-5xl font-medium leading-[1.3] md:leading-[1.3] lg:leading-[1.3] text-white/70 group-hover:text-white transition-colors duration-500">
              {t('landing.about.description1')} <span className="text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#6b38ff] group-hover:to-[#bdfb54] transition-all duration-700">{t('landing.about.description2')}</span>
            </p>
          </div>
        </motion.div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 md:px-12 lg:px-24 border-t border-white/10">
        <h2 className="text-sm font-bold uppercase tracking-widest text-white/50 mb-16">
          {t('landing.testimonials.heading')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            {
              quote: t('landing.testimonials.list.0.quote'),
              author: t('landing.testimonials.list.0.author'),
              role: t('landing.testimonials.list.0.role'),
            },
            {
              quote: t('landing.testimonials.list.1.quote'),
              author: t('landing.testimonials.list.1.author'),
              role: t('landing.testimonials.list.1.role'),
            },
            {
              quote: t('landing.testimonials.list.2.quote'),
              author: t('landing.testimonials.list.2.author'),
              role: t('landing.testimonials.list.2.role'),
            },
          ].map((testimonial, idx) => (
            <div key={idx} className="flex flex-col">
              <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 fill-white text-white" />
                ))}
              </div>
              <p className="text-lg leading-relaxed mb-8 flex-1">
                "{testimonial.quote}"
              </p>
              <div>
                <h4 className="font-bold">{testimonial.author}</h4>
                <p className="text-sm text-white/50">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Our Process */}
      <section className="py-32 px-6 md:px-12 lg:px-24 bg-white text-black border-t border-black/10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="text-sm font-bold uppercase tracking-widest text-black/50 mb-4">{t('landing.process.heading')}</h2>
            <p className="text-4xl md:text-6xl font-bold tracking-tighter">{t('landing.process.subheading')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {processSteps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.8 }}
                className="relative p-8 rounded-3xl bg-black/5 hover:bg-black text-white transition-colors duration-500 group border border-black/5"
              >
                <span className="text-5xl font-bold tracking-tighter text-black/10 group-hover:text-white/10 absolute top-4 right-8 transition-colors duration-500">{step.number}</span>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-4 text-black group-hover:text-white transition-colors duration-500">{step.title}</h3>
                  <p className="text-black/60 group-hover:text-white/60 transition-colors duration-500 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-32 px-6 md:px-12 lg:px-24 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-4">{t('landing.faq.heading')}</h2>
            <p className="text-4xl md:text-6xl font-bold tracking-tighter">{t('landing.faq.subheading')}</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-white/10 rounded-2xl overflow-hidden bg-white/5"
              >
                <button
                  onClick={() => setOpenFaqIdx(openFaqIdx === idx ? null : idx)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                >
                  <span className="text-xl font-bold">{faq.question}</span>
                  <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center flex-shrink-0 ml-4">
                    {openFaqIdx === idx ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>
                <AnimatePresence>
                  {openFaqIdx === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-8 pb-8 text-white/60 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6 md:px-12 lg:px-24 border-t border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[#6b38ff]/20 blur-[150px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-[12vw] md:text-[8vw] font-bold tracking-tighter uppercase leading-[0.85] mb-12"
          >
            {t('landing.cta.title1')} <br />
            <span className="text-[#bdfb54]">{t('landing.cta.title2')}</span> {t('landing.cta.title3')} <br />
            {t('landing.cta.title4')}
          </motion.h2>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <button
              onClick={() => router.push("/contact")}
              className="px-12 py-6 bg-[#bdfb54] text-black rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform active:scale-95 text-lg"
            >
              {t('landing.cta.start')}
            </button>
            <button
              onClick={() => router.push("/work")}
              className="px-12 py-6 border border-white/20 rounded-full font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all text-lg"
            >
              {t('landing.cta.work')}
            </button>
          </div>

          <p className="mt-16 text-white/40 font-medium uppercase tracking-[0.3em] text-xs">{t('landing.cta.location')}</p>
        </div>
      </section>

      {/* Latest Updates / About Reference */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#f1f1f1]">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-6 items-stretch">

          {/* Left Panel */}
          <div className="bg-[#6b38ff] rounded-[2rem] p-10 md:p-14 text-white flex flex-col items-center justify-between relative overflow-hidden min-h-[600px] lg:w-[450px] flex-shrink-0">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
              <div className="absolute w-[220%] aspect-square rounded-full border border-dashed border-white"></div>
              <div className="absolute w-[160%] aspect-square rounded-full border border-dashed border-white"></div>
              <div className="absolute w-[100%] aspect-square rounded-full border border-dashed border-white"></div>
              <div className="absolute w-[40%] aspect-square rounded-full border border-dashed border-white"></div>
            </div>

            <div className="relative z-10 w-full text-left">
              <p className="font-serif italic text-3xl mb-2 text-white/90">{t('landing.latest.createdBy')}</p>
              <h3 className="text-7xl font-bold tracking-tighter mb-1">Navrine</h3>
              <p className="text-2xl font-medium opacity-80">Studio</p>
            </div>

            <div className="relative z-10 flex-1 flex items-end justify-center w-full mt-12 mb-10">
              <Image
                src="/agency/sign-street.png"
                alt="Navrine Studio Environment"
                width={240}
                height={320}
                className="object-cover rounded-t-full rounded-b-2xl shadow-2xl opacity-90 border-4 border-white/10"
              />
            </div>

            <button
              onClick={() => router.push("/agency")}
              className="relative z-10 w-full bg-white text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform active:scale-95 shadow-xl"
            >
              {t('agency.title')}
            </button>
          </div>

          {/* Right Panel */}
          <div className="bg-[#111] rounded-[3rem] lg:rounded-[6rem] p-10 md:p-16 lg:p-24 text-white flex flex-col items-center justify-center relative overflow-hidden flex-1 shadow-2xl">
            <div className="text-center mb-16 relative z-10">
              <h3 className="text-xl md:text-2xl font-medium text-[#bdfb54] mb-1">{t('landing.latest.updates')}</h3>
              <p className="text-xl md:text-2xl font-medium text-white/80">{t('landing.latest.updatesSub')}</p>
            </div>

            <div
              onClick={() => router.push("/blog")}
              className="relative z-10 bg-[#bdfb54] rounded-2xl md:rounded-3xl p-6 md:p-10 text-black w-full max-w-4xl shadow-2xl flex flex-col md:flex-row gap-8 items-center justify-between transition-transform hover:scale-[1.02] duration-500 cursor-pointer border border-[#c6ff55]/50"
              role="button"
              tabIndex={0}
              aria-label="Read our latest blog post"
            >
              <div className="flex-1 w-full">
                <div className="flex flex-wrap items-center gap-2 mb-8">
                  <span className="bg-[#111] text-white text-[10px] md:text-xs uppercase font-bold tracking-wider px-3 py-1.5 rounded-full">{t('landing.latest.newArticle')}</span>
                  <span className="bg-[#111] text-white text-[10px] md:text-xs uppercase font-bold tracking-wider px-3 py-1.5 rounded-full">Engineering</span>
                </div>
                <h4 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-8 md:mb-12 leading-none">Scaling<br />Next.js</h4>
                <p className="font-mono text-xs md:text-sm uppercase tracking-widest opacity-60 font-bold">{t('landing.latest.readInsight')} <ArrowRight className="inline-block w-4 h-4 ml-1" aria-hidden="true" /></p>
              </div>

              <div className="w-full md:w-[50%] lg:w-[45%] aspect-[16/10] bg-[#1a1a1a] rounded-xl overflow-hidden relative shadow-lg ring-4 ring-[#111]/10">
                <Image
                  src="/Content1.png"
                  alt="Insight Preview"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover opacity-90 hover:opacity-100 transition-opacity"
                />
              </div>
            </div>

            <div className="mt-16 text-[#bdfb54] font-serif italic text-3xl md:text-4xl lg:text-5xl text-center leading-tight relative z-10">
              {t('landing.latest.addedWeekly')}
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
