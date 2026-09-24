import { create, StateCreator } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createJSONStorage, persist } from 'zustand/middleware';

export type AuthState = {
  // Estado de autenticación
  isAuthenticated: boolean;
  pendingPasswordChange: boolean;
  userId: string | null;
  token: string | null;
  refreshToken: string | null;
  expiresAt: number | null;
  /** El socio activó entrar con Face ID o huella. */
  biometricsEnabled: boolean;
  /** Ya pasó la confirmación biométrica en esta apertura de la app. */
  biometricsUnlocked: boolean;
  
  // Acciones
  setAuthData: (
    userId: string | null,
    token: string | null,
    refreshToken?: string | null,
    expiresInSeconds?: number,
  ) => void;
  /** Renueva sólo los tokens, sin tocar el resto de la sesión. */
  setTokens: (token: string, refreshToken: string, expiresInSeconds: number) => void;
  setPendingPasswordChange: (pending: boolean) => void;
  clearAuth: () => void;
  isTokenExpired: () => boolean;
  setBiometricsEnabled: (enabled: boolean) => void;
  setBiometricsUnlocked: (unlocked: boolean) => void;
};

type AuthStore = ReturnType<typeof createAuthStore>;

// Definir el store sin persistencia primero
const createAuthStore: StateCreator<AuthState> = (set, get) => ({
  // Estado inicial
  isAuthenticated: false,
  pendingPasswordChange: false,
  userId: null,
  token: null,
  refreshToken: null,
  expiresAt: null,
  biometricsEnabled: false,
  biometricsUnlocked: false,
  
  // Acciones
  setAuthData: (userId, token, refreshToken = null, expiresInSeconds = 24 * 60 * 60) => {
    if (token) {
      AsyncStorage.setItem('authToken', token).catch(() => {});
    } else {
      AsyncStorage.removeItem('authToken').catch(() => {});
    }

    set({
      userId,
      token,
      refreshToken,
      isAuthenticated: !!userId && !!token,
      pendingPasswordChange: false,
      // Entrar con contraseña ya es identificarse: no se le pide la cara encima.
      biometricsUnlocked: true,
      expiresAt: expiresInSeconds 
        ? Date.now() + (expiresInSeconds * 1000)
        : null
    });
  },

  setBiometricsEnabled: (enabled: boolean) => {
    // La app queda desbloqueada en ambos casos: al encenderla porque el socio
    // acaba de identificarse para activarla, y al apagarla porque ya no hay nada
    // que confirmar. Lo contrario lo dejaría afuera de su propia app justo
    // después de activar la función.
    set({ biometricsEnabled: enabled, biometricsUnlocked: true });
  },

  setBiometricsUnlocked: (unlocked: boolean) => set({ biometricsUnlocked: unlocked }),

  setTokens: (token, refreshToken, expiresInSeconds) => {
    AsyncStorage.setItem('authToken', token).catch(() => {});

    set({
      token,
      refreshToken,
      isAuthenticated: true,
      expiresAt: Date.now() + expiresInSeconds * 1000,
    });
  },
  setPendingPasswordChange: (pending: boolean) => {
    set({
      pendingPasswordChange: pending,
    });
  },
  
  clearAuth: () => {
    AsyncStorage.removeItem('authToken').catch(() => {});
    set({
      userId: null,
      token: null,
      refreshToken: null,
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
      storage: createJSONStorage(() => AsyncStorage),
      // El desbloqueo NO se guarda: debe pedirse cada vez que se abre la app,
      // que es justo lo que hace útil la biometría.
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        userId: state.userId,
        token: state.token,
        refreshToken: state.refreshToken,
        expiresAt: state.expiresAt,
        biometricsEnabled: state.biometricsEnabled,
      }) as AuthState
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
