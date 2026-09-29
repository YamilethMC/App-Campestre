import { useEffect, useState } from 'react';
import { AppState } from 'react-native';

import { attemptSessionRefresh } from '../../../shared/utils/authErrorHandler';
import { useAuthStore } from '../store/useAuthStore';

/** Se renueva un minuto antes de que venza, no cuando ya venció. */
const REFRESH_MARGIN_MS = 60 * 1000;

/**
 * Tope para la renovación al abrir. Sin red, la app no se queda en blanco
 * esperando: arranca y, si algo falla, `handleAuthError` sigue de respaldo.
 */
const STARTUP_REFRESH_TIMEOUT_MS = 5 * 1000;

const needsRefresh = (): boolean => {
  const { isAuthenticated, refreshToken, expiresAt } = useAuthStore.getState();
  if (!isAuthenticated || !refreshToken) return false;
  return !expiresAt || Date.now() >= expiresAt - REFRESH_MARGIN_MS;
};

const waitForHydration = (): Promise<void> => {
  if (useAuthStore.persist.hasHydrated()) return Promise.resolve();
  return new Promise((resolve) => {
    const unsubscribe = useAuthStore.persist.onFinishHydration(() => {
      unsubscribe();
      resolve();
    });
  });
};

/**
 * Mantiene vigente el token de acceso, que dura 15 minutos.
 *
 * Los servicios reciben el 401 y renuevan la sesión con `handleAuthError`, pero
 * ninguno repite su petición: la primera pantalla que carga con un token vencido
 * se queda sin datos (el Inicio mostraba "Nombre del Socio" y "#N/A"). En vez de
 * tocar los 34 lugares que llaman a los servicios, aquí se renueva antes de que
 * venza, en los tres momentos en que puede pasar:
 *
 * 1. Al abrir la app, antes de mostrar las pantallas.
 * 2. Al volver a la app desde segundo plano.
 * 3. Mientras se usa, un minuto antes de que venza.
 *
 * `attemptSessionRefresh` comparte la renovación en curso, así que estos tres y
 * un 401 al mismo tiempo nunca mandan dos refresh (el backend lo tomaría como
 * robo y cerraría todas las sesiones).
 *
 * Devuelve false mientras hace la renovación inicial.
 */
export const useSessionRefresh = (): boolean => {
  const [ready, setReady] = useState(false);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const expiresAt = useAuthStore((state) => state.expiresAt);

  // 1. Al abrir.
  useEffect(() => {
    let active = true;

    const start = async () => {
      await waitForHydration();
      if (needsRefresh()) {
        await Promise.race([
          attemptSessionRefresh(),
          new Promise((resolve) => setTimeout(resolve, STARTUP_REFRESH_TIMEOUT_MS)),
        ]);
      }
      if (active) setReady(true);
    };

    start();

    return () => {
      active = false;
    };
  }, []);

  // 2. Al volver del segundo plano.
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'active' && needsRefresh()) {
        attemptSessionRefresh();
      }
    });

    return () => subscription.remove();
  }, []);

  // 3. Mientras se usa. Cada renovación cambia `expiresAt` y se vuelve a programar.
  useEffect(() => {
    if (!isAuthenticated || !expiresAt) return;

    const delay = Math.max(0, expiresAt - REFRESH_MARGIN_MS - Date.now());
    const timer = setTimeout(() => {
      if (AppState.currentState === 'active' && needsRefresh()) {
        attemptSessionRefresh();
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [isAuthenticated, expiresAt]);

  return ready;
};
