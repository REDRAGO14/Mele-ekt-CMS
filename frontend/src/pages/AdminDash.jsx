import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { Users, FileText, ShieldCheck, AlertTriangle } from 'lucide-react';

const AdminDash = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const response = await api.get('/admin_dashboard');
                setUsers(response.data);
            } catch (err) {
                console.error("Access Denied or Server Error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchAdminData();
    }, []);

    if (loading) return <div className="p-20 text-center serif italic">Loading Authority Data...</div>;

    return (
        <div className="py-12">
            <div className="mb-10">
                <h1 className="serif text-4xl font-black mb-2">Community Oversight</h1>
                <p className="text-gray-500">Manage users and monitor content volume.</p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
                    <div className="text-orange-600 mb-2"><Users size={24} /></div>
                    <div className="text-2xl font-bold">{users.length}</div>
                    <div className="text-sm text-gray-500 uppercase tracking-widest font-semibold">Total Users</div>
                </div>
                <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
                    <div className="text-black mb-2"><FileText size={24} /></div>
                    <div className="text-2xl font-bold">
                        {users.reduce((acc, curr) => acc + (curr.blogCount || 0), 0)}
                    </div>
                    <div className="text-sm text-gray-500 uppercase tracking-widest font-semibold">Total Posts</div>
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                            <th className="px-6 py-4 text-xs font-bold uppercase text-gray-600">User Email</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase text-gray-600">Role</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase text-gray-600 text-center">Blogs</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase text-gray-600">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u) => (
                            <tr key={u._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-gray-900">{u.email}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'}`}>
                                        {u.role.toUpperCase()}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-center font-mono font-bold text-orange-600">
                                    {u.blogCount}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2 text-green-600 text-sm">
                                        <ShieldCheck size={16} /> Verified
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDash;