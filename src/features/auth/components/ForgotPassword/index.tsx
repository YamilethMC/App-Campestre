<<<<<<< HEAD
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
=======
>>>>>>> d251b39a25dc3ac690b806c8c15ba4a0f6985b99
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { authService } from '../../services/authService';

export const ForgotPasswordScreen: React.FC = () => {
  const navigation = useNavigation();
  const [step, setStep] = useState<'request' | 'verify'>('request');
  const [identifier, setIdentifier] = useState('');
  const [method, setMethod] = useState<'email' | 'whatsapp'>('email');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
          `Hemos enviado un código de 6 dígitos a tu ${method === 'email' ? 'correo electrónico' : 'WhatsApp'}`,
          [
            {
              text: 'OK',
              onPress: () => setStep('verify'),
            },
          ],
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
        Alert.alert('Éxito', 'Tu contraseña ha sido actualizada correctamente', [
          {
            text: 'OK',
            onPress: () => {
              // @ts-ignore
              navigation.navigate('Login');
            },
          },
        ]);
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
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>¿Olvidaste tu contraseña?</Text>
          <Text style={styles.subtitle}>
            Ingresa tu email o teléfono y te enviaremos un código para recuperar tu cuenta
          </Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email o Teléfono</Text>
            <TextInput
              style={styles.input}
              value={identifier}
              onChangeText={setIdentifier}
              placeholder="usuario@ejemplo.com o 8331234567"
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.methodContainer}>
            <Text style={styles.label}>Enviar código por:</Text>
            <View style={styles.methodButtons}>
              <TouchableOpacity
                style={[styles.methodButton, method === 'email' && styles.methodButtonActive]}
                onPress={() => setMethod('email')}
              >
                <Text
                  style={[
                    styles.methodButtonText,
                    method === 'email' && styles.methodButtonTextActive,
                  ]}
                >
                  📧 Email
                </Text>
              </TouchableOpacity>
              {/* <TouchableOpacity
                style={[styles.methodButton, method === 'whatsapp' && styles.methodButtonActive]}
                onPress={() => setMethod('whatsapp')}
              >
                <Text
                  style={[
                    styles.methodButtonText,
                    method === 'whatsapp' && styles.methodButtonTextActive,
                  ]}
                >
                  📱 WhatsApp
                </Text>
              </TouchableOpacity> */}
            </View>
          </View>

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleRequestCode}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Enviar código</Text>
            )}
          </TouchableOpacity>
<<<<<<< HEAD

          <TouchableOpacity
            // @ts-ignore
            onPress={() => navigation.navigate('Login')}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>← Volver al inicio de sesión</Text>
          </TouchableOpacity>
=======
>>>>>>> d251b39a25dc3ac690b806c8c15ba4a0f6985b99
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Ingresa el código</Text>
        <Text style={styles.subtitle}>
          Hemos enviado un código de 6 dígitos a tu {method === 'email' ? 'correo' : 'WhatsApp'}
        </Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Código de verificación</Text>
          <TextInput
            style={styles.input}
            value={code}
            onChangeText={text => setCode(text.replace(/\D/g, '').slice(0, 6))}
            placeholder="123456"
            keyboardType="number-pad"
            maxLength={6}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nueva contraseña</Text>
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={styles.input}
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry={!showPassword}
              placeholder="Mínimo 8 caracteres"
              autoCapitalize="none"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
              <Text>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Confirmar contraseña</Text>
          <TextInput
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showPassword}
            placeholder="Repite la nueva contraseña"
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleResetPassword}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Restablecer contraseña</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setStep('request')} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Solicitar nuevo código</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    right: 12,
    padding: 8,
  },
  methodContainer: {
    marginBottom: 20,
  },
  methodButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  methodButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  methodButtonActive: {
    borderColor: '#2c5f2d',
    backgroundColor: '#e8f5e9',
  },
  methodButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  methodButtonTextActive: {
    color: '#2c5f2d',
  },
  button: {
    backgroundColor: '#2c5f2d',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    marginTop: 16,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#2c5f2d',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ForgotPasswordScreen;
