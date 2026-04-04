export function RiskAssessmentWireframe() {
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
      <div className="max-w-4xl mx-auto py-12 px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="w-64 h-8 bg-gray-400 mb-4"></div>
          <div className="w-96 h-4 bg-gray-300"></div>
        </div>

        {/* Progress Indicator */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-24 h-3 bg-gray-300"></div>
          </div>
          <div className="w-full h-3 bg-gray-200 border border-gray-400">
            <div className="w-1/2 h-full bg-gray-500"></div>
          </div>
        </div>

        {/* Questionnaire Form */}
        <div className="bg-white border-2 border-gray-400 p-8 space-y-8">
          {/* Question 1 */}
          <div>
            <div className="w-80 h-5 bg-gray-400 mb-4"></div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-gray-400 rounded-full bg-gray-500"></div>
                <div className="w-48 h-4 bg-gray-200"></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-gray-400 rounded-full"></div>
                <div className="w-56 h-4 bg-gray-200"></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-gray-400 rounded-full"></div>
                <div className="w-52 h-4 bg-gray-200"></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-gray-400 rounded-full"></div>
                <div className="w-44 h-4 bg-gray-200"></div>
              </div>
            </div>
          </div>

          {/* Question 2 */}
          <div>
            <div className="w-72 h-5 bg-gray-400 mb-4"></div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-gray-400 rounded-full"></div>
                <div className="w-40 h-4 bg-gray-200"></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-gray-400 rounded-full"></div>
                <div className="w-36 h-4 bg-gray-200"></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-gray-400 rounded-full"></div>
                <div className="w-44 h-4 bg-gray-200"></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-gray-400 rounded-full"></div>
                <div className="w-48 h-4 bg-gray-200"></div>
              </div>
            </div>
          </div>

          {/* Question 3 */}
          <div>
            <div className="w-96 h-5 bg-gray-400 mb-4"></div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-gray-400 rounded-full"></div>
                <div className="w-64 h-4 bg-gray-200"></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-gray-400 rounded-full"></div>
                <div className="w-60 h-4 bg-gray-200"></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-gray-400 rounded-full"></div>
                <div className="w-56 h-4 bg-gray-200"></div>
              </div>
            </div>
          </div>

          {/* Question 4 */}
          <div>
            <div className="w-64 h-5 bg-gray-400 mb-4"></div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-gray-400 rounded-full"></div>
                <div className="w-32 h-4 bg-gray-200"></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-gray-400 rounded-full"></div>
                <div className="w-40 h-4 bg-gray-200"></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-gray-400 rounded-full"></div>
                <div className="w-36 h-4 bg-gray-200"></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-gray-400 rounded-full"></div>
                <div className="w-44 h-4 bg-gray-200"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-8">
          <div className="w-32 h-12 bg-gray-300 border-2 border-gray-400 flex items-center justify-center text-sm">
            Previous
          </div>
          <div className="w-32 h-12 bg-gray-500 border-2 border-gray-600 flex items-center justify-center text-white text-sm">
            Submit
          </div>
        </div>
      </div>
    </div>
  );
}
