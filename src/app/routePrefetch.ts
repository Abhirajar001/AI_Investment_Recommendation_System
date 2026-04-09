const prefetched = new Set<string>();

const loaders = {
  landing: () => import('./components/finance/LandingPage'),
  login: () => import('./components/finance/LoginPage'),
  signup: () => import('./components/finance/SignUpPage'),
  dashboard: () => import('./components/finance/Dashboard'),
  recommendations: () => import('./components/finance/Recommendations'),
  riskProfile: () => import('./components/finance/RiskProfile'),
  portfolio: () => import('./components/finance/Portfolio'),
  marketTrends: () => import('./components/finance/MarketTrends'),
  chatbot: () => import('./components/finance/Chatbot'),
  settings: () => import('./components/finance/Settings'),
} as const;

type LoaderKey = keyof typeof loaders;

function prefetchModule(key: LoaderKey) {
  if (prefetched.has(key)) {
    return;
  }

  prefetched.add(key);
  void loaders[key]();
}

export function prefetchLandingRoutes() {
  prefetchModule('login');
  prefetchModule('signup');
}

export function prefetchAuthenticatedRoutes() {
  prefetchModule('dashboard');
  prefetchModule('recommendations');
  prefetchModule('riskProfile');
  prefetchModule('portfolio');
  prefetchModule('marketTrends');
  prefetchModule('chatbot');
  prefetchModule('settings');
}

export function prefetchPublicRoute(page: 'login' | 'signup' | 'landing') {
  if (page === 'login') {
    prefetchModule('login');
    return;
  }

  if (page === 'signup') {
    prefetchModule('signup');
    return;
  }

  prefetchModule('landing');
}

export function prefetchSidebarRoute(page: string) {
  switch (page) {
    case 'dashboard':
      prefetchModule('dashboard');
      break;
    case 'recommendations':
      prefetchModule('recommendations');
      break;
    case 'risk-profile':
      prefetchModule('riskProfile');
      break;
    case 'portfolio':
      prefetchModule('portfolio');
      break;
    case 'market-trends':
      prefetchModule('marketTrends');
      break;
    case 'chatbot':
      prefetchModule('chatbot');
      break;
    case 'settings':
      prefetchModule('settings');
      break;
  }
}
