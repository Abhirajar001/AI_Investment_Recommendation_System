import { Bell, CheckCircle2, KeyRound, Monitor, Moon, Sparkles, Sun, User, Shield } from 'lucide-react';
import { useEffect, useState } from 'react';

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

  const applyTheme = (selectedTheme: Theme) => {
    const html = document.documentElement;
    let isDark = selectedTheme === 'dark';

    if (selectedTheme === 'system') {
      isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    html.classList.toggle('dark', isDark);
  };

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem('theme-mode', theme);
  }, [theme]);

  const themeOptions: { value: Theme; label: string; icon: any; description: string }[] = [
    { value: 'light', label: 'Light', icon: Sun, description: 'Always use light theme' },
    { value: 'dark', label: 'Dark', icon: Moon, description: 'Always use dark theme' },
    { value: 'system', label: 'System', icon: Monitor, description: 'Use device preference' },
  ];

  return (
    <div className="flex-1 overflow-auto bg-[radial-gradient(circle_at_top,_#fff6dc_0%,_#fffef8_45%,_#eff6ff_100%)] text-slate-900 dark:bg-gray-900 dark:text-white">
      <div className="border-b border-amber-200/60 bg-white/85 px-5 py-6 backdrop-blur dark:border-gray-700 dark:bg-gray-900/80 md:px-8">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
            <Sparkles size={14} />
            Personalize your journey
          </div>
          <h2 className="text-3xl font-black tracking-tight md:text-4xl">Settings</h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300 md:text-base">
            Keep your profile, security, notifications, and appearance tuned for how you want to learn and invest.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl space-y-6 p-5 md:p-8">
        <section className="rounded-3xl border border-white/70 bg-white p-6 shadow-xl shadow-slate-200/70 dark:border-gray-700 dark:bg-gray-800 md:p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-md">
              <User size={20} />
            </div>
            <div>
              <h3 className="text-xl font-black">Profile</h3>
              <p className="text-sm text-slate-500 dark:text-slate-300">Basic account information</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {[
              ['Full Name', 'Alex Johnson'],
              ['Email Address', 'alex.johnson@email.com'],
              ['Phone Number', '+1 (555) 123-4567'],
              ['Country', 'United States'],
            ].map(([label, value]) => (
              <div key={label}>
                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">{label}</label>
                <input
                  type="text"
                  defaultValue={value}
                  className="w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 outline-none transition-colors focus:border-orange-400 dark:border-gray-700 dark:bg-gray-900"
                />
              </div>
            ))}
          </div>

          <button className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 px-5 py-3 text-sm font-extrabold text-white shadow-lg transition-transform hover:-translate-y-0.5">
            <CheckCircle2 size={16} /> Save profile
          </button>
        </section>

        <section className="rounded-3xl border border-white/70 bg-white p-6 shadow-xl shadow-slate-200/70 dark:border-gray-700 dark:bg-gray-800 md:p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 to-red-500 text-white shadow-md">
              <KeyRound size={20} />
            </div>
            <div>
              <h3 className="text-xl font-black">Security</h3>
              <p className="text-sm text-slate-500 dark:text-slate-300">Keep your account protected</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {[
              ['Current Password', 'Enter current password', 'md:col-span-2'],
              ['New Password', 'Enter new password', ''],
              ['Confirm New Password', 'Confirm new password', ''],
            ].map(([label, placeholder, span]) => (
              <div key={label} className={span}>
                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">{label}</label>
                <input
                  type="password"
                  placeholder={placeholder}
                  className="w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 outline-none transition-colors focus:border-orange-400 dark:border-gray-700 dark:bg-gray-900"
                />
              </div>
            ))}
          </div>

          <button className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-rose-500 to-red-500 px-5 py-3 text-sm font-extrabold text-white shadow-lg transition-transform hover:-translate-y-0.5">
            <Shield size={16} /> Change password
          </button>
        </section>

        <section className="rounded-3xl border border-white/70 bg-white p-6 shadow-xl shadow-slate-200/70 dark:border-gray-700 dark:bg-gray-800 md:p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-md">
              <Bell size={20} />
            </div>
            <div>
              <h3 className="text-xl font-black">Notifications</h3>
              <p className="text-sm text-slate-500 dark:text-slate-300">Choose what you want to hear about</p>
            </div>
          </div>

          <div className="space-y-4">
            {[
              ['Email Notifications', 'Receive updates via email', 'email'],
              ['Push Notifications', 'Get instant browser notifications', 'push'],
              ['SMS Alerts', 'Text messages for important updates', 'sms'],
              ['Market Alerts', 'Notifications for market changes', 'marketAlerts'],
              ['Portfolio Updates', 'Daily portfolio performance summary', 'portfolioUpdates'],
            ].map(([title, description, key]) => (
              <div key={title} className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 dark:border-gray-700 dark:bg-gray-900/40">
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">{title}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-300">{description}</p>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={notifications[key as keyof typeof notifications]}
                    onChange={(e) => setNotifications({ ...notifications, [key]: e.target.checked })}
                    className="peer sr-only"
                  />
                  <div className="peer h-6 w-11 rounded-full bg-slate-300 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-orange-500 peer-checked:after:translate-x-full dark:bg-slate-600" />
                </label>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-white/70 bg-white p-6 shadow-xl shadow-slate-200/70 dark:border-gray-700 dark:bg-gray-800 md:p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 text-white shadow-md">
              <Moon size={20} />
            </div>
            <div>
              <h3 className="text-xl font-black">Appearance</h3>
              <p className="text-sm text-slate-500 dark:text-slate-300">Pick the look that feels best</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {themeOptions.map((option) => {
              const Icon = option.icon;
              const selected = theme === option.value;
              return (
                <button
                  key={option.value}
                  onClick={() => setTheme(option.value)}
                  className={`rounded-2xl border-2 p-4 text-left transition-all ${
                    selected
                      ? 'border-orange-400 bg-orange-50 shadow-md dark:border-orange-400 dark:bg-orange-950/40'
                      : 'border-slate-200 bg-white hover:border-orange-200 dark:border-gray-700 dark:bg-gray-900'
                  }`}
                >
                  <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${selected ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-600 dark:bg-gray-700 dark:text-slate-300'}`}>
                    <Icon size={18} />
                  </div>
                  <p className="text-sm font-black text-slate-900 dark:text-white">{option.label}</p>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-300">{option.description}</p>
                </button>
              );
            })}
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 dark:border-gray-700 dark:bg-gray-900/50 dark:text-slate-300">
            Current theme: <span className="font-bold text-slate-900 dark:text-white">{theme === 'system' ? 'System (automatic)' : theme}</span>
          </div>
        </section>
      </div>
    </div>
  );
}
