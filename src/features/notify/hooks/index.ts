import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { notificationService } from '../services';
import { useNotificationStore } from '../store';
import { Notification } from '../interfaces';

// Hook to handle notification data and API calls
export const useNotifications = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [unreadCount, setUnreadCount] = useState(0);

  const {
    notifications,
    loading,
    error,
    search: storeSearch,
    pagination,
    setNotifications,
    setLoading,
    setError,
    setPagination,
    updateSearch: updateStoreSearch,
    resetPagination
  } = useNotificationStore();

  // Function to load notifications and handle errors
  const loadNotifications = useCallback(async (currentPage: number = 1) => {
    setLoading(true);
    setError(null);

    try {
      // Load all personal notifications (read and unread) so they stay visible until deleted
      const personalResponse = await notificationService.getMyNotifications(false);

      if (personalResponse.success && personalResponse.data?.notifications) {
        const allNotifications = personalResponse.data.notifications;
        
        // Sort by createdAt descending
        const sorted = allNotifications.sort((a, b) => {
          const aDate = a.createdAt || '';
          const bDate = b.createdAt || '';
          return new Date(bDate).getTime() - new Date(aDate).getTime();
        });

        const unreadCount = sorted.filter(n => !n.read).length;

        setNotifications(sorted);
        setUnreadCount(unreadCount);
        setPagination({
          page: 1,
          limit: sorted.length,
          total: sorted.length,
          totalPages: 1,
        });
      } else if (personalResponse.status !== 401) {
        Alert.alert('Error', personalResponse.error || 'Error al cargar notificaciones');
      }
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Error desconocido al obtener las notificaciones');
    } finally {
      setLoading(false);
    }
  }, [
    setNotifications,
    setLoading,
    setError,
    setPagination
  ]);

  const markAsRead = useCallback(async (notifyMemberId: number, removeFromList: boolean = false) => {
    const result = await notificationService.markAsRead(notifyMemberId);
    if (result.success) {
      if (removeFromList) {
        // Remove from list when explicitly deleted
        setNotifications(notifications.filter(n => n.id !== notifyMemberId));
      } else {
        // Keep in list but mark as read
        setNotifications(notifications.map(n => 
          n.id === notifyMemberId ? { ...n, read: true, readAt: new Date().toISOString() } : n
        ));
      }
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
    return result.success;
  }, [notifications, setNotifications]);

  const markAllAsRead = useCallback(async () => {
    const result = await notificationService.markAllAsRead();
    if (result.success) {
      setNotifications(notifications.map(n => ({ ...n, read: true, readAt: new Date().toISOString() })));
      setUnreadCount(0);
    }
  }, [notifications, setNotifications]);

  // Auto-refresh every minute to pick up new personal notifications
  useEffect(() => {
    loadNotifications();

    const autoRefreshInterval = setInterval(() => {
      loadNotifications();
    }, 60000); // 1 minute

    // Cleanup interval on unmount
    return () => {
      clearInterval(autoRefreshInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Pagination handlers
  const handleNextPage = useCallback(() => {
    if (page < pagination.totalPages) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadNotifications(nextPage);
    }
  }, [page, pagination.totalPages, loadNotifications]);

  const handlePreviousPage = useCallback(() => {
    if (page > 1) {
      const prevPage = page - 1;
      setPage(prevPage);
      loadNotifications(prevPage);
    }
  }, [page, loadNotifications]);

  const handleGoToPage = useCallback((pageNum: number) => {
    if (pageNum >= 1 && pageNum <= pagination.totalPages) {
      setPage(pageNum);
      loadNotifications(pageNum);
    }
  }, [pagination.totalPages, loadNotifications]);

  // Search handler
  const handleSearch = useCallback((searchQuery: string) => {
    updateStoreSearch(searchQuery);
    setSearch(searchQuery);
    setPage(1); // Reset to first page when search changes
    loadNotifications(1); // Reload notifications with new search query
  }, [updateStoreSearch, loadNotifications]);

  return {
    // Data
    notifications,
    loading,
    error,
    pagination,
    search,
    unreadCount,

    // Functions
    loadNotifications,
    handleNextPage,
    handlePreviousPage,
    handleGoToPage,
    handleSearch,
    markAsRead,
    markAllAsRead,
    setPage,
    setSearch,
  };
};