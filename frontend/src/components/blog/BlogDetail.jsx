import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import CommentSection from '../components/blog/CommentSection';

const BlogDetail = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchBlog = async () => {
        try {
            // Note: Use your specific route for a single blog
            const response = await api.get(`/blogs/${id}`);
            setBlog(response.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchBlog(); }, [id]);

    if (loading) return <div className="py-20 text-center serif italic">Loading story...</div>;
    if (!blog) return <div className="py-20 text-center">Story not found.</div>;

    return (
        <div className="max-w-2xl mx-auto py-16 px-4">
            <h1 className="serif text-4xl md:text-5xl font-black mb-6 leading-tight">
                {blog.title}
            </h1>
            
            <div className="flex items-center gap-3 mb-10 text-gray-500">
                <div className="font-bold text-black">{blog.author}</div>
                <span>•</span>
                <div>{new Date(blog.Date).toLocaleDateString()}</div>
            </div>

            <div className="prose prose-orange max-w-none serif text-xl leading-relaxed text-gray-800 mb-16 whitespace-pre-line">
                {blog.content}
            </div>

            <CommentSection 
                blogId={blog._id} 
                initialComments={blog.blogComments} 
                onCommentAdded={fetchBlog}
            />
        </div>
    );
};

export default BlogDetail;