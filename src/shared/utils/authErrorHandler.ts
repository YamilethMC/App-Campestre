import { router } from 'expo-router';
import { Alert } from 'react-native';
import { useAuthStore } from '../../features/auth/store/useAuthStore';

/**
 * Qué hacer cuando el servidor responde 401.
 *
 * Antes era directo: alerta de "Sesión expirada" y al login. Eso pasaba cada 24
 * horas, porque el token de acceso caduca y nadie lo renovaba, que es justo el
 * problema que reportó el Club.
 *
 * Ahora primero se intenta renovar con el refresh token. Sólo si esa renovación
 * falla se saca al socio. Este archivo lo llaman 13 servicios distintos, así que
 * arreglarlo aquí arregla toda la app de una vez.
 */

/**
 * Una sola renovación a la vez.
 *
 * Si tres pantallas piden datos al mismo tiempo y las tres reciben 401, sin esto
 * se dispararían tres renovaciones en paralelo: la primera rotaría el token y
 * las otras dos llegarían con uno ya usado, que el backend interpreta como robo
 * y cierra todas las sesiones. Compartiendo la promesa, las tres esperan la misma.
 */
let refreshInFlight: Promise<boolean> | null = null;

const requestNewTokens = async (): Promise<boolean> => {
  const { refreshToken } = useAuthStore.getState();

  if (!refreshToken) return false;

  try {
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (!response.ok) return false;

    const body = await response.json();
    const data = body?.data;

    if (!data?.access_token || !data?.refresh_token) return false;

    useAuthStore.getState().setTokens(
      data.access_token,
      data.refresh_token,
      data.expires_in ?? 24 * 60 * 60,
    );

    return true;
  } catch {
    // Sin red no se puede renovar, pero tampoco hay que cerrar la sesión por eso.
    return false;
  }
};

/** Intenta renovar la sesión. Devuelve true si quedó utilizable. */
export const attemptSessionRefresh = async (): Promise<boolean> => {
  if (!refreshInFlight) {
    refreshInFlight = requestNewTokens().finally(() => {
      refreshInFlight = null;
    });
  }

  return refreshInFlight;
};

/**
 * Se llama al recibir un 401.
 *
 * Devuelve true si la sesión se recuperó, para que quien llama pueda reintentar
 * su petición. Si devuelve false, ya se avisó al socio y se le mandó al login.
 */
export const handleAuthError = async (): Promise<boolean> => {
  const recovered = await attemptSessionRefresh();

  if (recovered) return true;

  Alert.alert(
    'Sesión expirada',
    'Tu sesión ha expirado. Por favor inicia sesión nuevamente.',
    [
      {
        text: 'Aceptar',
        onPress: () => {
          useAuthStore.getState().clearAuth();

          router.replace('/');
        }
      }
    ],
    { cancelable: false }
  );

  return false;
};

export const isAuthError = (response: any): boolean => {
  return response?.status === 401 || response?.error?.includes?.('401') || response?.message?.includes?.('401');
};
