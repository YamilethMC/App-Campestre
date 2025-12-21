import React from 'react';
import { Platform, KeyboardAvoidingView, ScrollView, SafeAreaView, View, Text } from 'react-native';

// Styles
import styles from './Style';

// Components
import { LoginForm } from '../components/Login';
import Logo from '../components/Logo';

// Hooks
import { useLogin } from '../hooks/useLogin';
import useMessages from '../hooks/useMessages';

const LoginContainer = () => {
  const { email, password, isLoading, emailError, setEmail, setPassword, handleLogin } = useLogin();
  const { messages } = useMessages();

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Logo />
          <Text style={styles.title}>{messages.CONTAINER.TITLE}</Text>
          <View style={styles.formContainer}>
            <LoginForm
              email={email}
              password={password}
              onEmailChange={setEmail}
              onPasswordChange={setPassword}
              onSubmit={handleLogin}
              isLoading={isLoading}
              emailError={emailError}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginContainer;
