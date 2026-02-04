import { Ionicons } from '@expo/vector-icons';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import useLogout from '../../hooks/useLogout';
import { COLORS } from '../../shared/theme/colors';

// Importar tipos de navegación
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import { MoreStackParamList, RootStackParamList } from '../types';

// Tipo para la navegación del stack de More
type MoreOptionsScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<MoreStackParamList, 'MoreOptions'>,
  BottomTabNavigationProp<RootStackParamList>
>;

const MoreOptionsScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<MoreOptionsScreenNavigationProp>();
  const { handleLogout } = useLogout();

  const menuItems = [
    { 
      title: t('profile.title'), 
      icon: 'person' as const,
      onPress: () => navigation.navigate('Profile')
    },
    // { 
    //   title: t('surveys.title'), 
    //   icon: 'chatbubble-ellipses-outline' as const,
    //   onPress: () => navigation.navigate('Surveys')
    // },
    // { 
    //   title: t('menus.title'), 
    //   icon: 'cafe-outline' as const,
    //   onPress: () => navigation.navigate('Menu')
    // },
    /*{ 
      title: t('reservations.myReservations'), 
      icon: 'calendar-outline' as const,
      onPress: () => navigation.navigate('MyReservations')
    },*/
    { 
      title: t('accountStatements.title'), 
      icon: 'document-text' as const,
      onPress: () => navigation.navigate('AccountStatements')
    },
    { 
      title: t('files.title'), 
      icon: 'newspaper' as const,
      onPress: () => navigation.navigate('Files')
    },
    /*{ 
      title: t('settings.title'), 
      icon: 'settings-outline' as const,
      onPress: () => navigation.navigate('Settings')
    },*/
    { 
      title: t('help.title'), 
      icon: 'help-circle' as const,
      onPress: () => navigation.navigate('HelpCenter')
    },
    { 
      title: t('auth.logout.title'), 
      icon: 'log-out-outline' as const,
      onPress: () => {
        Alert.alert(
          t('auth.logout.title'),
          t('auth.logout.confirm'),
          [
            {
              text: t('common.cancel'),
              style: 'cancel',
            },
            {
              text: t('common.logout'),
              onPress: handleLogout,
              style: 'destructive',
            },
          ],
          { cancelable: true }
        );
      }
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.menuItem,
              {
                borderBottomWidth: index < menuItems.length - 1 ? 1 : 0,
                borderBottomColor: COLORS.gray100, // Almost invisible line
              }
            ]}
            onPress={item.onPress}
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons
              name={item.icon}
              size={24}
              color={item.title === t('auth.logout.title') ? COLORS.error : COLORS.primary}
              style={styles.icon}
            />
            <Text
              style={[
                styles.menuText,
                { color: item.title === t('auth.logout.title') ? COLORS.error : COLORS.gray900 }
              ]}
            >
              {item.title}
            </Text>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={COLORS.gray200} // Lighter color for chevron
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Version info - appears separately after the options */}
      <View style={styles.versionContainer}>
        <Text style={styles.versionText}>VERSIÓN 1.5.0 (2026)</Text>
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
    paddingHorizontal: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray100,
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
  versionContainer: {
    marginTop: 32,
    alignItems: 'center',
    paddingVertical: 16,
  },
  versionText: {
    fontSize: 14,
    color: COLORS.gray400,
    textTransform: 'uppercase',
  },
});

export default MoreOptionsScreen;