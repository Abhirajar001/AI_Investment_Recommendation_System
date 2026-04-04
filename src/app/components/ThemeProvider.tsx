import { useEffect } from 'react';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Apply stored theme on mount
    const savedTheme = localStorage.getItem('theme-mode') as 'light' | 'dark' | 'system' | null;
    const themeToApply = savedTheme || 'system';
    applyTheme(themeToApply);
  }, []);

  const applyTheme = (theme: 'light' | 'dark' | 'system') => {
    const html = document.documentElement;
    let isDark = theme === 'dark';

    if (theme === 'system') {
      isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    if (isDark) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  };

  return <>{children}</>;
}
