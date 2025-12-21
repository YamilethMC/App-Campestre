// src/shared/components/Alert/Alert.tsx
import React from 'react';
import { Text, View } from 'react-native';

// Colors
import { COLORS } from '../theme/colors';

// Styles
import styles from './Style';

// Interfaces
import AlertProps from './interfaces';

export const Alert: React.FC<AlertProps> = ({ message, type = 'error', visible }) => {
  if (!visible || !message) return null;

  const bgColor = {
    error: COLORS.error,
    success: COLORS.success,
    warning: COLORS.warning,
  }[type];

  return (
    <View style={[styles.alert, { borderColor: bgColor }]}>
      <Text style={[styles.alertText]}>{message}</Text>
    </View>
  );
};
