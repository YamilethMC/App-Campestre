import * as LocalAuthentication from 'expo-local-authentication';
import { useCallback, useEffect, useState } from 'react';

import { useAuthStore } from '../store/useAuthStore';

/**
 * Entrada con Face ID o huella.
 *
 * No sustituye a la contraseña: el socio entra una vez con sus credenciales y la
 * sesión se mantiene viva con el refresh token. La biometría sirve para lo otro
 * que pidió el Club — que abrir la app sea inmediato y, de paso, que si alguien
 * toma el teléfono desbloqueado no vea el QR de acceso ni los estados de cuenta.
 *
 * Nunca se guarda la contraseña en el dispositivo. Lo único que hay guardado es
 * el refresh token, igual que antes de esta función.
 */
export const useBiometrics = () => {
  const { biometricsEnabled, setBiometricsEnabled } = useAuthStore();

  const [available, setAvailable] = useState<boolean>(false);
  const [label, setLabel] = useState<string>('biometría');
  const [checking, setChecking] = useState<boolean>(true);

  useEffect(() => {
    let active = true;

    const check = async () => {
      try {
        // Dos cosas distintas: que el aparato tenga el sensor, y que el dueño
        // lo haya configurado. Sin lo segundo, pedir biometría deja al socio
        // atrapado fuera de su propia app.
        const [hasHardware, isEnrolled, types] = await Promise.all([
          LocalAuthentication.hasHardwareAsync(),
          LocalAuthentication.isEnrolledAsync(),
          LocalAuthentication.supportedAuthenticationTypesAsync(),
        ]);

        if (!active) return;

        setAvailable(hasHardware && isEnrolled);

        if (types.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)) {
          setLabel('Face ID');
        } else if (types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) {
          setLabel('huella');
        }
      } catch {
        if (active) setAvailable(false);
      } finally {
        if (active) setChecking(false);
      }
    };

    check();

    return () => {
      active = false;
    };
  }, []);

  /** Pide la confirmación biométrica. Devuelve true si el socio se identificó. */
  const authenticate = useCallback(async (reason?: string): Promise<boolean> => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: reason ?? 'Confirma tu identidad para entrar',
        cancelLabel: 'Usar contraseña',
        // Sin esto, Android ofrece el PIN del teléfono como alternativa y la
        // pantalla deja de significar lo que dice.
        disableDeviceFallback: false,
      });

      return result.success;
    } catch {
      return false;
    }
  }, []);

  /**
   * Enciende la entrada biométrica, pidiéndola una vez para comprobar que
   * funciona en ese aparato antes de dejarla activada.
   */
  const enable = useCallback(async (): Promise<boolean> => {
    const confirmed = await authenticate('Confirma tu identidad para activar el acceso rápido');

    if (confirmed) setBiometricsEnabled(true);

    return confirmed;
  }, [authenticate, setBiometricsEnabled]);

  const disable = useCallback(() => setBiometricsEnabled(false), [setBiometricsEnabled]);

  return {
    /** El aparato tiene sensor Y el dueño lo configuró. */
    available,
    /** "Face ID" o "huella", según lo que soporte el aparato. */
    label,
    checking,
    enabled: biometricsEnabled,
    authenticate,
    enable,
    disable,
  };
};
