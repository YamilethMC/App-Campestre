import { createNativeStackNavigator, NativeStackHeaderProps } from '@react-navigation/native-stack';
import React from 'react';
import { useStore } from '../store';

// Import screens
import MoreOptionsScreen from '../features/moreOptions';
import ProfileScreen from '../features/profile/containers';
import MainTabs from './MainTabs';
import AuthScreen from './stacksScreens/authScreen';

// Import components
import MainHeader from '../shared/components/MainHeader/Container';

// Types
import { RootStackParamList } from './types';

// Create stack navigator
const Stack = createNativeStackNavigator<RootStackParamList>();

// Main navigator
const MainNavigator = (): React.JSX.Element => {
  const { isAuthenticated } = useStore();
  
  // Configuración común para el header
  const screenOptions = {
    header: (props: NativeStackHeaderProps) => {
      return (
        <MainHeader 
          title={props.options.title || props.route.name}
          onBack={props.navigation.canGoBack() ? props.navigation.goBack : undefined}
          showNotifications={props.route.name !== 'Auth'}
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
  };

  return (
    <Stack.Navigator
      initialRouteName={isAuthenticated ? 'MainTabs' : 'Auth'}
      screenOptions={screenOptions}
    >
      {!isAuthenticated ? (
        <Stack.Screen 
          name="Auth" 
          component={AuthScreen} 
          options={{ 
            headerShown: false,
            title: 'Iniciar Sesión'
          }}
        />
      ) : (
        <>
          <Stack.Screen 
            name="MainTabs" 
            component={MainTabs} 
            options={{ 
              title: 'Main',
              headerShown: true
            }}
          />
          <Stack.Screen 
            name="Profile" 
            component={ProfileScreen}
            options={{ 
              title: 'Perfil',
              headerShown: true
            }}
          />
          <Stack.Screen 
            name="MoreOptions" 
            component={MoreOptionsScreen} 
            options={{ 
              title: 'Más opciones',
              headerShown: true
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default MainNavigator;