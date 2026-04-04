export function LoginWireframe() {
  return (
    <div className="w-full min-h-screen bg-gray-100 border-2 border-gray-400">
      {/* Top Navigation Bar */}
      <div className="h-16 bg-gray-200 border-b-2 border-gray-400 flex items-center justify-between px-8">
        <div className="w-32 h-8 bg-gray-400 flex items-center justify-center text-xs">
          LOGO
        </div>
        <div className="w-16 h-8 bg-gray-300 flex items-center justify-center text-xs">
          Back
        </div>
      </div>

      {/* Login Form Container */}
      <div className="flex items-center justify-center py-20">
        <div className="w-96 bg-white border-2 border-gray-400 p-8">
          {/* Title */}
          <div className="w-24 h-8 bg-gray-400 mb-8"></div>

          {/* Email Input */}
          <div className="mb-6">
            <div className="w-20 h-4 bg-gray-300 mb-2"></div>
            <div className="w-full h-10 border-2 border-gray-400 bg-white px-3 flex items-center">
              <div className="w-40 h-3 bg-gray-200"></div>
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <div className="w-24 h-4 bg-gray-300 mb-2"></div>
            <div className="w-full h-10 border-2 border-gray-400 bg-white px-3 flex items-center">
              <div className="w-16 h-3 bg-gray-200"></div>
            </div>
          </div>

          {/* Forgot Password Link */}
          <div className="mb-8 text-right">
            <div className="w-32 h-3 bg-gray-300 ml-auto"></div>
          </div>

          {/* Login Button */}
          <div className="w-full h-12 bg-gray-500 flex items-center justify-center text-white mb-6">
            Login
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <div className="w-8 h-3 bg-gray-300"></div>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <div className="w-48 h-4 bg-gray-200 mx-auto"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
