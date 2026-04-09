import { BarChart3, Bot, ClipboardList, Home, PieChart, Settings, TrendingUp } from 'lucide-react';
import { prefetchSidebarRoute } from '../../routePrefetch';

interface MobileSectionSwitcherProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const sections = [
  { id: 'dashboard', label: 'Home', icon: Home },
  { id: 'recommendations', label: 'Ideas', icon: TrendingUp },
  { id: 'risk-profile', label: 'Risk', icon: ClipboardList },
  { id: 'portfolio', label: 'Portfolio', icon: PieChart },
  { id: 'market-trends', label: 'Market', icon: BarChart3 },
  { id: 'chatbot', label: 'Coach', icon: Bot },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function MobileSectionSwitcher({ currentPage, onNavigate }: MobileSectionSwitcherProps) {
  return (
    <div className="sticky top-0 z-30 border-b border-amber-200/60 bg-[#fffdf8]/95 px-4 py-3 backdrop-blur lg:hidden">
      <div className="mb-2 flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.3em] text-orange-600">AI Invest</p>
          <h2 className="text-sm font-black tracking-tight text-slate-900">Your starter workspace</h2>
        </div>
        <div className="rounded-full bg-slate-900 px-3 py-1 text-[11px] font-bold text-white shadow-sm">
          {currentPage.replace('-', ' ')}
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {sections.map((section) => {
          const Icon = section.icon;
          const active = currentPage === section.id;

          return (
            <button
              key={section.id}
              onClick={() => onNavigate(section.id)}
              onMouseEnter={() => prefetchSidebarRoute(section.id)}
              onFocus={() => prefetchSidebarRoute(section.id)}
              className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
                active
                  ? 'border-orange-500 bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-200'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-orange-200 hover:text-slate-900'
              }`}
            >
              <Icon size={14} />
              {section.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}