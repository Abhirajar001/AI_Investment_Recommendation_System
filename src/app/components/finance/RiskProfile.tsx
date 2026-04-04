import { Brain, CheckCircle, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export function RiskProfile() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});

  const questions = [
    {
      id: 0,
      question: "What is your primary investment goal?",
      options: [
        "Wealth preservation - I want to protect my capital",
        "Income generation - I want regular income from investments",
        "Balanced growth - I want moderate growth with some stability",
        "Aggressive growth - I want maximum returns, accepting higher risk"
      ]
    },
    {
      id: 1,
      question: "What is your investment time horizon?",
      options: [
        "Short-term (Less than 3 years)",
        "Medium-term (3-7 years)",
        "Long-term (7-15 years)",
        "Very long-term (15+ years)"
      ]
    },
    {
      id: 2,
      question: "How would you react if your portfolio dropped 20% in value?",
      options: [
        "Sell everything immediately - I can't handle losses",
        "Sell some investments to reduce exposure",
        "Hold steady and wait for recovery",
        "Buy more - it's a great opportunity"
      ]
    },
    {
      id: 3,
      question: "What percentage of your total savings are you investing?",
      options: [
        "Less than 10%",
        "10% - 30%",
        "30% - 50%",
        "More than 50%"
      ]
    },
    {
      id: 4,
      question: "How experienced are you with investing?",
      options: [
        "Beginner - Just getting started",
        "Intermediate - Have some knowledge and experience",
        "Advanced - Actively manage my investments",
        "Expert - Extensive market knowledge and experience"
      ]
    }
  ];

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (optionIndex: string) => {
    setAnswers({ ...answers, [currentQuestion]: optionIndex });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const isLastQuestion = currentQuestion === questions.length - 1;
  const isAnswered = answers[currentQuestion] !== undefined;

  return (
    <div className="flex-1 bg-gradient-to-br from-slate-50 to-blue-50 overflow-auto">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Risk Profile Assessment</h2>
            <p className="text-gray-500 mt-1">Help us understand your investment preferences</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
              <Brain className="text-white" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8 max-w-4xl mx-auto">
        {/* Info Banner */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <Brain className="text-white" size={20} />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">AI-Powered Analysis</h3>
              <p className="text-sm text-gray-600">
                Our advanced AI will analyze your responses to create a personalized investment strategy. 
                This assessment takes about 3 minutes and helps us recommend the best opportunities for you.
              </p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-700">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium text-blue-600">{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-600 to-blue-500 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6">
            {questions[currentQuestion].question}
          </h3>
          
          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(String(index))}
                className={`w-full text-left p-5 rounded-lg border-2 transition-all ${
                  answers[currentQuestion] === String(index)
                    ? 'border-blue-600 bg-blue-50 shadow-md'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    answers[currentQuestion] === String(index)
                      ? 'border-blue-600 bg-blue-600'
                      : 'border-gray-300'
                  }`}>
                    {answers[currentQuestion] === String(index) && (
                      <CheckCircle className="text-white" size={16} />
                    )}
                  </div>
                  <span className={`font-medium ${
                    answers[currentQuestion] === String(index)
                      ? 'text-blue-700'
                      : 'text-gray-700'
                  }`}>
                    {option}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              currentQuestion === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:shadow-md'
            }`}
          >
            Previous
          </button>
          
          {!isLastQuestion ? (
            <button
              onClick={handleNext}
              disabled={!isAnswered}
              className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                isAnswered
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:shadow-lg'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              Next Question
              <ArrowRight size={20} />
            </button>
          ) : (
            <button
              disabled={!isAnswered}
              className={`px-8 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                isAnswered
                  ? 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:shadow-lg'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Brain size={20} />
              Submit for AI Analysis
            </button>
          )}
        </div>

        {/* Progress Indicator Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {questions.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentQuestion
                  ? 'w-8 bg-blue-600'
                  : index < currentQuestion
                  ? 'w-2 bg-blue-400'
                  : 'w-2 bg-gray-300'
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
