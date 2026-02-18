import { useEffect, useState } from 'react';
import api from '../api/axios';
import { TrendingUp, MessageSquare } from 'lucide-react';

export default function Home() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        api.get('/home').then(res => setBlogs(res.data)).catch(console.error);
    }, []);

    return (
        <div className="max-w-2xl mx-auto py-10 px-4">
            <h1 className="serif text-4xl font-black mb-10 border-b-2 border-black pb-2">Mele-ekt Feed</h1>
            <div className="space-y-12">
                {blogs.map(blog => (
                    <article key={blog._id} className="group">
                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                            <span className="font-bold text-black">{blog.author}</span>
                            <span>•</span>
                            <span>{new Date(blog.Date).toLocaleDateString()}</span>
                        </div>
                        <h2 className="serif text-2xl font-bold group-hover:text-orange-600 transition-colors mb-2">{blog.title}</h2>
                        <p className="text-gray-600 line-clamp-3 mb-4 leading-relaxed">{blog.content}</p>
                        <div className="flex items-center gap-6 text-gray-500 text-sm">
                            <span className="flex items-center gap-1"><TrendingUp size={14}/> {blog.Engagement}</span>
                            <span className="flex items-center gap-1"><MessageSquare size={14}/> {blog.blogComments?.length || 0}</span>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}