import { NavigationProp, RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  Auth: undefined;
  MainTabs: undefined;
  Profile: undefined;
  MoreOptions: undefined;
  // Agrega más rutas según sea necesario
};

export type RootStackNavigationProp = NavigationProp<RootStackParamList>;
export type RootStackRouteProp<T extends keyof RootStackParamList> = RouteProp<RootStackParamList, T>;
