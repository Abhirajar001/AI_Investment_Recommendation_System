import { ArrowDownRight, ArrowUpRight, BarChart3, PieChart, TrendingUp, Wallet } from 'lucide-react';
import { PieChart as RePieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function Portfolio() {
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);

  const performanceData = [
    { month: 'Jan', value: 45000 },
    { month: 'Feb', value: 48000 },
    { month: 'Mar', value: 47000 },
    { month: 'Apr', value: 52000 },
    { month: 'May', value: 55000 },
    { month: 'Jun', value: 58000 },
    { month: 'Jul', value: 62450 },
  ];

  const allocationData = [
    { name: 'Tech Stocks', value: 35, color: '#f97316' },
    { name: 'Mutual Funds', value: 30, color: '#06b6d4' },
    { name: 'Real Estate', value: 20, color: '#10b981' },
    { name: 'Bonds', value: 10, color: '#f59e0b' },
    { name: 'Cash', value: 5, color: '#64748b' },
  ];

  const investments = [
    { asset: 'Apple Inc. (AAPL)', invested: 12000, current: 15240 },
    { asset: 'Microsoft Corp. (MSFT)', invested: 10000, current: 12800 },
    { asset: 'Vanguard 500 Index', invested: 15000, current: 17100 },
    { asset: 'NVIDIA Corp. (NVDA)', invested: 8000, current: 11200 },
    { asset: 'Tesla Inc. (TSLA)', invested: 5000, current: 4750 },
    { asset: 'Fidelity Growth Fund', invested: 12000, current: 13360 },
  ];

  const totalInvested = investments.reduce((sum, item) => sum + item.invested, 0);
  const totalCurrent = investments.reduce((sum, item) => sum + item.current, 0);
  const totalGain = totalCurrent - totalInvested;
  const totalGainPct = totalInvested > 0 ? (totalGain / totalInvested) * 100 : 0;

  return (
    <div className="flex-1 overflow-auto bg-[radial-gradient(circle_at_top,_#fff6dc_0%,_#fffef8_45%,_#eff6ff_100%)] text-slate-900">
      <div className="border-b border-amber-200/60 bg-white/85 px-5 py-6 backdrop-blur md:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
              <TrendingUp size={14} />
              Your money at a glance
            </div>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">Portfolio dashboard</h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 md:text-base">
              A friendly summary of what you invested, how it is growing, and what your next move could be.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              ['Holdings', `${investments.length}`],
              ['Gain', `${totalGain >= 0 ? '+' : ''}${totalGainPct.toFixed(1)}%`],
              ['Value', formatCurrency(totalCurrent)],
              ['Mode', 'Balanced'],
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
          <article className="rounded-3xl border border-white/70 bg-white p-6 shadow-xl shadow-slate-200/70">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-md">
                <Wallet size={22} />
              </div>
              <span className="text-sm font-bold text-slate-500">{investments.length} holdings</span>
            </div>
            <p className="text-sm font-semibold text-slate-500">Total invested</p>
            <p className="mt-2 text-3xl font-black text-slate-900">{formatCurrency(totalInvested)}</p>
          </article>

          <article className="rounded-3xl border border-white/70 bg-white p-6 shadow-xl shadow-slate-200/70">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-600 to-sky-500 text-white shadow-md">
                <TrendingUp size={22} />
              </div>
              <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${totalGain >= 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                {totalGain >= 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {totalGain >= 0 ? '+' : ''}{totalGainPct.toFixed(1)}%
              </span>
            </div>
            <p className="text-sm font-semibold text-slate-500">Current value</p>
            <p className="mt-2 text-3xl font-black text-slate-900">{formatCurrency(totalCurrent)}</p>
          </article>

          <article className={`rounded-3xl border border-white/70 p-6 shadow-xl shadow-slate-200/70 ${totalGain >= 0 ? 'bg-gradient-to-br from-emerald-500 to-teal-500 text-white' : 'bg-gradient-to-br from-rose-500 to-red-500 text-white'}`}>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-white shadow-md">
                {totalGain >= 0 ? <TrendingUp size={22} /> : <ArrowDownRight size={22} />}
              </div>
              <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold">Total gain</span>
            </div>
            <p className="text-sm font-semibold text-white/80">Profit / loss</p>
            <p className="mt-2 text-3xl font-black">{`${totalGain >= 0 ? '+' : ''}${formatCurrency(totalGain)}`}</p>
          </article>

          <article className="rounded-3xl border border-white/70 bg-slate-900 p-6 text-white shadow-xl shadow-slate-200/70">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 shadow-md">
                <BarChart3 size={22} />
              </div>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-cyan-200">AI guide</span>
            </div>
            <p className="text-sm font-semibold text-slate-300">Learning pace</p>
            <p className="mt-2 text-3xl font-black">Steady</p>
          </article>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-black text-slate-900">Portfolio growth</h3>
                <p className="mt-1 text-sm text-slate-500">A friendly view of how your money has moved over time.</p>
              </div>
              <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">7 months</div>
            </div>
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={performanceData}>
                <defs>
                  <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: '12px' }} />
                <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
                <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', fontSize: '14px' }} />
                <Line type="monotone" dataKey="value" stroke="#f97316" strokeWidth={3} dot={{ fill: '#f97316', r: 4 }} activeDot={{ r: 6 }} fill="url(#portfolioGradient)" />
              </LineChart>
            </ResponsiveContainer>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60">
            <div className="mb-6 flex items-center gap-2">
              <PieChart className="text-orange-500" size={20} />
              <div>
                <h3 className="text-xl font-black text-slate-900">Asset allocation</h3>
                <p className="mt-1 text-sm text-slate-500">How your portfolio is spread out.</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <RePieChart>
                <Pie data={allocationData} cx="50%" cy="50%" innerRadius={65} outerRadius={90} paddingAngle={2} dataKey="value">
                  {allocationData.map((entry) => (
                    <Cell key={`cell-${entry.name}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RePieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {allocationData.map((item) => (
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

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 md:p-8">
          <div className="mb-6 flex items-center gap-2">
            <TrendingUp className="text-orange-500" size={20} />
            <h3 className="text-xl font-black text-slate-900">Investment holdings</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px]">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-[0.2em] text-slate-400">Asset</th>
                  <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-[0.2em] text-slate-400">Invested</th>
                  <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-[0.2em] text-slate-400">Current</th>
                  <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-[0.2em] text-slate-400">ROI</th>
                  <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-[0.2em] text-slate-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {investments.map((investment) => {
                  const roi = investment.invested > 0 ? ((investment.current - investment.invested) / investment.invested) * 100 : 0;
                  const isUp = roi >= 0;

                  return (
                    <tr key={investment.asset} className="transition-colors hover:bg-slate-50">
                      <td className="px-5 py-4 font-semibold text-slate-900">{investment.asset}</td>
                      <td className="px-5 py-4 text-slate-600">{formatCurrency(investment.invested)}</td>
                      <td className="px-5 py-4 font-semibold text-slate-900">{formatCurrency(investment.current)}</td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-black ${isUp ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                          {isUp ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                          {`${isUp ? '+' : ''}${roi.toFixed(1)}%`}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <button className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-emerald-600">
                            Buy
                          </button>
                          <button className="rounded-xl bg-rose-500 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-rose-600">
                            Sell
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
