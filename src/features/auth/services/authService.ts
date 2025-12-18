// Tipos de datos
import { userProfile } from "../interfaces";

// Servicio de autenticación
export const authService = {
  /**
   * Iniciar sesión con email y contraseña
   */
  login: async (email: string, password: string): Promise<{ success: boolean; user?: userProfile; token?: string; error?: string }> => {
      try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.message || "Credenciales inválidas",
        };
      }

      return {
        success: true,
        token: data.data.access_token,
        user: data.data.user,
      };

    } catch (error) {
      console.log("login error:", error);
      return {
        success: false,
        error: "No se pudo conectar con el servidor",
      };
    }
    // Validación simple para propósitos de demostración
    // En una aplicación real, esto se haría en el servidor
    /*if (!email || !password) {
      return { 
        success: false, 
        error: 'Email y contraseña son requeridos' 
      };
    }*/

    // Buscar usuario por email
    //const user = mockUsers.find(u => u.email?.toLowerCase() === email.toLowerCase());

    // En un caso real, aquí se verificaría la contraseña hasheada
   /* if (!user || password !== '123456') { // Contraseña hardcodeada para demo
      return { 
        success: false, 
        error: 'Credenciales inválidas' 
      };
    }
    
    return { 
      success: true, 
      user: user
    };*/
  },

  /**
   * Cerrar sesión
   */
  logout: async (): Promise<void> => {
    localStorage.removeItem('authToken');
  },

  /**
   * Obtener el perfil del usuario actual
   */
  getCurrentUser: async (): Promise<userProfile | null> => {
    const token = localStorage.getItem('authToken');
    if (!token) return null;
    
    const user = '' //mockUsers.find(u => u.token === token);
    if (!user) return null;
    
    return user;
  },

  /**
   * Verificar si el usuario está autenticado
   */
  isAuthenticated: async (): Promise<boolean> => {
    const user = await authService.getCurrentUser();
    return !!user;
  },

  /**
   * Cambiar contraseña (usuario autenticado)
   */
  changePassword: async (currentPassword: string, newPassword: string): Promise<{ success: boolean; message?: string; error?: string }> => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        return {
          success: false,
          error: 'No hay sesión activa',
        };
      }

      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/auth/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || 'No se pudo cambiar la contraseña',
        };
      }

      return {
        success: true,
        message: data.message || 'Contraseña actualizada correctamente',
      };
    } catch (error) {
      console.log('changePassword error:', error);
      return {
        success: false,
        error: 'No se pudo conectar con el servidor',
      };
    }
  },

  /**
   * Solicitar código de recuperación de contraseña
   */
  forgotPassword: async (identifier: string, method: 'email' | 'whatsapp'): Promise<{ success: boolean; message?: string; error?: string }> => {
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ identifier, method }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || 'No se pudo enviar el código',
        };
      }

      return {
        success: true,
        message: data.message || 'Código enviado correctamente',
      };
    } catch (error) {
      console.log('forgotPassword error:', error);
      return {
        success: false,
        error: 'No se pudo conectar con el servidor',
      };
    }
  },

  /**
   * Restablecer contraseña con código
   */
  resetPassword: async (identifier: string, code: string, newPassword: string): Promise<{ success: boolean; message?: string; error?: string }> => {
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ identifier, code, newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || 'No se pudo restablecer la contraseña',
        };
      }

      return {
        success: true,
        message: data.message || 'Contraseña restablecida correctamente',
      };
    } catch (error) {
      console.log('resetPassword error:', error);
      return {
        success: false,
        error: 'No se pudo conectar con el servidor',
      };
    }
  }
};
