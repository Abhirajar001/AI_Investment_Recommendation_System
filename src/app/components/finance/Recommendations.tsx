import { ArrowRight, BadgeCheck, BarChart3, BookOpen, Sparkles, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function Recommendations() {
  const returnData = [
    { period: '1M', expected: 4.5, market: 3.2 },
    { period: '3M', expected: 8.2, market: 6.5 },
    { period: '6M', expected: 15.8, market: 12.3 },
    { period: '1Y', expected: 24.5, market: 18.7 },
  ];

  const recommendations = [
    {
      ticker: 'AAPL',
      name: 'Apple Inc.',
      risk: 'Low',
      expectedReturn: '18.5%',
      price: '$175.42',
      label: 'Starter Pick',
      note: 'Stable growth with strong brand resilience.',
    },
    {
      ticker: 'MSFT',
      name: 'Microsoft Corp.',
      risk: 'Low',
      expectedReturn: '16.2%',
      price: '$412.78',
      label: 'Balanced Pick',
      note: 'Good mix of safety, AI momentum, and long-term value.',
    },
    {
      ticker: 'NVDA',
      name: 'NVIDIA Corp.',
      risk: 'Medium',
      expectedReturn: '28.4%',
      price: '$825.90',
      label: 'Growth Pick',
      note: 'Higher upside for learners comfortable with more volatility.',
    },
    {
      ticker: 'GOOGL',
      name: 'Alphabet Inc.',
      risk: 'Low',
      expectedReturn: '15.8%',
      price: '$142.15',
      label: 'Value Pick',
      note: 'A calm pick for building confidence and consistency.',
    },
  ];

  const funds = [
    {
      name: 'Vanguard Total Stock Market',
      risk: 'Low',
      expectedReturn: '12.5%',
      aum: '$1.3T',
      expenseRatio: '0.04%',
    },
    {
      name: 'Fidelity 500 Index Fund',
      risk: 'Low',
      expectedReturn: '13.2%',
      aum: '$456B',
      expenseRatio: '0.015%',
    },
    {
      name: 'T. Rowe Price Growth Stock',
      risk: 'Medium',
      expectedReturn: '18.7%',
      aum: '$125B',
      expenseRatio: '0.67%',
    },
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Medium':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'High':
        return 'bg-rose-100 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="flex-1 overflow-auto bg-[radial-gradient(circle_at_top,_#fff6dc_0%,_#fffef8_45%,_#eff6ff_100%)] text-slate-900">
      <div className="border-b border-amber-200/60 bg-white/85 px-5 py-6 backdrop-blur md:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
              <Sparkles size={14} />
              Beginner-friendly picks
            </div>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">Recommended investments</h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 md:text-base">
              Curated ideas that match a young investor’s comfort level, learning stage, and long-term goals.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Your risk</p>
            <p className="mt-1 text-lg font-black text-slate-900">Moderate</p>
          </div>
        </div>
      </div>

      <div className="space-y-8 p-5 md:p-8">
        <section className="rounded-3xl border border-white/70 bg-white p-6 shadow-xl shadow-slate-200/60 md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-700">
                <BadgeCheck size={14} /> Smart starting point
              </div>
              <h3 className="text-2xl font-black tracking-tight text-slate-900 md:text-3xl">Clear picks with simple reasons</h3>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
                These are not random stock names. They are filtered to help new investors learn the market while staying comfortable.
              </p>
              <div className="mt-5 flex flex-wrap gap-3 text-xs font-bold text-slate-600">
                <span className="rounded-full bg-slate-100 px-3 py-1">Low-stress mode</span>
                <span className="rounded-full bg-slate-100 px-3 py-1">AI explained</span>
                <span className="rounded-full bg-slate-100 px-3 py-1">Small amount friendly</span>
              </div>
            </div>
            <div className="rounded-3xl bg-slate-900 p-6 text-white">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                  <BookOpen size={22} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">Today’s lesson</p>
                  <p className="text-lg font-black">Why diversification matters</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate-300">
                A starter portfolio spreads your money across different assets so a single bad move does not knock you off course.
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.45fr_0.95fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-black text-slate-900">Expected return vs market average</h3>
                <p className="mt-1 text-sm text-slate-500">A simple look at what the AI thinks you may get.</p>
              </div>
              <BarChart3 className="text-orange-500" size={20} />
            </div>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={returnData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="period" stroke="#6b7280" style={{ fontSize: '12px' }} />
                <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', fontSize: '14px' }}
                />
                <Bar dataKey="expected" fill="#f97316" name="Your Expected Return" radius={[10, 10, 0, 0]} />
                <Bar dataKey="market" fill="#94a3b8" name="Market Average" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60">
            <h3 className="text-xl font-black text-slate-900">How to read this page</h3>
            <div className="mt-5 space-y-3">
              {[
                'Lower risk options are easier to start with.',
                'Small monthly amounts matter more than perfect timing.',
                'The app explains why each option appears here.',
              ].map((item) => (
                <div key={item} className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                  {item}
                </div>
              ))}
            </div>
            <button className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 px-5 py-3.5 text-sm font-extrabold text-white shadow-lg transition-transform hover:-translate-y-0.5">
              Build my starter plan
              <ArrowRight size={16} />
            </button>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 md:p-8">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-black text-slate-900">Recommended stocks</h3>
              <p className="mt-1 text-sm text-slate-500">A few beginner-friendly ideas to explore.</p>
            </div>
            <button className="inline-flex items-center gap-2 text-sm font-bold text-orange-600 hover:text-orange-700">
              View all <ArrowRight size={16} />
            </button>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {recommendations.map((stock) => (
              <article key={stock.ticker} className="rounded-2xl border border-slate-200 p-5 transition-all hover:-translate-y-1 hover:border-orange-300 hover:shadow-lg">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xl font-black text-slate-900">{stock.ticker}</span>
                      <span className={`rounded-full border px-2.5 py-1 text-xs font-bold ${getRiskColor(stock.risk)}`}>
                        {stock.risk} risk
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-slate-600">{stock.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold text-slate-400">Current</p>
                    <p className="text-lg font-black text-slate-900">{stock.price}</p>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">{stock.note}</div>

                <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Expected return</p>
                    <p className="text-xl font-black text-emerald-600">{stock.expectedReturn}</p>
                    <p className="text-xs font-medium text-slate-500">{stock.label}</p>
                  </div>
                  <button className="rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-2.5 text-sm font-extrabold text-white shadow-md transition-transform hover:-translate-y-0.5">
                    Invest now
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 md:p-8">
          <div className="mb-6">
            <h3 className="text-xl font-black text-slate-900">Recommended mutual funds</h3>
            <p className="mt-1 text-sm text-slate-500">For young investors who want simple diversification.</p>
          </div>
          <div className="space-y-4">
            {funds.map((fund) => (
              <div key={fund.name} className="rounded-2xl border border-slate-200 p-5 transition-all hover:-translate-y-1 hover:border-cyan-300 hover:shadow-lg">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-slate-900">{fund.name}</span>
                      <span className={`rounded-full border px-2.5 py-1 text-xs font-bold ${getRiskColor(fund.risk)}`}>{fund.risk} risk</span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600">
                      <span>AUM: {fund.aum}</span>
                      <span>Expense ratio: {fund.expenseRatio}</span>
                      <span className="font-semibold text-emerald-600">Expected: {fund.expectedReturn}</span>
                    </div>
                  </div>
                  <button className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white shadow-md transition-transform hover:-translate-y-0.5">
                    Add to plan
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
