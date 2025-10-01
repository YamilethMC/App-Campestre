import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerNavigationProp
} from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { COLORS } from '../shared/theme/colors';

// Screens
import EventsScreen from '../features/events/containers/EventsContainer';
import HomeScreen from '../features/home';
import MenusScreen from '../features/menus/containers/index';
import ProfileScreen from '../features/profile/containers/ProfileContainer';
import SettingsScreen from '../features/settings';
import SurveysScreen from '../features/surveys/containers/SurveysContainer';

// Types

// Crear navegadores
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// Componente para el contenido del drawer
const CustomDrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  const { t } = useTranslation();
  
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label={t('profile.title')}
        onPress={() => {
          props.navigation.navigate('ProfileDrawer');
          props.navigation.closeDrawer();
        }}
        icon={({ focused, size }) => (
          <Ionicons
            name={focused ? 'person' : 'person-outline'}
            size={size}
            color={focused ? COLORS.primary : COLORS.gray600}
          />
        )}
      />
      <DrawerItem
        label={t('settings.title')}
        onPress={() => {
          props.navigation.navigate('SettingsDrawer');
          props.navigation.closeDrawer();
        }}
        icon={({ focused, size }) => (
          <Ionicons
            name={focused ? 'settings' : 'settings-outline'}
            size={size}
            color={focused ? COLORS.primary : COLORS.gray600}
          />
        )}
      />
    </DrawerContentScrollView>
  );
};

// Pantalla de inicio para el stack de "Más"
type MoreHomeScreenProps = {
  navigation: DrawerNavigationProp<{}>;
};

const MoreHomeScreen: React.FC<MoreHomeScreenProps> = ({ navigation }) => {
  // Abre automáticamente el drawer
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      navigation.openDrawer();
    });
    return unsubscribe;
  }, [navigation]);

  return null; // No mostramos contenido ya que se abre el drawer automáticamente
};

// Stack para la pantalla de "Más"
const MoreStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MoreHome" component={MoreHomeScreen} />
      <Stack.Screen name="ProfileStack" component={ProfileScreen} />
      <Stack.Screen name="SettingsStack" component={SettingsScreen} />
    </Stack.Navigator>
  );
};

// Stack para el perfil
const ProfileStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

// Stack para configuración
const SettingsStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
};
// Navegador de pestañas principal
const MainTabs: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray500,
        tabBarStyle: {
          height: 70,
          paddingBottom: 8,
          paddingTop: 8,
          backgroundColor: COLORS.white,
          borderTopWidth: 0,
          elevation: 10,
          shadowColor: COLORS.gray800,
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 4,
          fontFamily: 'System',
        },
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          title: t('home.title'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          )
        }} 
      />
      <Tab.Screen 
        name="Events" 
        component={EventsScreen} 
        options={{
          title: t('events.title'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={size} color={color} />
          )
        }} 
      />
      <Tab.Screen 
        name="Restaurant" 
        component={MenusScreen} 
        options={{
          title: t('restaurant.title'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="restaurant-outline" size={size} color={color} />
          )
        }} 
      />
      <Tab.Screen 
        name="Surveys" 
        component={SurveysScreen} 
        options={{
          title: t('surveys.title'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubble-ellipses-outline" size={size} color={color} />
          )
        }} 
      />
      <Tab.Screen 
        name="More" 
        component={MoreStack} 
        options={{
          title: t('more.title'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ellipsis-horizontal-outline" size={size} color={color} />
          )
        }} 
      />
    </Tab.Navigator>
  );
};

// Navegador principal con Drawer
const ProtectedTabNavigator: React.FC = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: COLORS.primary,
        drawerInactiveTintColor: COLORS.gray600,
        drawerLabelStyle: {
          marginLeft: -20,
          fontSize: 16,
        },
        drawerType: 'front',
        overlayColor: 'transparent',
        drawerStyle: {
          width: '70%',
          backgroundColor: COLORS.white,
        },
      }}
    >
      <Drawer.Screen 
        name="MainTabs" 
        component={MainTabs}
        options={{
          drawerItemStyle: { display: 'none' },
        }}
      />
      <Drawer.Screen 
        name="ProfileDrawer" 
        component={ProfileStack}
        options={{
          title: 'Profile',
          drawerItemStyle: { display: 'none' },
        }}
      />
      <Drawer.Screen 
        name="SettingsDrawer" 
        component={SettingsStack}
        options={{
          title: 'Settings',
          drawerItemStyle: { display: 'none' },
        }}
      />
    </Drawer.Navigator>
  );
};

export default ProtectedTabNavigator;