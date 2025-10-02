import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { COLORS } from '../../shared/theme/colors';

type RootStackParamList = {
  Profile: undefined;
  Settings: undefined;
  Help: undefined;
  Auth: undefined;
  [key: string]: any;
};

const MoreOptionsScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const menuItems = [
    { 
      title: t('profile.title'), 
      icon: 'person-outline' as const,
      onPress: () => navigation.navigate('Profile')
    },
    { 
      title: t('settings.title'), 
      icon: 'settings-outline' as const,
      onPress: () => navigation.navigate('Settings')
    },
    { 
      title: t('help.title'), 
      icon: 'help-circle-outline' as const,
      onPress: () => navigation.navigate('Help')
    },
    { 
      title: t('auth.logout'), 
      icon: 'log-out-outline' as const,
      onPress: () => {
        // Aquí iría la lógica para cerrar sesión
        navigation.navigate('Auth');
      }
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={item.onPress}
          >
            <Ionicons 
              name={item.icon} 
              size={24} 
              color={COLORS.primary} 
              style={styles.icon} 
            />
            <Text style={styles.menuText}>{item.title}</Text>
            <Ionicons 
              name="chevron-forward" 
              size={20} 
              color={COLORS.gray400} 
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray50,
    padding: 16,
  },
  menuContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  icon: {
    marginRight: 8,
    width: 24,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: COLORS.gray900,
    fontFamily: 'System',
  },
});

export default MoreOptionsScreen;