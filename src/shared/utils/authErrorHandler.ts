import { router } from 'expo-router';
import { Alert } from 'react-native';
import { useAuthStore } from '../../features/auth/store/useAuthStore';
import { type RefreshOutcome, readRefreshResponse } from './refreshOutcome';

/**
 * Qué hacer cuando el servidor responde 401.
 *
 * Antes era directo: alerta de "Sesión expirada" y al login. Eso pasaba cada 24
 * horas, porque el token de acceso caduca y nadie lo renovaba, que es justo el
 * problema que reportó el Club.
 *
 * Ahora primero se intenta renovar con el refresh token. Sólo si el servidor
 * rechaza la tarjeta se saca al socio; una falla de señal o del servidor no
 * (mira refreshOutcome). Este archivo lo llaman 13 servicios distintos, así que
 * arreglarlo aquí arregla toda la app de una vez.
 */

/**
 * Tope para la renovación. En Android, React Native no pone tiempo límite a las
 * peticiones (OkHttpClientProvider los deja en 0): una renovación colgada se
 * quedaría esperando para siempre y, como se comparte, ninguna otra saldría.
 *
 * Con 15 s más los 20 s del reintento (useSessionRefresh), el siguiente intento
 * cae dentro del margen de 2 minutos que la API le da a una respuesta perdida.
 */
const REFRESH_TIMEOUT_MS = 15 * 1000;

/**
 * Una sola renovación a la vez.
 *
 * Si tres pantallas piden datos al mismo tiempo y las tres reciben 401, sin esto
 * se dispararían tres renovaciones en paralelo: la primera rotaría el token y
 * las otras dos llegarían con uno ya usado, que el backend, pasado su margen de
 * 2 minutos, interpreta como robo y cierra todas las sesiones. Compartiendo la
 * promesa, las tres esperan la misma.
 */
let refreshInFlight: Promise<RefreshOutcome> | null = null;

const requestNewTokens = async (): Promise<RefreshOutcome> => {
  const { refreshToken } = useAuthStore.getState();

  // Sin tarjeta no hay con qué renovar: sólo queda volver a entrar.
  if (!refreshToken) return 'rejected';

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REFRESH_TIMEOUT_MS);

  try {
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: refreshToken }),
      signal: controller.signal,
    });

    const result = readRefreshResponse(
      response.status,
      response.ok ? await response.json() : null,
    );

    if (result.outcome === 'renewed') {
      useAuthStore.getState().setTokens(
        result.accessToken,
        result.refreshToken,
        result.expiresIn ?? 24 * 60 * 60,
      );
    }

    return result.outcome;
  } catch (error) {
    // Sin señal, tiempo agotado o una respuesta que no se pudo leer: no se sabe
    // si la tarjeta sirve, así que la sesión se queda y se reintenta.
    console.warn('No se pudo renovar la sesión; se reintentará', error);
    return 'failed';
  } finally {
    clearTimeout(timeout);
  }
};

/** Intenta renovar la sesión y dice qué pasó (mira refreshOutcome). */
export const attemptSessionRefresh = async (): Promise<RefreshOutcome> => {
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
 * su petición. Si devuelve false, la petición no se puede repetir: o el servidor
 * rechazó la tarjeta y ya se avisó al socio y se le mandó al login, o falló la
 * señal o el servidor y la sesión se queda para que useSessionRefresh reintente.
 */
export const handleAuthError = async (): Promise<boolean> => {
  const outcome = await attemptSessionRefresh();

  if (outcome === 'renewed') return true;
  if (outcome === 'failed') return false;

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
