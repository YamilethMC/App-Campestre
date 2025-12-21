import React from 'react';
import { Text, View } from 'react-native';
import useMessages from '../../hooks/useMessages';
import styles from './Style';

interface EmptyStateProps {
  message?: string;
  showIcon?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({ message, showIcon = true }) => {
  const { messages } = useMessages();
  message = messages.EMPTY_STATE;
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
