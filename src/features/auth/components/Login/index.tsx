import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

//Alert

//Styles
import styles from './Style';

//Messages
import useMessages from '../../hooks/useMessages';

//Interfaces
import { LoginFormProps } from '../../interfaces';

export const LoginForm: React.FC<LoginFormProps> = ({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  isLoading,
  emailError,
}) => {
  const { messages } = useMessages();
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.content}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>{messages.LOGIN.EMAIL}</Text>
        <TextInput
          style={emailError && email !== '' ? styles.inputError : styles.input}
          value={email}
          onChangeText={onEmailChange}
          placeholder={messages.LOGIN.EXAMPLE_EMAIL}
          placeholderTextColor={styles.inputPlaceholder.color}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>{messages.LOGIN.PASSWORD}</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            value={password}
            onChangeText={onPasswordChange}
            placeholder={messages.LOGIN.EXAMPLE_PASSWORD}
            placeholderTextColor={styles.inputPlaceholder.color}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
            <Text style={styles.eyeIconText}>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => onSubmit(email, password)}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? messages.LOGIN.LOADING : messages.LOGIN.BUTTON}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.forgotPasswordButton}
        onPress={() => {
          // @ts-ignore
          navigation.navigate('ForgotPassword');
        }}
      >
        <Text style={styles.linkText}>{messages.LOGIN.FORGOT_PASSWORD}</Text>
      </TouchableOpacity>
    </View>
  );
};
