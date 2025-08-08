import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { navItems } from '../../data/mockData';
import * as LucideIcons from 'lucide-react';

const Sidebar: React.FC = () => {
  const location = useLocation();
  
  // Dynamically get icon from Lucide
  const getIcon = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName] || LucideIcons.HelpCircle;
    return <Icon size={20} />;
  };

  return (
    <div className="bg-sidebar text-white h-screen w-64 flex flex-col fixed left-0 top-0 z-10">
      <div className="p-6">
        <h1 className="text-xl font-bold">Learning Dashboard</h1>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link 
                to={item.path}
                className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
              >
                {getIcon(item.icon)}
                <span>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4">
        <div className="flex items-center bg-white/10 rounded-md p-3">
          <div className="w-8 h-8 rounded-full bg-primary-300 flex items-center justify-center text-sidebar font-bold">
            {LucideIcons.User && <LucideIcons.User size={18} />}
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium">Student</p>
            <p className="text-xs opacity-75">student@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;