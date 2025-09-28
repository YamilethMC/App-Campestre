import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

//Translation

//Styles
import styles from './Style';

//Messages
import useMessages from '../../hooks/useMessages';

type LoginFormProps = {
  email: string;
  password: string;
  onEmailChange: (text: string) => void;
  onPasswordChange: (text: string) => void;
  onSubmit: (email: string, password: string) => void;
  isLoading: boolean;
};

export const LoginForm: React.FC<LoginFormProps> = ({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  isLoading,
}) => {
  const { messages } = useMessages();

  return (
    <View style={styles.content}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>{messages.LOGIN.EMAIL}</Text>
        <TextInput
          style={styles.input}
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
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={onPasswordChange}
          placeholder={messages.LOGIN.EXAMPLE_PASSWORD}
          placeholderTextColor={styles.inputPlaceholder.color}
          secureTextEntry
        />
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

      <TouchableOpacity style={styles.forgotPasswordButton}>
        <Text style={styles.linkText}>{messages.LOGIN.FORGOT_PASSWORD}</Text>
      </TouchableOpacity>
    </View>
  );
};


