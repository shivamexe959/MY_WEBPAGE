import React from 'react';
import { Bell, Flame, Swords, Target, Zap, LayoutDashboard, Trophy, User, BookOpen } from 'lucide-react';
import './_group.css';

export function NeonGamerLayout() {
  return (
    <div className="w-[390px] h-[844px] bg-cyberpunk text-slate-400 font-inter relative overflow-hidden flex flex-col border border-slate-800 rounded-3xl mx-auto shadow-2xl">
      <div className="scan-line z-50"></div>
      
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide pb-24">
        
        {/* Header */}
        <header className="px-5 pt-10 pb-4 flex justify-between items-center bg-[#0d1421]/80 backdrop-blur-md border-b border-[#00f0ff]/30 sticky top-0 z-40">
          <div className="flex flex-col">
            <h1 className="font-orbitron font-bold text-xl neon-text-cyan tracking-wider flex items-center gap-1">
              <Zap className="w-5 h-5" fill="#00f0ff" /> ADA LAB
            </h1>
            <div className="h-[2px] w-full bg-[#00f0ff] shadow-[0_0_8px_#00f0ff] mt-1"></div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Bell className="w-6 h-6 text-slate-300" />
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#ff2d78] rounded-full shadow-[0_0_5px_#ff2d78]"></span>
            </div>
            <div className="relative w-10 h-10 rounded-full flex items-center justify-center bg-slate-800 border-2 border-transparent">
              <div className="absolute inset-[-2px] rounded-full border-2 border-[#39ff14] border-t-transparent animate-spin-slow shadow-[0_0_5px_#39ff14]"></div>
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Alex&backgroundColor=transparent`} alt="User" className="w-8 h-8 rounded-full" />
            </div>
          </div>
        </header>

        <div className="p-5 space-y-6">
          
          {/* XP Progress HUD */}
          <section>
            <div className="bg-[#0d1421] rounded-xl p-4 neon-border-cyan animate-pulse-glow relative overflow-hidden">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#00f0ff]/10 rounded-full blur-xl"></div>
              
              <div className="flex items-center gap-5 relative z-10">
                {/* Level Hexagon */}
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <svg className="absolute inset-0 w-full h-full text-[#0d1421] drop-shadow-[0_0_5px_rgba(0,240,255,0.8)]" viewBox="0 0 100 100">
                    <polygon points="50,5 95,25 95,75 50,95 5,75 5,25" fill="currentColor" stroke="#00f0ff" strokeWidth="2" />
                  </svg>
                  <div className="flex flex-col items-center z-10">
                    <span className="font-orbitron text-[10px] text-[#00f0ff]">LVL</span>
                    <span className="font-orbitron font-bold text-xl text-white">7</span>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-end mb-2">
                    <div className="font-jetbrains text-xs text-[#00f0ff]">2450 / 3000 XP</div>
                    <div className="flex items-center gap-1 font-orbitron text-xs font-bold text-[#ff2d78]">
                      <Flame className="w-3.5 h-3.5" fill="#ff2d78" /> 5 DAY
                    </div>
                  </div>
                  {/* XP Bar */}
                  <div className="h-3 w-full bg-[#050810] rounded-full overflow-hidden border border-[#00f0ff]/30 relative">
                    <div className="h-full bg-gradient-to-r from-[#3b82f6] to-[#00f0ff] rounded-full shadow-[0_0_10px_#00f0ff]" style={{ width: '73%' }}>
                      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9zdmc+')] opacity-50"></div>
                    </div>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider font-jetbrains">Next Rank: Algorithm Knight</div>
                </div>
              </div>
            </div>
          </section>

          {/* MISSION BOARD */}
          <section>
            <h2 className="font-orbitron font-bold text-sm text-white mb-3 tracking-wider flex items-center gap-2">
              <Target className="w-4 h-4 text-[#ffe600]" /> MISSION BOARD
            </h2>
            <div className="space-y-3">
              <div className="bg-[#0d1421] rounded-lg p-3 neon-border-yellow flex items-center gap-3">
                <div className="w-6 h-6 rounded border border-[#ffe600] flex items-center justify-center bg-[#ffe600]/10 shadow-[0_0_5px_rgba(255,230,0,0.3)]">
                  {/* Unchecked */}
                </div>
                <div className="flex-1">
                  <h3 className="text-white text-sm font-medium">Complete Merge Sort</h3>
                  <div className="w-full h-1.5 bg-[#050810] rounded-full mt-2">
                    <div className="h-full bg-[#ffe600] rounded-full w-1/2 shadow-[0_0_5px_#ffe600]"></div>
                  </div>
                </div>
                <div className="font-jetbrains font-bold text-xs text-[#39ff14] bg-[#39ff14]/10 px-2 py-1 rounded border border-[#39ff14]/30">
                  +30 XP
                </div>
              </div>

              <div className="bg-[#0d1421] rounded-lg p-3 border border-slate-700 flex items-center gap-3 opacity-60">
                <div className="w-6 h-6 rounded border border-[#39ff14] flex items-center justify-center bg-[#39ff14]/20">
                  <div className="w-3 h-3 bg-[#39ff14] rounded-sm shadow-[0_0_5px_#39ff14]"></div>
                </div>
                <div className="flex-1">
                  <h3 className="text-slate-300 text-sm font-medium line-through">View 3 Graph Algorithms</h3>
                  <div className="w-full h-1.5 bg-[#050810] rounded-full mt-2">
                    <div className="h-full bg-[#39ff14] rounded-full w-full"></div>
                  </div>
                </div>
                <div className="font-jetbrains font-bold text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded">
                  CLAIMED
                </div>
              </div>
            </div>
          </section>

          {/* ALGORITHM ARSENAL */}
          <section>
             <h2 className="font-orbitron font-bold text-sm text-white mb-3 tracking-wider flex items-center gap-2">
              <Swords className="w-4 h-4 text-[#ff2d78]" /> ALGORITHM ARSENAL
            </h2>
            <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-5 px-5">
              
              <div className="min-w-[140px] bg-[#0d1421] rounded-xl p-4 neon-border-magenta flex flex-col gap-3 relative overflow-hidden group">
                <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-[#ff2d78]/10 rounded-full blur-xl"></div>
                <div className="w-10 h-10 rounded bg-[#ff2d78]/20 flex items-center justify-center text-xl shadow-[inset_0_0_8px_rgba(255,45,120,0.5)]">⚔️</div>
                <div>
                  <h3 className="text-white font-orbitron font-bold text-sm">Sorting</h3>
                  <p className="text-xs text-[#ff2d78] font-jetbrains mt-1">12 Items</p>
                </div>
              </div>

              <div className="min-w-[140px] bg-[#0d1421] rounded-xl p-4 neon-border-cyan flex flex-col gap-3 relative overflow-hidden">
                <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-[#00f0ff]/10 rounded-full blur-xl"></div>
                <div className="w-10 h-10 rounded bg-[#00f0ff]/20 flex items-center justify-center text-xl shadow-[inset_0_0_8px_rgba(0,240,255,0.5)]">🌐</div>
                <div>
                  <h3 className="text-white font-orbitron font-bold text-sm">Graphs</h3>
                  <p className="text-xs text-[#00f0ff] font-jetbrains mt-1">8 Items</p>
                </div>
              </div>

              <div className="min-w-[140px] bg-[#0d1421] rounded-xl p-4 neon-border-green flex flex-col gap-3 relative overflow-hidden">
                 <div className="w-10 h-10 rounded bg-[#39ff14]/20 flex items-center justify-center text-xl shadow-[inset_0_0_8px_rgba(57,255,20,0.5)]">💎</div>
                <div>
                  <h3 className="text-white font-orbitron font-bold text-sm">Dynamic</h3>
                  <p className="text-xs text-[#39ff14] font-jetbrains mt-1">15 Items</p>
                </div>
              </div>

            </div>
          </section>

          {/* Leaderboard Teaser */}
          <section>
            <div className="bg-[#0d1421] rounded-lg p-4 border border-[#3b82f6]/50 shadow-[0_0_10px_rgba(59,130,246,0.2)]">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-orbitron font-bold text-xs text-[#3b82f6] tracking-wider flex items-center gap-2">
                   GLOBAL RANKING
                </h2>
                <span className="font-jetbrains text-xs text-white">#12 <span className="text-slate-500">/ 847</span></span>
              </div>
              
              <div className="flex justify-center items-end gap-3 h-24">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 rounded bg-slate-800 border border-slate-600 flex justify-center items-center text-xs">2</div>
                  <div className="w-8 h-12 bg-gradient-to-t from-[#050810] to-slate-700 rounded-t border-t border-x border-slate-600"></div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="relative">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-lg">👑</div>
                    <div className="w-10 h-10 rounded bg-slate-800 border-2 border-[#ffe600] flex justify-center items-center text-xs shadow-[0_0_10px_rgba(255,230,0,0.5)]">1</div>
                  </div>
                  <div className="w-10 h-16 bg-gradient-to-t from-[#050810] to-[#ffe600]/30 rounded-t border-t-2 border-x-2 border-[#ffe600] shadow-[inset_0_10px_20px_rgba(255,230,0,0.2)]"></div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 rounded bg-slate-800 border border-[#cd7f32] flex justify-center items-center text-xs">3</div>
                  <div className="w-8 h-8 bg-gradient-to-t from-[#050810] to-[#cd7f32]/30 rounded-t border-t border-x border-[#cd7f32]"></div>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>

      {/* Bottom Nav */}
      <nav className="absolute bottom-0 w-full h-20 bg-[#0d1421] border-t border-[#00f0ff]/30 flex justify-around items-center px-2 z-50">
        <div className="absolute top-0 left-[10%] w-[20%] h-[1px] bg-[#00f0ff] shadow-[0_0_10px_#00f0ff]"></div>
        
        <button className="flex flex-col items-center gap-1 p-2 text-[#00f0ff]">
          <LayoutDashboard className="w-6 h-6 drop-shadow-[0_0_5px_#00f0ff]" />
          <span className="text-[10px] font-orbitron font-bold">HUB</span>
        </button>
        <button className="flex flex-col items-center gap-1 p-2 text-slate-500 hover:text-slate-300 transition-colors">
          <BookOpen className="w-6 h-6" />
          <span className="text-[10px] font-orbitron">LEARN</span>
        </button>
        <button className="flex flex-col items-center gap-1 p-2 text-slate-500 hover:text-slate-300 transition-colors relative">
          <div className="absolute -top-6 bg-[#0d1421] p-3 rounded-full border border-[#00f0ff]/30 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
            <Zap className="w-6 h-6 text-[#00f0ff]" />
          </div>
          <span className="text-[10px] font-orbitron mt-6">ARENA</span>
        </button>
        <button className="flex flex-col items-center gap-1 p-2 text-slate-500 hover:text-slate-300 transition-colors">
          <Trophy className="w-6 h-6" />
          <span className="text-[10px] font-orbitron">RANK</span>
        </button>
        <button className="flex flex-col items-center gap-1 p-2 text-slate-500 hover:text-slate-300 transition-colors">
          <User className="w-6 h-6" />
          <span className="text-[10px] font-orbitron">PROFILE</span>
        </button>
      </nav>
      
    </div>
  );
}
