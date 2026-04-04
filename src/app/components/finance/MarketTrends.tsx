import { TrendingUp, TrendingDown, Activity, Newspaper } from 'lucide-react';
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
    {
      title: 'Fed Holds Interest Rates Steady, Signals Potential Cuts',
      source: 'Financial Times',
      time: '2 hours ago'
    },
    {
      title: 'Tech Stocks Rally on Strong Earnings Reports',
      source: 'Bloomberg',
      time: '4 hours ago'
    },
    {
      title: 'Oil Prices Surge Amid Middle East Tensions',
      source: 'Reuters',
      time: '6 hours ago'
    },
    {
      title: 'Consumer Confidence Index Reaches 5-Year High',
      source: 'CNBC',
      time: '8 hours ago'
    },
  ];

  return (
    <div className="flex-1 bg-gradient-to-br from-slate-50 to-blue-50 overflow-auto">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Market Trends</h2>
            <p className="text-gray-500 mt-1">Live market data and insights</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-green-100 rounded-lg">
              <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-green-700">Market Open</span>
            </div>
            <span className="text-sm text-gray-500">Last updated: Just now</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        {/* Market Indices */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {indices.map((index, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-600">{index.name}</span>
                <Activity className="text-blue-600" size={18} />
              </div>
              <p className="text-2xl font-bold text-gray-800 mb-2">{index.value}</p>
              <div className={`flex items-center gap-1 ${index.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {index.trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                <span className="text-sm font-medium">{index.change}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* Live Market Chart */}
          <div className="col-span-2 space-y-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">S&P 500 - Live Chart</h3>
                  <p className="text-sm text-gray-500 mt-1">Real-time market data</p>
                </div>
                <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700">
                  <option>1 Day</option>
                  <option>1 Week</option>
                  <option>1 Month</option>
                </select>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={marketData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="time" stroke="#6b7280" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} domain={['dataMin - 10', 'dataMax + 10']} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Trending Stocks */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-bold text-gray-800">Trending Stocks</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Symbol</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Company</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Price</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Change</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Volume</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {trendingStocks.map((stock, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <span className="font-bold text-gray-800">{stock.symbol}</span>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{stock.name}</td>
                        <td className="px-6 py-4 font-medium text-gray-800">{stock.price}</td>
                        <td className="px-6 py-4">
                          <span className={`flex items-center gap-1 font-medium ${
                            stock.trend === 'up' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {stock.trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                            {stock.change}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{stock.volume}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* AI Insights & News */}
          <div className="space-y-8">
            {/* AI Market Insights */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <Activity className="text-white" size={20} />
                </div>
                <h3 className="text-lg font-bold">AI Market Insights</h3>
              </div>
              <div className="space-y-3">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <p className="text-sm font-medium mb-2">Today's Sentiment</p>
                  <p className="text-2xl font-bold">Bullish</p>
                  <p className="text-xs text-blue-100 mt-1">Tech sector leading gains</p>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-1.5"></div>
                    <p className="text-blue-100">Strong buying pressure in mega-cap stocks</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-1.5"></div>
                    <p className="text-blue-100">Energy sector showing volatility</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-1.5"></div>
                    <p className="text-blue-100">Positive earnings outlook for Q2</p>
                  </div>
                </div>
              </div>
            </div>

            {/* News Feed */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Newspaper className="text-blue-600" size={20} />
                <h3 className="text-lg font-bold text-gray-800">Market News</h3>
              </div>
              <div className="space-y-4">
                {news.map((item, index) => (
                  <div key={index} className="pb-4 border-b border-gray-200 last:border-0 last:pb-0">
                    <h4 className="font-medium text-gray-800 text-sm mb-2 hover:text-blue-600 cursor-pointer transition-colors">
                      {item.title}
                    </h4>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>{item.source}</span>
                      <span>•</span>
                      <span>{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
