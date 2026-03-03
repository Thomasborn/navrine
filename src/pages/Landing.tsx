import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { ArrowRight, Menu, Play, Star, ArrowUpRight, X, Plus, Minus, CheckCircle2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "../utils/cn";

const servicesData = [
  {
    title: "AI & Web Development",
    description: "We build scalable, intelligent, and visually striking web applications powered by cutting-edge AI integrations.",
    features: ["Custom SaaS Development", "AI-Powered Automations", "High-Performance Next.js/React"]
  },
  {
    title: "Data-Driven Operations",
    description: "Transform your business processes with tailored data systems designed to optimize efficiency and decision-making.",
    features: ["Workflow Automation", "Business Intelligence Dashboards", "Cloud Infrastructure"]
  },
  {
    title: "Creative Branding",
    description: "Establish a compelling and memorable identity that resonates with your target audience and distinguishes you from competitors.",
    features: ["Brand Identity Design", "UI/UX System Design", "Interactive Prototyping"]
  }
];

const processSteps = [
  {
    number: "01",
    title: "Discovery",
    description: "We dive deep into your brand, objectives, and market landscape to find unique opportunities."
  },
  {
    number: "02",
    title: "Strategy",
    description: "Crafting a roadmap that aligns your business goals with technical feasibility and user needs."
  },
  {
    number: "03",
    title: "Design",
    description: "Creating premium, high-fidelity interfaces that prioritize user experience and brand storytelling."
  },
  {
    number: "04",
    title: "Development",
    description: "Turning designs into robust, scalable reality using the latest tech stack and AI integrations."
  }
];

const faqs = [
  {
    question: "What types of projects do you specialize in?",
    answer: "We specialize in high-end AI-integrated web applications, complex SaaS platforms, brand identity systems, and data-driven operational tools."
  },
  {
    question: "How long does a typical project take?",
    answer: "Timeline varies by scope, but most projects range from 4 to 12 weeks from discovery to launch."
  },
  {
    question: "Do you offer post-launch support?",
    answer: "Yes, we provide ongoing maintenance, performance optimization, and iterative updates to ensure your product continues to scale."
  },
  {
    question: "How do we get started?",
    answer: "Simply click 'Start a Project' or contact us. We'll schedule a discovery call to discuss your goals and how we can help."
  }
];

export function Landing() {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);
  const [activeServiceIdx, setActiveServiceIdx] = useState<number | null>(null);

  const exploreRef = useRef<HTMLElement>(null);

  const scrollToExplore = () => {
    exploreRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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
            className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setIsVideoModalOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Video Player Modal"
          >
            <button
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
              onClick={() => setIsVideoModalOpen(false)}
              aria-label="Close Video Modal"
            >
              <X className="w-8 h-8" aria-hidden="true" />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-5xl aspect-video bg-[#111] border border-white/10 rounded-2xl flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <Play className="w-16 h-16 text-white/20 mx-auto mb-4" aria-hidden="true" />
                <p className="text-white/50 uppercase tracking-widest text-sm font-bold">Interactive Video Demo Coming Soon</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <header className="relative h-screen flex flex-col justify-start px-6 md:px-12 lg:px-24 overflow-hidden pt-32 md:pt-48 bg-black">
        {/* Background Layers */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {/* Layer 1: UI/Agency Vibe (Base) */}
          <motion.div
            style={{ y: useTransform(scrollYProgress, [0, 1], [0, -150]), scale: 1.1 }}
            className="absolute inset-0 opacity-40 mix-blend-screen"
          >
            <img
              src="/images/hero_aesthetic.png"
              alt="Professional IT/UI Background"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Layer 2: Abstract Door/Light (User provided vibe) */}
          <motion.div
            style={{ y: useTransform(scrollYProgress, [0, 1], [0, -300]), scale: 1.2 }}
            className="absolute inset-0 opacity-30 mix-blend-overlay"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[#6b38ff]/20 to-transparent" />
            <img
              src="https://images.unsplash.com/photo-1635776062127-d379bfcbb9c8?auto=format&fit=crop&q=80&w=2000"
              alt="Abstract Light Effect"
              className="w-full h-full object-cover grayscale brightness-150"
            />
          </motion.div>

          {/* Layer 3: Noise & Gradients */}
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
            {["Helping", "brands", "scale", "with", "tech"].map((word, i) => (
              <React.Fragment key={i}>
                <motion.span
                  variants={{
                    hidden: { opacity: 0, y: 40, rotateX: 45 },
                    visible: { opacity: 1, y: 0, rotateX: 0 },
                  }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className={cn(
                    "inline-block",
                    (word === "brands" || word === "scale") && "text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/20 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]"
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
            {"A multi-disciplinary digital agency crafting high-end AI infrastructure and brand identities that are impossible to ignore.".split(" ").map((word, i) => (
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
              aria-label="Scroll down to explore case studies"
            >
              <ArrowRight className="w-6 h-6 rotate-90 transition-transform duration-300 group-hover:translate-y-1" aria-hidden="true" />
            </button>
            <span className="text-sm font-medium uppercase tracking-widest opacity-60">
              Scroll to explore
            </span>
          </motion.div>

          {/* Trusted By Marquee */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-24 pt-12 border-t border-white/10"
            aria-label="Trusted by industry leaders"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-8" id="trusted-by-heading">Trusted by industry leaders</p>
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
          {/* Animated Futuristic Sticker */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute right-0 top-0 md:top-1/2 md:-translate-y-1/2 w-32 h-32 md:w-48 md:h-48 opacity-20 pointer-events-none mix-blend-screen hidden md:block"
            aria-hidden="true"
          >
            <img
              src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><path id='curve' d='M 50,50 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0' fill='none' stroke='white' stroke-width='0.5'/><text fill='white' font-size='10' letter-spacing='3' font-family='monospace' font-weight='bold'><textPath href='%23curve'>• CORE STRENGTH • SYSTEM ARCHITECTURE • DATA DRIVEN  </textPath></text><circle cx='50' cy='50' r='10' fill='none' stroke='white' stroke-width='1'/><circle cx='50' cy='50' r='5' fill='white'/></svg>"
              alt="Decorative Futuristic Sticker"
              className="w-full h-full object-contain"
            />
          </motion.div>

          <header>
            <h2 className="text-sm font-bold uppercase tracking-widest text-white/50 mb-4" id="case-studies-heading">
              Case Studies
            </h2>
            <p className="text-2xl md:text-4xl font-medium max-w-2xl leading-tight">
              Proven projects that merged brand storytelling, data, and next-gen tech.
            </p>
          </header>
          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:opacity-70 transition-opacity border-b border-white/20 pb-1 relative z-10"
            aria-label="View all portfolio projects"
          >
            View All Projects <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        {/* Single Showcase Image */}
        <article>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => navigate("/work")}
            className="relative w-full aspect-[4/3] md:aspect-[21/9] bg-white/5 rounded-2xl md:rounded-[2rem] overflow-hidden group cursor-pointer border border-white/10"
            role="button"
            tabIndex={0}
            aria-label="Navigate to showcasing our recent AI, Data, and Branding projects"
          >
            <img
              src="/images/showcase.png"
              alt="Collage showcasing multiple digital products: a sleek AI dashboard, an e-commerce platform visualization, and modern branding assets built by Navrine."
              className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 opacity-70 group-hover:opacity-90 mix-blend-luminosity group-hover:mix-blend-normal"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500" />

            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
              <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 scale-50 group-hover:scale-100 transition-transform duration-[1s] ease-[cubic-bezier(0.16,1,0.3,1)] delay-100">
                <ArrowUpRight className="w-10 h-10 text-white" />
              </div>
            </div>

            {/* Project List Overlay */}
            <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 lg:p-16 z-10 flex flex-col gap-6 md:gap-8 justify-end">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 border-t border-white/20 pt-6 md:pt-8 w-full max-w-5xl">
                {[
                  {
                    title: "AI Infrastructure",
                    client: "Next-Gen Web Development",
                  },
                  {
                    title: "Financial Clarity",
                    client: "Data-Driven Operations",
                  },
                  {
                    title: "Brand Identity",
                    client: "Creative Branding & Strategy",
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
        {/* Animated Futuristic Sticker */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute right-[-2rem] top-[-2rem] md:right-10 md:top-10 w-40 h-40 md:w-56 md:h-56 opacity-10 pointer-events-none mix-blend-multiply hidden md:block"
        >
          <img
            src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><path id='curve' d='M 50,50 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0' fill='none' stroke='black' stroke-width='0.5'/><text fill='black' font-size='10' letter-spacing='3' font-family='monospace' font-weight='bold'><textPath href='%23curve'>• CRAFTING EXCELLENCE • STRATEGY • INNOVATION </textPath></text><circle cx='50' cy='50' r='10' fill='none' stroke='black' stroke-width='1'/><circle cx='50' cy='50' r='5' fill='black'/></svg>"
            alt="Futuristic Sticker"
            className="w-full h-full object-contain"
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
                <motion.img
                  key={activeServiceIdx}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  src={['/images/service_dev.png', '/images/service_data.png', '/images/service_brand.png'][activeServiceIdx ?? 0]}
                  alt="Service Illustration"
                  className="w-full h-full object-cover mix-blend-multiply"
                />
              </AnimatePresence>
            </div>
            {/* Floating Element */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-8 -right-8 w-48 h-48 bg-[#bdfb54] rounded-full flex items-center justify-center shadow-2xl p-8 text-center"
            >
              <p className="text-xs font-bold uppercase tracking-widest">Premium Digital Solutions</p>
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
          {/* Background Glow on Hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#6b38ff]/10 via-transparent to-[#bdfb54]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ease-out" />

          {/* Interactive Futuristic Sticker */}
          <motion.div
            variants={{
              initial: { rotate: 0, scale: 1, opacity: 0.15 },
              hover: { rotate: 180, scale: 1.15, opacity: 0.5 }
            }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-[-4rem] top-[-4rem] md:right-8 md:top-8 w-64 h-64 md:w-96 md:h-96 pointer-events-none mix-blend-screen hidden md:block"
          >
            <motion.img
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><defs><linearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'><stop offset='0%25' stop-color='%236b38ff' /><stop offset='100%25' stop-color='%23bdfb54' /></linearGradient></defs><polygon points='50,15 85,80 15,80' fill='none' stroke='url(%23grad)' stroke-width='0.5' /><polygon points='50,25 75,70 25,70' fill='none' stroke='white' stroke-width='0.2' stroke-dasharray='1,3' /><polygon points='50,35 65,60 35,60' fill='url(%23grad)' opacity='0.1' /><circle cx='50' cy='15' r='1.5' fill='white' /><circle cx='85' cy='80' r='1.5' fill='white' /><circle cx='15' cy='80' r='1.5' fill='white' /><text fill='white' font-size='4' letter-spacing='3' font-family='monospace' font-weight='300' transform='rotate(30, 50, 10)'><textPath href='%23curve'>NAVRINE X FUTURE</textPath></text><path id='triangle-path-1' d='M 15 80 L 50 15' fill='none' /><path id='triangle-path-2' d='M 50 15 L 85 80' fill='none' /><path id='triangle-path-3' d='M 85 80 L 15 80' fill='none' /><text fill='white' font-size='4' letter-spacing='3' font-family='monospace' font-weight='300'><textPath href='%23triangle-path-1' startOffset='10%25'>• AGENCY • </textPath></text><text fill='white' font-size='4' letter-spacing='3' font-family='monospace' font-weight='300'><textPath href='%23triangle-path-2' startOffset='20%25'> DIGITAL </textPath></text><text fill='white' font-size='4' letter-spacing='3' font-family='monospace' font-weight='300'><textPath href='%23triangle-path-3' startOffset='30%25'>FRONTIER</textPath></text></svg>"
              alt="Futuristic Hover Sticker"
              className="w-full h-full object-contain"
            />
          </motion.div>

          <div className="max-w-3xl relative z-10 transition-transform duration-700 ease-out group-hover:translate-x-4">
            <h2 className="text-xs md:text-sm font-medium uppercase tracking-[0.3em] text-white/40 group-hover:text-white/80 mb-8 transition-colors duration-500">
              Multi-Disciplinary Digital Agency
            </h2>
            <p className="text-2xl md:text-4xl lg:text-5xl font-medium leading-[1.3] md:leading-[1.3] lg:leading-[1.3] text-white/70 group-hover:text-white transition-colors duration-500">
              We are Navrine, a multi-disciplinary digital agency helping brands scale through AI infrastructure, modern web development, and data-driven strategies. Building brand identities that are <span className="text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#6b38ff] group-hover:to-[#bdfb54] transition-all duration-700">impossible to ignore.</span>
            </p>
          </div>
        </motion.div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 md:px-12 lg:px-24 border-t border-white/10">
        <h2 className="text-sm font-bold uppercase tracking-widest text-white/50 mb-16">
          Trusted by Leading Brands
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            {
              quote:
                "Navrine really brought our ideas to life. Their smooth and efficient process made everything easier, and we're excited to work with them again on our next project because of how helpful they are.",
              author: "Adrianus Aristo H.",
              role: "Creative Team at BOSS Creator",
            },
            {
              quote:
                "We're a financial services company that hired Navrine to build our digital presence. They took the time to fully understand our business and audience, creating a clear, confident digital identity that truly fits who we are.",
              author: "Petrus Hadi Satria Bapa",
              role: "Managing Partner at Mesana Investama Utama",
            },
            {
              quote:
                "Navrine has been our trusted partner for years, delivering AI and web projects from start to finish. The team is responsive, professional, and always on time. High-end design, deep client understanding, and consistently outstanding results.",
              author: "Jessica Tanasaleh",
              role: "Sub-Department Head Multimedia & Corporate at PT Gajah Tunggal Tbk",
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
            <h2 className="text-sm font-bold uppercase tracking-widest text-black/50 mb-4">How we work</h2>
            <p className="text-4xl md:text-6xl font-bold tracking-tighter">Our Process</p>
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
            <h2 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-4">Common Questions</h2>
            <p className="text-4xl md:text-6xl font-bold tracking-tighter">frequently asked</p>
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
            Ready to <br />
            <span className="text-[#bdfb54]">scale</span> your <br />
            brand?
          </motion.h2>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <button
              onClick={() => navigate("/contact")}
              className="px-12 py-6 bg-[#bdfb54] text-black rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform active:scale-95 text-lg"
            >
              Start a Project
            </button>
            <button
              onClick={() => navigate("/work")}
              className="px-12 py-6 border border-white/20 rounded-full font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all text-lg"
            >
              See our work
            </button>
          </div>

          <p className="mt-16 text-white/40 font-medium uppercase tracking-[0.3em] text-xs">Based in Jakarta, Working Globally</p>
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
              <p className="font-serif italic text-3xl mb-2 text-white/90">Created by</p>
              <h3 className="text-7xl font-bold tracking-tighter mb-1">Navrine</h3>
              <p className="text-2xl font-medium opacity-80">Studio</p>
            </div>

            <div className="relative z-10 flex-1 flex items-end justify-center w-full mt-12 mb-10">
              <img
                src="/images/footer_creator.png"
                alt="Navrine Studio Creator"
                className="w-full max-w-[240px] object-cover rounded-t-full rounded-b-2xl shadow-2xl opacity-90 border-4 border-white/10"
                referrerPolicy="no-referrer"
              />
            </div>

            <button
              onClick={() => navigate("/agency")}
              className="relative z-10 w-full bg-white text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform active:scale-95 shadow-xl"
            >
              About us
            </button>
          </div>

          {/* Right Panel */}
          <div className="bg-[#111] rounded-[3rem] lg:rounded-[6rem] p-10 md:p-16 lg:p-24 text-white flex flex-col items-center justify-center relative overflow-hidden flex-1 shadow-2xl">
            <div className="text-center mb-16 relative z-10">
              <h3 className="text-xl md:text-2xl font-medium text-[#bdfb54] mb-1">Latest updates</h3>
              <p className="text-xl md:text-2xl font-medium text-white/80">from Navrine</p>
            </div>

            {/* Green Card (Blog Link) */}
            <div
              onClick={() => navigate("/blog")}
              className="relative z-10 bg-[#bdfb54] rounded-2xl md:rounded-3xl p-6 md:p-10 text-black w-full max-w-4xl shadow-2xl flex flex-col md:flex-row gap-8 items-center justify-between transition-transform hover:scale-[1.02] duration-500 cursor-pointer border border-[#c6ff55]/50"
              role="button"
              tabIndex={0}
              aria-label="Read our latest blog post about scaling Next.js"
            >
              <div className="flex-1 w-full">
                <div className="flex flex-wrap items-center gap-2 mb-8">
                  <span className="bg-[#111] text-white text-[10px] md:text-xs uppercase font-bold tracking-wider px-3 py-1.5 rounded-full">New Article</span>
                  <span className="bg-[#111] text-white text-[10px] md:text-xs uppercase font-bold tracking-wider px-3 py-1.5 rounded-full">Engineering</span>
                </div>
                <h4 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-8 md:mb-12 leading-none">Scaling<br />Next.js</h4>
                <p className="font-mono text-xs md:text-sm uppercase tracking-widest opacity-60 font-bold">Read the Insight <ArrowRight className="inline-block w-4 h-4 ml-1" aria-hidden="true" /></p>
              </div>

              <div className="w-full md:w-[50%] lg:w-[45%] aspect-[16/10] bg-[#1a1a1a] rounded-xl overflow-hidden relative shadow-lg ring-4 ring-[#111]/10">
                <img
                  src="/images/service_dev.png"
                  alt="Insight Preview"
                  className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity flex-shrink-0"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <div className="mt-16 text-[#bdfb54] font-serif italic text-3xl md:text-4xl lg:text-5xl text-center leading-tight relative z-10">
              New stuff is <br /> added every week!
            </div>
          </div>

        </div>
      </section>

      {/* Footer was moved to global component */}
    </main>
  );
}
