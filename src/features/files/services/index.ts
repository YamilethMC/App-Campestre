import { useAuthStore } from '../../auth/store/useAuthStore';

// In src/features/files/services/index.ts
export const fileService = {
  getFiles: async (
    page: number = 1,
    limit: number = 10,
    search: string = '',
    order: string = 'asc',
    orderBy: string = 'name'
  ): Promise<any> => {
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

      // Parse the JSON response
      const result = await response.json();
      
      return result.data;
    } catch (error) {
      console.error('Error fetching files:', error);
      throw error;
    }
  },

  downloadFile: async (fileId: number): Promise<string> => {
    const { token } = useAuthStore.getState();
    if (!token) {
      throw new Error('No authentication token available');
    }

    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/files/download/${fileId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

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

      // Parse the JSON response to get the signed URL
      const result = await response.json();
      console.log('Download API response:', result);
       
      // Return the signed URL from the response
      if (result.data && result.data.signedUrl) {
        return result.data.signedUrl;
      } else if (result.data && result.data.url) {
        return result.data.url;
      } else if (result.signedUrl) {
        return result.signedUrl;
      } else if (result.url) {
        return result.url;
      } else {
        console.log('Response structure:', JSON.stringify(result, null, 2));
        throw new Error('No se encontró la URL de descarga en la respuesta');
      }
    } catch (error) {
      console.error('Error downloading file:', error);
      throw error;
    }
  },
};