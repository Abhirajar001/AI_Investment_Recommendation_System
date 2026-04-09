import { useEffect } from 'react';
import { LayoutDashboard, TrendingUp, ClipboardList, PieChart, Settings, LogOut, BarChart3, MessageCircle, BookOpen, Sparkles } from 'lucide-react';
import { prefetchAuthenticatedRoutes, prefetchSidebarRoute } from '../../routePrefetch';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  useEffect(() => {
    prefetchAuthenticatedRoutes();
  }, []);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'recommendations', label: 'AI Recommendations', icon: TrendingUp },
    { id: 'risk-profile', label: 'Risk Profile', icon: ClipboardList },
    { id: 'portfolio', label: 'Portfolio', icon: PieChart },
    { id: 'market-trends', label: 'Market Trends', icon: BarChart3 },
    { id: 'chatbot', label: 'AI Chatbot', icon: MessageCircle },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="hidden h-screen w-72 flex-col border-r border-amber-200/80 bg-[#fffdf8]/95 text-slate-900 shadow-[10px_0_40px_rgba(15,23,42,0.08)] backdrop-blur lg:flex lg:sticky lg:top-0">
      <div className="border-b border-amber-200 px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 shadow-md">
            <TrendingUp className="text-white" size={24} />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-600">AI Invest</p>
            <h1 className="text-lg font-black tracking-tight">Build your first portfolio</h1>
          </div>
        </div>

        <div className="mt-4 rounded-2xl bg-slate-900 px-4 py-3 text-white">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-cyan-200">
            <Sparkles size={14} />
            Starter plan
          </div>
          <p className="mt-2 text-sm text-slate-300">Low stress, high clarity, and lessons built into the flow.</p>
        </div>
      </div>

      <nav className="flex-1 overflow-auto px-4 py-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
                  onMouseEnter={() => prefetchSidebarRoute(item.id)}
                  onFocus={() => prefetchSidebarRoute(item.id)}
                  className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 ${
                    isActive
                      ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-200'
                      : 'text-slate-600 hover:bg-amber-50 hover:text-slate-900'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-amber-200 p-4">
        <button className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left font-semibold text-rose-600 transition-colors hover:bg-rose-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}