// Se corre con: node --test src/shared/utils/refreshOutcome.test.mjs
// En JavaScript para no tocar tsconfig: la función que prueba sí la revisa tsc.
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { readRefreshResponse } from './refreshOutcome.ts';

const tokens = {
  success: true,
  data: { access_token: 'pase', refresh_token: 'tarjeta', expires_in: 900, user: {} },
};

describe('CA-2 · el servidor rechaza la tarjeta: se pide la contraseña', () => {
  it('un 401 es rechazo', () => {
    assert.deepEqual(readRefreshResponse(401, null), { outcome: 'rejected' });
  });
});

describe('CA-3 · una falla de señal, de tiempo o del servidor no saca al socio', () => {
  for (const status of [500, 502, 503, 504]) {
    it(`un ${status} es falla, no rechazo`, () => {
      assert.deepEqual(readRefreshResponse(status, null), { outcome: 'failed' });
    });
  }

  for (const status of [400, 403, 404, 408, 429]) {
    it(`cualquier otra respuesta (${status}) es falla, no rechazo`, () => {
      assert.deepEqual(readRefreshResponse(status, null), { outcome: 'failed' });
    });
  }

  it('sin respuesta (red o tiempo agotado, status 0) es falla', () => {
    assert.deepEqual(readRefreshResponse(0, null), { outcome: 'failed' });
  });

  it('un 200 sin tokens es falla: no se borra la sesión por una respuesta rara', () => {
    assert.deepEqual(readRefreshResponse(200, null), { outcome: 'failed' });
    assert.deepEqual(readRefreshResponse(200, { success: true, data: {} }), { outcome: 'failed' });
    assert.deepEqual(
      readRefreshResponse(200, { success: true, data: { access_token: 'pase' } }),
      { outcome: 'failed' },
    );
    assert.deepEqual(
      readRefreshResponse(200, { success: true, data: { refresh_token: 'tarjeta' } }),
      { outcome: 'failed' },
    );
  });
});

describe('CA-10 · la respuesta de la API de hoy renueva', () => {
  it('un 200 con { success, data: { access_token, refresh_token, expires_in } } renueva', () => {
    assert.deepEqual(readRefreshResponse(200, tokens), {
      outcome: 'renewed',
      accessToken: 'pase',
      refreshToken: 'tarjeta',
      expiresIn: 900,
    });
  });

  it('sin expires_in también renueva, y quien llama pone su valor por omisión', () => {
    const body = { success: true, data: { access_token: 'pase', refresh_token: 'tarjeta' } };
    assert.deepEqual(readRefreshResponse(200, body), {
      outcome: 'renewed',
      accessToken: 'pase',
      refreshToken: 'tarjeta',
      expiresIn: undefined,
    });
  });
});
