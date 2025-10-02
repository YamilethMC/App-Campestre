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
  showNotifications = true,
  onBack
}) => {

  const { handleNotifications } = useHeader();

  return (
    <View style={styles.container}>
      {onBack ? (
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.white} />
        </TouchableOpacity>
      ) : null}
      <View style={[styles.titleContainer, onBack && { marginLeft: 40 }]}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
      </View>
      {showNotifications && (
        <TouchableOpacity onPress={handleNotifications} style={styles.iconContainer}>
          <Ionicons name="notifications-outline" size={24} color={COLORS.white} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default MainHeader;
