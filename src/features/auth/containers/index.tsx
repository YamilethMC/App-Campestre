import React, { useEffect, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Text, View } from 'react-native';

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
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const onShow = () => setKeyboardVisible(true);
    const onHide = () => setKeyboardVisible(false);

    const showSub = Keyboard.addListener('keyboardDidShow', onShow);
    const hideSub = Keyboard.addListener('keyboardDidHide', onHide);

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

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
          {!keyboardVisible && <Logo />}
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
