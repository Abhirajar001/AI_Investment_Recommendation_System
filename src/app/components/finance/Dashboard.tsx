import { TrendingUp, TrendingDown, DollarSign, Target, Award } from 'lucide-react';
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
    <div className="flex-1 bg-gradient-to-br from-slate-50 to-blue-50 overflow-auto">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
            <p className="text-gray-500 mt-1">Welcome back, Alex Johnson</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-gray-500">Last updated</p>
              <p className="text-sm font-medium text-gray-700">Feb 17, 2026 - 10:45 AM</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              AJ
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        {/* Portfolio Cards */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {/* Total Portfolio */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <DollarSign className="text-white" size={24} />
              </div>
              <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                <TrendingUp size={16} />
                <span>+12.5%</span>
              </div>
            </div>
            <p className="text-gray-500 text-sm mb-1">Total Portfolio Value</p>
            <p className="text-3xl font-bold text-gray-800">$62,450</p>
          </div>

          {/* Monthly Returns */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <Target className="text-white" size={24} />
              </div>
              <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                <TrendingUp size={16} />
                <span>+8.2%</span>
              </div>
            </div>
            <p className="text-gray-500 text-sm mb-1">Monthly Returns</p>
            <p className="text-3xl font-bold text-gray-800">$4,450</p>
          </div>

          {/* AI Risk Profile */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-sm p-6 text-white hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <Award className="text-white" size={24} />
              </div>
              <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">
                AI Analyzed
              </div>
            </div>
            <p className="text-blue-100 text-sm mb-1">Risk Profile</p>
            <p className="text-3xl font-bold">Moderate</p>
            <p className="text-blue-200 text-xs mt-2">Balanced growth strategy</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-3 gap-6">
          {/* Portfolio Performance Chart */}
          <div className="col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-gray-800">Portfolio Performance</h3>
                <p className="text-sm text-gray-500 mt-1">Last 7 months</p>
              </div>
              <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                <option>6 Months</option>
                <option>1 Year</option>
                <option>All Time</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={portfolioData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: '12px' }} />
                <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', r: 4 }}
                  activeDot={{ r: 6 }}
                  fill="url(#colorValue)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Investment Distribution */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-800">Investment Distribution</h3>
              <p className="text-sm text-gray-500 mt-1">Asset allocation</p>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={distributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {distributionData.map((entry) => (
                    <Cell key={`cell-${entry.name}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {distributionData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm text-gray-700">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-800">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { id: 'aapl-invest', action: 'Invested in AAPL', amount: '+$5,000', date: 'Today, 09:30 AM', type: 'buy' },
              { id: 'msft-dividend', action: 'Dividend received from MSFT', amount: '+$125', date: 'Yesterday, 02:15 PM', type: 'dividend' },
              { id: 'tsla-sell', action: 'Sold TSLA shares', amount: '-$3,200', date: 'Feb 15, 2026', type: 'sell' },
            ].map((activity) => (
              <div key={activity.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-800">{activity.action}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.date}</p>
                </div>
                <div className={`text-sm font-bold ${activity.type === 'sell' ? 'text-red-600' : 'text-green-600'}`}>
                  {activity.amount}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}