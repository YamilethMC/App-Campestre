import { NavigationProp, RouteProp } from 'expo-router/react-navigation';

// Tipos para el Stack de Autenticación
export type AuthStackParamList = {
  Login: undefined;
  ChangePassword: {
    userId: number;
    isFirstLogin?: boolean;
  };
  ForgotPassword: undefined;
};

export type AuthStackNavigationProp = NavigationProp<AuthStackParamList>;
export type AuthStackRouteProp<T extends keyof AuthStackParamList> = RouteProp<AuthStackParamList, T>;
