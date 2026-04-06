import { TrendingUp, Mail, Lock } from 'lucide-react';
import { useState } from 'react';
import { LoginFormData } from '../../types';
import axios from 'axios';
import { authStorage, login, requestPasswordReset } from '../../../../services';

interface LoginPageProps {
  onNavigate: (page: string) => void;
}

const validateEmail = (email: string): string | null => {
  if (!email) return 'Email is required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Invalid email format';
  return null;
};

const validatePassword = (password: string): string | null => {
  if (!password) return 'Password is required';
  if (password.length < 6) return 'Password must be at least 6 characters';
  return null;
};

export function LoginPage({ onNavigate }: LoginPageProps) {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [mfaCode, setMfaCode] = useState('');
  const [serverMessage, setServerMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerMessage('');
    
    // Validate form
    const newErrors: Record<string, string> = {};
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    
    if (emailError) newErrors.email = emailError;
    if (passwordError) newErrors.password = passwordError;
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    login(formData.email, formData.password, mfaCode.trim() || undefined)
      .then((response) => {
        authStorage.setToken(response.data.access_token);
        localStorage.setItem('userEmail', formData.email);
        setIsLoading(false);
        onNavigate('dashboard');
      })
      .catch((error: unknown) => {
        if (axios.isAxiosError(error)) {
          setServerMessage(error.response?.data?.detail || 'Unable to sign in right now.');
        } else {
          setServerMessage('Something went wrong. Please try again.');
        }
        setIsLoading(false);
      });
  };

  const handleForgotPassword = () => {
    if (!formData.email) {
      setErrors(prev => ({ ...prev, email: 'Enter your email first' }));
      return;
    }

    setServerMessage('');
    setIsLoading(true);
    requestPasswordReset(formData.email)
      .then((response) => {
        setServerMessage(response.data?.dev_reset_token ? `Reset token: ${response.data.dev_reset_token}` : 'Password reset email requested.');
        setIsLoading(false);
      })
      .catch((error: unknown) => {
        if (axios.isAxiosError(error)) {
          setServerMessage(error.response?.data?.detail || 'Unable to request password reset.');
        } else {
          setServerMessage('Something went wrong. Please try again.');
        }
        setIsLoading(false);
      });
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
              <TrendingUp className="text-white" size={28} />
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-bold text-gray-800">AI Invest</h1>
              <p className="text-xs text-blue-600">Smart Finance</p>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</h2>
          <p className="text-gray-600">Sign in to continue to your account</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
          <form className="space-y-5" onSubmit={handleSubmit}>
            {serverMessage ? (
              <p className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700">{serverMessage}</p>
            ) : null}

            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <Mail className="text-gray-400" size={20} />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className={`w-full pl-12 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                    errors.email ? 'border-red-500 focus:border-red-600' : 'border-gray-300 focus:border-blue-600'
                  }`}
                  aria-label="Email Address"
                  aria-invalid={!!errors.email}
                />
              </div>
              {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <Lock className="text-gray-400" size={20} />
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={`w-full pl-12 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                    errors.password ? 'border-red-500 focus:border-red-600' : 'border-gray-300 focus:border-blue-600'
                  }`}
                  aria-label="Password"
                  aria-invalid={!!errors.password}
                />
              </div>
              {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">MFA Code</label>
              <input
                type="text"
                inputMode="numeric"
                name="mfaCode"
                value={mfaCode}
                onChange={(e) => setMfaCode(e.target.value)}
                placeholder="Optional 6-digit code"
                className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors border-gray-300 focus:border-blue-600"
                aria-label="MFA Code"
              />
              <p className="text-xs text-gray-500 mt-1">Required only if MFA is enabled on your account.</p>
            </div>

            {/* Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 rounded"
                  aria-label="Remember me"
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <button type="button" onClick={handleForgotPassword} className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              aria-busy={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-sm text-gray-500">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Login with Google */}
          <button className="w-full py-3 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-all flex items-center justify-center gap-3">
            <svg width="20" height="20" viewBox="0 0 20 20">
              <path fill="#4285F4" d="M19.6 10.23c0-.82-.1-1.42-.25-2.05H10v3.72h5.5c-.15.96-.74 2.31-2.04 3.22v2.45h3.16c1.89-1.73 2.98-4.3 2.98-7.34z"/>
              <path fill="#34A853" d="M13.46 15.13c-.83.59-1.96 1-3.46 1-2.64 0-4.88-1.74-5.68-4.15H1.07v2.52C2.72 17.75 6.09 20 10 20c2.7 0 4.96-.89 6.62-2.42l-3.16-2.45z"/>
              <path fill="#FBBC05" d="M3.99 10c0-.69.12-1.35.32-1.97V5.51H1.07A9.973 9.973 0 000 10c0 1.61.39 3.14 1.07 4.49l3.24-2.52c-.2-.62-.32-1.28-.32-1.97z"/>
              <path fill="#EA4335" d="M10 3.88c1.88 0 3.13.81 3.85 1.48l2.84-2.76C14.96.99 12.7 0 10 0 6.09 0 2.72 2.25 1.07 5.51l3.24 2.52C5.12 5.62 7.36 3.88 10 3.88z"/>
            </svg>
            Continue with Google
          </button>

          {/* Sign Up Link */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <button 
                onClick={() => onNavigate('signup')}
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <button 
            onClick={() => onNavigate('landing')}
            className="text-gray-600 hover:text-gray-800 text-sm"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
