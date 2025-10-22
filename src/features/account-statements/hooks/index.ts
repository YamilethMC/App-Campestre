import { useEffect } from 'react';
import { useAccountStatementStore } from '../store';

export const useAccountStatements = () => {
  const { 
    statements, 
    filteredStatements, 
    loading, 
    error, 
    fetchStatements 
  } = useAccountStatementStore();

  useEffect(() => {
    fetchStatements();
  }, [fetchStatements]);

  return {
    statements,
    filteredStatements,
    loading,
    error,
    fetchStatements
  };
};