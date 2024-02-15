import { useContext } from 'react';
import { AccountContext } from '../context/account.context';

export function useAccountContext() {
  const context = useContext(AccountContext);

  if (!context) {
    throw new Error('useAccountContext must be used within an AccountProvider');
  }

  return context;
}