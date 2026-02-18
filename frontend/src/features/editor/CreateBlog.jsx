import { useState } from 'react';
import api from '../../api/axios';
import { useNavigate } from 'react-router-dom';

export default function CreateBlog() {
    const [form, setForm] = useState({ title: '', content: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/blogs', form);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || "Content rejected by Guard.");
        }
    };

    return (
        <div className="max-w-2xl mx-auto py-20">
            <form onSubmit={handleSubmit} className="space-y-4">
                {error && <div className="p-3 bg-red-100 text-red-700 rounded">{error}</div>}
                <input 
                    className="w-full text-4xl serif font-bold outline-none" 
                    placeholder="Title..." 
                    onChange={e => setForm({...form, title: e.target.value})}
                />
                <textarea 
                    className="w-full h-64 text-lg outline-none resize-none" 
                    placeholder="Write your message..." 
                    onChange={e => setForm({...form, content: e.target.value})}
                />
                <button className="bg-black text-white px-6 py-2 rounded-full font-bold">Publish</button>
            </form>
        </div>
    );
}