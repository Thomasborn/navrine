import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { ArrowRight, Menu, Play, Star, ArrowUpRight, X, ChevronDown, Globe, Zap, BarChart, Layers, CheckCircle2, MessageSquare, Terminal, LayoutTemplate, Smartphone, Code } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "../utils/cn";

// Sub-components for better readability
const StatCounter = ({ end, label, suffix = "" }: { end: number, label: string, suffix?: string }) => {
  return (
    <div className="flex flex-col border-l border-white/20 pl-6">
      <span className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-white/50">
        {end}{suffix}
      </span>
      <span className="text-sm text-white/50 uppercase tracking-widest mt-2">{label}</span>
    </div>
  );
};

const ProcessStep = ({ number, title, description, icon: Icon }: { number: string, title: string, description: string, icon: any }) => (
  <div className="relative pl-12 md:pl-0">
    {/* Mobile timeline line */}
    <div className="absolute left-[15px] top-10 bottom-[-40px] w-px bg-white/10 md:hidden last:hidden"></div>
    {/* Desktop timeline line */}
    <div className="hidden md:block absolute top-[28px] left-[60px] right-[-60px] h-px bg-white/10 last:hidden"></div>

    <div className="flex flex-col md:items-center text-left md:text-center group relative z-10">
      <div className="absolute left-0 top-0 md:relative w-8 h-8 md:w-14 md:h-14 rounded-full bg-[#111] border border-white/20 flex items-center justify-center text-sm md:text-base font-bold text-white/50 group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-500 mb-6 shrink-0 z-20">
        {number}
      </div>
      <div className="bg-[#111] p-4 rounded-2xl w-16 h-16 flex items-center justify-center mb-6 hidden md:flex border border-white/5 group-hover:border-white/20 transition-colors">
        <Icon className="w-8 h-8 text-[#bdfb54]" />
      </div>
      <h3 className="text-xl md:text-2xl font-bold mb-3">{title}</h3>
      <p className="text-white/60 leading-relaxed max-w-xs">{description}</p>
    </div>
  </div>
);

const ServiceCard = ({ icon: Icon, title, description, tags, onClick }: any) => (
  <div
    onClick={onClick}
    className="group p-8 md:p-10 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-500 cursor-pointer relative overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-[#6b38ff]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    <div className="relative z-10 flex flex-col h-full">
      <div className="mb-8 p-4 bg-black/50 rounded-2xl inline-block w-fit border border-white/5 group-hover:scale-110 transition-transform duration-500">
        <Icon className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-2xl md:text-3xl font-bold mb-4">{title}</h3>
      <p className="text-white/60 leading-relaxed mb-8 flex-1">{description}</p>
      <div className="flex flex-wrap gap-2 mt-auto">
        {tags.map((tag: string, i: number) => (
          <span key={i} className="text-xs font-mono uppercase tracking-wider px-3 py-1 bg-black/50 rounded-full border border-white/10">
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const FaqItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/10 py-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left group"
      >
        <h3 className="text-xl md:text-2xl font-medium group-hover:text-[#bdfb54] transition-colors pr-8">
          {question}
        </h3>
        <ChevronDown className={cn("w-6 h-6 text-white/50 transition-transform duration-300 shrink-0", isOpen && "rotate-180")} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="text-white/60 text-lg leading-relaxed pt-4 pb-2">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


export function Landing() {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const exploreRef = useRef<HTMLElement>(null);

  const scrollToExplore = () => {
    exploreRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#bdfb54] selection:text-black font-sans overflow-x-hidden">

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[100svh] flex flex-col justify-center px-6 md:px-12 lg:px-24 overflow-hidden pt-20">
        <motion.div style={{ opacity: opacityHero }} className="absolute inset-0 z-0">
          <motion.img
            style={{ y, scale: 1.1 }}
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
            alt="Abstract Liquid Structure"
            className="w-full h-full object-cover opacity-30 mix-blend-screen"
          />
          {/* Radial gradient overlay for focus */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_100%)] opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/50 via-transparent to-[#050505]" />
        </motion.div>

        {/* Animated Grid Background */}
        <div className="absolute inset-0 z-[1] opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

        <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center lg:items-end justify-between gap-12 mt-12 pb-24">
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md"
            >
              <span className="w-2 h-2 rounded-full bg-[#bdfb54] animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-widest text-white/80">Available for new projects</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-[12vw] md:text-[8vw] lg:text-[6.5vw] leading-[0.85] font-bold tracking-tighter uppercase mb-6"
            >
              Architecting <br />
              <span className="relative inline-block">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-[#bdfb54]">
                  digital
                </span>
                {/* Glow effect */}
                <span className="absolute inset-0 blur-2xl bg-gradient-to-r from-white/20 to-[#bdfb54]/20 opacity-50 block z-0"></span>
              </span>{" "}
              excellence
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-2xl text-white/60 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed mb-10"
            >
              We build premium web experiences and AI-driven infrastructure that transform ambitious brands into industry leaders.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start"
            >
              <button
                onClick={scrollToExplore}
                className="px-8 py-4 bg-white text-black rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)] flex items-center gap-3 w-full sm:w-auto justify-center"
              >
                Explorer Our Work <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="px-8 py-4 bg-transparent border border-white/20 text-white rounded-full font-bold uppercase tracking-widest text-sm hover:bg-white/5 active:scale-95 transition-all flex items-center gap-3 w-full sm:w-auto justify-center group"
              >
                <Play className="w-4 h-4 text-[#bdfb54] group-hover:scale-110 transition-transform" /> Showreel
              </button>
            </motion.div>
          </div>

          {/* Stats Block - Right side on desktop */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-row lg:flex-col gap-8 md:gap-12"
          >
            <StatCounter end={40} suffix="+" label="Projects Delivered" />
            <StatCounter end={99} suffix="%" label="Client Satisfaction" />
            <StatCounter end={5} suffix="x" label="Avg ROI Generated" />
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-white/50 to-transparent overflow-hidden">
            <motion.div
              animate={{ y: [0, 64] }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="w-full h-1/2 bg-white"
            />
          </div>
        </motion.div>
      </section>

      {/* --- CLIENT MARQUEE --- */}
      <section className="py-12 border-y border-white/10 bg-white/[0.02] overflow-hidden flex flex-col items-center relative gap-8">
        <p className="text-xs uppercase tracking-[0.2em] font-bold text-white/40">Trusted by innovative companies</p>
        <div className="relative w-full flex overflow-x-hidden group">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10"></div>

          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "-50%" }}
            transition={{ duration: 40, ease: "linear", repeat: Infinity }}
            className="flex items-center whitespace-nowrap gap-16 md:gap-32 px-8 group-hover:[animation-play-state:paused]"
          >
            {/* First set */}
            {["BOSS CREATOR", "MESANA INVESTAMA", "GAJAH TUNGGAL TBK", "NEXTGEN APPS", "NEXUS CORP", "HORIZON LABS"].map((client, i) => (
              <div key={i} className="text-2xl md:text-3xl font-bold font-serif opacity-30 hover:opacity-100 transition-opacity uppercase tracking-wider">{client}</div>
            ))}
            {/* Duplicate for seamless infinite loop */}
            {["BOSS CREATOR", "MESANA INVESTAMA", "GAJAH TUNGGAL TBK", "NEXTGEN APPS", "NEXUS CORP", "HORIZON LABS"].map((client, i) => (
              <div key={`dup-${i}`} className="text-2xl md:text-3xl font-bold font-serif opacity-30 hover:opacity-100 transition-opacity uppercase tracking-wider">{client}</div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- ABOUT / PHILOSOPHY --- */}
      <section ref={exploreRef} className="py-32 px-6 md:px-12 lg:px-24 relative">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          <div className="flex-1 w-full relative">
            <div className="aspect-[4/5] rounded-[2rem] overflow-hidden relative group border border-white/10 bg-white/5">
              <motion.img
                initial={{ scale: 1.2 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                viewport={{ once: true }}
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
                alt="Navrine Office / Server"
                className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700 mix-blend-luminosity hover:mix-blend-normal"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-8 right-8 w-32 h-32 md:w-40 md:h-40 opacity-80"
              >
                <img
                  src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><path id='curve' d='M 50,50 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0' fill='none'/><text fill='white' font-size='9' letter-spacing='4' font-family='monospace' font-weight='bold'><textPath href='%23curve'>• NAVRINE STUDIO • EST 2024 </textPath></text></svg>"
                  alt="Spinning Badge"
                  className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                />
              </motion.div>
            </div>
          </div>

          <div className="flex-1 relative z-10 w-full">
            <h2 className="text-sm font-bold uppercase tracking-widest text-[#bdfb54] mb-6 flex items-center gap-2">
              <span className="w-8 h-px bg-[#bdfb54]"></span> Our Philosophy
            </h2>
            <h3 className="text-3xl md:text-5xl font-bold leading-[1.2] tracking-tight mb-8">
              We don't just write code.<br />We architect systems for exponential growth.
            </h3>
            <p className="text-xl text-white/60 leading-relaxed mb-8">
              Navrine is a multi-disciplinary digital agency sitting at the intersection of stunning design and robust engineering. We believe that a beautiful frontend is meaningless without a scalable backbone.
            </p>
            <p className="text-xl text-white/60 leading-relaxed mb-12">
              Our team of developers, designers, and strategists work in unison to build digital products that are not only impossible to ignore visually, but structurally resilient enough to handle tomorrow's demands.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {[
                "Technical Excellence",
                "Strategic Design",
                "Data-Driven Decisions",
                "Scalable Architecture"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#bdfb54] shrink-0" />
                  <span className="font-bold text-sm md:text-base uppercase tracking-wider">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- DETAILED SERVICES GRID --- */}
      <section className="py-32 px-6 md:px-12 lg:px-24 bg-[#0a0a0a] relative border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-sm font-bold uppercase tracking-widest text-[#6b38ff] mb-4">
                Capabilities
              </h2>
              <h3 className="text-4xl md:text-6xl font-bold tracking-tight leading-none">
                Specialized in <br />
                <span className="text-white/50">Digital Domination</span>
              </h3>
            </div>
            <Link to="/services" className="inline-flex items-center gap-2 uppercase font-bold text-sm tracking-widest hover:text-[#bdfb54] transition-colors pb-2 border-b border-white/20 hover:border-[#bdfb54]">
              View All Capabilities <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ServiceCard
              title="Web Development"
              description="High-performance, ultra-responsive web applications built with modern frameworks like React, Next.js, and solid architectures designed to scale effortlessly."
              icon={Terminal}
              tags={["React Ecosystem", "Next.js", "Headless CMS"]}
              onClick={() => navigate("/services")}
            />
            <ServiceCard
              title="AI Infrastructure"
              description="Integration of cutting-edge language models, computer vision, and predictive analytics to automate workflows and create smart, adaptive user experiences."
              icon={Zap}
              tags={["LLM Integration", "Automations", "Data Pipelines"]}
              onClick={() => navigate("/services")}
            />
            <ServiceCard
              title="UI/UX Design"
              description="Premium, user-centric interfaces rooted in human psychology. We design digital experiences that feel intuitive and look exceptionally modern."
              icon={LayoutTemplate}
              tags={["Wireframing", "Prototyping", "Design Systems"]}
              onClick={() => navigate("/services")}
            />
            <ServiceCard
              title="Growth & Analytics"
              description="Data-backed strategies to increase conversion rates, optimize user funnels, and ensure your digital product reaches and retains its target audience."
              icon={BarChart}
              tags={["SEO Optimization", "Conversion Tracking", "A/B Testing"]}
              onClick={() => navigate("/services")}
            />
          </div>
        </div>
      </section>

      {/* --- OUR PROCESS --- */}
      <section className="py-32 px-6 md:px-12 lg:px-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#6b38ff]/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-sm font-bold uppercase tracking-widest text-white/50 mb-4">How We Work</h2>
            <h3 className="text-4xl md:text-5xl font-bold tracking-tight">A proven process for<br />predictable success.</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 relative">
            <ProcessStep
              number="01"
              title="Discovery"
              description="We dive deep into your business logic, audience needs, and technical constraints to map out a clear path to success."
              icon={MessageSquare}
            />
            <ProcessStep
              number="02"
              title="Strategy"
              description="Crafting the architecture, selecting the right tech stack, and wireframing the user experience before writing a single line of code."
              icon={Layers}
            />
            <ProcessStep
              number="03"
              title="Execution"
              description="Our engineers and designers work in sprints to build, test, and refine your product to the highest industry standards."
              icon={Code}
            />
            <ProcessStep
              number="04"
              title="Optimization"
              description="Post-launch, we monitor analytics, gather user feedback, and iterate to continuously improve performance and ROI."
              icon={Smartphone}
            />
          </div>
        </div>
      </section>

      {/* --- FEATURED CASE STUDIES --- */}
      <section className="py-32 px-6 md:px-12 lg:px-24 bg-white text-black rounded-t-[3rem] md:rounded-t-[5rem]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-black/50 mb-4">
                Selected Work
              </h2>
              <p className="text-3xl md:text-5xl font-bold tracking-tight max-w-2xl leading-tight">
                Outcomes that matter.
              </p>
            </div>
            <Link
              to="/work"
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:opacity-70 transition-opacity border-b border-black/20 pb-1"
            >
              View All Projects <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex flex-col gap-12 md:gap-24">
            {/* Project 1 */}
            <div className="group grid grid-cols-1 lg:grid-cols-12 gap-8 items-center cursor-pointer" onClick={() => navigate('/work')}>
              <div className="lg:col-span-7 aspect-[4/3] rounded-3xl overflow-hidden relative shadow-2xl shadow-black/10">
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1s] ease-[cubic-bezier(0.16,1,0.3,1)]"
                  alt="Fintech Dashboard"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-20 h-20 rounded-full bg-white backdrop-blur-md flex items-center justify-center scale-50 group-hover:scale-100 transition-transform duration-[0.8s] ease-[cubic-bezier(0.16,1,0.3,1)] shadow-xl">
                    <ArrowUpRight className="w-8 h-8 text-black" />
                  </div>
                </div>
              </div>
              <div className="lg:col-span-5 flex flex-col justify-center lg:pl-12">
                <div className="flex gap-3 mb-6">
                  <span className="px-3 py-1 bg-black/5 rounded-full text-xs font-bold uppercase tracking-wider">Fintech</span>
                  <span className="px-3 py-1 bg-black/5 rounded-full text-xs font-bold uppercase tracking-wider">Web App</span>
                </div>
                <h3 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Mesana Dashboard</h3>
                <p className="text-lg text-black/60 mb-8 leading-relaxed">
                  A complete overhaul of a legacy financial dashboard, improving data processing speeds by 400% and creating a seamless, intuitive experience for wealth managers.
                </p>
                <div className="flex items-center gap-8 border-l-2 border-black/10 pl-6">
                  <div>
                    <p className="text-3xl font-bold mb-1">400%</p>
                    <p className="text-xs uppercase tracking-widest text-black/50 font-bold">Speed Increase</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold mb-1">+2.5M</p>
                    <p className="text-xs uppercase tracking-widest text-black/50 font-bold">Data Points Managed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Project 2 (Reversed) */}
            <div className="group grid grid-cols-1 lg:grid-cols-12 gap-8 items-center cursor-pointer" onClick={() => navigate('/work')}>
              <div className="lg:col-span-5 flex flex-col justify-center lg:pr-12 order-2 lg:order-1">
                <div className="flex gap-3 mb-6">
                  <span className="px-3 py-1 bg-black/5 rounded-full text-xs font-bold uppercase tracking-wider">E-Commerce</span>
                  <span className="px-3 py-1 bg-black/5 rounded-full text-xs font-bold uppercase tracking-wider">AI Integration</span>
                </div>
                <h3 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Nexus AI Engine</h3>
                <p className="text-lg text-black/60 mb-8 leading-relaxed">
                  We built a custom recommendation engine utilizing machine learning that dynamically adjusts product listings based on real-time user behavior.
                </p>
                <div className="flex items-center gap-8 border-l-2 border-black/10 pl-6">
                  <div>
                    <p className="text-3xl font-bold mb-1">+45%</p>
                    <p className="text-xs uppercase tracking-widest text-black/50 font-bold">Conversion Rate</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold mb-1">Sub-50ms</p>
                    <p className="text-xs uppercase tracking-widest text-black/50 font-bold">Latency</p>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-7 aspect-[4/3] rounded-3xl overflow-hidden relative shadow-2xl shadow-black/10 order-1 lg:order-2">
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1s] ease-[cubic-bezier(0.16,1,0.3,1)]"
                  alt="Data Analytics UI"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-20 h-20 rounded-full bg-white backdrop-blur-md flex items-center justify-center scale-50 group-hover:scale-100 transition-transform duration-[0.8s] ease-[cubic-bezier(0.16,1,0.3,1)] shadow-xl">
                    <ArrowUpRight className="w-8 h-8 text-black" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FAQ --- */}
      <section className="py-32 px-6 md:px-12 lg:px-24 border-t border-white/10 max-w-5xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold uppercase tracking-widest text-[#bdfb54] mb-4">Questions?</h2>
          <h3 className="text-4xl md:text-5xl font-bold tracking-tight">Frequently Asked</h3>
        </div>

        <div className="flex flex-col">
          <FaqItem
            question="What is your typical project timeline?"
            answer="Timelines vary significantly based on project scope. A standard corporate website might take 4-6 weeks, while a complex web application with custom AI infrastructure can take 3-6 months. We break deliverables into agile sprints to ensure you see progress continuously."
          />
          <FaqItem
            question="How do you handle project pricing?"
            answer="We offer value-based pricing tailored to the specific business outcomes our work will generate for you. We provide detailed proposals outlining the scope, deliverables, and exact investment required before any work begins. We do not do hourly billing for major projects."
          />
          <FaqItem
            question="Do you provide post-launch support?"
            answer="Absolutely. We view launch as the beginning, not the end. We offer customized retainer agreements for ongoing optimization, security patches, feature additions, and analytics monitoring to ensure your product scales smoothly."
          />
          <FaqItem
            question="What technologies do you specialize in?"
            answer="Our core stack includes React/Next.js for the frontend, Node.js or Python for the backend, and various cloud providers (AWS, Vercel). We are also deeply experienced in integrating modern headless CMS platforms and integrating specific AI pipelines (OpenAI, Anthropic APIs)."
          />
        </div>
      </section>

      {/* --- MASSIVE CTA / FOOTER TEASER --- */}
      <section className="py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto bg-gradient-to-br from-[#6b38ff] to-[#401abd] rounded-[3rem] p-12 md:p-24 relative overflow-hidden flex flex-col items-center text-center shadow-[0_0_100px_rgba(107,56,255,0.2)]">
          {/* Abstract circles */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] border border-white/10 rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] border border-white/10 rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="absolute top-0 right-0 w-[400px] h-[400px] border border-white/10 rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />

          <div className="relative z-10">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 max-w-4xl mx-auto leading-[0.9]">
              Ready to build something <span className="text-[#bdfb54]">extraordinary?</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/80 font-medium mb-12 max-w-2xl mx-auto">
              Let's discuss how Navrine can transform your digital presence and optimize your technical infrastructure.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button onClick={() => navigate('/contact')} className="px-10 py-5 bg-[#bdfb54] text-black rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 active:scale-95 transition-all shadow-xl flex items-center justify-center gap-3 w-full sm:w-auto">
                Start a Project <ArrowUpRight className="w-5 h-5" />
              </button>
              <a href="mailto:hello@navrine.studio" className="px-10 py-5 bg-transparent border border-white/30 text-white rounded-full font-bold uppercase tracking-widest text-sm hover:bg-white/10 active:scale-95 transition-all flex items-center justify-center gap-3 w-full sm:w-auto">
                hello@navrine.studio
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal Overlay */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setIsVideoModalOpen(false)}
          >
            <button
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
              onClick={() => setIsVideoModalOpen(false)}
            >
              <X className="w-8 h-8" />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-5xl aspect-video bg-[#111] border border-white/10 rounded-2xl flex items-center justify-center overflow-hidden relative shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#6b38ff]/20 to-[#bdfb54]/20 opacity-50" />
              <div className="text-center relative z-10">
                <Play className="w-20 h-20 text-[#bdfb54] mx-auto mb-6 opacity-80" />
                <p className="text-white text-xl md:text-2xl font-bold tracking-tight mb-2">Agency Showreel</p>
                <p className="text-white/50 uppercase tracking-widest text-xs font-bold">Video coming soon</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
