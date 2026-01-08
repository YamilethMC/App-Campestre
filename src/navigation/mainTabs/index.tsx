import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import AccountStatementsScreen from '../../features/account-statements/containers';
import { ChangePasswordScreen } from '../../features/auth/components/ChangePassword';
import EventsScreen from '../../features/events/containers';
import FilesScreen from '../../features/files';
import HelpCenterScreen from '../../features/help-center';
import HomeScreen from '../../features/home';
<<<<<<< HEAD
import MenuScreen from '../../features/menu/containers';
=======
import MenuScreen from '../../features/menu/containers/';
import MyReservationsScreen from '../../features/my-reservations';
import NotificationsScreen from '../../features/notify';
>>>>>>> d251b39a25dc3ac690b806c8c15ba4a0f6985b99
import ProfileScreen from '../../features/profile/containers';
import ReservationScreen from '../../features/reservations';
import SurveysScreen from '../../features/surveys';
import MainHeader from '../../shared/components/MainHeader/Container';
import { COLORS } from '../../shared/theme/colors';
import MoreOptionsScreen from '../moreOptions';
import UserHeader from './UserHeader';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const headerOptions = (title: string, subtitle?: string, showBackButton: boolean = false) => ({
  header: (props: any) => {
    // Only show back button if explicitly enabled
    const handleBack = showBackButton ? props.navigation.goBack : undefined;

    return (
      <MainHeader
        title={title}
        subtitle={subtitle}
        onBack={handleBack}
        showNotifications={!showBackButton} // Hide notifications when showing back button
      />
    );
  },
  headerShown: true,
  headerStyle: {
    backgroundColor: 'transparent',
    elevation: 0,
    shadowOpacity: 0,
  },
  headerTitleAlign: 'center' as const,
});

// Pantallas que se mostrarán en las pestañas
const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const EventsStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="EventsScreen" component={EventsScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const SurveysStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="SurveysScreen" component={SurveysScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

// const RestaurantStack = () => (
//   <Stack.Navigator>
//     <Stack.Screen
//       name="RestaurantScreen"
//       component={RestauranteScreen}
//       options={{ headerShown: false }}
//     />
//   </Stack.Navigator>
// );

const ReservationStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="ReservationScreen"
      component={ReservationScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const MoreStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="MoreOptionsScreen"
      component={MoreOptionsScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{ headerShown: false }}
      // options={({ navigation }) => ({
      //   ...headerOptions('Perfil', 'Edita tu información personal', true),
      // })}
    />
    <Stack.Screen
      name="MyReservations"
      component={MyReservationsScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Surveys"
      component={SurveysScreen}
      options={{ headerShown: false }}
      // options={({ navigation }) => ({
      //   ...headerOptions('Encuestas', 'Responde nuestras encuestas', true),
      // })}
    />
    <Stack.Screen
      name="AccountStatements"
      component={AccountStatementsScreen}
      options={{ headerShown: false }}
      // options={({ navigation }) => ({
      //   ...headerOptions('Menú', 'Nuestro menú del día', true),
      // })}
    />
    <Stack.Screen
      name="Menu"
      component={MenuScreen}
      options={{ headerShown: false }}
      // options={({ navigation }) => ({
      //   ...headerOptions('Menú', 'Nuestro menú del día', true),
      // })}
    />
    <Stack.Screen
      name="Notifications"
      component={NotificationsScreen}
      options={{ headerShown: false }}
    />

<<<<<<< HEAD
    <Stack.Screen name="HelpCenter" component={HelpCenterScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Files" component={FilesScreen} options={{ headerShown: false }} />
=======
    <Stack.Screen
      name="HelpCenter"
      component={HelpCenterScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Files"
      component={FilesScreen}
      options={{ headerShown: false }}
    />
    {/* <Stack.Screen
      name="Settings"
      component={SettingsScreen}
      options={{ headerShown: false }}
    /> */}
>>>>>>> d251b39a25dc3ac690b806c8c15ba4a0f6985b99
    <Stack.Screen
      name="ChangePassword"
      component={ChangePasswordScreen}
      options={{
        headerShown: true,
        title: 'Cambiar Contraseña',
        headerBackVisible: true,
      }}
    />
  </Stack.Navigator>
);

const MainTabs = () => {
  const { t } = useTranslation();

  const homeHeaderOptions = () => ({
    header: (props: any) => <UserHeader navigation={props.navigation} />,
    headerShown: true,
    headerStyle: {
      backgroundColor: 'transparent',
      elevation: 0,
      shadowOpacity: 0,
    },
  });

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray500,
        tabBarStyle: {
          height: 82,
          paddingBottom: 8,
          paddingTop: 8,
          backgroundColor: COLORS.white,
          borderTopWidth: 0,
          elevation: 10,
          shadowColor: COLORS.gray900,
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          position: 'absolute',
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
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
        component={HomeStack}
        options={{
          title: t('home.title'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
          ...headerOptions(t('home.title'), ''),
        }}
      />
      <Tab.Screen
        name="Events"
        component={EventsStack}
        options={{
          title: t('events.title'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book-outline" size={size} color={color} />
          ),
          ...headerOptions(t('events.title'), 'Descubre y regístrate a nuestras actividades'),
        }}
      />
      <Tab.Screen
        name="Reservation"
        component={ReservationStack}
        options={{
          title: t('reservation.title'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={size} color={color} />
          ),
          ...headerOptions(t('reservation.title'), 'Selecciona tu servicio'),
        }}
      />
      <Tab.Screen
        name="Surveys"
        component={SurveysStack}
        options={{
          title: t('surveys.title'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="document-text-outline" size={size} color={color} />
          ),
          ...headerOptions(
            t('surveys.title') || 'Encuestas',
            t('surveys.subtitle') || 'Tu opinión nos ayuda a mejorar',
          ),
        }}
      />
      {/* <Tab.Screen 
        name="Restaurant" 
        component={RestaurantStack} 
        options={{
          title: t('restaurant.title'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="restaurant-outline" size={size} color={color} />
          ),
          ...headerOptions(t('restaurant.title'), t('restaurant.openingHours')),
        }} 
      /> */}
      <Tab.Screen
        name="More"
        component={MoreStack}
        options={{
          title: t('more.title'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ellipsis-horizontal" size={size} color={color} />
          ),
          ...headerOptions(t('more.title'), ''),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabs;
