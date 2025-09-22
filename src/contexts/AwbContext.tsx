// src/contexts/AwbContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AwbContextType {
  awbNumber: string | null;
  setAwbNumber: (awb: string) => void;
}

const AwbContext = createContext<AwbContextType | undefined>(undefined);

export const AwbProvider = ({ children }: { children: ReactNode }) => {
  const [awbNumber, setAwbNumber] = useState<string | null>(null);

  return (
    <AwbContext.Provider value={{ awbNumber, setAwbNumber }}>
      {children}
    </AwbContext.Provider>
  );
};

export const useAwb = (): AwbContextType => {
  const context = useContext(AwbContext);
  if (!context) {
    throw new Error('useAwb must be used within AwbProvider');
  }
  return context;
};
