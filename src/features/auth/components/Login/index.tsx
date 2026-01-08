import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from 'react-native';

<<<<<<< HEAD
//Alert

//Styles
import styles from './Style';

//Messages
=======
import { COLORS } from '../../../../shared/theme/colors';
>>>>>>> d251b39a25dc3ac690b806c8c15ba4a0f6985b99
import useMessages from '../../hooks/useMessages';
import { LoginFormProps } from '../../interfaces';
import { LoginFormData, loginSchema } from '../../schemas/loginSchema';
import styles from './Style';

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

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
  });

  const handleFormSubmit = (data: LoginFormData) => {
    onSubmit(data.email, data.password);
  };

  return (
    <View style={styles.content}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>{messages.LOGIN.EMAIL}</Text>
<<<<<<< HEAD
        <TextInput
          style={emailError && email !== '' ? styles.inputError : styles.input}
          value={email}
          onChangeText={onEmailChange}
          placeholder={messages.LOGIN.EXAMPLE_EMAIL}
          placeholderTextColor={styles.inputPlaceholder.color}
          keyboardType="email-address"
          autoCapitalize="none"
=======
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInput
                style={errors.email ? styles.inputError : styles.input}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder={messages.LOGIN.EXAMPLE_EMAIL}
                placeholderTextColor={styles.inputPlaceholder.color}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!isLoading}
              />
              {errors.email && (
                <Text style={styles.errorText}>{errors.email.message}</Text>
              )}
            </>
          )}
>>>>>>> d251b39a25dc3ac690b806c8c15ba4a0f6985b99
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>{messages.LOGIN.PASSWORD}</Text>
<<<<<<< HEAD
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
=======
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[
                    styles.passwordInput,
                    errors.password && styles.passwordInputError,
                  ]}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder={messages.LOGIN.EXAMPLE_PASSWORD}
                  placeholderTextColor={styles.inputPlaceholder.color}
                  secureTextEntry={!showPassword}
                  editable={!isLoading}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                  disabled={isLoading}
                >
                  <Text style={styles.eyeIconText}>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
                </TouchableOpacity>
              </View>
              {errors.password && (
                <Text style={styles.errorText}>{errors.password.message}</Text>
              )}
            </>
          )}
        />
      </View>

      <TouchableOpacity 
        style={[styles.loginButton, isLoading && styles.loginButtonDisabled]} 
        onPress={handleSubmit(handleFormSubmit)}
>>>>>>> d251b39a25dc3ac690b806c8c15ba4a0f6985b99
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color={COLORS.white} size="small" />
        ) : (
          <Text style={styles.buttonText}>{messages.LOGIN.BUTTON}</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.forgotPasswordButton}
        onPress={() => {
          // @ts-ignore
          navigation.navigate('ForgotPassword');
        }}
        disabled={isLoading}
      >
        <Text style={styles.linkText}>{messages.LOGIN.FORGOT_PASSWORD}</Text>
      </TouchableOpacity>
    </View>
  );
};
