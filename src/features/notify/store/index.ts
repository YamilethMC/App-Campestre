import { create } from 'zustand';
import { notificationService, Notification, PaginationMeta } from '../services';

interface NotificationStore {
  notifications: Notification[];
  loading: boolean;
  error: string | null;
  search: string;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };

  setNotifications: (notifications: Notification[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSearch: (search: string) => void;
  setPagination: (pagination: PaginationMeta) => void;
  fetchNotifications: (page?: number, search?: string) => Promise<void>;
  fetchNextPage: () => Promise<void>;
  fetchPreviousPage: () => Promise<void>;
  goToPage: (page: number) => Promise<void>;
  resetPagination: () => void;
  updateSearch: (search: string) => void;
}

export const useNotificationStore = create<NotificationStore>((set, get) => ({
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

  setPagination: (pagination) => set({ 
    pagination: {
      page: pagination.page,
      limit: pagination.limit,
      total: pagination.total,
      totalPages: pagination.totalPages,
    }
  }),

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

  fetchNotifications: async (page = 1, search?: string) => {
    const currentSearch = search !== undefined ? search : get().search;
    set({ loading: true, error: null });
    try {
      const result = await notificationService.getNotifications(
        page,
        get().pagination.limit,
        currentSearch,
        'asc',
        'title',
        true
      );

      if (result && result.success) {
        set({
          notifications: result.data.notifications,
          pagination: result.data.meta,
        });
      } else {
        set({ error: 'Error en la respuesta del servidor' });
      }
    } catch (error: any) {
      console.error('Error fetching notifications:', error);
      set({ error: error.message || 'Error desconocido al obtener las notificaciones' });
    } finally {
      set({ loading: false });
    }
  },

  fetchNextPage: async () => {
    const { pagination } = get();
    if (pagination.page < pagination.totalPages) {
      await get().fetchNotifications(pagination.page + 1);
    }
  },

  fetchPreviousPage: async () => {
    const { pagination } = get();
    if (pagination.page > 1) {
      await get().fetchNotifications(pagination.page - 1);
    }
  },

  goToPage: async (page: number) => {
    const { pagination } = get();
    if (page >= 1 && page <= pagination.totalPages) {
      await get().fetchNotifications(page);
    }
  },
}));