import { User, Lock, Bell, Moon, Sun, Monitor, Shield } from 'lucide-react';
import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'system';

export function Settings() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme-mode') as Theme | null;
    return saved || 'system';
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    marketAlerts: true,
    portfolioUpdates: true,
  });

  // Apply theme changes
  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem('theme-mode', theme);
  }, [theme]);

  const applyTheme = (selectedTheme: Theme) => {
    const html = document.documentElement;
    let isDark = selectedTheme === 'dark';

    if (selectedTheme === 'system') {
      isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    if (isDark) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  };

  const themeOptions: { value: Theme; label: string; icon: any; description: string }[] = [
    {
      value: 'light',
      label: 'Light',
      icon: Sun,
      description: 'Always use light theme'
    },
    {
      value: 'dark',
      label: 'Dark',
      icon: Moon,
      description: 'Always use dark theme'
    },
    {
      value: 'system',
      label: 'System',
      icon: Monitor,
      description: 'Use device preference'
    }
  ];

  return (
    <div className="flex-1 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 overflow-auto">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Settings</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your account preferences</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8 max-w-5xl mx-auto">
        <div className="space-y-6">
          {/* Profile Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <User className="text-white" size={20} />
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">Profile Information</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                <input
                  type="text"
                  defaultValue="Alex Johnson"
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-blue-600 focus:outline-none transition-colors bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                <input
                  type="email"
                  defaultValue="alex.johnson@email.com"
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-blue-600 focus:outline-none transition-colors bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
                <input
                  type="tel"
                  defaultValue="+1 (555) 123-4567"
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-blue-600 focus:outline-none transition-colors bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Country</label>
                <select className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-blue-600 focus:outline-none transition-colors bg-white dark:bg-gray-700 text-gray-800 dark:text-white">
                  <option className="text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800">United States</option>
                  <option className="text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800">Canada</option>
                  <option className="text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800">United Kingdom</option>
                </select>
              </div>
            </div>
            
            <button className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium hover:shadow-lg transition-all">
              Update Profile
            </button>
          </div>

          {/* Security Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Lock className="text-white" size={20} />
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">Security</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current Password</label>
                <input
                  type="password"
                  placeholder="Enter current password"
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-blue-600 focus:outline-none transition-colors bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">New Password</label>
                  <input
                    type="password"
                    placeholder="Enter new password"
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-blue-600 focus:outline-none transition-colors bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-blue-600 focus:outline-none transition-colors bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                  />
                </div>
              </div>
            </div>
            
            <button className="mt-6 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg font-medium hover:shadow-lg transition-all">
              Change Password
            </button>
          </div>

          {/* Financial Goals */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <Shield className="text-white" size={20} />
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">Financial Goals</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Investment Goal</label>
                <select className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-blue-600 focus:outline-none transition-colors bg-white dark:bg-gray-700 text-gray-800 dark:text-white">
                  <option className="text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800">Wealth Growth</option>
                  <option className="text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800">Income Generation</option>
                  <option className="text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800">Capital Preservation</option>
                  <option className="text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800">Retirement Planning</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Time Horizon</label>
                <select className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-blue-600 focus:outline-none transition-colors bg-white dark:bg-gray-700 text-gray-800 dark:text-white">
                  <option className="text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800">Less than 3 years</option>
                  <option className="text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800">3-7 years</option>
                  <option className="text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800">7-15 years</option>
                  <option className="text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800">15+ years</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Risk Tolerance</label>
                <select className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-blue-600 focus:outline-none transition-colors bg-white dark:bg-gray-700 text-gray-800 dark:text-white">
                  <option className="text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800">Low Risk</option>
                  <option className="text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800">Moderate Risk</option>
                  <option className="text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800">High Risk</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Monthly Investment Budget</label>
                <input
                  type="text"
                  placeholder="$5,000"
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-blue-600 focus:outline-none transition-colors bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                />
              </div>
            </div>
            
            <button className="mt-6 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-medium hover:shadow-lg transition-all">
              Update Goals
            </button>
          </div>

          {/* Notification Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <Bell className="text-white" size={20} />
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">Notifications</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">Email Notifications</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Receive updates via email</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.email}
                    onChange={(e) => setNotifications({...notifications, email: e.target.checked})}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 dark:bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">Push Notifications</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Get instant browser notifications</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.push}
                    onChange={(e) => setNotifications({...notifications, push: e.target.checked})}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 dark:bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">SMS Alerts</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Text messages for important updates</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.sms}
                    onChange={(e) => setNotifications({...notifications, sms: e.target.checked})}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 dark:bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">Market Alerts</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Notifications for market changes</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.marketAlerts}
                    onChange={(e) => setNotifications({...notifications, marketAlerts: e.target.checked})}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 dark:bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">Portfolio Updates</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Daily portfolio performance summary</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.portfolioUpdates}
                    onChange={(e) => setNotifications({...notifications, portfolioUpdates: e.target.checked})}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 dark:bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Appearance */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 dark:bg-gray-900 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <Moon className="text-white" size={20} />
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">Appearance</h3>
            </div>
            
            <div className="space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-300">Choose your preferred theme</p>
              
              <div className="grid grid-cols-3 gap-4">
                {themeOptions.map(option => {
                  const Icon = option.icon;
                  return (
                    <button
                      key={option.value}
                      onClick={() => setTheme(option.value)}
                      className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all ${
                        theme === option.value
                          ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-500'
                          : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:border-blue-400'
                      }`}
                    >
                      <Icon className={`mb-2 size-6 ${
                        theme === option.value ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'
                      }`} />
                      <p className={`font-medium text-sm ${
                        theme === option.value ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
                      }`}>
                        {option.label}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-center">
                        {option.description}
                      </p>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  <span className="font-semibold">Current theme:</span> {theme === 'system' ? 'System (automatic)' : theme}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
