import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Image, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../../../shared/theme/colors';
import { authService } from '../../services/authService';
import styles from './Style';

export const ForgotPasswordScreen: React.FC = () => {
  const navigation = useNavigation();
  const [step, setStep] = useState<'request' | 'verify'>('request');
  const [identifier, setIdentifier] = useState('');
  const [method, setMethod] = useState<'email' | 'sms'>('email');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRequestCode = async () => {
    if (!identifier) {
      Alert.alert('Error', 'Por favor ingresa tu email o teléfono');
      return;
    }

    setLoading(true);

    try {
      const result = await authService.forgotPassword(identifier, method);

      if (result.success) {
        Alert.alert(
          'Código enviado',
          `Hemos enviado un código de 6 dígitos a tu ${method === 'email' ? 'correo electrónico' : 'móvil'}`,
          [
            {
              text: 'OK',
              onPress: () => setStep('verify'),
            },
          ]
        );
      } else {
        Alert.alert('Error', result.error || 'No se pudo enviar el código');
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al solicitar el código');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!code || !newPassword || !confirmPassword) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    if (code.length !== 6) {
      Alert.alert('Error', 'El código debe tener 6 dígitos');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    if (newPassword.length < 8) {
      Alert.alert('Error', 'La contraseña debe tener al menos 8 caracteres');
      return;
    }

    setLoading(true);

    try {
      const result = await authService.resetPassword(identifier, code, newPassword);

      if (result.success) {
        Alert.alert(
          'Éxito',
          'Tu contraseña ha sido actualizada correctamente',
          [
            {
              text: 'OK',
              onPress: () => {
                // @ts-ignore
                navigation.navigate('Login');
              },
            },
          ]
        );
      } else {
        Alert.alert('Error', result.error || 'No se pudo restablecer la contraseña');
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al restablecer la contraseña');
    } finally {
      setLoading(false);
    }
  };

  if (step === 'request') {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
      >
        <View style={{ flex: 1 }}>
          <ScrollView
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.logoTampicoContainer}>
              <Image 
                source={require('../../../../../assets/images/auth/Logo-Tampico.png')} 
                style={styles.logoTampico}
                resizeMode="contain"
              />
            </View>

            <View style={styles.formCardInner}>
              <Text style={styles.title}>¿Olvidaste tu contraseña?</Text>
              <Text style={styles.subtitle}>
                Ingresa tu numero de acción y te enviaremos un código para recuperar tu cuenta
              </Text>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>
                  <Ionicons name="card-outline" size={20} color={COLORS.primaryDark} />
                  {' '}Numero de acción
                </Text>
                <TextInput
                  style={styles.input}
                  value={identifier}
                  onChangeText={setIdentifier}
                  placeholder="Numero de accion"
                  placeholderTextColor={COLORS.gray500}
                  autoCapitalize="none"
                  keyboardType="numeric"
                  editable={!loading}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Enviar código por:</Text>
                <View style={styles.methodButtons}>
                  <TouchableOpacity
                    style={[styles.methodButton, method === 'email' && styles.methodButtonActive]}
                    onPress={() => setMethod('email')}
                  >
                    <Text style={[styles.methodButtonText, method === 'email' && styles.methodButtonTextActive]}>
                      Email
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.methodButton, method === 'sms' && styles.methodButtonActive]}
                    onPress={() => setMethod('sms')}
                  >
                    <Text style={[styles.methodButtonText, method === 'sms' && styles.methodButtonTextActive]}>
                      SMS
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity 
                style={[styles.loginButton, loading && styles.loginButtonDisabled]} 
                onPress={handleRequestCode}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color={COLORS.white} size="small" />
                ) : (
                  <Text style={styles.buttonText}>Enviar código</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.forgotPasswordButton}
                onPress={() => navigation.goBack()}
                disabled={loading}
              >
                <Text style={styles.linkText}>Cancelar</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.footerContainer}>
              <View style={styles.footerDivider} />
              <Text style={styles.footerText}>App Oficial · Club Campestre Tampico</Text>
              <View style={styles.footerDivider} />
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    );
  }

  // Paso de verificación del código
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
    >
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={[styles.content, styles.verifyContent]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.logoTampicoContainer}>
            <Image 
              source={require('../../../../../assets/images/auth/Logo-Tampico.png')} 
              style={styles.logoTampico}
              resizeMode="contain"
            />
          </View>

          <View style={styles.formCardInner}>
            <Text style={styles.title}>Ingresa el código</Text>
            <Text style={styles.subtitle}>
              Hemos enviado un código de 6 dígitos a tu {method === 'email' ? 'correo' : 'móvil'}
            </Text>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Código de verificación</Text>
              <TextInput
                style={styles.input}
                value={code}
                onChangeText={(text) => setCode(text.replace(/\D/g, '').slice(0, 6))}
                placeholder="123456"
                placeholderTextColor={COLORS.gray500}
                keyboardType="numeric"
                maxLength={6}
                editable={!loading}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nueva contraseña</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[styles.input, styles.passwordInput]}
                  value={newPassword}
                  onChangeText={setNewPassword}
                  secureTextEntry={!showPassword}
                  placeholder="Nueva contraseña"
                  placeholderTextColor={COLORS.gray500}
                  editable={!loading}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                  disabled={loading}
                >
                  <Ionicons
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color={COLORS.primary}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Confirmar contraseña</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[styles.input, styles.passwordInput]}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                  placeholder="Confirmar contraseña"
                  placeholderTextColor={COLORS.gray500}
                  editable={!loading}
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={styles.eyeIcon}
                  disabled={loading}
                >
                  <Ionicons
                    name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color={COLORS.primary}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity 
              style={[styles.loginButton, loading && styles.loginButtonDisabled]} 
              onPress={handleResetPassword}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={COLORS.white} size="small" />
              ) : (
                <Text style={styles.buttonText}>Restablecer contraseña</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => setStep('request')}
              disabled={loading}
            >
              <Text style={styles.backButtonText}>← Solicitar nuevo código</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.forgotPasswordButton}
              onPress={() => navigation.goBack()}
              disabled={loading}
            >
              <Text style={styles.linkText}>Cancelar</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footerContainer}>
            <View style={styles.footerDivider} />
            <Text style={styles.footerText}>App Oficial · Club Campestre Tampico</Text>
            <View style={styles.footerDivider} />
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

export default ForgotPasswordScreen;
