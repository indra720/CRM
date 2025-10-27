'use client';

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface DialogState {
  isOpen: boolean;
  title: string;
}

interface MarketingContextType {
  dialogState: DialogState;
  openDialog: (title: string) => void;
  closeDialog: () => void;
}

const MarketingContext = createContext<MarketingContextType | undefined>(undefined);

export const MarketingProvider = ({ children }: { children: ReactNode }) => {
  const [dialogState, setDialogState] = useState<DialogState>({ isOpen: false, title: '' });

  const openDialog = useCallback((title: string) => {
    setDialogState({ isOpen: true, title });
  }, []);

  const closeDialog = useCallback(() => {
    setDialogState({ isOpen: false, title: '' });
  }, []);

  return (
    <MarketingContext.Provider value={{ dialogState, openDialog, closeDialog }}>
      {children}
    </MarketingContext.Provider>
  );
};

export const useMarketingDialog = () => {
  const context = useContext(MarketingContext);
  if (context === undefined) {
    throw new Error('useMarketingDialog must be used within a MarketingProvider');
  }
  return context;
};
