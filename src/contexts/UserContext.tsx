// template to create future context


// src/contexts/YourContextName.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface YourContextType {
  value: string;
  setValue: (val: string) => void;
}

const YourContext = createContext<YourContextType | undefined>(undefined);

export const YourProvider = ({ children }: { children: ReactNode }) => {
  const [value, setValue] = useState<string>('default');

  return (
    <YourContext.Provider value={{ value, setValue }}>
      {children}
    </YourContext.Provider>
  );
};

export const useYour = (): YourContextType => {
  const context = useContext(YourContext);
  if (!context) {
    throw new Error('useYour must be used within YourProvider');
  }
  return context;
};

