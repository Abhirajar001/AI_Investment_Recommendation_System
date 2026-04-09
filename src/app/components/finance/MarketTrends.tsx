import { Activity, ArrowDownRight, ArrowUpRight, Newspaper, Sparkles, TrendingDown, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function MarketTrends() {
  const marketData = [
    { time: '09:00', value: 4520 },
    { time: '10:00', value: 4535 },
    { time: '11:00', value: 4528 },
    { time: '12:00', value: 4545 },
    { time: '13:00', value: 4560 },
    { time: '14:00', value: 4555 },
    { time: '15:00', value: 4575 },
    { time: '16:00', value: 4580 },
  ];

  const indices = [
    { name: 'S&P 500', value: '4,580.32', change: '+1.25%', trend: 'up' },
    { name: 'Dow Jones', value: '35,245.67', change: '+0.87%', trend: 'up' },
    { name: 'NASDAQ', value: '14,234.89', change: '+1.45%', trend: 'up' },
    { name: 'Russell 2000', value: '2,045.12', change: '-0.32%', trend: 'down' },
  ];

  const trendingStocks = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: '$175.42', change: '+2.5%', volume: '52.3M', trend: 'up' },
    { symbol: 'MSFT', name: 'Microsoft Corp.', price: '$412.78', change: '+1.8%', volume: '28.7M', trend: 'up' },
    { symbol: 'NVDA', name: 'NVIDIA Corp.', price: '$825.90', change: '+4.2%', volume: '45.1M', trend: 'up' },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: '$245.67', change: '-1.2%', volume: '98.5M', trend: 'down' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: '$142.15', change: '+1.1%', volume: '23.4M', trend: 'up' },
  ];

  const news = [
    { title: 'Fed Holds Interest Rates Steady, Signals Potential Cuts', source: 'Financial Times', time: '2 hours ago' },
    { title: 'Tech Stocks Rally on Strong Earnings Reports', source: 'Bloomberg', time: '4 hours ago' },
    { title: 'Oil Prices Surge Amid Middle East Tensions', source: 'Reuters', time: '6 hours ago' },
    { title: 'Consumer Confidence Index Reaches 5-Year High', source: 'CNBC', time: '8 hours ago' },
  ];

  return (
    <div className="flex-1 overflow-auto bg-[radial-gradient(circle_at_top,_#fff6dc_0%,_#fffef8_45%,_#eff6ff_100%)] text-slate-900">
      <div className="border-b border-amber-200/60 bg-white/85 px-5 py-6 backdrop-blur md:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-cyan-100 px-3 py-1 text-xs font-bold text-cyan-700">
              <Sparkles size={14} />
              Market pulse
            </div>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">Market trends</h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 md:text-base">
              Live market movement presented in a way that is easier for new investors to understand.
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3">
            <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-500"></div>
            <span className="text-sm font-bold text-emerald-700">Market open</span>
          </div>
        </div>
      </div>

      <div className="space-y-8 p-5 md:p-8">
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {indices.map((index) => (
            <article key={index.name} className="rounded-3xl border border-white/70 bg-white p-6 shadow-xl shadow-slate-200/70">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-md">
                  <Activity size={22} />
                </div>
                <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${index.trend === 'up' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                  {index.trend === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                  {index.change}
                </span>
              </div>
              <p className="text-sm font-semibold text-slate-500">{index.name}</p>
              <p className="mt-2 text-3xl font-black text-slate-900">{index.value}</p>
            </article>
          ))}
        </section>

        <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-black text-slate-900">S&P 500 live chart</h3>
                <p className="mt-1 text-sm text-slate-500">Quick view of the day’s direction.</p>
              </div>
              <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">1 Day</div>
            </div>
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={marketData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="time" stroke="#6b7280" style={{ fontSize: '12px' }} />
                <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} domain={['dataMin - 10', 'dataMax + 10']} />
                <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px' }} />
                <Line type="monotone" dataKey="value" stroke="#f97316" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </section>

          <section className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white shadow-xl shadow-slate-200/60">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                  <TrendingUp size={20} />
                </div>
                <h3 className="text-lg font-black">AI market insight</h3>
              </div>
              <div className="rounded-2xl bg-white/10 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">Today’s sentiment</p>
                <p className="mt-1 text-2xl font-black">Bullish</p>
                <p className="mt-1 text-sm text-slate-300">Tech sector leading gains.</p>
              </div>
              <div className="mt-4 space-y-3 text-sm text-slate-200">
                {[
                  'Strong buying pressure in mega-cap stocks',
                  'Energy sector showing higher volatility',
                  'Positive earnings outlook for Q2',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <div className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-300"></div>
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60">
              <div className="mb-4 flex items-center gap-2">
                <Newspaper className="text-orange-500" size={20} />
                <h3 className="text-xl font-black text-slate-900">Market news</h3>
              </div>
              <div className="space-y-4">
                {news.map((item) => (
                  <div key={item.title} className="border-b border-slate-200 pb-4 last:border-0 last:pb-0">
                    <h4 className="cursor-pointer text-sm font-bold text-slate-900 transition-colors hover:text-orange-600">{item.title}</h4>
                    <div className="mt-2 flex items-center gap-3 text-xs text-slate-500">
                      <span>{item.source}</span>
                      <span>•</span>
                      <span>{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 md:p-8">
          <div className="mb-6 flex items-center gap-2">
            <TrendingDown className="text-orange-500" size={20} />
            <h3 className="text-xl font-black text-slate-900">Trending stocks</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px]">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-[0.2em] text-slate-400">Symbol</th>
                  <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-[0.2em] text-slate-400">Company</th>
                  <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-[0.2em] text-slate-400">Price</th>
                  <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-[0.2em] text-slate-400">Change</th>
                  <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-[0.2em] text-slate-400">Volume</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {trendingStocks.map((stock) => (
                  <tr key={stock.symbol} className="transition-colors hover:bg-slate-50">
                    <td className="px-5 py-4 font-black text-slate-900">{stock.symbol}</td>
                    <td className="px-5 py-4 text-slate-600">{stock.name}</td>
                    <td className="px-5 py-4 font-semibold text-slate-900">{stock.price}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-black ${stock.trend === 'up' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                        {stock.trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                        {stock.change}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-600">{stock.volume}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
