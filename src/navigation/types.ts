import { NavigationProp, RouteProp } from '@react-navigation/native';

// Tipos para el Stack Navigator principal
export type RootStackParamList = {
  Auth: undefined;
  MainTabs: undefined;
  // Pantallas dentro del stack de More
  More: undefined;
  Profile: undefined;
  Settings: undefined;
  HelpCenter: undefined;
  Files: undefined;
  MyReservations: undefined;
};

// Tipos para el Tab Navigator
export type MainTabsParamList = {
  Home: undefined;
  Events: undefined;
  Restaurant: undefined;
  Surveys: undefined;
  AccountStatements: undefined;
  More: undefined;
};

// Tipos para el stack de More
export type MoreStackParamList = {
  MoreOptions: undefined;
  Profile: undefined;
  Settings: undefined;
  HelpCenter: undefined;
  Reservations: undefined;
  Menu: undefined;
  Surveys: undefined;
  AccountStatements: undefined;
  Notifications: undefined;
  Files: undefined;
  MyReservations: undefined;
};

export type RootStackNavigationProp = NavigationProp<RootStackParamList>;
export type RootStackRouteProp<T extends keyof RootStackParamList> = RouteProp<RootStackParamList, T>;
