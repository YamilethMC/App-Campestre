import AsyncStorage from '@react-native-async-storage/async-storage';

export interface LegalDocumentVersion {
  id: number;
  slug: string;
  title: string;
  version: string;
  versionId: number;
  content: string;
  publishedAt: string;
}

export interface PendingDocument {
  documentId: number;
  slug: string;
  title: string;
  versionId: number;
  version: string;
}

export interface LegalStatus {
  hasPendingDocuments: boolean;
  pendingDocuments: PendingDocument[];
}

export const legalService = {
  async getLatestVersion(
    slug: string,
  ): Promise<{ success: boolean; data?: LegalDocumentVersion; error?: string }> {
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/legal/${slug}/latest`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.message || 'No se pudo cargar el documento',
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error('getLatestVersion error:', error);
      return {
        success: false,
        error: 'No se pudo conectar con el servidor',
      };
    }
  },

  async getUserLegalStatus(): Promise<{ success: boolean; data?: LegalStatus; error?: string }> {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        return {
          success: false,
          error: 'No hay sesión activa',
        };
      }

      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/legal/user/status`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.message || 'No se pudo verificar el estado legal',
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error('getUserLegalStatus error:', error);
      return {
        success: false,
        error: 'No se pudo conectar con el servidor',
      };
    }
  },

  async acceptDocument(
    versionId: number,
  ): Promise<{ success: boolean; message?: string; error?: string }> {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        return {
          success: false,
          error: 'No hay sesión activa',
        };
      }

      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/legal/accept`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ versionId }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.message || 'No se pudo aceptar el documento',
        };
      }

      return {
        success: true,
        message: data.message || 'Documento aceptado correctamente',
      };
    } catch (error) {
      console.error('acceptDocument error:', error);
      return {
        success: false,
        error: 'No se pudo conectar con el servidor',
      };
    }
  },
};
