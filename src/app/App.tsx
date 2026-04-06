import { useState } from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import { LandingPage } from './components/finance/LandingPage';
import { LoginPage } from './components/finance/LoginPage';
import { SignUpPage } from './components/finance/SignUpPage';
import { VerifyEmailPage } from './components/finance/VerifyEmailPage';
import { ResetPasswordPage } from './components/finance/ResetPasswordPage';
import { Sidebar } from './components/finance/Sidebar';
import { Dashboard } from './components/finance/Dashboard';
import { Recommendations } from './components/finance/Recommendations';
import { RiskProfile } from './components/finance/RiskProfile';
import { Portfolio } from './components/finance/Portfolio';
import { MarketTrends } from './components/finance/MarketTrends';
import { Chatbot } from './components/finance/Chatbot';
import { Settings } from './components/finance/Settings';

type Page = 'landing' | 'login' | 'signup' | 'verify-email' | 'reset-password' | 'dashboard' | 'recommendations' | 'risk-profile' | 'portfolio' | 'market-trends' | 'chatbot' | 'settings';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');

  // Public pages (no sidebar)
  if (currentPage === 'landing') {
    return <LandingPage onNavigate={setCurrentPage} />;
  }

  if (currentPage === 'login') {
    return <LoginPage onNavigate={setCurrentPage} />;
  }

  if (currentPage === 'signup') {
    return <SignUpPage onNavigate={setCurrentPage} />;
  }

  if (currentPage === 'verify-email') {
    return <VerifyEmailPage onNavigate={setCurrentPage} />;
  }

  if (currentPage === 'reset-password') {
    return <ResetPasswordPage onNavigate={setCurrentPage} />;
  }

  // Authenticated pages (with sidebar)
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      
      {currentPage === 'dashboard' && <Dashboard />}
      {currentPage === 'recommendations' && <Recommendations />}
      {currentPage === 'risk-profile' && <RiskProfile />}
      {currentPage === 'portfolio' && <Portfolio />}
      {currentPage === 'market-trends' && <MarketTrends />}
      {currentPage === 'chatbot' && <Chatbot />}
      {currentPage === 'settings' && <Settings />}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
