import { create, StateCreator } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type AuthState = {
  // Estado de autenticación
  isAuthenticated: boolean;
  userId: string | null;
  token: string | null;
  refreshToken: string | null;
  expiresAt: number | null;
  
  // Acciones
  setAuthData: (userId: string | null, token: string | null, expiresInSeconds?: number) => void;
  clearAuth: () => void;
  isTokenExpired: () => boolean;
};

type AuthStore = ReturnType<typeof createAuthStore>;

// Definir el store sin persistencia primero
const createAuthStore: StateCreator<AuthState> = (set, get) => ({
  // Estado inicial
  isAuthenticated: false,
  userId: null,
  token: null,
  refreshToken: null,
  expiresAt: null,
  
  // Acciones
  setAuthData: (userId, token, expiresInSeconds = 3600) => {
    set({
      userId,
      token,
      isAuthenticated: !!userId && !!token,
      expiresAt: expiresInSeconds 
        ? Date.now() + (expiresInSeconds * 1000)
        : null
    });
  },
  
  clearAuth: () => {
    set({
      userId: null,
      token: null,
      isAuthenticated: false,
      expiresAt: null
    });
  },
  
  isTokenExpired: (): boolean => {
    const state = get();
    if (!state.expiresAt) return true;
    return Date.now() >= state.expiresAt;
  }
});

// Aplicar persistencia al store
export const useAuthStore = create<AuthState>()(
  persist(
    createAuthStore,
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
);

// Hook de conveniencia para acceder al store
export const useAuth = (): AuthState => {
  const state = useAuthStore();
  return {
    ...state,
    isTokenExpired: () => {
      if (!state.expiresAt) return true;
      return Date.now() >= state.expiresAt;
    }
  };
};
