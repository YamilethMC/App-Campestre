import { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import { notificationService } from '../services';
import { Notification, PaginationMeta } from '../interfaces';
import { useNotificationStore } from '../store';

// Hook to handle notification data and API calls
export const useNotifications = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

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
    resetPagination,
  } = useNotificationStore();

  // Function to load notifications and handle errors
  const loadNotifications = useCallback(
    async (currentPage: number = 1) => {
      setLoading(true);
      setError(null);

      try {
        const response = await notificationService.getNotifications(
          currentPage,
          pagination.limit,
          search,
          'asc',
          'title',
          true,
        );

        if (response.success && response.data) {
          setNotifications(response.data.notifications);
          setPagination(response.data.meta);
        } else {
          setError(response.error || 'Error en la respuesta del servidor');
        }
      } catch (error: any) {
        console.error('Error loading notifications:', error);
        setError(error.message || 'Error desconocido al obtener las notificaciones');
      } finally {
        setLoading(false);
      }
    },
    [search, pagination.limit, setNotifications, setLoading, setError, setPagination],
  );

  // Set up auto-refresh every 30 minutes (1800000 ms)
  useEffect(() => {
    const autoRefreshInterval = setInterval(() => {
      loadNotifications();
    }, 1800000); // 30 minutes = 1800000 ms

    // Initial load
    loadNotifications();

    // Cleanup interval on unmount
    return () => {
      clearInterval(autoRefreshInterval);
    };
  }, [page, search, loadNotifications]);

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

  const handleGoToPage = useCallback(
    (pageNum: number) => {
      if (pageNum >= 1 && pageNum <= pagination.totalPages) {
        setPage(pageNum);
        loadNotifications(pageNum);
      }
    },
    [pagination.totalPages, loadNotifications],
  );

  // Search handler
  const handleSearch = useCallback(
    (searchQuery: string) => {
      updateStoreSearch(searchQuery);
      setSearch(searchQuery);
      setPage(1); // Reset to first page when search changes
      loadNotifications(1); // Reload notifications with new search query
    },
    [updateStoreSearch, loadNotifications],
  );

  return {
    // Data
    notifications,
    loading,
    error,
    pagination,
    search,

    // Functions
    loadNotifications,
    handleNextPage,
    handlePreviousPage,
    handleGoToPage,
    handleSearch,
    setPage,
    setSearch,
  };
};
