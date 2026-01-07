import { Link, useLocation } from 'react-router-dom';
import { Home, List } from 'lucide-react';
import { cn } from '../lib/utils';

const Sidebar = () => {
    const location = useLocation();

    const links = [
        { name: 'Dashboard', path: '/dashboard', icon: Home },
        { name: 'Categories', path: '/categories', icon: List },
    ];

    return (
        <div className="h-full w-64 bg-[#F4F4F4] border-r flex flex-col pt-4">
            <nav className="flex-1 px-4 space-y-2">
                {links.map((link) => {
                    const Icon = link.icon;
                    const isActive = location.pathname === link.path;
                    return (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={cn(
                                "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors",
                                isActive
                                    ? "bg-[#E0D4FC] text-[#5C218B] font-medium"
                                    : "text-gray-600 hover:bg-gray-100"
                            )}
                        >
                            <Icon size={20} />
                            <span>{link.name}</span>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
};

export default Sidebar;
