import postsData from './data/blog.json';

export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    category: string;
    date: string;
    author: string;
    imageUrl: string;
}

const STORAGE_KEY = 'navrine_blog_posts';

export const blogService = {
    getPosts: (): BlogPost[] => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
        // Seed from JSON if empty
        localStorage.setItem(STORAGE_KEY, JSON.stringify(postsData));
        return postsData as BlogPost[];
    },

    getPostBySlug: (slug: string): BlogPost | undefined => {
        const posts = blogService.getPosts();
        return posts.find(p => p.slug === slug);
    },

    savePost: (post: Omit<BlogPost, 'id' | 'date'> & { id?: string }) => {
        const posts = blogService.getPosts();
        const newPost: BlogPost = {
            ...post,
            id: post.id || Math.random().toString(36).substr(2, 9),
            date: new Date().toISOString().split('T')[0],
            content: post.content || '',
        } as BlogPost;

        let updatedPosts;
        if (post.id) {
            updatedPosts = posts.map(p => p.id === post.id ? newPost : p);
        } else {
            updatedPosts = [newPost, ...posts];
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPosts));
        return newPost;
    },

    deletePost: (id: string) => {
        const posts = blogService.getPosts();
        const updatedPosts = posts.filter(p => p.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPosts));
    }
};
