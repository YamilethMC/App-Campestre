import { NavigationProp, NavigatorScreenParams, RouteProp } from 'expo-router/react-navigation';

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
  // La pestaña Reserva contiene su propio stack, así que desde fuera se puede
  // navegar a una de sus pantallas (p. ej. Más > Clases).
  Reservation: NavigatorScreenParams<ReservationStackParamList>;
  Surveys: undefined;
  AccountStatements: undefined;
  More: undefined;
};

// Tipos para el stack de Reserva (incluye el flujo de Clases)
export type ReservationStackParamList = {
  ReservationScreen: undefined;
  ClassesDisciplines: undefined;
  ClassesProfessionals: { disciplineId: number; disciplineName: string };
  ClassesSchedule: { professionalId: number };
  ClassesConfirm: {
    professionalId: number;
    disciplineName: string;
    professionalName: string;
    date: string;
    startTime: string;
    partySize: number;
    price: number;
  };
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
  ChangePassword: {
    userId: number;
    isFirstLogin?: boolean;
  };
};

export type RootStackNavigationProp = NavigationProp<RootStackParamList>;
export type RootStackRouteProp<T extends keyof RootStackParamList> = RouteProp<RootStackParamList, T>;
