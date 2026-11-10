/**
 * Qué pasó al renovar la sesión con `POST /auth/refresh`.
 *
 * - `renewed`: llegaron un pase y una tarjeta nuevos.
 * - `rejected`: el servidor dijo que la tarjeta ya no sirve (401): pasó el año,
 *   se cerró la sesión o la cuenta se desactivó. Es el único resultado que saca
 *   al socio.
 * - `failed`: no se sabe si la tarjeta sirve. Sin señal, tiempo agotado, el
 *   servidor caído (5xx), cualquier otra respuesta o una respuesta sin tokens.
 *   La sesión se queda como está y se reintenta.
 *
 * Vive aparte y sin React Native para poder probarse con `node --test`.
 */
export type RefreshOutcome = 'renewed' | 'rejected' | 'failed';

export type RefreshResult =
  | { outcome: 'renewed'; accessToken: string; refreshToken: string; expiresIn?: number }
  | { outcome: 'rejected' }
  | { outcome: 'failed' };

/**
 * Lee la respuesta de `/auth/refresh`.
 *
 * `body` es el JSON ya leído, y sólo hace falta cuando la respuesta fue 2xx: la
 * API lo envuelve en `{ success, data }` y los tokens viajan en `data`.
 */
export const readRefreshResponse = (status: number, body: unknown): RefreshResult => {
  if (status === 401) return { outcome: 'rejected' };
  if (status < 200 || status >= 300) return { outcome: 'failed' };

  const data = (body as { data?: Record<string, unknown> } | null)?.data;
  const accessToken = data?.access_token;
  const refreshToken = data?.refresh_token;
  const expiresIn = data?.expires_in;

  if (typeof accessToken !== 'string' || !accessToken) return { outcome: 'failed' };
  if (typeof refreshToken !== 'string' || !refreshToken) return { outcome: 'failed' };

  return {
    outcome: 'renewed',
    accessToken,
    refreshToken,
    expiresIn: typeof expiresIn === 'number' ? expiresIn : undefined,
  };
};
