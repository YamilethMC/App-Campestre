import React, { useState } from 'react';
import { SafeAreaView, Text } from 'react-native';

// Styles
import styles from './Style';

// Components
import { LoginForm } from '../components/Login/LoginForm';
import Logo from '../components/Logo/Logo';

// Hooks
import { useLogin } from '../hooks/useLogin';
import useMessages from '../hooks/useMessages';

const LoginContainer = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { handleLogin, isLoading } = useLogin();
  const { messages } = useMessages();

  return (
    <SafeAreaView style={styles.container}>
      <Logo />
      <Text style={styles.title}>{messages.CONTAINER.TITLE}</Text>
      <LoginForm
        email={email}
        password={password}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onSubmit={handleLogin}
        isLoading={isLoading}
      />
    </SafeAreaView>
  );
};
export default LoginContainer;