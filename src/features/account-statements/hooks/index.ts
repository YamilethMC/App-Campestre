// src/features/account-statements/hooks/index.ts
import { useCallback, useEffect, useState } from 'react';
import { useProfileStore } from '../../profile/store/useProfileStore';
import { accountStatementService } from '../services';
import { useAccountStatementStore } from '../store';

export const useAccountStatements = () => {
  const { profile } = useProfileStore();
  const [selectedStatement, setSelectedStatement] = useState<any>(null);
  const [statements, setStatements] = useState<any[]>([]);
  const { 
    // statements, 
    filteredStatements, 
    loading, 
    error,
    // setStatements,
    setLoading,
    setError
  } = useAccountStatementStore();

  const formatDateRange = (startDate: string, endDate: string) => {
  try {
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Format: "Ene 2023" (abbreviated month name in Spanish + year)
    const formatOptions: Intl.DateTimeFormatOptions = { 
      month: 'short', 
      year: 'numeric' 
    };

    // Helper function to format and capitalize first letter
    const formatAndCapitalize = (date: Date) => {
      const formatted = date.toLocaleDateString('es-MX', formatOptions);
      return formatted.charAt(0).toUpperCase() + formatted.slice(1);
    };

    const startFormatted = formatAndCapitalize(start);
    const endFormatted = formatAndCapitalize(end);

    // If same month and year, return just one date
    if (startFormatted === endFormatted) {
      return startFormatted;
    }

    // Otherwise return range
    return `${startFormatted} - ${endFormatted}`;
  } catch (error) {
    console.error('Error formatting date:', error);
    return `${startDate} - ${endDate}`; // Fallback to original format if there's an error
  }
};

  const fetchStatements = useCallback(async () => {
    if (!profile?.id) return;
    
    try {
      setLoading(true);
      const data = await accountStatementService.getAccountStatements(parseInt(profile.id));
      console.log('data', data.data);  
      data.data.forEach((statement: any) => {
        statement.period = formatDateRange(statement.periodStart, statement.periodEnd);
        console.log('statement', statement);
      });
      setStatements(data.data);
    } catch (err) {
      console.error('Error al cargar estados de cuenta:', err);
      setError('Error al cargar los estados de cuenta');
    } finally {
      setLoading(false);
    }
  }, [profile?.id, setStatements, setLoading, setError]);

  // Cargar al montar el componente
  useEffect(() => {
    fetchStatements();
  }, [fetchStatements]);

  return {
    statements,
    filteredStatements,
    loading,
    error,
    fetchStatements,
    selectedStatement,
    setSelectedStatement,
    setStatements,
  };
};