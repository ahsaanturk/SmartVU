
import React from 'react';
import { AppRoute } from '../types';
import { LayoutDashboard, BookOpen, FileText, HelpCircle, User, Settings, Flame } from 'lucide-react';
import { THEME_COLOR } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  activeRoute: AppRoute;
  onNavigate: (route: AppRoute) => void;
  streak: number;
}

const Layout: React.FC<LayoutProps> = ({ children, activeRoute, onNavigate, streak }) => {
  const navItems = [
    { id: AppRoute.DASHBOARD, label: 'Learn', icon: LayoutDashboard },
    { id: AppRoute.LECTURES, label: 'Lectures', icon: BookOpen },
    { id: AppRoute.QUIZZES, label: 'Quizzes', icon: HelpCircle },
    { id: AppRoute.HANDOUTS, label: 'Handouts', icon: FileText },
    { id: AppRoute.PROFILE, label: 'Profile', icon: User },
    { id: AppRoute.ADMIN, label: 'Admin', icon: Settings },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#f7f7f7]">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r-2 border-gray-200 p-6 space-y-8 sticky top-0 h-screen">
        <div className="flex items-center space-x-2 px-2">
          <div className="w-10 h-10 bg-[#58CC02] rounded-xl flex items-center justify-center text-white font-black text-xl">VU</div>
          <h1 className="text-2xl font-black text-[#58CC02] tracking-tight">SmartVU</h1>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center space-x-4 px-4 py-3 rounded-xl font-bold transition-colors ${
                activeRoute === item.id
                  ? 'bg-[#DDF4FF] text-[#1CB0F6] border-2 border-[#84D8FF]'
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              <item.icon className="w-6 h-6" />
              <span>{item.label.toUpperCase()}</span>
            </button>
          ))}
        </nav>

        <div className="flex items-center space-x-3 bg-orange-100 p-4 rounded-2xl border-2 border-orange-200">
          <Flame className="text-orange-500 fill-orange-500" />
          <span className="font-black text-orange-600 text-lg">{streak} DAY STREAK!</span>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-10 pb-24 md:pb-10 overflow-y-auto">
        {children}
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 flex justify-around p-2 z-50">
        {navItems.slice(0, 5).map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex flex-col items-center p-2 rounded-xl transition-colors ${
              activeRoute === item.id ? 'text-[#1CB0F6]' : 'text-gray-400'
            }`}
          >
            <item.icon className="w-6 h-6" />
            <span className="text-[10px] font-bold mt-1 uppercase">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Layout;
