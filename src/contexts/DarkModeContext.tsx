import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the shape of the context
interface DarkModeContextType {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
}

// Create the context with an undefined default value
const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

// Custom hook to consume the DarkModeContext
export const useDarkMode = (): DarkModeContextType => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }
  return context;
};

// Define the props for DarkModeProvider
interface DarkModeProviderProps {
  children: ReactNode;
}

// DarkModeProvider component that wraps around the app
export const DarkModeProvider: React.FC<DarkModeProviderProps> = ({ children }) => {
  // Initialize darkMode state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    // Check localStorage for user's preference
    const storedMode = localStorage.getItem('darkMode');
    if (storedMode !== null) {
      return JSON.parse(storedMode);
    }
    // If no preference stored, use system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark;
  });

  // Side effect to apply or remove the 'dark' class on the document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Persist the user's preference in localStorage
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
