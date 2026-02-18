import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

const CommentSection = ({ postId, initialCount }) => {
    const { user } = useAuth();
    const [comments, setComments] = useState([]);
    const [showComments, setShowComments] = useState(false);
    const [text, setText] = useState('');

    useEffect(() => {
        if (showComments) {
            api.get(`/posts/${postId}/comments`)
                .then(res => setComments(res.data))
                .catch(err => console.error("Fetch error:", err));
        }
    }, [showComments, postId]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post(`/posts/${postId}/comments`, { text });
            setComments(prev => [...prev, res.data]);
            setText('');
        } catch (err) {
            alert("Please sign in to comment.");
        }
    };

    return (
        <div className="comment-wrapper" style={{ marginTop: '10px', position: 'relative', zIndex: 10 }}>
            {/* TRIGGER: We'll use a button to force browser click behavior */}
            <div 
                className="post-stats" 
                onClick={() => {
                    console.log("Toggle clicked for post:", postId);
                    setShowComments(!showComments);
                }} 
                style={{ 
                    cursor: 'pointer', 
                    display: 'flex', 
                    gap: '15px', 
                    padding: '10px 0',
                    userSelect: 'none',
                    border: '1px dashed transparent' // To verify click area
                }}
                onMouseOver={(e) => e.currentTarget.style.border = '1px dashed #ccc'}
                onMouseOut={(e) => e.currentTarget.style.border = '1px dashed transparent'}
            >
                <span style={{ pointerEvents: 'none' }}>📈 1</span>
                <span className="comment-trigger" style={{ pointerEvents: 'none', fontWeight: 'bold' }}>
                    💬 {showComments ? 'Hide Comments' : `${comments.length || initialCount} Comments`}
                </span>
            </div>

            {showComments && (
                <div className="comments-expanded" style={{ background: '#f9f9f9', padding: '15px', borderRadius: '8px', marginTop: '10px' }}>
                    <div className="comments-list">
                        {comments.length === 0 && <p>No comments yet. Be the first!</p>}
                        {comments.map(c => (
                            <div key={c._id} style={{ marginBottom: '10px', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>
                                <small style={{ color: '#ff4500', fontWeight: 'bold' }}>
                                    {c.author?.email || 'Anonymous'}
                                </small>
                                <p style={{ margin: '5px 0' }}>{c.text}</p>
                            </div>
                        ))}
                    </div>

                    {user ? (
                        <form onSubmit={handleCommentSubmit} style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                            <input 
                                type="text" 
                                value={text} 
                                onChange={(e) => setText(e.target.value)} 
                                placeholder="Write a comment..."
                                style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                            />
                            <button type="submit" style={{ padding: '8px 15px', background: '#000', color: '#fff', borderRadius: '4px', cursor: 'pointer' }}>
                                Post
                            </button>
                        </form>
                    ) : (
                        <p style={{ fontSize: '0.8rem', color: '#666' }}>Please Sign In to comment.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default CommentSection;