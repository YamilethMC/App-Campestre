import { NavigationProp, RouteProp } from '@react-navigation/native';

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
