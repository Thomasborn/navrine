import React, { useEffect } from "react";
import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export function Blog() {

    // Inject JSON-LD Schema for Blog/Articles
    useEffect(() => {
        const schema = {
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Navrine Insights",
            "description": "Deep dives into AI infrastructure, scalable web architectures, and the future of digital product design.",
            "url": "https://navrine.com/blog",
            "publisher": {
                "@type": "Organization",
                "name": "Navrine Studio",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://navrine.com/logo.png"
                }
            }
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(schema);
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    const articles = [
        {
            id: "scaling-nextjs",
            title: "Scaling Next.js for Enterprise Data Solutions",
            excerpt: "How we architected a high-throughput financial dashboard handling millions of rows using server actions and edge caching.",
            category: "Engineering",
            date: "2026-02-28",
            image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200",
            readTime: "8 min read"
        },
        {
            id: "future-of-ai-branding",
            title: "The Intersection of AI and Brand Identity",
            excerpt: "Why static logos are dead. Exploring dynamic, algorithmic visual systems that adapt to user behavior.",
            category: "Design",
            date: "2026-02-15",
            image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200",
            readTime: "6 min read"
        },
        {
            id: "seo-for-ai-search",
            title: "Optimizing Your Platform for AI Agents",
            excerpt: "Traditional SEO is shifting. How to structure your data so GPTBot and Perplexity actually recommend your product.",
            category: "Strategy",
            date: "2026-03-01",
            image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1200",
            readTime: "12 min read"
        },
        {
            id: "building-custom-llms",
            title: "Deploying Custom LLM Infrastructure",
            excerpt: "A technical deep dive into fine-tuning open-source models for highly specific corporate knowledge bases.",
            category: "AI",
            date: "2026-01-22",
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200",
            readTime: "15 min read"
        }
    ];

    return (
        <main className="min-h-screen bg-[#050505] text-white selection:bg-[#bdfb54] selection:text-black font-sans pt-32 px-6 md:px-12 lg:px-24" aria-label="Navrine Insights and Technical Blog">
            <div className="max-w-7xl mx-auto mb-32">
                <header className="mb-20">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[10vw] md:text-[6vw] font-bold tracking-tighter uppercase leading-[0.85] mb-8"
                    >
                        Navrine <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bdfb54] to-[#bdfb54]/40">Insights</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl md:text-2xl text-white/60 max-w-2xl leading-relaxed"
                    >
                        Deep dives into scalable architecture, AI infrastructure, and the systematic design principles driving modern tech.
                    </motion.p>
                </header>

                {/* Featured Article */}
                <section className="mb-24" aria-label="Featured Article">
                    <motion.article
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="group relative w-full aspect-[4/3] md:aspect-[21/9] bg-[#111] rounded-3xl overflow-hidden cursor-pointer flex flex-col justify-end p-8 md:p-16 border border-white/10 isolate"
                    >
                        <img
                            src={articles[0].image}
                            alt={`Preview image for ${articles[0].title}`}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-60 mix-blend-luminosity group-hover:mix-blend-normal z-0"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />

                        <div className="relative z-20 w-full max-w-4xl">
                            <div className="flex items-center gap-4 mb-6">
                                <span className="bg-[#bdfb54] text-black text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">{articles[0].category}</span>
                                <time className="text-white/60 text-sm font-mono">{articles[0].date}</time>
                            </div>
                            <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-6 leading-none group-hover:text-[#bdfb54] transition-colors">
                                {articles[0].title}
                            </h2>
                            <p className="text-lg md:text-xl text-white/80 line-clamp-2 md:line-clamp-none max-w-2xl mb-8">
                                {articles[0].excerpt}
                            </p>
                            <div className="flex items-center gap-2 text-white font-bold uppercase tracking-widest text-sm group-hover:gap-4 transition-all">
                                Read Article <ArrowRight className="w-5 h-5 text-[#bdfb54]" aria-hidden="true" />
                            </div>
                        </div>
                    </motion.article>
                </section>

                {/* Article Grid */}
                <section aria-label="Latest Articles">
                    <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-12">
                        <h2 className="text-2xl font-bold tracking-tight">Latest Index</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                        {articles.slice(1).map((article, idx) => (
                            <motion.article
                                key={article.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: idx * 0.1 }}
                                className="group cursor-pointer flex flex-col"
                            >
                                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-white/5 border border-white/10">
                                    <img
                                        src={article.image}
                                        alt={`Header image for ${article.title}`}
                                        className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute top-4 right-4 w-10 h-10 bg-black/40 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                        <ArrowUpRight className="w-5 h-5 text-[#bdfb54]" />
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 mb-4 text-xs font-mono uppercase tracking-widest">
                                    <span className="text-[#bdfb54]">{article.category}</span>
                                    <span className="text-white/30">•</span>
                                    <time className="text-white/50">{article.date}</time>
                                </div>
                                <h3 className="text-2xl font-bold mb-3 leading-tight group-hover:text-white/80 transition-colors">
                                    {article.title}
                                </h3>
                                <p className="text-white/60 text-sm leading-relaxed mb-6 flex-1">
                                    {article.excerpt}
                                </p>
                                <div className="text-sm font-bold text-white/40 uppercase tracking-widest flex justify-between items-center border-t border-white/10 pt-4">
                                    <span>Read</span>
                                    <span>{article.readTime}</span>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    )
}
