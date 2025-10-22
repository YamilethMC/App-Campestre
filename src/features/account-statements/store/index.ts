import { create } from 'zustand';
import { AccountStatement, AccountStatementFilter } from '../interfaces';
import { accountStatementService } from '../services';

interface AccountStatementState {
  statements: AccountStatement[];
  filteredStatements: AccountStatement[];
  selectedStatement: AccountStatement | null;
  loading: boolean;
  error: string | null;
  currentFilter: AccountStatementFilter;
}

interface AccountStatementActions {
  fetchStatements: () => Promise<void>;
  setFilter: (filter: AccountStatementFilter) => void;
  getFilteredStatements: () => AccountStatement[];
  setSelectedStatement: (statement: AccountStatement | null) => void;
  downloadStatement: (id: string) => Promise<string | null>;
}

export const useAccountStatementStore = create<AccountStatementState & AccountStatementActions>()((set, get) => ({
  statements: [],
  filteredStatements: [],
  selectedStatement: null,
  loading: false,
  error: null,
  currentFilter: {},

  fetchStatements: async () => {
    set({ loading: true, error: null });
    try {
      const statements = await accountStatementService.getAccountStatements();
      set({ 
        statements, 
        filteredStatements: statements,
        loading: false 
      });
    } catch (error) {
      set({ 
        error: 'Error al cargar estados de cuenta',
        loading: false 
      });
      console.error('Error fetching account statements:', error);
    }
  },

  setFilter: (filter) => {
    set({ currentFilter: filter });
    const filteredStatements = get().getFilteredStatements();
    set({ filteredStatements });
  },

  getFilteredStatements: () => {
    const { statements, currentFilter } = get();
    return statements.filter(statement => {
      // Apply filters based on currentFilter
      if (currentFilter.month && statement.month !== currentFilter.month) {
        return false;
      }
      if (currentFilter.year && statement.year !== currentFilter.year) {
        return false;
      }
      if (currentFilter.status && statement.status !== currentFilter.status) {
        return false;
      }
      return true;
    });
  },

  setSelectedStatement: (statement) => {
    set({ selectedStatement: statement });
  },

  downloadStatement: async (id) => {
    try {
      const downloadPath = await accountStatementService.downloadAccountStatement(id);
      return downloadPath;
    } catch (error) {
      console.error('Error downloading statement:', error);
      return null;
    }
  }
}));