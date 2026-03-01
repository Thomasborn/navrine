import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, User, Share2, CornerUpLeft } from "lucide-react";
import { blogService, BlogPost } from "../blogService";

export function BlogPostPage() {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const [post, setPost] = useState<BlogPost | undefined>(undefined);

    useEffect(() => {
        if (slug) {
            const p = blogService.getPostBySlug(slug);
            if (p) {
                setPosts(p);
            } else {
                navigate('/blog');
            }
        }
    }, [slug, navigate]);

    const setPosts = (p: BlogPost) => setPost(p);

    if (!post) return null;

    return (
        <div className="min-h-screen bg-[#050505] text-white pt-32 pb-24 px-6 md:px-12 lg:px-24">
            <div className="max-w-4xl mx-auto">
                {/* Back Link */}
                <Link
                    to="/blog"
                    className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white/50 hover:text-white transition-colors mb-12"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Insights
                </Link>

                {/* Post Header */}
                <header className="mb-16">
                    <div className="flex gap-4 mb-8">
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#bdfb54]">
                            {post.category}
                        </span>
                        <div className="flex items-center gap-4 text-white/30 text-[10px] font-mono uppercase tracking-widest">
                            <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /> {post.date}</span>
                            <span className="flex items-center gap-1.5"><User className="w-3 h-3" /> {post.author}</span>
                        </div>
                    </div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.1] mb-12"
                    >
                        {post.title}
                    </motion.h1>

                    <div className="aspect-[21/9] rounded-[2rem] overflow-hidden border border-white/10 bg-white/5 mb-16">
                        <img
                            src={post.imageUrl}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </header>

                {/* Post Content */}
                <article className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tighter prose-headings:uppercase prose-p:text-white/70 prose-p:leading-relaxed prose-strong:text-white prose-a:text-[#bdfb54]">
                    <div className="bg-white/5 p-8 md:p-12 rounded-[2rem] border border-white/10 mb-16 italic text-xl md:text-2xl text-white/90 leading-relaxed font-medium">
                        {post.excerpt}
                    </div>

                    <div className="whitespace-pre-wrap text-lg md:text-xl text-white/70 leading-[1.8] space-y-8">
                        {post.content}
                    </div>
                </article>

                {/* Footer actions */}
                <div className="mt-24 pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                            <User className="w-5 h-5 text-white/50" />
                        </div>
                        <div>
                            <p className="text-sm font-bold uppercase tracking-widest mb-0.5">{post.author}</p>
                            <p className="text-xs text-white/30 font-mono uppercase tracking-widest">Navrine Team</p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                            <Share2 className="w-4 h-4" /> Share Article
                        </button>
                        <Link to="/contact" className="flex items-center gap-2 px-6 py-3 bg-[#bdfb54] text-black rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 active:scale-95 transition-all">
                            Discuss This Topic <CornerUpLeft className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
