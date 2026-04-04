// Finance Domain Types
export interface Stock {
  ticker: string;
  name: string;
  price: string;
  risk: 'Low' | 'Medium' | 'High';
  expectedReturn: string;
  recommendation: 'Strong Buy' | 'Buy' | 'Hold' | 'Sell';
}

export interface MutualFund {
  name: string;
  symbol: string;
  category: string;
  expenseRatio: string;
  return1Year: string;
  recommendation: 'Strong Buy' | 'Buy' | 'Hold' | 'Sell';
}

export interface Investment {
  asset: string;
  invested: string;
  current: string;
  roi: string;
  change: 'up' | 'down';
}

export interface ChatMessage {
  type: 'ai' | 'user';
  text: string;
  time: string;
}

export interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  page: string;
}

export interface PortfolioMetric {
  label: string;
  value: string;
  change: string;
  icon: React.ReactNode;
}

export type RiskLevel = 'Low' | 'Medium' | 'High';

export const RISK_COLORS: Record<RiskLevel, string> = {
  'Low': '#10b981',
  'Medium': '#f59e0b',
  'High': '#ef4444'
};

// Form Validation Types
export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface SignUpFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreedToTerms: boolean;
}

export interface FormError {
  field: string;
  message: string;
}

// User Types
export interface UserProfile {
  name: string;
  email: string;
  riskProfile: RiskLevel;
  totalPortfolioValue: number;
}
