import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import LoginScreen from '../../features/auth';
import { ChangePasswordScreen } from '../../features/auth/components/ChangePassword';
import { ForgotPasswordScreen } from '../../features/auth/components/ForgotPassword';
import { AuthStackParamList } from './types';

const AuthScreen = () => {
  const { t } = useTranslation();

const Stack = createNativeStackNavigator<AuthStackParamList>();

return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="ChangePassword" 
        component={ChangePasswordScreen} 
        options={{ 
          headerShown: true,
          title: 'Cambiar Contraseña',
          headerBackVisible: false
        }}
      />
      <Stack.Screen 
        name="ForgotPassword" 
        component={ForgotPasswordScreen} 
        options={{ 
          headerShown: false, //true,
          title: 'Recuperar Contraseña'
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthScreen;
