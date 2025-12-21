import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { COLORS } from '../../../../shared/theme/colors';
import { FileHeaderProps } from '../../interfaces';
import styles from './Style';

const FileHeader: React.FC<FileHeaderProps> = ({
  title,
  description,
  icon = 'newspaper-outline',
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon as any} size={40} color={COLORS.primary} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
};

export default FileHeader;
