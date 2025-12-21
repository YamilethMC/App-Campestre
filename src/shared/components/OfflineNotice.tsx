import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { COLORS } from '../theme/colors';

export const OfflineNotice: React.FC = () => {
  const [isOffline, setIsOffline] = useState(false);
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    // Check online status using native API
    const checkConnection = () => {
      setIsOffline(!navigator.onLine);
    };

    window.addEventListener('online', checkConnection);
    window.addEventListener('offline', checkConnection);

    checkConnection();

    return () => {
      window.removeEventListener('online', checkConnection);
      window.removeEventListener('offline', checkConnection);
    };
  }, []);

  useEffect(() => {
    if (isOffline) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isOffline]);

  if (!isOffline) {
    return null;
  }

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.text}>Sin conexión a internet</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.error,
    paddingVertical: 8,
    paddingHorizontal: 16,
    zIndex: 9999,
  },
  text: {
    color: COLORS.white,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
  },
});
