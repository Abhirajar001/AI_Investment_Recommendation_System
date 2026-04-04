export function RecommendationWireframe() {
  return (
    <div className="w-full min-h-screen bg-gray-50 border-2 border-gray-400">
      {/* Top Navigation Bar */}
      <div className="h-16 bg-gray-200 border-b-2 border-gray-400 flex items-center justify-between px-8">
        <div className="w-32 h-8 bg-gray-400 flex items-center justify-center text-xs">
          LOGO
        </div>
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          <div className="w-24 h-4 bg-gray-300"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-12 px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="w-80 h-8 bg-gray-400 mb-4"></div>
          <div className="w-96 h-4 bg-gray-300 mb-6"></div>
          
          {/* Risk Indicator */}
          <div className="flex items-center gap-4">
            <div className="w-28 h-4 bg-gray-300"></div>
            <div className="w-32 h-8 bg-gray-500 border-2 border-gray-600 flex items-center justify-center text-white text-xs">
              MODERATE
            </div>
          </div>
        </div>

        {/* Recommendations Table */}
        <div className="bg-white border-2 border-gray-400 mb-8">
          {/* Table Header */}
          <div className="grid grid-cols-6 gap-4 bg-gray-200 border-b-2 border-gray-400 p-4">
            <div className="w-20 h-4 bg-gray-400"></div>
            <div className="w-24 h-4 bg-gray-400"></div>
            <div className="w-20 h-4 bg-gray-400"></div>
            <div className="w-28 h-4 bg-gray-400"></div>
            <div className="w-24 h-4 bg-gray-400"></div>
            <div className="w-16 h-4 bg-gray-400"></div>
          </div>

          {/* Table Row 1 */}
          <div className="grid grid-cols-6 gap-4 border-b border-gray-300 p-4 items-center">
            <div className="w-16 h-4 bg-gray-300"></div>
            <div className="w-32 h-4 bg-gray-200"></div>
            <div className="w-16 h-6 bg-gray-400 flex items-center justify-center text-xs">
              LOW
            </div>
            <div className="w-20 h-4 bg-gray-300"></div>
            <div className="w-20 h-4 bg-gray-300"></div>
            <div className="w-20 h-9 bg-gray-500 border border-gray-600 flex items-center justify-center text-white text-xs">
              Invest
            </div>
          </div>

          {/* Table Row 2 */}
          <div className="grid grid-cols-6 gap-4 border-b border-gray-300 p-4 items-center">
            <div className="w-16 h-4 bg-gray-300"></div>
            <div className="w-28 h-4 bg-gray-200"></div>
            <div className="w-20 h-6 bg-gray-400 flex items-center justify-center text-xs">
              MEDIUM
            </div>
            <div className="w-20 h-4 bg-gray-300"></div>
            <div className="w-20 h-4 bg-gray-300"></div>
            <div className="w-20 h-9 bg-gray-500 border border-gray-600 flex items-center justify-center text-white text-xs">
              Invest
            </div>
          </div>

          {/* Table Row 3 */}
          <div className="grid grid-cols-6 gap-4 border-b border-gray-300 p-4 items-center">
            <div className="w-16 h-4 bg-gray-300"></div>
            <div className="w-24 h-4 bg-gray-200"></div>
            <div className="w-16 h-6 bg-gray-400 flex items-center justify-center text-xs">
              LOW
            </div>
            <div className="w-20 h-4 bg-gray-300"></div>
            <div className="w-20 h-4 bg-gray-300"></div>
            <div className="w-20 h-9 bg-gray-500 border border-gray-600 flex items-center justify-center text-white text-xs">
              Invest
            </div>
          </div>

          {/* Table Row 4 */}
          <div className="grid grid-cols-6 gap-4 border-b border-gray-300 p-4 items-center">
            <div className="w-16 h-4 bg-gray-300"></div>
            <div className="w-32 h-4 bg-gray-200"></div>
            <div className="w-20 h-6 bg-gray-400 flex items-center justify-center text-xs">
              MEDIUM
            </div>
            <div className="w-20 h-4 bg-gray-300"></div>
            <div className="w-20 h-4 bg-gray-300"></div>
            <div className="w-20 h-9 bg-gray-500 border border-gray-600 flex items-center justify-center text-white text-xs">
              Invest
            </div>
          </div>

          {/* Table Row 5 */}
          <div className="grid grid-cols-6 gap-4 p-4 items-center">
            <div className="w-16 h-4 bg-gray-300"></div>
            <div className="w-28 h-4 bg-gray-200"></div>
            <div className="w-20 h-6 bg-gray-400 flex items-center justify-center text-xs">
              HIGH
            </div>
            <div className="w-20 h-4 bg-gray-300"></div>
            <div className="w-20 h-4 bg-gray-300"></div>
            <div className="w-20 h-9 bg-gray-500 border border-gray-600 flex items-center justify-center text-white text-xs">
              Invest
            </div>
          </div>
        </div>

        {/* Mutual Funds Section */}
        <div className="mb-8">
          <div className="w-56 h-6 bg-gray-400 mb-4"></div>
          
          <div className="bg-white border-2 border-gray-400">
            {/* Table Header */}
            <div className="grid grid-cols-6 gap-4 bg-gray-200 border-b-2 border-gray-400 p-4">
              <div className="w-24 h-4 bg-gray-400"></div>
              <div className="w-20 h-4 bg-gray-400"></div>
              <div className="w-20 h-4 bg-gray-400"></div>
              <div className="w-28 h-4 bg-gray-400"></div>
              <div className="w-24 h-4 bg-gray-400"></div>
              <div className="w-16 h-4 bg-gray-400"></div>
            </div>

            {/* Table Row 1 */}
            <div className="grid grid-cols-6 gap-4 border-b border-gray-300 p-4 items-center">
              <div className="w-32 h-4 bg-gray-200"></div>
              <div className="w-16 h-6 bg-gray-400 flex items-center justify-center text-xs">
                LOW
              </div>
              <div className="w-20 h-4 bg-gray-300"></div>
              <div className="w-20 h-4 bg-gray-300"></div>
              <div className="w-20 h-4 bg-gray-300"></div>
              <div className="w-20 h-9 bg-gray-500 border border-gray-600 flex items-center justify-center text-white text-xs">
                Invest
              </div>
            </div>

            {/* Table Row 2 */}
            <div className="grid grid-cols-6 gap-4 border-b border-gray-300 p-4 items-center">
              <div className="w-28 h-4 bg-gray-200"></div>
              <div className="w-20 h-6 bg-gray-400 flex items-center justify-center text-xs">
                MEDIUM
              </div>
              <div className="w-20 h-4 bg-gray-300"></div>
              <div className="w-20 h-4 bg-gray-300"></div>
              <div className="w-20 h-4 bg-gray-300"></div>
              <div className="w-20 h-9 bg-gray-500 border border-gray-600 flex items-center justify-center text-white text-xs">
                Invest
              </div>
            </div>

            {/* Table Row 3 */}
            <div className="grid grid-cols-6 gap-4 p-4 items-center">
              <div className="w-36 h-4 bg-gray-200"></div>
              <div className="w-16 h-6 bg-gray-400 flex items-center justify-center text-xs">
                LOW
              </div>
              <div className="w-20 h-4 bg-gray-300"></div>
              <div className="w-20 h-4 bg-gray-300"></div>
              <div className="w-20 h-4 bg-gray-300"></div>
              <div className="w-20 h-9 bg-gray-500 border border-gray-600 flex items-center justify-center text-white text-xs">
                Invest
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end">
          <div className="w-48 h-12 bg-gray-500 border-2 border-gray-600 flex items-center justify-center text-white">
            View Full Portfolio
          </div>
        </div>
      </div>
    </div>
  );
}
