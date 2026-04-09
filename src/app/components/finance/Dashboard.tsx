import { ArrowUpRight, BadgeIndianRupee, BarChart3, BookOpen, Clock3, Flame, Sparkles, Target, TrendingUp, Wallet } from 'lucide-react';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export function Dashboard() {
  const portfolioData = [
    { month: 'Jan', value: 45000 },
    { month: 'Feb', value: 48000 },
    { month: 'Mar', value: 47000 },
    { month: 'Apr', value: 52000 },
    { month: 'May', value: 55000 },
    { month: 'Jun', value: 58000 },
    { month: 'Jul', value: 62000 },
  ];

  const distributionData = [
    { name: 'Stocks', value: 45, color: '#3b82f6' },
    { name: 'Mutual Funds', value: 30, color: '#8b5cf6' },
    { name: 'Bonds', value: 15, color: '#10b981' },
    { name: 'Cash', value: 10, color: '#f59e0b' },
  ];

  return (
    <div className="flex-1 overflow-auto bg-[radial-gradient(circle_at_top,_#fff6dc_0%,_#fffef8_42%,_#eff6ff_100%)] text-slate-900">
      <div className="border-b border-amber-200/60 bg-white/85 px-5 py-6 backdrop-blur md:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
              <Sparkles size={14} />
              Beginner portfolio dashboard
            </div>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">Your money, simplified.</h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 md:text-base">See your growth, learn the basics, and make your next move with confidence.</p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              ['Goal', 'Travel Fund'],
              ['Mode', 'Low Stress'],
              ['Learned', '12 lessons'],
              ['Streak', '7 days'],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{label}</p>
                <p className="mt-1 text-sm font-black text-slate-900">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-8 p-5 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            { title: 'Total Portfolio', value: '$62,450', delta: '+12.5%', icon: BadgeIndianRupee, color: 'from-orange-500 to-amber-500' },
            { title: 'This Month', value: '$4,450', delta: '+8.2%', icon: Target, color: 'from-cyan-600 to-sky-500' },
            { title: 'AI Confidence', value: '91%', delta: 'Stable', icon: Sparkles, color: 'from-emerald-500 to-teal-500' },
            { title: 'Safe Zone', value: 'Balanced', delta: 'Low stress', icon: Flame, color: 'from-slate-700 to-slate-900' },
          ].map((card) => {
            const Icon = card.icon;
            return (
              <article key={card.title} className="rounded-3xl border border-white/70 bg-white p-6 shadow-xl shadow-slate-200/70">
                <div className="mb-4 flex items-center justify-between">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${card.color} text-white shadow-md`}>
                    <Icon size={22} />
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                    <ArrowUpRight size={12} /> {card.delta}
                  </span>
                </div>
                <p className="text-sm font-semibold text-slate-500">{card.title}</p>
                <p className="mt-2 text-3xl font-black tracking-tight text-slate-900">{card.value}</p>
              </article>
            );
          })}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-black text-slate-900">Growth over time</h3>
                <p className="mt-1 text-sm text-slate-500">A simple view of how your starter money is growing.</p>
              </div>
              <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">6 Months</div>
            </div>
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={portfolioData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: '12px' }} />
                <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
                <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', fontSize: '14px' }} />
                <Line type="monotone" dataKey="value" stroke="#f97316" strokeWidth={3} dot={{ fill: '#f97316', r: 4 }} activeDot={{ r: 6 }} fill="url(#colorValue)" />
              </LineChart>
            </ResponsiveContainer>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-slate-900">Your mix</h3>
                <p className="mt-1 text-sm text-slate-500">A balanced starter allocation.</p>
              </div>
              <BookOpen className="text-orange-500" size={20} />
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={distributionData} cx="50%" cy="50%" innerRadius={65} outerRadius={90} paddingAngle={2} dataKey="value">
                  {distributionData.map((entry) => (
                    <Cell key={`cell-${entry.name}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {distributionData.map((item) => (
                <div key={item.name} className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm font-medium text-slate-700">{item.name}</span>
                  </div>
                  <span className="text-sm font-black text-slate-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60">
          <div className="mb-6 flex items-center gap-2">
            <Clock3 className="text-orange-500" size={20} />
            <h3 className="text-xl font-black text-slate-900">Recent activity</h3>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {[
              { id: 'aapl-invest', action: 'Invested in AAPL', amount: '+$5,000', date: 'Today, 09:30 AM', type: 'buy' },
              { id: 'msft-dividend', action: 'Dividend received from MSFT', amount: '+$125', date: 'Yesterday, 02:15 PM', type: 'dividend' },
              { id: 'tsla-sell', action: 'Sold TSLA shares', amount: '-$3,200', date: 'Feb 15, 2026', type: 'sell' },
            ].map((activity) => (
              <div key={activity.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-bold text-slate-900">{activity.action}</p>
                <p className="mt-1 text-xs text-slate-500">{activity.date}</p>
                <p className={`mt-4 text-lg font-black ${activity.type === 'sell' ? 'text-rose-600' : 'text-emerald-600'}`}>{activity.amount}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}