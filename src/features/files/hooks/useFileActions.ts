import { useEffect } from 'react';
import { Alert } from 'react-native';
import { useFileStore } from '../store';

export const useFileActions = () => {
  const {
    files,
    loading,
    error,
    pagination,
    search,
    fetchFiles,
    downloadFile,
    setSearch,
    setError
  } = useFileStore();

  // Show error as an alert when error state changes
  useEffect(() => {
    if (error) {
      Alert.alert('Error', error);
    }
  }, [error]);

  // Fetch files on initial load
  useEffect(() => {
    fetchFiles(1);
  }, []);

  // Handle search change
  const handleSearch = (searchValue: string) => {
    setSearch(searchValue);
    fetchFiles(1); // Reset to page 1 when search changes
  };

  // Handle download
  const handleDownload = async (fileId: number) => {
    try {
      await downloadFile(fileId);
      // The download service will handle the file retrieval
      // We can show a success message or handle the downloaded file as needed
      Alert.alert('Éxito', 'El archivo se ha descargado correctamente.');
    } catch (err: any) {
      console.error('Download error:', err);
      // Error is already handled by setError in the store
    }
  };

  // Pagination functions
  const fetchNextPage = () => {
    if (pagination.page < pagination.totalPages) {
      fetchFiles(pagination.page + 1);
    }
  };

  const fetchPreviousPage = () => {
    if (pagination.page > 1) {
      fetchFiles(pagination.page - 1);
    }
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= pagination.totalPages) {
      fetchFiles(page);
    }
  };

  // Get visible pages for pagination
  const getVisiblePages = () => {
    const total = pagination.totalPages;
    const current = pagination.page;
    const maxVisible = 6;

    if (total <= maxVisible) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    let start = current - Math.floor(maxVisible / 2);
    if (start < 1) start = 1;

    let end = start + maxVisible - 1;
    if (end > total) {
      end = total;
      start = end - maxVisible + 1;
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return {
    files,
    loading,
    error,
    pagination,
    search,
    handleSearch,
    handleDownload,
    fetchNextPage,
    fetchPreviousPage,
    goToPage,
    getVisiblePages,
    refreshFiles: () => fetchFiles(pagination.page),
  };
};