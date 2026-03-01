import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowRight, Search, Calendar, User, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import { blogService, BlogPost } from "../blogService";
import { cn } from "../utils/cn";

export function Blog() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    useEffect(() => {
        setPosts(blogService.getPosts());
    }, []);

    const categories = ["All", ...Array.from(new Set(posts.map(p => p.category)))];

    const filteredPosts = posts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-[#050505] text-white pt-32 pb-24 px-6 md:px-12 lg:px-24">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-bold tracking-tighter uppercase mb-6"
                    >
                        Insights & <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">Innovations</span>
                    </motion.h1>
                    <p className="text-xl text-white/50 max-w-2xl leading-relaxed">
                        Exploring the intersection of high-end design, autonomous AI, and the future of digital engineering.
                    </p>
                </div>

                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-8 mb-12 items-center justify-between border-b border-white/10 pb-8">
                    <div className="flex flex-wrap gap-4">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={cn(
                                    "px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest transition-all border",
                                    selectedCategory === cat
                                        ? "bg-white text-black border-white"
                                        : "bg-transparent text-white/50 border-white/10 hover:border-white/30"
                                )}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                        <input
                            type="text"
                            placeholder="SEARCH ARTICLES..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-6 text-sm font-mono uppercase tracking-widest focus:outline-none focus:border-[#bdfb54]/50 transition-colors"
                        />
                    </div>
                </div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPosts.map((post, idx) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="group"
                        >
                            <Link to={`/blog/${post.slug}`} className="block">
                                <div className="relative aspect-[16/10] rounded-3xl overflow-hidden mb-6 border border-white/10 bg-white/5">
                                    <img
                                        src={post.imageUrl}
                                        alt={post.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/10">
                                            {post.category}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 text-white/40 text-[10px] font-mono uppercase tracking-widest mb-3">
                                    <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /> {post.date}</span>
                                    <span className="flex items-center gap-1.5"><User className="w-3 h-3" /> {post.author}</span>
                                </div>

                                <h3 className="text-2xl font-bold mb-4 group-hover:text-[#bdfb54] transition-colors leading-tight">
                                    {post.title}
                                </h3>

                                <p className="text-white/50 text-sm leading-relaxed mb-6 line-clamp-2">
                                    {post.excerpt}
                                </p>

                                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest group-hover:gap-4 transition-all">
                                    Read Article <ArrowRight className="w-4 h-4 text-[#bdfb54]" />
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {filteredPosts.length === 0 && (
                    <div className="py-24 text-center">
                        <p className="text-white/30 uppercase tracking-widest font-mono">No articles found matching your criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
