import { create } from 'zustand';

interface AccountStatementState {
  statements: any[];
  filteredStatements: any[];
  loading: boolean;
  error: string | null;
  currentFilter: any;
  setStatements: (statements: any[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setFilter: (filter: any) => void;
  getFilteredStatements: () => any[];
}

export const useAccountStatementStore = create<AccountStatementState>((set, get) => ({
  statements: [],
  filteredStatements: [],
  loading: false,
  error: null,
  currentFilter: {},

  setStatements: statements => {
    set({
      statements,
      filteredStatements: statements,
    });
  },

  setLoading: loading => {
    set({ loading });
  },

  setError: error => {
    set({ error });
  },

  setFilter: filter => {
    const { statements } = get();
    const filteredStatements = statements.filter(statement => {
      if (!statement.periodStart) return true;

      if (
        filter.month &&
        statement.periodStart &&
        !statement.periodStart.includes(`-${filter.month}-`)
      ) {
        return false;
      }
      if (filter.year && statement.periodStart && !statement.periodStart.startsWith(filter.year)) {
        return false;
      }
      return true;
    });
    set({
      currentFilter: filter,
      filteredStatements,
    });
  },

  getFilteredStatements: () => {
    const { statements, currentFilter } = get();
    return statements.filter(statement => {
      if (
        currentFilter.month &&
        statement.periodStart &&
        !statement.periodStart.includes(`-${currentFilter.month}-`)
      ) {
        return false;
      }
      if (
        currentFilter.year &&
        statement.periodStart &&
        !statement.periodStart.startsWith(currentFilter.year)
      ) {
        return false;
      }
      return true;
    });
  },
}));
