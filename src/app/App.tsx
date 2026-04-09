import { lazy, Suspense, useState, type ComponentType } from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import { MobileSectionSwitcher } from './components/finance/MobileSectionSwitcher';
import { Sidebar } from './components/finance/Sidebar';

type Page =
  | 'landing'
  | 'login'
  | 'signup'
  | 'verify-email'
  | 'reset-password'
  | 'dashboard'
  | 'recommendations'
  | 'risk-profile'
  | 'portfolio'
  | 'market-trends'
  | 'chatbot'
  | 'settings';

const ALL_PAGES: Page[] = [
  'landing',
  'login',
  'signup',
  'verify-email',
  'reset-password',
  'dashboard',
  'recommendations',
  'risk-profile',
  'portfolio',
  'market-trends',
  'chatbot',
  'settings',
];

const isPage = (value: string): value is Page => ALL_PAGES.includes(value as Page);

const lazyNamed = <T,>(loader: () => Promise<{ [key: string]: T }>, key: string) =>
  lazy(async () => ({ default: (await loader())[key] as ComponentType<any> }));

const LandingPage = lazyNamed(() => import('./components/finance/LandingPage'), 'LandingPage');
const LoginPage = lazyNamed(() => import('./components/finance/LoginPage'), 'LoginPage');
const SignUpPage = lazyNamed(() => import('./components/finance/SignUpPage'), 'SignUpPage');
const VerifyEmailPage = lazyNamed(() => import('./components/finance/VerifyEmailPage'), 'VerifyEmailPage');
const ResetPasswordPage = lazyNamed(() => import('./components/finance/ResetPasswordPage'), 'ResetPasswordPage');
const Dashboard = lazyNamed(() => import('./components/finance/Dashboard'), 'Dashboard');
const Recommendations = lazyNamed(() => import('./components/finance/Recommendations'), 'Recommendations');
const RiskProfile = lazyNamed(() => import('./components/finance/RiskProfile'), 'RiskProfile');
const Portfolio = lazyNamed(() => import('./components/finance/Portfolio'), 'Portfolio');
const MarketTrends = lazyNamed(() => import('./components/finance/MarketTrends'), 'MarketTrends');
const Chatbot = lazyNamed(() => import('./components/finance/Chatbot'), 'Chatbot');
const Settings = lazyNamed(() => import('./components/finance/Settings'), 'Settings');

function PageLoader() {
  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      <div className="rounded-3xl border border-white/10 bg-white/5 px-6 py-5 text-center shadow-2xl backdrop-blur-xl">
        <div className="mx-auto mb-3 h-10 w-10 animate-spin rounded-full border-2 border-cyan-300 border-t-transparent" />
        <p className="text-sm font-medium text-slate-200">Loading your investing workspace...</p>
      </div>
    </div>
  );
}

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');

  const handleNavigate = (page: string) => {
    if (isPage(page)) setCurrentPage(page);
  };

  // Public pages (no sidebar)
  if (currentPage === 'landing') {
    return <LandingPage onNavigate={handleNavigate} />;
  }

  if (currentPage === 'login') {
    return <LoginPage onNavigate={handleNavigate} />;
  }

  if (currentPage === 'signup') {
    return <SignUpPage onNavigate={handleNavigate} />;
  }

  if (currentPage === 'verify-email') {
    return <VerifyEmailPage onNavigate={handleNavigate} />;
  }

  if (currentPage === 'reset-password') {
    return <ResetPasswordPage onNavigate={handleNavigate} />;
  }

  // Authenticated pages (with sidebar)
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#fff6dc_0%,_#fffef8_45%,_#eff6ff_100%)] lg:flex">
      <Sidebar currentPage={currentPage} onNavigate={handleNavigate} />

      <div className="flex min-h-screen flex-1 flex-col overflow-hidden">
        <MobileSectionSwitcher currentPage={currentPage} onNavigate={handleNavigate} />

        <main className="flex-1 overflow-hidden">
          {currentPage === 'dashboard' && <Dashboard />}
          {currentPage === 'recommendations' && <Recommendations />}
          {currentPage === 'risk-profile' && <RiskProfile />}
          {currentPage === 'portfolio' && <Portfolio />}
          {currentPage === 'market-trends' && <MarketTrends />}
          {currentPage === 'chatbot' && <Chatbot />}
          {currentPage === 'settings' && <Settings />}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Suspense fallback={<PageLoader />}>
        <AppContent />
      </Suspense>
    </ThemeProvider>
  );
}
