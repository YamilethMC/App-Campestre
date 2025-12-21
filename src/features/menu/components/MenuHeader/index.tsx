import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import Button from '../../../../shared/components/Button';
import { COLORS } from '../../../../shared/theme/colors';
import useMessages from '../../hooks/useMessages';
import { MenuHeaderProps } from '../../interfaces/menuInterfaces';
import styles from './Style';

const MenuHeader: React.FC<MenuHeaderProps> = ({ menuCount, onDownloadPress }) => {
  const { messages } = useMessages();
  return (
    <View style={styles.container}>
      <View style={styles.headerContent}>
        <View style={styles.iconContainer}>
          <Ionicons name="restaurant-outline" size={40} color={COLORS.primary} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{messages.TITLE}</Text>
          <Text style={styles.description}>{messages.MENUHEADER.RESTAURANTCLUB}</Text>
          <Text style={styles.menuCount}>
            {menuCount}{' '}
            {menuCount === 1 ? messages.MENUHEADER.MENU : messages.MENUHEADER.MENU + 's'}
          </Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          text={messages.MENUHEADER.ALLDOWNLOAD}
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
