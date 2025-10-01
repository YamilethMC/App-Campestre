import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import LoginScreen from '../../../features/auth';

const AuthScreen = () => {
  const { t } = useTranslation();

const Stack = createNativeStackNavigator();

return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthScreen;
