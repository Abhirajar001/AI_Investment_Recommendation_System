import API from './client';

export interface AuthToken {
  access_token: string;
  token_type: string;
}

export interface UserProfileResponse {
  id: number;
  full_name: string;
  email: string;
  is_active: boolean;
  is_verified?: boolean;
  age?: number | null;
  income?: number | null;
  investment_experience?: string | null;
  mfa_enabled?: boolean;
}

export interface RiskProfileResponse {
  age: number | null;
  income: number | null;
  investment_experience: string | null;
  risk_score: number | null;
  risk_level: 'Low' | 'Medium' | 'High' | null;
}

export interface MarketHistoryPoint {
  date: string;
  open: number;
  close: number;
  high: number;
  low: number;
  volume: number;
}

export interface PortfolioInvestment {
  symbol: string;
  quantity: number;
  buy_price: number;
  current_price: number;
  profit_loss: number;
}

export interface PortfolioResponse {
  message?: string;
  total_invested?: number;
  total_current_value?: number;
  total_profit_loss?: number;
  investments: PortfolioInvestment[];
}

export interface GoalItem {
  id: number;
  title: string;
  target_amount: number;
  current_amount: number;
  deadline: string | null;
  goal_type: string;
  progress: number;
  is_completed?: boolean;
}

export interface NotificationItem {
  id: number;
  symbol: string;
  alert_price: number;
  alert_type: string;
  is_triggered: boolean;
}

export const authStorage = {
  getToken: () => localStorage.getItem('token'),
  setToken: (token: string) => localStorage.setItem('token', token),
  clearToken: () => localStorage.removeItem('token')
};

// Auth
export const register = (full_name: string, email: string, password: string) =>
  API.post('/auth/register', { full_name, email, password });

export const login = (email: string, password: string, mfa_code?: string) =>
  API.post<AuthToken>('/auth/login', { email, password, mfa_code: mfa_code || null });

export const verifyEmail = (token: string) =>
  API.post('/auth/verify-email', { token });

export const resendVerification = (email: string) =>
  API.post('/auth/resend-verification', { email });

export const requestPasswordReset = (email: string) =>
  API.post('/auth/request-password-reset', { email });

export const resetPassword = (token: string, new_password: string) =>
  API.post('/auth/reset-password', { token, new_password });

// User
export const getProfile = () => API.get<UserProfileResponse>('/user/me');
export const updateProfile = (full_name: string) =>
  API.put('/user/me', { full_name });

export const updateExtendedProfile = (payload: {
  full_name: string;
  age?: number;
  income?: number;
  investment_experience?: string;
}) => API.put('/user/me', payload);

export const configureMfa = (enable: boolean) =>
  API.post('/user/mfa', { enable });

// Risk Assessment
export const submitRiskAssessment = (data: object) =>
  API.post('/risk/assess', data);
export const getRiskProfile = () => API.get<RiskProfileResponse>('/risk/profile');

// Recommendations
export const getStockRecommendations = () =>
  API.get('/recommendations/stocks');
export const getMutualFundRecommendations = () =>
  API.get('/recommendations/mutual-funds');
export const getAllRecommendations = () =>
  API.get('/recommendations/all');

// Explainable recommendation details already included in /recommendations/* payloads.

// Portfolio
export const getPortfolio = () => API.get<PortfolioResponse>('/portfolio/');
export const addInvestment = (symbol: string, quantity: number, buy_price: number) =>
  API.post('/portfolio/add', { symbol, quantity, buy_price });

// Goals
export const getGoals = () => API.get<{ goals: GoalItem[]; message?: string }>('/goals/');
export const addGoal = (data: object) => API.post('/goals/add', data);
export const updateGoal = (goal_id: number, current_amount: number) =>
  API.put(`/goals/update/${goal_id}?current_amount=${current_amount}`);
export const deleteGoal = (goal_id: number) =>
  API.delete(`/goals/delete/${goal_id}`);

// Notifications
export const getAlerts = () => API.get<{ alerts: NotificationItem[] }>('/notifications/');
export const addAlert = (symbol: string, alert_price: number, alert_type: string) =>
  API.post('/notifications/add', { symbol, alert_price, alert_type });
export const checkAlerts = () => API.get('/notifications/check');

// Compliance/KYC
export const submitKyc = (payload: {
  full_name: string;
  id_number: string;
  country: string;
  consent: boolean;
}) => API.post('/compliance/kyc/submit', payload);

export const getKycStatus = () => API.get('/compliance/kyc/status');
export const getAuditLogs = () => API.get('/compliance/audit-logs');

// Market data
export const getMarketQuote = (symbol: string) =>
  API.get(`/market/${symbol}/quote`);

export const getMarketHistory = (symbol: string, period = '6mo') =>
  API.get<{ symbol: string; period: string; history: MarketHistoryPoint[] }>(`/market/${symbol}/history?period=${period}`);
