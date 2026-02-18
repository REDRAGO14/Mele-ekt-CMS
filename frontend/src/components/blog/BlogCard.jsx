import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import CommentSection from './CommentSection';

const BlogList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/posts')
            .then(res => {
                setPosts(res.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) return <div className="loading">Updating Feed...</div>;

    return (
        <div className="mele-ekt-feed">
            <h1 className="feed-title">Mele-ekt Feed</h1>
            <hr />
            {posts.map(post => (
                <article key={post._id} className="post-entry">
                    <div className="post-header">
                        <span className="author-email">{post.author?.email || 'anonymous@user.com'}</span>
                        <span className="post-date"> • {new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                    
                    <h2 className="post-title">{post.title}</h2>
                    <p className="post-excerpt">{post.content}</p>

                    {/* This component now handles its own "Show/Hide" logic */}
                    <CommentSection postId={post._id} initialCount={post.comments?.length || 0} />
                </article>
            ))}
        </div>
    );
};

export default BlogList;