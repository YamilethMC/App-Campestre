// navigation/MainTabs.tsx
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { useTranslation } from 'react-i18next';
import EventsScreen from '../../features/events/containers/EventsContainer';
import HomeScreen from '../../features/home';
import { default as MenusScreen, default as SurveysScreen } from '../../features/menus/containers';
import MoreOptionsScreen from '../../features/moreOptions';
import { COLORS } from '../../shared/theme/colors';

const Tab = createBottomTabNavigator();

const MainTabs = () => {
  const { t } = useTranslation();
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray500,
        tabBarStyle: {
          height: 60,
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
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          title: t('home.title'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }} 
      />
      <Tab.Screen 
        name="Events" 
        component={EventsScreen} 
        options={{
          title: t('events.title'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={size} color={color} />
          ),
        }} 
      />
      <Tab.Screen 
        name="Menus" 
        component={MenusScreen} 
        options={{
          title: t('menus.title'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="restaurant-outline" size={size} color={color} />
          ),
        }} 
      />
      <Tab.Screen 
        name="Surveys" 
        component={SurveysScreen} 
        options={{
          title: t('surveys.title'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubble-ellipses-outline" size={size} color={color} />
          ),
        }} 
      />
      <Tab.Screen 
        name="More" 
        component={MoreOptionsScreen}
        options={{
          title: t('more.title'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ellipsis-horizontal" size={size} color={color} />
          ),
        }} 
      />
    </Tab.Navigator>
  );
};

export default MainTabs;