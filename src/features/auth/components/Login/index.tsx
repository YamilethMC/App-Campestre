import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { COLORS } from '../../../../shared/theme/colors';
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
      memberCode: '',
      password: '',
    },
    mode: 'onBlur',
  });

  const handleFormSubmit = (data: LoginFormData) => {
    onSubmit(data.memberCode, data.password);
  };

  return (
    <View style={styles.content}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>{messages.LOGIN.NUMBER_ACTION}</Text>
        <Controller
          control={control}
          name="memberCode"
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInput
                style={errors.memberCode ? styles.inputError : styles.input}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder={messages.LOGIN.EXAMPLE_NUMBER_ACTION}
                placeholderTextColor={styles.inputPlaceholder.color}
                keyboardType="numeric"
                autoCapitalize="none"
                editable={!isLoading}
              />
              {errors.memberCode && (
                <Text style={styles.errorText}>{errors.memberCode.message}</Text>
              )}
            </>
          )}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>{messages.LOGIN.PASSWORD}</Text>
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
                  <Ionicons
                    name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                    size={20}
                    color={COLORS.gray500}
                  />
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


