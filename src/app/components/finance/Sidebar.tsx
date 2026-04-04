import { LayoutDashboard, TrendingUp, ClipboardList, PieChart, Settings, LogOut, BarChart3, MessageCircle } from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
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
    <div className="w-64 bg-gradient-to-b from-[#0f1c3f] to-[#1a2744] h-screen flex flex-col border-r border-[#2a3f5f]">
      {/* Logo */}
      <div className="p-6 border-b border-[#2a3f5f]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            <TrendingUp className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-white font-bold text-lg">AI Invest</h1>
            <p className="text-blue-300 text-xs">Smart Finance</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg'
                      : 'text-blue-200 hover:bg-[#2a3f5f] hover:text-white'
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

      {/* Logout */}
      <div className="p-4 border-t border-[#2a3f5f]">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-300 hover:bg-red-900/20 transition-all">
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}