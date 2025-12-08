import { create } from 'zustand';
import { Notification, PaginationMeta } from '../interfaces';

interface NotificationState {
  notifications: Notification[];
  loading: boolean;
  error: string | null;
  search: string;
  pagination: PaginationMeta;
}

interface NotificationActions {
  setNotifications: (notifications: Notification[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSearch: (search: string) => void;
  setPagination: (pagination: PaginationMeta) => void;
  resetPagination: () => void;
  updateSearch: (search: string) => void;
}

export const useNotificationStore = create<NotificationState & NotificationActions>((set, get) => ({
  notifications: [],
  loading: false,
  error: null,
  search: '',
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  },

  setNotifications: (notifications) => set({ notifications }),

  setLoading: (loading) => set({ loading }),

  setError: (error) => set({ error }),

  setSearch: (search) => set({ search }),

  setPagination: (pagination) => set({ pagination }),

  resetPagination: () => {
    set({
      pagination: {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 1,
      },
      notifications: [],
    });
  },

  updateSearch: (search: string) => {
    // When search changes, reset to page 1
    set({
      search,
      pagination: { ...get().pagination, page: 1 }
    });
  },
}));