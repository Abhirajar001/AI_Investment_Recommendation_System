import { TrendingUp, AlertCircle, CheckCircle, BarChart3, ArrowRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function Recommendations() {
  const returnData = [
    { period: '1M', expected: 4.5, market: 3.2 },
    { period: '3M', expected: 8.2, market: 6.5 },
    { period: '6M', expected: 15.8, market: 12.3 },
    { period: '1Y', expected: 24.5, market: 18.7 },
  ];

  const stocks = [
    { 
      ticker: 'AAPL', 
      name: 'Apple Inc.', 
      risk: 'Low', 
      expectedReturn: '18.5%',
      price: '$175.42',
      recommendation: 'Strong Buy'
    },
    { 
      ticker: 'MSFT', 
      name: 'Microsoft Corp.', 
      risk: 'Low', 
      expectedReturn: '16.2%',
      price: '$412.78',
      recommendation: 'Buy'
    },
    { 
      ticker: 'NVDA', 
      name: 'NVIDIA Corp.', 
      risk: 'Medium', 
      expectedReturn: '28.4%',
      price: '$825.90',
      recommendation: 'Strong Buy'
    },
    { 
      ticker: 'GOOGL', 
      name: 'Alphabet Inc.', 
      risk: 'Low', 
      expectedReturn: '15.8%',
      price: '$142.15',
      recommendation: 'Buy'
    },
  ];

  const mutualFunds = [
    { 
      name: 'Vanguard Total Stock Market', 
      risk: 'Low', 
      expectedReturn: '12.5%',
      aum: '$1.3T',
      expenseRatio: '0.04%'
    },
    { 
      name: 'Fidelity 500 Index Fund', 
      risk: 'Low', 
      expectedReturn: '13.2%',
      aum: '$456B',
      expenseRatio: '0.015%'
    },
    { 
      name: 'T. Rowe Price Growth Stock', 
      risk: 'Medium', 
      expectedReturn: '18.7%',
      aum: '$125B',
      expenseRatio: '0.67%'
    },
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'High':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="flex-1 bg-gradient-to-br from-slate-50 to-blue-50 overflow-auto">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">AI Recommendations</h2>
            <p className="text-gray-500 mt-1">Personalized investment suggestions based on your risk profile</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium text-sm">
              Your Risk: Moderate
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        {/* Personalized Greeting */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 mb-8 text-white shadow-lg">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">Hello, Alex! 👋</h3>
              <p className="text-blue-100 mb-4">Based on your moderate risk profile, we've curated these investment opportunities for you.</p>
              <div className="flex items-center gap-6 mt-6">
                <div className="flex items-center gap-2">
                  <CheckCircle size={20} />
                  <span className="text-sm">AI Analyzed</span>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart3 size={20} />
                  <span className="text-sm">Market Tested</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp size={20} />
                  <span className="text-sm">Growth Focused</span>
                </div>
              </div>
            </div>
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <AlertCircle className="text-white" size={32} />
            </div>
          </div>
        </div>

        {/* Expected Returns Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Expected Returns vs Market Average</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={returnData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="period" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '14px'
                }} 
              />
              <Bar dataKey="expected" fill="#3b82f6" name="Your Expected Return" radius={[8, 8, 0, 0]} />
              <Bar dataKey="market" fill="#94a3b8" name="Market Average" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recommended Stocks */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-800">Recommended Stocks</h3>
              <p className="text-sm text-gray-500 mt-1">Top AI-selected stocks matching your profile</p>
            </div>
            <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-2">
              View All <ArrowRight size={16} />
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {stocks.map((stock, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-5 hover:border-blue-300 hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xl font-bold text-gray-800">{stock.ticker}</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium border ${getRiskColor(stock.risk)}`}>
                        {stock.risk} Risk
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{stock.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Current Price</p>
                    <p className="text-lg font-bold text-gray-800">{stock.price}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Expected Return</p>
                    <p className="text-lg font-bold text-green-600">{stock.expectedReturn}</p>
                  </div>
                  <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium text-sm hover:shadow-lg transition-all">
                    Invest Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mutual Funds */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-800">Recommended Mutual Funds</h3>
              <p className="text-sm text-gray-500 mt-1">Low-cost diversified fund options</p>
            </div>
          </div>
          
          <div className="space-y-4">
            {mutualFunds.map((fund, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-5 hover:border-blue-300 hover:shadow-md transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-bold text-gray-800">{fund.name}</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium border ${getRiskColor(fund.risk)}`}>
                        {fund.risk} Risk
                      </span>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-gray-600">
                      <span>AUM: {fund.aum}</span>
                      <span>Expense Ratio: {fund.expenseRatio}</span>
                      <span className="text-green-600 font-medium">Expected: {fund.expectedReturn}</span>
                    </div>
                  </div>
                  <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium hover:shadow-lg transition-all">
                    Invest Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
