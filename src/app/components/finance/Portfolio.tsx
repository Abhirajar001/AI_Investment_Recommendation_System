import { TrendingUp, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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
    { name: 'Tech Stocks', value: 35, color: '#3b82f6' },
    { name: 'Mutual Funds', value: 30, color: '#8b5cf6' },
    { name: 'Real Estate', value: 20, color: '#10b981' },
    { name: 'Bonds', value: 10, color: '#f59e0b' },
    { name: 'Cash', value: 5, color: '#6b7280' },
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
    <div className="flex-1 bg-gradient-to-br from-slate-50 to-blue-50 overflow-auto">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Portfolio</h2>
            <p className="text-gray-500 mt-1">Track and manage your investments</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 bg-white border-2 border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-all">
              Export Report
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium hover:shadow-lg transition-all">
              Add Investment
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <DollarSign className="text-white" size={24} />
              </div>
              <div className="flex items-center gap-1 text-gray-600 text-sm font-medium">
                <span>{investments.length} Holdings</span>
              </div>
            </div>
            <p className="text-gray-500 text-sm mb-1">Total Invested</p>
            <p className="text-3xl font-bold text-gray-800">{formatCurrency(totalInvested)}</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="text-white" size={24} />
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${
                totalGain >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {totalGain >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                <span>{`${totalGain >= 0 ? '+' : ''}${totalGainPct.toFixed(1)}%`}</span>
              </div>
            </div>
            <p className="text-gray-500 text-sm mb-1">Current Value</p>
            <p className="text-3xl font-bold text-gray-800">{formatCurrency(totalCurrent)}</p>
          </div>

          <div
            className={`rounded-xl shadow-sm p-6 text-white ${
              totalGain >= 0
                ? 'bg-gradient-to-br from-green-600 to-green-700'
                : 'bg-gradient-to-br from-red-600 to-red-700'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                {totalGain >= 0 ? (
                  <TrendingUp className="text-white" size={24} />
                ) : (
                  <ArrowDownRight className="text-white" size={24} />
                )}
              </div>
              <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">
                Total Gain
              </div>
            </div>
            <p className="text-green-100 text-sm mb-1">Profit/Loss</p>
            <p className="text-3xl font-bold">{`${totalGain >= 0 ? '+' : ''}${formatCurrency(totalGain)}`}</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {/* Performance Chart */}
          <div className="col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-gray-800">Portfolio Performance</h3>
                <p className="text-sm text-gray-500 mt-1">7 months growth trend</p>
              </div>
              <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <option>6 Months</option>
                <option>1 Year</option>
                <option>All Time</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <defs>
                  <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: '12px' }} />
                <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
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
                  stroke="#10b981" 
                  strokeWidth={3}
                  dot={{ fill: '#10b981', r: 4 }}
                  activeDot={{ r: 6 }}
                  fill="url(#portfolioGradient)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Allocation Pie Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-800">Asset Allocation</h3>
              <p className="text-sm text-gray-500 mt-1">Portfolio distribution</p>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={allocationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {allocationData.map((entry) => (
                    <Cell key={`cell-${entry.name}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {allocationData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-xs text-gray-700">{item.name}</span>
                  </div>
                  <span className="text-xs font-medium text-gray-800">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Investment Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-800">Investment Holdings</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Asset Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Amount Invested</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Current Value</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">ROI</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {investments.map((investment) => (
                  <tr key={investment.asset} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-medium text-gray-800">{investment.asset}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{formatCurrency(investment.invested)}</td>
                    <td className="px-6 py-4 text-gray-800 font-medium">{formatCurrency(investment.current)}</td>
                    <td className="px-6 py-4">
                      {(() => {
                        const roi = investment.invested > 0
                          ? ((investment.current - investment.invested) / investment.invested) * 100
                          : 0;
                        const isUp = roi >= 0;

                        return (
                      <span className={`inline-flex items-center gap-1 font-bold ${
                        isUp ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {isUp ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                        {`${isUp ? '+' : ''}${roi.toFixed(1)}%`}
                      </span>
                        );
                      })()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                          Buy
                        </button>
                        <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
                          Sell
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
