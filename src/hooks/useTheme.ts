import { useState, useEffect } from 'react';
import { StorageService } from '../services/storage';

export function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>(StorageService.getTheme());

  useEffect(() => {
    // Apply theme to document
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    StorageService.setTheme(newTheme);
  };

  return { theme, toggleTheme };
}