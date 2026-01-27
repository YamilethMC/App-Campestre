import { Ionicons } from '@expo/vector-icons';

import React from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

//Hooks
import { useHeader } from '../Hooks/useHeader';
  
//Styles
import styles from './Style';

//Interfaces
import { MainHeaderProps } from '../Interfaces';

// Theme
import { COLORS } from '../../../../shared/theme/colors';

const MainHeader: React.FC<MainHeaderProps> = ({
  title,
  subtitle,
  showNotifications = true,
  onBack
}) => {

  const { handleNotifications } = useHeader();

  return (
    <View style={styles.container}>
      <View style={styles.headerContent}>
        <View style={styles.leftContainer}>
          {onBack && (
            <TouchableOpacity onPress={onBack} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color={COLORS.white} />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          {subtitle && (
            <Text style={styles.subtitle} numberOfLines={1}>
              {subtitle}
            </Text>
          )}
        </View>
        <View style={styles.rightContainer}>
          {showNotifications && (
            <TouchableOpacity onPress={handleNotifications} style={styles.iconContainer}>
              <Ionicons name="notifications" size={24} color={COLORS.white} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default MainHeader;
