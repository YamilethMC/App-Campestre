import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import Button from '../../../../shared/components/Button';
import { COLORS } from '../../../../shared/theme/colors';
import styles from './Style';

interface MenuHeaderProps {
  menuCount: number;
  onDownloadPress: () => void;
}

const MenuHeader: React.FC<MenuHeaderProps> = ({ menuCount, onDownloadPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContent}>
        <View style={styles.iconContainer}>
          <Ionicons name="restaurant-outline" size={40} color={COLORS.primary} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Menús</Text>
          <Text style={styles.description}>Restaurante del Club</Text>
          <Text style={styles.menuCount}>{menuCount} menús</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          text="Descargar Todo"
          onPress={onDownloadPress}
          variant="outline"
          style={styles.downloadButton}
          titleStyle={styles.downloadButtonText}
        />
      </View>
    </View>
  );
};

export default MenuHeader;