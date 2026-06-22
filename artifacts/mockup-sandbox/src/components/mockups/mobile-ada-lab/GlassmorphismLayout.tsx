import React from 'react';
import { 
  Bell, Zap, Home, Grid, Network, Package, 
  MoreHorizontal, ChevronRight, CheckCircle2, 
  Flame, Trophy, Layers, Activity, Search
} from 'lucide-react';

export function GlassmorphismLayout() {
  return (
    <div className="relative mx-auto h-[844px] w-[390px] overflow-hidden rounded-[40px] border-[8px] border-[#0a0a0a] bg-gradient-to-br from-[#0a0e1a] to-[#12162a] font-sans text-white shadow-2xl">
      {/* Background Aurora Effects */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-blue-500/20 blur-[80px]" />
      <div className="pointer-events-none absolute -right-20 top-40 h-64 w-64 rounded-full bg-purple-500/20 blur-[80px]" />
      <div className="pointer-events-none absolute bottom-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-green-500/10 blur-[80px]" />

      <div className="h-full w-full overflow-y-auto pb-24 scrollbar-hide">
        {/* Top Status Bar */}
        <div className="flex items-center justify-between px-6 pt-12 pb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-purple-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]">
              <Zap size={16} fill="currentColor" />
            </div>
            <span className="text-lg font-bold tracking-tight">ADA Lab</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 py-1 pl-1 pr-3 backdrop-blur-md">
              <div className="h-6 w-6 overflow-hidden rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 p-[1px]">
                <img 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex&backgroundColor=transparent" 
                  alt="User Avatar" 
                  className="h-full w-full rounded-full bg-[#1a1f35]"
                />
              </div>
              <span className="text-xs font-medium text-slate-300">Lvl 7</span>
            </div>
            <button className="relative flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 backdrop-blur-md transition-colors hover:text-white">
              <Bell size={16} />
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
            </button>
          </div>
        </div>

        {/* Hero Greeting Banner */}
        <div className="px-6 py-4">
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04] p-5 backdrop-blur-[20px]">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 blur-2xl" />
            <div className="relative z-10">
              <div className="mb-1 inline-flex items-center gap-1.5 rounded-full border border-orange-500/20 bg-orange-500/10 px-2.5 py-1 text-xs font-semibold text-orange-400 shadow-[0_0_10px_rgba(249,115,22,0.1)]">
                <Flame size={12} fill="currentColor" />
                <span>5 day streak</span>
              </div>
              <h1 className="mt-2 text-2xl font-bold leading-tight">Welcome back,<br/>Alex Student!</h1>
              <p className="mt-2 text-sm text-slate-400">Ready to conquer Dynamic Programming?</p>
              
              <button className="mt-5 w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 py-3 text-sm font-semibold text-white shadow-[0_4px_20px_rgba(59,130,246,0.3)] transition-transform hover:scale-[0.98]">
                Resume Learning
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats Row */}
        <div className="flex gap-3 px-6 py-2">
          {[
            { icon: Zap, label: "XP", value: "2450", color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/20" },
            { icon: Layers, label: "Level", value: "7", color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/20" },
            { icon: Trophy, label: "Rank", value: "#12", color: "text-green-400", bg: "bg-green-400/10", border: "border-green-400/20" }
          ].map((stat, i) => (
            <div key={i} className={`flex flex-1 flex-col items-center justify-center rounded-2xl border border-white/[0.05] bg-white/[0.02] py-3 backdrop-blur-md`}>
              <div className={`mb-1.5 rounded-lg border ${stat.border} ${stat.bg} p-1.5 ${stat.color}`}>
                <stat.icon size={14} />
              </div>
              <span className="text-[10px] font-medium uppercase tracking-wider text-slate-500">{stat.label}</span>
              <span className="text-sm font-bold">{stat.value}</span>
            </div>
          ))}
        </div>

        {/* Algorithm Categories */}
        <div className="mt-6">
          <div className="mb-4 flex items-end justify-between px-6">
            <h2 className="text-lg font-semibold">Categories</h2>
            <button className="text-xs font-medium text-blue-400 hover:text-blue-300">See All</button>
          </div>
          
          <div className="flex gap-4 overflow-x-auto px-6 pb-4 scrollbar-hide">
            {[
              { title: "Sorting", icon: Grid, count: 12, color: "from-blue-500 to-cyan-400", shadow: "shadow-blue-500/20" },
              { title: "Graph", icon: Network, count: 8, color: "from-purple-500 to-pink-500", shadow: "shadow-purple-500/20" },
              { title: "Dynamic", icon: Package, count: 15, color: "from-green-500 to-emerald-400", shadow: "shadow-green-500/20" },
              { title: "Greedy", icon: Zap, count: 6, color: "from-orange-500 to-amber-400", shadow: "shadow-orange-500/20" }
            ].map((cat, i) => (
              <div key={i} className="min-w-[140px] flex-shrink-0 cursor-pointer rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 backdrop-blur-[20px] transition-all hover:bg-white/[0.06]">
                <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${cat.color} ${cat.shadow} shadow-lg`}>
                  <cat.icon size={20} className="text-white" />
                </div>
                <h3 className="font-medium text-slate-200">{cat.title}</h3>
                <p className="mt-1 text-xs text-slate-500">{cat.count} Algorithms</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-4 px-6">
          <div className="mb-4 flex items-end justify-between">
            <h2 className="text-lg font-semibold">Recent Activity</h2>
          </div>
          
          <div className="flex flex-col gap-3">
            {[
              { name: "Dijkstra's Algorithm", cat: "Graph", time: "2h ago", completed: true },
              { name: "Merge Sort", cat: "Sorting", time: "1d ago", completed: true },
              { name: "Knapsack Problem", cat: "Dynamic", time: "2d ago", completed: false }
            ].map((activity, i) => (
              <div key={i} className="flex items-center justify-between rounded-xl border border-white/[0.05] bg-white/[0.02] p-3.5 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 ${activity.completed ? 'text-green-400' : 'text-blue-400'}`}>
                    {activity.completed ? <CheckCircle2 size={18} /> : <Activity size={18} />}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-200">{activity.name}</h4>
                    <p className="text-xs text-slate-500">{activity.cat} • {activity.time}</p>
                  </div>
                </div>
                <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white">
                  <ChevronRight size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-white/[0.08] bg-[#0a0e1a]/80 px-6 pb-8 pt-4 backdrop-blur-[24px]">
        <div className="flex items-center justify-between">
          {[
            { icon: Home, label: "Home", active: true },
            { icon: Grid, label: "Sort", active: false },
            { icon: Network, label: "Graph", active: false },
            { icon: Package, label: "DP", active: false },
            { icon: MoreHorizontal, label: "More", active: false }
          ].map((tab, i) => (
            <div key={i} className="relative flex flex-col items-center gap-1">
              <button className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full transition-colors ${tab.active ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}>
                <tab.icon size={22} className={tab.active ? 'drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]' : ''} />
              </button>
              {tab.active && (
                <div className="absolute top-0 -z-10 h-10 w-10 rounded-full bg-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.3)]" />
              )}
              {tab.active && (
                <div className="absolute -bottom-2 h-1 w-1 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
