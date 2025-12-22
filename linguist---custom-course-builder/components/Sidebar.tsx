
import React from 'react';
import { PROFICIENCY_LEVELS } from '../constants';
import { ProficiencyLevel } from '../types';

interface SidebarProps {
  onNavClick: (view: 'home' | 'settings' | 'profile' | 'vocabulary' | 'writing' | 'culture' | 'grammar') => void;
  activeView: string;
  xp: number;
  proficiencyLevel: ProficiencyLevel;
  currentLanguage: string;
}

const Sidebar: React.FC<SidebarProps> = ({ onNavClick, activeView, xp, proficiencyLevel, currentLanguage }) => {
  const navItems = [
    { id: 'home', label: 'LEARN', icon: '🏠' },
    { id: 'vocabulary', label: 'VOCABULARY', icon: '📖' },
    { id: 'grammar', label: 'GRAMMAR', icon: '📝' },
    { id: 'writing', label: 'WRITING', icon: '✏️' },
    { id: 'culture', label: 'CULTURE', icon: '🌍' },
    { id: 'profile', label: 'PROFILE', icon: '👤' },
    { id: 'settings', label: 'SETTINGS', icon: '⚙️' },
  ];

  const goalProgress = xp % 100;
  const currentLevelInfo = PROFICIENCY_LEVELS.find(l => l.level === proficiencyLevel) || PROFICIENCY_LEVELS[0];

  return (
    <div className="w-64 border-r-2 border-gray-100 h-screen fixed left-0 top-0 p-6 flex flex-col hidden md:flex z-50 bg-white">
      <div className="text-3xl font-extrabold text-[#58cc02] mb-1 tracking-tighter italic">
        LINGUIST
      </div>

      <div className="mb-8 space-y-2">
        {/* Language Card */}
        <div 
          onClick={() => onNavClick('settings')}
          className="p-3 bg-blue-50 rounded-2xl border-2 border-blue-100 shadow-sm flex items-center space-x-3 cursor-pointer hover:bg-blue-100 transition-all group"
        >
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-xl shadow-inner group-hover:scale-110 transition-transform">
            🌐
          </div>
          <div className="overflow-hidden">
            <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest leading-none mb-1">Learning</p>
            <p className="font-black text-blue-700 text-xs truncate uppercase tracking-tight">{currentLanguage}</p>
          </div>
        </div>

        {/* Level Badge Under Language */}
        <div className="p-3 bg-gray-50 rounded-2xl flex items-center space-x-3 border-2 border-gray-100 shadow-sm transition-all hover:bg-gray-100 cursor-pointer group" onClick={() => onNavClick('settings')}>
          <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border-2 border-white shadow-sm transition-transform group-hover:scale-105">
            <img src={currentLevelInfo.imageUrl} className="w-full h-full object-cover" alt={currentLevelInfo.name} />
          </div>
          <div className="overflow-hidden">
            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Stage</p>
            <p className="font-black text-gray-700 text-xs truncate">{currentLevelInfo.name}</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 space-y-1 overflow-y-auto custom-scrollbar pr-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavClick(item.id as any)}
            className={`w-full flex items-center space-x-3 p-3 rounded-xl font-black transition-all transform active:scale-95 ${
              activeView === item.id 
                ? 'bg-[#ddf4ff] text-[#1cb0f6] border-2 border-[#84d8ff]' 
                : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="tracking-widest text-[10px] uppercase">{item.label}</span>
          </button>
        ))}

        <div className="mt-6 p-4 duo-card bg-gray-50/50 border-gray-100 space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="font-black text-[10px] text-gray-400 uppercase tracking-widest">Daily Goal</h3>
          </div>
          <div className="progress-bar !h-2">
             <div className="progress-fill" style={{ width: `${goalProgress}%` }} />
          </div>
          <p className="text-[11px] font-black text-gray-500">{goalProgress} / 100 XP</p>
        </div>
      </nav>

      <div className="mt-auto pt-4 border-t-2 border-gray-100 space-y-3">
        <div className="flex items-center justify-between text-orange-500 font-black">
          <div className="flex items-center space-x-2">
            <span>🔥</span>
            <span className="text-[10px]">STREAK</span>
          </div>
          <span className="text-xs">5</span>
        </div>
        <div className="flex items-center justify-between text-red-500 font-black">
           <div className="flex items-center space-x-2">
            <span>❤️</span>
            <span className="text-[10px]">HEARTS</span>
          </div>
          <span className="text-xs">∞</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
