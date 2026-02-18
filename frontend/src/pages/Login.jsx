import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login(email, password);
            navigate('/'); // Redirect to feed after success
        } catch (err) {
            // Your backend sends "INVALID Email" or "INVALID PASSWORD"
            setError(err.response?.data || "Login failed. Please try again.");
        }
        
    };

    

    return (
        <div className="flex justify-center items-center min-h-[80vh]">
            <div className="w-full max-w-md p-8 bg-white border border-gray-100 shadow-sm rounded-xl">
                <h1 className="serif text-3xl font-bold text-center mb-2">Welcome Back</h1>
                <p className="text-gray-500 text-center mb-8 text-sm">Continue your Mele-ekt journey</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">Email Address</label>
                        <input 
                            type="email" 
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-0 outline-none transition-all"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">Password</label>
                        <input 
                            type="password" 
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-0 outline-none transition-all"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center font-medium">
                            {error}
                        </div>
                    )}

                    <button 
                        type="submit"
                        className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors"
                    >
                        Sign In
                    </button>
                </form>

                <p className="mt-8 text-center text-sm text-gray-500">
                    New to Mele-ekt? <span className="text-orange-600 font-bold cursor-pointer">Create an account</span>
                </p>
            </div>
        </div>
    );
};

export default Login;