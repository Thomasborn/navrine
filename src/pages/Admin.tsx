import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Edit2, Trash2, Save, X, LayoutDashboard, FileText, Settings, LogOut, CheckCircle2 } from "lucide-react";
import { blogService, BlogPost } from "../blogService";
import { cn } from "../utils/cn";

export function Admin() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingPost, setEditingPost] = useState<Partial<BlogPost>>({});
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        setPosts(blogService.getPosts());
    }, []);

    const handleEdit = (post: BlogPost) => {
        setEditingPost(post);
        setIsEditing(true);
    };

    const handleCreate = () => {
        setEditingPost({
            title: "",
            slug: "",
            excerpt: "",
            content: "",
            category: "Technology",
            author: "Navrine Team",
            imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
        });
        setIsEditing(true);
    };

    const handleSave = () => {
        const saved = blogService.savePost(editingPost as any);
        setPosts(blogService.getPosts());
        setIsEditing(false);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const handleDelete = (id: string) => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            blogService.deletePost(id);
            setPosts(blogService.getPosts());
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white pt-32 pb-24 flex gap-8 px-6 md:px-12">
            {/* Sidebar */}
            <aside className="w-64 hidden lg:flex flex-col gap-8 shrink-0">
                <div className="p-6 bg-white/5 border border-white/10 rounded-3xl flex flex-col gap-4">
                    <button className="flex items-center gap-3 px-4 py-2 bg-white/10 text-white rounded-xl text-sm font-bold uppercase tracking-widest">
                        <LayoutDashboard className="w-4 h-4" /> Dashboard
                    </button>
                    <button className="flex items-center gap-3 px-4 py-2 hover:bg-white/5 text-white/50 rounded-xl text-sm font-bold uppercase tracking-widest transition-colors">
                        <FileText className="w-4 h-4" /> Posts
                    </button>
                    <button className="flex items-center gap-3 px-4 py-2 hover:bg-white/5 text-white/50 rounded-xl text-sm font-bold uppercase tracking-widest transition-colors">
                        <Settings className="w-4 h-4" /> Settings
                    </button>
                </div>

                <button className="mt-auto flex items-center gap-3 px-6 py-2 text-white/30 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">
                    <LogOut className="w-4 h-4" /> Logout
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1">
                <div className="max-w-5xl">
                    <div className="flex justify-between items-center mb-12">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight uppercase">Content Management</h1>
                            <p className="text-white/40 text-sm font-mono uppercase tracking-widest mt-1">Navrine Blog Architecture</p>
                        </div>
                        <button
                            onClick={handleCreate}
                            className="px-6 py-3 bg-[#bdfb54] text-black rounded-full font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-xl"
                        >
                            <Plus className="w-4 h-4" /> New Article
                        </button>
                    </div>

                    {/* Posts List */}
                    <div className="bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/10 bg-white/[0.02]">
                                    <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">Article</th>
                                    <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">Category</th>
                                    <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">Date</th>
                                    <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {posts.map((post) => (
                                    <tr key={post.id} className="border-b border-white/10 hover:bg-white/[0.02] transition-colors group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-white/10">
                                                    <img src={post.imageUrl} className="w-full h-full object-cover" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-lg mb-0.5">{post.title}</p>
                                                    <p className="text-xs text-white/30 font-mono tracking-widest uppercase">{post.slug}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#bdfb54]">
                                                {post.category}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-sm text-white/40 font-mono tracking-widest">
                                            {post.date}
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => handleEdit(post)}
                                                    className="p-2 hover:bg-white/10 rounded-lg text-white/70 hover:text-[#bdfb54] transition-all"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(post.id)}
                                                    className="p-2 hover:bg-white/10 rounded-lg text-white/70 hover:text-red-400 transition-all"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            {/* Editor Modal */}
            <AnimatePresence>
                {isEditing && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
                            onClick={() => setIsEditing(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-4xl bg-[#0a0a0a] border border-white/10 rounded-[3rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
                        >
                            <div className="p-8 border-b border-white/10 flex justify-between items-center bg-white/[0.02]">
                                <h2 className="text-xl font-bold uppercase tracking-widest">
                                    {editingPost.id ? 'Edit Article' : 'New Article'}
                                </h2>
                                <button onClick={() => setIsEditing(false)} className="text-white/30 hover:text-white transition-colors">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="p-8 overflow-y-auto flex-1 custom-scrollbar">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-[10px] font-bold uppercase tracking-widest text-white/30 mb-2">Title</label>
                                            <input
                                                type="text"
                                                value={editingPost.title}
                                                onChange={e => setEditingPost({ ...editingPost, title: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-[#bdfb54]/50 text-white transition-colors"
                                                placeholder="Article title..."
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold uppercase tracking-widest text-white/30 mb-2">Slug</label>
                                            <input
                                                type="text"
                                                value={editingPost.slug}
                                                onChange={e => setEditingPost({ ...editingPost, slug: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-[#bdfb54]/50 text-white font-mono transition-colors"
                                                placeholder="article-slug..."
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-[10px] font-bold uppercase tracking-widest text-white/30 mb-2">Category</label>
                                            <select
                                                value={editingPost.category}
                                                onChange={e => setEditingPost({ ...editingPost, category: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-[#bdfb54]/50 text-white transition-colors appearance-none"
                                            >
                                                <option value="Technology" className="bg-[#0a0a0a]">Technology</option>
                                                <option value="Design" className="bg-[#0a0a0a]">Design</option>
                                                <option value="Strategy" className="bg-[#0a0a0a]">Strategy</option>
                                                <option value="Growth" className="bg-[#0a0a0a]">Growth</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold uppercase tracking-widest text-white/30 mb-2">Image URL</label>
                                            <input
                                                type="text"
                                                value={editingPost.imageUrl}
                                                onChange={e => setEditingPost({ ...editingPost, imageUrl: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-[#bdfb54]/50 text-white transition-colors"
                                                placeholder="https://..."
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-[10px] font-bold uppercase tracking-widest text-white/30 mb-2">Excerpt</label>
                                        <textarea
                                            rows={3}
                                            value={editingPost.excerpt}
                                            onChange={e => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-[#bdfb54]/50 text-white transition-colors resize-none"
                                            placeholder="Brief summary..."
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold uppercase tracking-widest text-white/30 mb-2">Content (Markdown)</label>
                                        <textarea
                                            rows={12}
                                            value={editingPost.content}
                                            onChange={e => setEditingPost({ ...editingPost, content: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 focus:outline-none focus:border-[#bdfb54]/50 text-white transition-colors font-sans leading-relaxed"
                                            placeholder="Write your article content..."
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 border-t border-white/10 flex justify-end gap-4 bg-white/[0.02]">
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="px-6 py-3 bg-transparent border border-white/10 hover:bg-white/5 text-white/50 hover:text-white rounded-full font-bold uppercase tracking-widest text-[10px] transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="px-8 py-3 bg-white text-black rounded-full font-bold uppercase tracking-widest text-[10px] flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-xl"
                                >
                                    <Save className="w-4 h-4" /> Save Article
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Toast Notification */}
            <AnimatePresence>
                {showToast && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[110] bg-[#bdfb54] text-black px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 font-bold uppercase tracking-widest text-sm"
                    >
                        <CheckCircle2 className="w-5 h-5" /> Changes saved successfully
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
