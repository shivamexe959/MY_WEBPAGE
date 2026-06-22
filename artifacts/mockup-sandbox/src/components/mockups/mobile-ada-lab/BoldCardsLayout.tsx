import React, { useState } from 'react';
import { Play, Home, LayoutGrid, Trophy, User, ChevronRight } from 'lucide-react';

export function BoldCardsLayout() {
  const [activeTab, setActiveTab] = useState('home');

  const categories = [
    { name: 'Sorting', topics: 8, icon: '🔄', gradient: 'from-blue-500 to-blue-700', shadow: 'shadow-blue-500/20' },
    { name: 'Graph', topics: 12, icon: '🕸️', gradient: 'from-green-500 to-green-700', shadow: 'shadow-green-500/20' },
    { name: 'DP', topics: 15, icon: '🧠', gradient: 'from-purple-500 to-purple-700', shadow: 'shadow-purple-500/20' },
    { name: 'Greedy', topics: 6, icon: '🏃‍♂️', gradient: 'from-orange-500 to-orange-700', shadow: 'shadow-orange-500/20' },
    { name: 'Tree', topics: 10, icon: '🌲', gradient: 'from-teal-500 to-teal-700', shadow: 'shadow-teal-500/20' },
    { name: 'String', topics: 5, icon: '🔤', gradient: 'from-red-500 to-red-700', shadow: 'shadow-red-500/20' },
  ];

  return (
    <div className="w-[390px] h-[844px] bg-[#0d1117] text-white font-sans overflow-hidden flex flex-col relative mx-auto border border-gray-800 rounded-3xl shadow-2xl">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-5 pt-12 pb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-black tracking-tight">⚡ ADA Lab</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-yellow-950 font-bold px-3 py-1 rounded-full text-sm shadow-[0_0_15px_rgba(234,179,8,0.3)]">
            ⚡ 2450 XP
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 border-2 border-white/10 flex items-center justify-center font-bold">
            JD
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-24 px-5 space-y-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {/* Daily Challenge Banner */}
        <div className="rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 p-5 shadow-[0_8px_30px_rgba(147,51,234,0.3)] relative overflow-hidden group cursor-pointer">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
          <h3 className="text-xl font-bold mb-1">🏆 Today's Challenge</h3>
          <p className="text-white/90 font-semibold text-2xl mb-2">Quick Sort</p>
          <p className="text-white/80 text-sm mb-4 font-medium">Complete to earn 50 XP</p>
          <button className="bg-white text-blue-900 font-bold px-5 py-2.5 rounded-xl w-full flex items-center justify-center gap-2 active:scale-95 transition-transform">
            <Play fill="currentColor" size={18} />
            Start Challenge
          </button>
        </div>

        {/* My Progress */}
        <div className="flex justify-between items-center bg-white/5 rounded-2xl p-4 border border-white/5">
          <div className="text-center flex-1">
            <div className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Level</div>
            <div className="text-xl font-black text-white">7</div>
          </div>
          <div className="w-px h-8 bg-white/10"></div>
          <div className="text-center flex-1">
            <div className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Rank</div>
            <div className="text-xl font-black text-white">#12</div>
          </div>
          <div className="w-px h-8 bg-white/10"></div>
          <div className="text-center flex-1">
            <div className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Streak</div>
            <div className="text-xl font-black text-orange-400">5🔥</div>
          </div>
        </div>

        {/* Keep Learning */}
        <div>
          <h2 className="text-lg font-bold mb-3 tracking-wide">Keep Learning</h2>
          <div className="bg-[#161b22] rounded-2xl p-4 border border-gray-800 shadow-lg flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-2xl">
              🔄
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-md mb-1">Merge Sort</h4>
              <div className="flex items-center gap-2">
                <div className="h-2 flex-1 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full w-[65%] bg-blue-500 rounded-full"></div>
                </div>
                <span className="text-xs font-bold text-gray-400">65%</span>
              </div>
            </div>
            <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Explore Algorithms */}
        <div>
          <h2 className="text-lg font-bold mb-3 tracking-wide">Explore Algorithms</h2>
          <div className="grid grid-cols-2 gap-4">
            {categories.map((cat) => (
              <div key={cat.name} className={`bg-gradient-to-br ${cat.gradient} rounded-2xl p-5 shadow-lg ${cat.shadow} aspect-square flex flex-col justify-between active:scale-95 transition-transform cursor-pointer relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition-colors"></div>
                <div className="text-[50px] leading-none drop-shadow-md">{cat.icon}</div>
                <div>
                  <h3 className="font-black text-xl mb-1 tracking-tight">{cat.name}</h3>
                  <p className="font-semibold text-white/70 text-sm">{cat.topics} topics</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="absolute bottom-0 w-full bg-[#0d1117]/95 backdrop-blur-md border-t border-gray-800 pb-8 pt-4 px-6 flex justify-between items-center z-10">
        {[
          { id: 'home', icon: Home, label: 'Home' },
          { id: 'explore', icon: LayoutGrid, label: 'Explore' },
          { id: 'leaderboard', icon: Trophy, label: 'Rank' },
          { id: 'profile', icon: User, label: 'Profile' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center gap-1.5 relative ${
              activeTab === item.id ? 'text-white' : 'text-gray-500'
            }`}
          >
            <item.icon size={24} strokeWidth={activeTab === item.id ? 2.5 : 2} />
            <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
            {activeTab === item.id && (
              <div className="absolute -bottom-3 w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
