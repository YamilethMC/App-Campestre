import { useAuthStore } from '../../auth/store/useAuthStore';
import { FileApiResponse } from '../interfaces';

export const fileService = {
  // Obtener archivos paginados con búsqueda
  getFiles: async (
    page: number = 1,
    limit: number = 10,
    search: string = '',
    order: string = 'asc',
    orderBy: string = 'name'
  ): Promise<FileApiResponse> => {
    const { token } = useAuthStore.getState();
    if (!token) {
      throw new Error('No authentication token available');
    }

    try {
      const url = `${process.env.EXPO_PUBLIC_API_URL}/files?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}&order=${order}&orderBy=${orderBy}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'accept': '*/*',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        if (response.status === 400) {
          throw new Error(`Petición inválida. Verifica los parámetros. Detalles: ${errorText}`);
        } else if (response.status === 401) {
          throw new Error('No autorizado. Por favor inicia sesión nuevamente.');
        } else if (response.status === 404) {
          throw new Error('No encontrado. Detalles: ' + errorText);
        } else {
          throw new Error(`Error en la solicitud: ${response.status}. Detalles: ${errorText}`);
        }
      }

      const result: FileApiResponse = await response.json();
      return result;
    } catch (error) {
      console.error('Error fetching files:', error);
      throw error;
    }
  },

  // Descargar archivo
  downloadFile: async (fileId: string): Promise<void> => {

    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/files/download/${fileId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${useAuthStore.getState().token}`,
        },
      });

      console.log('Response:', response);

      if (!response.ok) {
        const errorText = await response.text();
        if (response.status === 500) {
          throw new Error('Error interno del servidor. Detalles: ' + errorText);
        } else if (response.status === 401) {
          throw new Error('No autorizado. Por favor inicia sesión nuevamente.');
        } else {
          throw new Error(`Error en la solicitud: ${response.status}. Detalles: ${errorText}`);
        }
      }

      // Get the filename from the content-disposition header or use a generic name
      const contentDisposition = response.headers.get('content-disposition');
      let filename = `file_${fileId}`;
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="?(.+)"?/i);
        if (filenameMatch) {
          filename = filenameMatch[1];
        }
      }

      // Get the blob content
      const blob = await response.blob();

      // For now, we just return void since the actual file handling will be done in the hook
      // In a real implementation, we would use Expo FileSystem and Sharing APIs
    } catch (error) {
      console.error('Error downloading file:', error);
      throw error;
    }
  },
};