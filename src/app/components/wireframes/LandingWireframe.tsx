export function LandingWireframe() {
  return (
    <div className="w-full bg-white border-2 border-gray-400">
      {/* Top Navigation Bar */}
      <div className="h-16 bg-gray-200 border-b-2 border-gray-400 flex items-center justify-between px-8">
        <div className="w-32 h-8 bg-gray-400 flex items-center justify-center text-xs">
          LOGO
        </div>
        <div className="flex gap-6">
          <div className="w-16 h-8 bg-gray-300 flex items-center justify-center text-xs">
            About
          </div>
          <div className="w-16 h-8 bg-gray-300 flex items-center justify-center text-xs">
            Login
          </div>
          <div className="w-20 h-8 bg-gray-400 flex items-center justify-center text-xs">
            Sign Up
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="h-96 bg-gray-100 border-b-2 border-gray-400 flex flex-col items-center justify-center px-8">
        <div className="w-3/4 text-center space-y-6">
          <div className="w-2/3 h-12 bg-gray-300 mx-auto"></div>
          <div className="w-1/2 h-6 bg-gray-300 mx-auto"></div>
          <div className="w-1/2 h-4 bg-gray-200 mx-auto"></div>
          <div className="w-48 h-12 bg-gray-500 mx-auto mt-8 flex items-center justify-center text-white text-sm">
            Get Recommendations
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-8 bg-white border-b-2 border-gray-400">
        <div className="w-48 h-8 bg-gray-300 mx-auto mb-12"></div>
        <div className="grid grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Feature Card 1 */}
          <div className="border-2 border-gray-400 p-6 bg-gray-50">
            <div className="w-16 h-16 bg-gray-400 mx-auto mb-4 flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 32 32">
                <line x1="8" y1="24" x2="24" y2="8" stroke="currentColor" strokeWidth="2"/>
                <line x1="8" y1="8" x2="24" y2="24" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <div className="w-32 h-5 bg-gray-300 mx-auto mb-3"></div>
            <div className="space-y-2">
              <div className="w-full h-3 bg-gray-200"></div>
              <div className="w-full h-3 bg-gray-200"></div>
              <div className="w-3/4 h-3 bg-gray-200 mx-auto"></div>
            </div>
          </div>

          {/* Feature Card 2 */}
          <div className="border-2 border-gray-400 p-6 bg-gray-50">
            <div className="w-16 h-16 bg-gray-400 mx-auto mb-4 flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 32 32">
                <line x1="8" y1="24" x2="24" y2="8" stroke="currentColor" strokeWidth="2"/>
                <line x1="8" y1="8" x2="24" y2="24" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <div className="w-32 h-5 bg-gray-300 mx-auto mb-3"></div>
            <div className="space-y-2">
              <div className="w-full h-3 bg-gray-200"></div>
              <div className="w-full h-3 bg-gray-200"></div>
              <div className="w-3/4 h-3 bg-gray-200 mx-auto"></div>
            </div>
          </div>

          {/* Feature Card 3 */}
          <div className="border-2 border-gray-400 p-6 bg-gray-50">
            <div className="w-16 h-16 bg-gray-400 mx-auto mb-4 flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 32 32">
                <line x1="8" y1="24" x2="24" y2="8" stroke="currentColor" strokeWidth="2"/>
                <line x1="8" y1="8" x2="24" y2="24" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <div className="w-32 h-5 bg-gray-300 mx-auto mb-3"></div>
            <div className="space-y-2">
              <div className="w-full h-3 bg-gray-200"></div>
              <div className="w-full h-3 bg-gray-200"></div>
              <div className="w-3/4 h-3 bg-gray-200 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="h-32 bg-gray-200 flex items-center justify-center">
        <div className="space-y-3 text-center">
          <div className="w-48 h-4 bg-gray-400 mx-auto"></div>
          <div className="flex gap-4 justify-center">
            <div className="w-16 h-3 bg-gray-400"></div>
            <div className="w-16 h-3 bg-gray-400"></div>
            <div className="w-16 h-3 bg-gray-400"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
