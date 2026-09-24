import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useEffect, useRef } from 'react';
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';

import useLogout from '../../../../hooks/useLogout';
import { COLORS } from '../../../../shared/theme/colors';
import { useBiometrics } from '../../hooks/useBiometrics';
import { useAuthStore } from '../../store/useAuthStore';
import styles from './Style';

/**
 * Pantalla que aparece al abrir la app cuando el socio activó Face ID o huella.
 *
 * La sesión sigue viva por debajo: esto no vuelve a autenticar contra el
 * servidor, sólo confirma que quien tiene el teléfono es el dueño antes de
 * enseñar su QR de acceso y sus estados de cuenta.
 *
 * Siempre hay salida: "Usar contraseña" cierra la sesión y lleva al login, para
 * que nadie quede atrapado si la biometría deja de funcionar.
 */
export const BiometricLock: React.FC = () => {
  const { authenticate, label } = useBiometrics();
  const setBiometricsUnlocked = useAuthStore((state) => state.setBiometricsUnlocked);
  const { handleLogout } = useLogout();

  // Para no disparar dos veces la solicitud al montar.
  const prompted = useRef(false);

  const unlock = useCallback(async () => {
    const confirmed = await authenticate(`Confirma tu identidad para entrar`);

    if (confirmed) setBiometricsUnlocked(true);
  }, [authenticate, setBiometricsUnlocked]);

  useEffect(() => {
    if (prompted.current) return;
    prompted.current = true;
    unlock();
  }, [unlock]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('../../../../../assets/images/sello-cct.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>Club Campestre</Text>
        <Text style={styles.subtitle}>Confirma tu identidad para continuar</Text>

        <TouchableOpacity style={styles.primaryButton} onPress={unlock} activeOpacity={0.8}>
          <Ionicons name="finger-print" size={22} color={COLORS.white} />
          <Text style={styles.primaryButtonText}>Entrar con {label}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={handleLogout} activeOpacity={0.7}>
          <Text style={styles.secondaryButtonText}>Usar contraseña</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
