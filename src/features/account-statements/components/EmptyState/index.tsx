import React from 'react';
import { Text, View } from 'react-native';
import { COLORS } from '../../../../shared/theme/colors';
import styles from './Style';

interface EmptyStateProps {
  message?: string;
  showIcon?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
  message = 'No hay estados de cuenta registrados', 
  showIcon = true 
}) => {
  return (
    <View style={styles.container}>
      {showIcon && (
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>📋</Text>
        </View>
      )}
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

export default EmptyState;