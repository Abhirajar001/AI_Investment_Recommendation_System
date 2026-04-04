export function DashboardWireframe() {
  return (
    <div className="w-full h-screen bg-white border-2 border-gray-400 flex">
      {/* Left Sidebar Navigation */}
      <div className="w-64 bg-gray-200 border-r-2 border-gray-400 flex flex-col">
        {/* Logo */}
        <div className="h-16 border-b-2 border-gray-400 flex items-center px-6">
          <div className="w-32 h-8 bg-gray-500"></div>
        </div>
        
        {/* Navigation Items */}
        <div className="flex-1 p-4 space-y-2">
          <div className="w-full h-10 bg-gray-500 border border-gray-600 px-4 flex items-center">
            <div className="w-24 h-3 bg-gray-200"></div>
          </div>
          <div className="w-full h-10 bg-gray-300 px-4 flex items-center">
            <div className="w-28 h-3 bg-gray-400"></div>
          </div>
          <div className="w-full h-10 bg-gray-300 px-4 flex items-center">
            <div className="w-32 h-3 bg-gray-400"></div>
          </div>
          <div className="w-full h-10 bg-gray-300 px-4 flex items-center">
            <div className="w-20 h-3 bg-gray-400"></div>
          </div>
          <div className="w-full h-10 bg-gray-300 px-4 flex items-center">
            <div className="w-24 h-3 bg-gray-400"></div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="h-16 bg-gray-100 border-b-2 border-gray-400 flex items-center justify-between px-8">
          <div className="w-48 h-6 bg-gray-300"></div>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            <div className="w-24 h-4 bg-gray-300"></div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-8 bg-gray-50 overflow-auto">
          {/* Portfolio Summary Cards */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="bg-white border-2 border-gray-400 p-6">
              <div className="w-28 h-4 bg-gray-300 mb-4"></div>
              <div className="w-32 h-8 bg-gray-400 mb-2"></div>
              <div className="w-20 h-3 bg-gray-200"></div>
            </div>
            <div className="bg-white border-2 border-gray-400 p-6">
              <div className="w-24 h-4 bg-gray-300 mb-4"></div>
              <div className="w-28 h-8 bg-gray-400 mb-2"></div>
              <div className="w-20 h-3 bg-gray-200"></div>
            </div>
            <div className="bg-white border-2 border-gray-400 p-6">
              <div className="w-32 h-4 bg-gray-300 mb-4"></div>
              <div className="w-24 h-8 bg-gray-400 mb-2"></div>
              <div className="w-16 h-3 bg-gray-200"></div>
            </div>
          </div>

          {/* Market Trends Chart */}
          <div className="bg-white border-2 border-gray-400 p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <div className="w-40 h-6 bg-gray-400"></div>
              <div className="w-24 h-8 bg-gray-300 border border-gray-400 flex items-center justify-center text-xs">
                Filter
              </div>
            </div>
            
            {/* Chart Area */}
            <div className="h-64 bg-gray-100 border border-gray-300 relative">
              {/* Y-axis labels */}
              <div className="absolute left-2 top-2 space-y-8">
                <div className="w-8 h-2 bg-gray-300"></div>
                <div className="w-8 h-2 bg-gray-300"></div>
                <div className="w-8 h-2 bg-gray-300"></div>
                <div className="w-8 h-2 bg-gray-300"></div>
              </div>
              
              {/* Chart line placeholder */}
              <svg className="w-full h-full" viewBox="0 0 400 200">
                <polyline
                  points="40,160 80,140 120,150 160,120 200,130 240,100 280,110 320,80 360,90"
                  fill="none"
                  stroke="#6b7280"
                  strokeWidth="2"
                />
              </svg>
              
              {/* X-axis labels */}
              <div className="absolute bottom-2 left-12 right-4 flex justify-between">
                <div className="w-8 h-2 bg-gray-300"></div>
                <div className="w-8 h-2 bg-gray-300"></div>
                <div className="w-8 h-2 bg-gray-300"></div>
                <div className="w-8 h-2 bg-gray-300"></div>
                <div className="w-8 h-2 bg-gray-300"></div>
              </div>
            </div>
          </div>

          {/* Risk Level Badge */}
          <div className="bg-white border-2 border-gray-400 p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="w-32 h-5 bg-gray-400 mb-3"></div>
                <div className="w-48 h-3 bg-gray-200"></div>
              </div>
              <div className="w-24 h-10 bg-gray-500 border-2 border-gray-600 flex items-center justify-center text-white text-xs">
                MODERATE
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
