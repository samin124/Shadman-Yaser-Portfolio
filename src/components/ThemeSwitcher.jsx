import { useState, useEffect } from 'react';

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState('light');
  const [isOpen, setIsOpen] = useState(false);

  const themes = [
    { id: 'light', name: 'Light', icon: '☀️', description: 'Light theme' },
    { id: 'dark', name: 'Dark', icon: '🌙', description: 'Dark theme' },
    { id: 'preset', name: 'Ocean', icon: '🌊', description: 'Blue theme' },
  ];

  useEffect(() => {
    // Get saved theme from localStorage or default to light
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    setIsOpen(false);
  };

  const currentTheme = themes.find(t => t.id === theme) || themes[0];

  return (
    <div className="relative">
      {/* Theme Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg glass theme-border border hover-lift transition-all duration-200"
        aria-label="Change theme"
        aria-expanded={isOpen}
      >
        <span className="text-lg">{currentTheme.icon}</span>
        <span className="theme-text-primary text-sm font-medium hidden sm:block">
          {currentTheme.name}
        </span>
        <svg 
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          
          {/* Theme Options */}
          <div className="absolute top-full right-0 mt-2 w-48 z-50">
            <div className="glass-dark theme-border border rounded-xl p-2 shadow-xl backdrop-blur-lg">
              <div className="theme-text-primary px-3 py-2 text-sm font-semibold border-b theme-border">
                Choose Theme
              </div>
              
              {themes.map((themeOption) => (
                <button
                  key={themeOption.id}
                  onClick={() => changeTheme(themeOption.id)}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                    theme === themeOption.id
                      ? 'theme-bg-accent text-white'
                      : 'theme-text-primary hover:theme-bg-secondary'
                  }`}
                >
                  <span className="text-lg">{themeOption.icon}</span>
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium">{themeOption.name}</span>
                    <span className={`text-xs ${
                      theme === themeOption.id ? 'text-blue-100' : 'theme-text-secondary'
                    }`}>
                      {themeOption.description}
                    </span>
                  </div>
                  
                  {theme === themeOption.id && (
                    <svg 
                      className="w-4 h-4 ml-auto" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ThemeSwitcher;