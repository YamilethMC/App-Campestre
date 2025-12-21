import * as Sharing from 'expo-sharing';
import { useEffect, useState } from 'react';
import { Alert, Linking } from 'react-native';
import { File } from '../interfaces';
import { fileService } from '../services';

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export const useFileActions = () => {
  const [files, setFiles] = useState<File[]>([]); // Initialize as empty array
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    limit: 5,
    total: 0,
    totalPages: 0,
  });
  const [search, setSearch] = useState('');

  // Show error as an alert when error state changes
  useEffect(() => {
    if (error) {
      Alert.alert('Error', error);
    }
  }, [error]);

  // Fetch files from service
  const fetchFiles = async (page: number = 1) => {
    setLoading(true);

    try {
      const response = await fileService.getFiles(page, pagination.limit, search, 'asc', 'name');

      if (!response.success) {
        Alert.alert('Error', response.error || 'Error al cargar los archivos');
        setFiles([]);
        return;
      }

      const filesData = response.data?.files || [];
      const paginationData = response.data?.meta || {
        page,
        limit: pagination.limit,
        total: filesData.length,
        totalPages: Math.ceil(filesData.length / pagination.limit),
      };

      // Mapea los datos para asegurar que coincidan con la interfaz File
      const mappedFiles = filesData.map((file: File) => ({
        id: Number(file.id), // Convierte id a número
        name: file.name,
        description: file.description || `Archivo ${file.name}`,
        type: file.type || 'document',
        url: file.url || `/files/download/${file.id}`,
        createdAt: file.createdAt || new Date().toISOString(),
        updatedAt: file.updatedAt || new Date().toISOString(),
      }));

      setFiles(mappedFiles);
      setPagination(paginationData);
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Error desconocido al cargar los archivos');
      setFiles([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch files on initial load
  useEffect(() => {
    fetchFiles(1);
  }, []);

  // Handle search change with debounce
  const handleSearch = (searchValue: string) => {
    setSearch(searchValue);
  };

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (search !== undefined) {
        fetchFiles(1); // Reset to page 1 when search changes
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(timeoutId);
  }, [search]);

  // Handle download
  const handleDownload = async (fileId: number) => {
    try {
      // Get the signed URL from the service
      const response = await fileService.downloadFile(fileId);

      if (!response.success) {
        Alert.alert('Error', response.error || 'Error al descargar el archivo');
        return;
      }

      const downloadUrl = response.data;

      console.log('downloadUrl', downloadUrl);

      if (!downloadUrl) {
        Alert.alert('Error', 'No se pudo obtener la URL de descarga del archivo');
        return;
      }

      // 2. Verificar si se puede abrir la URL directamente
      const supported = await Linking.canOpenURL(downloadUrl);
      if (supported) {
        await Linking.openURL(downloadUrl);
      } else {
        // 3. Si no se puede abrir directamente, intentar compartir
        if (await Sharing.isAvailableAsync()) {
          await Sharing.shareAsync(downloadUrl, {
            dialogTitle: `Compartir archivo`,
            UTI: 'public.data',
          });
        } else {
          Alert.alert('Error', 'No se pudo abrir el archivo');
        }
      }
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Error al descargar el archivo');
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
