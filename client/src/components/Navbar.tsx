import { LogOut, UserCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbar = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="h-16 bg-[#5C218B] px-6 flex items-center justify-between text-white shadow-md">
            <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white rounded-lg p-1.5 flex items-center justify-center">
                    <img src={logo} alt="Digitalflake Logo" className="w-full h-full object-contain" />
                </div>
                <div className="text-xl font-bold tracking-tight">Digitalflake</div>
            </div>

            <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                    <UserCircle size={28} />
                </div>
                <button
                    onClick={handleLogout}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                    <LogOut size={24} />
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
