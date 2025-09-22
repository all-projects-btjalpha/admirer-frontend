// src/contexts/GlobalContextProvider.tsx
import { ReactNode } from 'react';
import { AwbProvider } from './AwbContext';
import React from 'react';
// import { UserProvider } from './UserContext'; // future addition

export const GlobalContextProvider = ({ children }: { children: ReactNode }) => {
  return (
    // <UserProvider>
      <AwbProvider>
        {children}
      </AwbProvider>
    //</UserProvider>
  );
};
