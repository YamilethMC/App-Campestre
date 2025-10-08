import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import EventsScreen from '../../features/events/containers';
import HomeScreen from '../../features/home';
import MenuScreen from '../../features/menu/containers/';
import ProfileScreen from '../../features/profile/containers';
import ReservationScreen from '../../features/reservations';
import RestauranteScreen from '../../features/restaurante';
import SurveysScreen from '../../features/surveys';
import MainHeader from '../../shared/components/MainHeader/Container';
import { COLORS } from '../../shared/theme/colors';
import MoreOptionsScreen from '../moreOptions';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Pantallas que se mostrarán en las pestañas
const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="HomeScreen" 
      component={HomeScreen} 
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const EventsStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="EventsScreen" 
      component={EventsScreen} 
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const RestaurantStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="RestaurantScreen" 
      component={RestauranteScreen} 
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

/*const SurveysStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="Surveys" 
      component={SurveysScreen} 
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);*/

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
    />
    {/*<Stack.Screen 
      name="Reservations" 
      component={ReservationScreen} 
      options={{ headerShown: false }}
    />*/}
    <Stack.Screen 
      name="Surveys" 
      component={SurveysScreen} 
      options={{ headerShown: false }}
    />
    <Stack.Screen 
      name="Menu" 
      component={MenuScreen} 
      options={{ headerShown: false }}
    />
    {/* <Stack.Screen 
      name="Settings" 
      component={require('../../features/settings').default} 
      options={{ headerShown: false }}
    />
    <Stack.Screen 
      name="Help" 
      component={require('../../features/help').default} 
      options={{ headerShown: false }}
    /> */}
  </Stack.Navigator>
);

const MainTabs = () => {
  const { t } = useTranslation();
  
  const headerOptions = (title: string, subtitle?: string) => ({
    header: (props: any) => (
      <MainHeader 
        title={title}
        subtitle={subtitle}
        onBack={props.navigation?.canGoBack?.() ? props.navigation.goBack : undefined}
        showNotifications={true}
      />
    ),
    headerShown: true,
    headerStyle: {
      backgroundColor: 'transparent',
      elevation: 0,
      shadowOpacity: 0,
    },
    headerTitleAlign: 'center' as const,
  });

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray500,
        tabBarStyle: {
          height: 60,
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
          bottom: 20,
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
      {/*<Tab.Screen 
        name="Surveys" 
        component={SurveysStack} 
        options={{
          title: t('surveys.title'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubble-ellipses-outline" size={size} color={color} />
          ),
          ...headerOptions(t('surveys.title'), ''),
        }} 
      />*/}

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
        name="Restaurant" 
        component={RestaurantStack} 
        options={{
          title: t('restaurant.title'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="restaurant-outline" size={size} color={color} />
          ),
          ...headerOptions(t('restaurant.title'), t('restaurant.openingHours')),
        }} 
      />
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