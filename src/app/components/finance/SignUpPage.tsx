import { ArrowRight, CheckCircle2, Lock, Mail, ShieldCheck, Sparkles, TrendingUp, User } from 'lucide-react';
import { useState, type ChangeEvent, type FormEvent } from 'react';
import { SignUpFormData } from '../../types';
import axios from 'axios';
import { register } from '../../../../services';

interface SignUpPageProps {
  onNavigate: (page: string) => void;
}

const validateFullName = (name: string): string | null => {
  if (!name) return 'Full name is required';
  if (name.trim().length < 2) return 'Name must be at least 2 characters';
  return null;
};

const validateEmail = (email: string): string | null => {
  if (!email) return 'Email is required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Invalid email format';
  return null;
};

const validatePassword = (password: string): string | null => {
  if (!password) return 'Password is required';
  if (password.length < 6) return 'Password must be at least 6 characters';
  if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
    return 'Password must contain uppercase, lowercase, and number';
  }
  return null;
};

const validatePasswordMatch = (password: string, confirmPassword: string): string | null => {
  if (password !== confirmPassword) return 'Passwords do not match';
  return null;
};

export function SignUpPage({ onNavigate }: SignUpPageProps) {
  const [formData, setFormData] = useState<SignUpFormData>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreedToTerms: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverMessage, setServerMessage] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerMessage('');
    
    // Validate form
    const newErrors: Record<string, string> = {};
    
    const nameError = validateFullName(formData.fullName);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    const passwordMatchError = validatePasswordMatch(formData.password, formData.confirmPassword);
    
    if (nameError) newErrors.fullName = nameError;
    if (emailError) newErrors.email = emailError;
    if (passwordError) newErrors.password = passwordError;
    if (passwordMatchError) newErrors.confirmPassword = passwordMatchError;
    if (!formData.agreedToTerms) newErrors.agreedToTerms = 'You must agree to terms and conditions';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    register(formData.fullName, formData.email, formData.password)
      .then(() => {
        localStorage.setItem('pendingVerificationEmail', formData.email);
        setIsLoading(false);
        onNavigate('verify-email');
      })
      .catch((error: unknown) => {
        if (axios.isAxiosError(error)) {
          setServerMessage(error.response?.data?.detail || 'Unable to create account right now.');
        } else {
          setServerMessage('Something went wrong. Please try again.');
        }
        setIsLoading(false);
      });
  };
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#fff6dc_0%,_#fffef8_45%,_#f0f9ff_100%)] px-5 py-10 text-slate-900 md:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-amber-200 bg-white/85 p-8 shadow-2xl backdrop-blur md:p-10">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 shadow-md">
              <TrendingUp className="text-white" size={24} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-600">AI Invest</p>
              <h1 className="text-2xl font-black tracking-tight">Create your starter account</h1>
            </div>
          </div>

          <div className="mb-8 rounded-2xl border border-cyan-200 bg-cyan-50/70 p-5">
            <div className="flex items-center gap-2 text-sm font-bold text-cyan-700">
              <Sparkles size={16} />
              Built for beginners
            </div>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Start with small amounts, clear goals, and a plan the app can explain step-by-step.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {serverMessage ? (
              <p className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
                {serverMessage}
              </p>
            ) : null}

            <div className="grid gap-5 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-slate-700">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Your name"
                    className={`w-full rounded-2xl border-2 bg-white py-3 pl-11 pr-4 outline-none transition-colors ${errors.fullName ? 'border-rose-500' : 'border-slate-200 focus:border-orange-400'}`}
                    aria-label="Full Name"
                    aria-invalid={!!errors.fullName}
                  />
                </div>
                {errors.fullName && <p className="mt-1 text-sm text-rose-600">{errors.fullName}</p>}
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={`w-full rounded-2xl border-2 bg-white py-3 pl-11 pr-4 outline-none transition-colors ${errors.email ? 'border-rose-500' : 'border-slate-200 focus:border-orange-400'}`}
                    aria-label="Email Address"
                    aria-invalid={!!errors.email}
                  />
                </div>
                {errors.email && <p className="mt-1 text-sm text-rose-600">{errors.email}</p>}
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create password"
                    className={`w-full rounded-2xl border-2 bg-white py-3 pl-11 pr-4 outline-none transition-colors ${errors.password ? 'border-rose-500' : 'border-slate-200 focus:border-orange-400'}`}
                    aria-label="Password"
                    aria-invalid={!!errors.password}
                  />
                </div>
                {errors.password && <p className="mt-1 text-sm text-rose-600">{errors.password}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-slate-700">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm password"
                    className={`w-full rounded-2xl border-2 bg-white py-3 pl-11 pr-4 outline-none transition-colors ${errors.confirmPassword ? 'border-rose-500' : 'border-slate-200 focus:border-orange-400'}`}
                    aria-label="Confirm Password"
                    aria-invalid={!!errors.confirmPassword}
                  />
                </div>
                {errors.confirmPassword && <p className="mt-1 text-sm text-rose-600">{errors.confirmPassword}</p>}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="agreedToTerms"
                  checked={formData.agreedToTerms}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-orange-500"
                  aria-label="Agree to terms and conditions"
                />
                <span className="text-sm leading-relaxed text-slate-600">
                  I agree to the{' '}
                  <a href="#" className="font-semibold text-orange-600 hover:text-orange-700">Terms & Conditions</a>{' '}
                  and{' '}
                  <a href="#" className="font-semibold text-orange-600 hover:text-orange-700"> Privacy Policy</a>.
                </span>
              </label>
              {errors.agreedToTerms && <p className="mt-2 text-sm text-rose-600">{errors.agreedToTerms}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 py-3.5 text-base font-extrabold text-white shadow-lg transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
              aria-busy={isLoading}
            >
              {isLoading ? 'Creating account...' : 'Create My Starter Account'}
              <ArrowRight size={18} />
            </button>
          </form>

          <div className="mt-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-200"></div>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-slate-400">or</span>
            <div className="h-px flex-1 bg-slate-200"></div>
          </div>

          <button className="mt-6 flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white py-3 text-sm font-bold text-slate-700 transition-colors hover:border-orange-300 hover:bg-orange-50">
            <svg width="20" height="20" viewBox="0 0 20 20">
              <path fill="#4285F4" d="M19.6 10.23c0-.82-.1-1.42-.25-2.05H10v3.72h5.5c-.15.96-.74 2.31-2.04 3.22v2.45h3.16c1.89-1.73 2.98-4.3 2.98-7.34z"/>
              <path fill="#34A853" d="M13.46 15.13c-.83.59-1.96 1-3.46 1-2.64 0-4.88-1.74-5.68-4.15H1.07v2.52C2.72 17.75 6.09 20 10 20c2.7 0 4.96-.89 6.62-2.42l-3.16-2.45z"/>
              <path fill="#FBBC05" d="M3.99 10c0-.69.12-1.35.32-1.97V5.51H1.07A9.973 9.973 0 000 10c0 1.61.39 3.14 1.07 4.49l3.24-2.52c-.2-.62-.32-1.28-.32-1.97z"/>
              <path fill="#EA4335" d="M10 3.88c1.88 0 3.13.81 3.85 1.48l2.84-2.76C14.96.99 12.7 0 10 0 6.09 0 2.72 2.25 1.07 5.51l3.24 2.52C5.12 5.62 7.36 3.88 10 3.88z"/>
            </svg>
            Continue with Google
          </button>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600">
              Already have an account?{' '}
              <button onClick={() => onNavigate('login')} className="font-bold text-orange-600 hover:text-orange-700">
                Sign In
              </button>
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1"><CheckCircle2 size={14} /> 2-min setup</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1"><ShieldCheck size={14} /> Secure by design</span>
          </div>
        </div>

        <aside className="flex items-center justify-center rounded-3xl border border-slate-200 bg-slate-900 p-8 text-white shadow-2xl">
          <div className="max-w-sm">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-cyan-200">
              <Sparkles size={14} />
              First investment friendly
            </div>
            <h2 className="text-4xl font-black leading-tight tracking-tight">A calmer way to start investing.</h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-300">
              We turn confusing finance into a simple plan: learn, invest a small amount, and grow with confidence.
            </p>
            <div className="mt-8 space-y-4">
              {[
                'Clear beginner-safe recommendations',
                'Small amount investing from day one',
                'AI that explains the why behind every step',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100">
                  <CheckCircle2 className="text-emerald-300" size={18} />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
