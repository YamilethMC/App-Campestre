import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { COLORS } from '../../../../shared/theme/colors';
import useMessages from '../../hooks/useMessages';
import { AccountStatementHeaderProps } from '../../interfaces';
import styles from './Style';

const AccountStatementHeader: React.FC<AccountStatementHeaderProps> = ({ title, description }) => {
  const { messages } = useMessages();
  title = messages.TITLE;
  description = messages.DESCRIPTION;
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="document-text-outline" size={40} color={COLORS.primary} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
};

export default AccountStatementHeader;
