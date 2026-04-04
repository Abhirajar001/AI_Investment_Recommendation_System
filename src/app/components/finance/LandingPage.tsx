import { TrendingUp, Shield, PieChart, BarChart3, ArrowRight, CheckCircle } from 'lucide-react';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  const features = [
    {
      icon: Shield,
      title: 'AI Risk Analysis',
      description: 'Advanced machine learning algorithms analyze your risk tolerance and investment goals'
    },
    {
      icon: TrendingUp,
      title: 'Smart Investment Suggestions',
      description: 'Get personalized stock and mutual fund recommendations based on your profile'
    },
    {
      icon: PieChart,
      title: 'Portfolio Tracking',
      description: 'Monitor your investments in real-time with detailed analytics and insights'
    },
    {
      icon: BarChart3,
      title: 'Market Trend Insights',
      description: 'Stay ahead with AI-powered market analysis and trend predictions'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <TrendingUp className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">AI Invest</h1>
                <p className="text-xs text-blue-600">Smart Finance</p>
              </div>
            </div>
            
            <div className="flex items-center gap-8">
              <a href="#about" className="text-gray-600 hover:text-gray-800 font-medium transition-colors">About</a>
              <a href="#features" className="text-gray-600 hover:text-gray-800 font-medium transition-colors">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-800 font-medium transition-colors">Pricing</a>
              <button 
                onClick={() => onNavigate('login')}
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Login
              </button>
              <button 
                onClick={() => onNavigate('signup')}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium hover:shadow-lg transition-all"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full mb-6">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-blue-700">AI-Powered Investment Platform</span>
              </div>
              
              <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Smart AI Investment<br />
                <span className="text-blue-600">Recommendations</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8">
                Make informed investment decisions with our advanced AI technology. 
                Get personalized recommendations tailored to your financial goals.
              </p>
              
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => onNavigate('signup')}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold text-lg hover:shadow-xl transition-all flex items-center gap-2"
                >
                  Start Investing
                  <ArrowRight size={20} />
                </button>
                <button className="px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-semibold text-lg hover:border-gray-400 transition-all">
                  Watch Demo
                </button>
              </div>
              
              <div className="flex items-center gap-8 mt-8">
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-green-600" size={20} />
                  <span className="text-gray-600">No hidden fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-green-600" size={20} />
                  <span className="text-gray-600">Secure & trusted</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-green-600" size={20} />
                  <span className="text-gray-600">24/7 AI support</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl p-8 shadow-2xl">
                <div className="bg-white rounded-xl p-6 shadow-lg mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-gray-600">Portfolio Value</span>
                    <span className="text-xs text-green-600 font-medium">+12.5%</span>
                  </div>
                  <p className="text-3xl font-bold text-gray-800">$62,450</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl p-4 shadow-md">
                    <p className="text-xs text-gray-500 mb-2">AI Score</p>
                    <p className="text-2xl font-bold text-blue-600">8.5/10</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-md">
                    <p className="text-xs text-gray-500 mb-2">Risk Level</p>
                    <p className="text-lg font-bold text-gray-800">Moderate</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose AI Invest?</h2>
            <p className="text-xl text-gray-600">Powerful features to help you make better investment decisions</p>
          </div>
          
          <div className="grid grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-lg transition-all">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="text-white" size={28} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Start Your Investment Journey?</h2>
          <p className="text-xl text-blue-100 mb-8">Join thousands of investors who trust AI Invest</p>
          <button 
            onClick={() => onNavigate('signup')}
            className="px-10 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all"
          >
            Get Started Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                  <TrendingUp className="text-white" size={18} />
                </div>
                <span className="font-bold text-lg">AI Invest</span>
              </div>
              <p className="text-gray-400 text-sm">Smart investment recommendations powered by AI</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Disclaimer</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>© 2026 AI Invest. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
