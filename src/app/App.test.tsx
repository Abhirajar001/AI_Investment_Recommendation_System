import '@testing-library/jest-dom/vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import App from './App';

vi.mock('./components/ThemeProvider', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

vi.mock('./components/finance/LandingPage', () => ({
  LandingPage: ({ onNavigate }: { onNavigate: (page: string) => void }) => (
    <div>
      <h1>Landing Mock</h1>
      <button onClick={() => onNavigate('login')}>Go Login</button>
      <button onClick={() => onNavigate('invalid-page')}>Go Invalid</button>
    </div>
  ),
}));

vi.mock('./components/finance/LoginPage', () => ({
  LoginPage: ({ onNavigate }: { onNavigate: (page: string) => void }) => (
    <div>
      <h1>Login Mock</h1>
      <button onClick={() => onNavigate('dashboard')}>Go Dashboard</button>
    </div>
  ),
}));

vi.mock('./components/finance/SignUpPage', () => ({
  SignUpPage: ({ onNavigate }: { onNavigate: (page: string) => void }) => (
    <button onClick={() => onNavigate('verify-email')}>Go Verify</button>
  ),
}));

vi.mock('./components/finance/VerifyEmailPage', () => ({
  VerifyEmailPage: ({ onNavigate }: { onNavigate: (page: string) => void }) => (
    <button onClick={() => onNavigate('login')}>Back Login</button>
  ),
}));

vi.mock('./components/finance/ResetPasswordPage', () => ({
  ResetPasswordPage: ({ onNavigate }: { onNavigate: (page: string) => void }) => (
    <button onClick={() => onNavigate('login')}>Reset Back Login</button>
  ),
}));

vi.mock('./components/finance/Sidebar', () => ({
  Sidebar: ({ onNavigate }: { onNavigate: (page: string) => void }) => (
    <button onClick={() => onNavigate('portfolio')}>Sidebar Portfolio</button>
  ),
}));

vi.mock('./components/finance/MobileSectionSwitcher', () => ({
  MobileSectionSwitcher: ({ currentPage }: { currentPage: string }) => <div>Mobile Switcher {currentPage}</div>,
}));

vi.mock('./components/finance/Dashboard', () => ({ Dashboard: () => <div>Dashboard Mock</div> }));
vi.mock('./components/finance/Recommendations', () => ({ Recommendations: () => <div>Recommendations Mock</div> }));
vi.mock('./components/finance/RiskProfile', () => ({ RiskProfile: () => <div>Risk Profile Mock</div> }));
vi.mock('./components/finance/Portfolio', () => ({ Portfolio: () => <div>Portfolio Mock</div> }));
vi.mock('./components/finance/MarketTrends', () => ({ MarketTrends: () => <div>Market Trends Mock</div> }));
vi.mock('./components/finance/Chatbot', () => ({ Chatbot: () => <div>Chatbot Mock</div> }));
vi.mock('./components/finance/Settings', () => ({ Settings: () => <div>Settings Mock</div> }));

describe('App', () => {
  it('renders landing by default and ignores invalid navigation keys', async () => {
    render(<App />);

    expect(await screen.findByText(/landing mock/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /go invalid/i }));

    expect(screen.getByText(/landing mock/i)).toBeInTheDocument();
  });

  it('navigates from landing to login to authenticated dashboard flow', async () => {
    render(<App />);

    fireEvent.click(await screen.findByRole('button', { name: /go login/i }));
    expect(await screen.findByText(/login mock/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /go dashboard/i }));

    expect(await screen.findByText(/dashboard mock/i)).toBeInTheDocument();
    expect(screen.getByText(/mobile switcher dashboard/i)).toBeInTheDocument();
  });

  it('allows authenticated sidebar navigation to switch sections', async () => {
    render(<App />);

    fireEvent.click(await screen.findByRole('button', { name: /go login/i }));
    fireEvent.click(await screen.findByRole('button', { name: /go dashboard/i }));
    fireEvent.click(await screen.findByRole('button', { name: /sidebar portfolio/i }));

    expect(await screen.findByText(/portfolio mock/i)).toBeInTheDocument();
    expect(screen.getByText(/mobile switcher portfolio/i)).toBeInTheDocument();
  });
});
