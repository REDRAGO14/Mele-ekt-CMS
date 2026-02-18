import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { PenSquare, LogOut, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
    const { user, logout, isAdmin } = useAuth();

    return (
        <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
            <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="serif text-2xl font-black tracking-tighter italic">
                    Mele-ekt
                </Link>

                {/* Actions */}
                <div className="flex items-center gap-6">
                    {user ? (
                        <>
                            {isAdmin && (
                                <Link to="/admin" className="text-gray-600 hover:text-black flex items-center gap-1 text-sm font-medium">
                                    <LayoutDashboard size={18} /> Dashboard
                                </Link>
                            )}
                            <Link to="/create" className="bg-black text-white px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-gray-800 transition-colors">
                                <PenSquare size={16} /> Write
                            </Link>
                            <button onClick={logout} className="text-gray-500 hover:text-red-600">
                                <LogOut size={18} />
                            </button>
                        </>
                    ) : (
                        <Link to="/login" className="text-sm font-bold text-orange-600 hover:text-orange-700">
                            Sign In
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;