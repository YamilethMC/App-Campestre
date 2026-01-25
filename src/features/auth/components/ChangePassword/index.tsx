import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  KeyboardEvent,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS } from '../../../../shared/theme/colors';
import { authService } from '../../services/authService';
import { useAuth } from '../../store/useAuthStore';

interface ChangePasswordProps {
  userId: number;
  isFirstLogin?: boolean;
}

export const ChangePasswordScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { userId, isFirstLogin = false } = route.params as ChangePasswordProps;
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', (e: KeyboardEvent) => {
      setKeyboardHeight(e.endCoordinates.height);
    });

    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
    });

    return () => {
      showSubscription?.remove();
      hideSubscription?.remove();
    };
  }, []);

  const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (password.length < 8) {
      errors.push('• Mínimo 8 caracteres');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('• Al menos una letra mayúscula');
    }
    if (!/[a-z]/.test(password)) {
      errors.push('• Al menos una letra minúscula');
    }
    if (!/[0-9]/.test(password)) {
      errors.push('• Al menos un número');
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('• Al menos un carácter especial (!@#$%^&*(),.?":{}|<>)');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  };

  const getPasswordStrength = (password: string): { strength: string; color: string } => {
    const validation = validatePassword(password);
    const validCount = 5 - validation.errors.length;

    if (validCount === 5) return { strength: 'Fuerte', color: COLORS.success };
    if (validCount >= 3) return { strength: 'Media', color: COLORS.warning };
    return { strength: 'Débil', color: COLORS.error };
  };

  const { setPendingPasswordChange } = useAuth();

  const handleChangePassword = async () => {
    // Validaciones
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    const validation = validatePassword(newPassword);
    if (!validation.isValid) {
      Alert.alert(
        'Contraseña no válida',
        'La contraseña debe cumplir con los siguientes requisitos:\n\n' + validation.errors.join('\n')
      );
      return;
    }

    if (currentPassword === newPassword) {
      Alert.alert('Error', 'La nueva contraseña debe ser diferente a la actual');
      return;
    }

    setLoading(true);

    try {
      const result = await authService.changePassword(currentPassword, newPassword);

      if (result.success) {
        Alert.alert(
          'Éxito',
          'Contraseña actualizada correctamente',
          [
            {
              text: 'OK',
              onPress: () => {
                setPendingPasswordChange(false);
                // Si es primer login, navegar a la pantalla principal
                if (isFirstLogin) {
                  // La navegación se manejará automáticamente al limpiar pendingPasswordChange
                  // El MainNavigator detectará que ya no está pendiente y mostrará MainTabs
                } else {
                  navigation.goBack();
                }
              },
            },
          ]
        );
      } else {
        Alert.alert('Error', result.error || 'No se pudo cambiar la contraseña');
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al cambiar la contraseña');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
    >
      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: keyboardHeight * 0.5 }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {isFirstLogin && (
          <View style={styles.warningBox}>
            <Text style={styles.warningTitle}>⚠️ Cambio Obligatorio</Text>
            <Text style={styles.warningText}>
              Por tu seguridad, debes cambiar tu contraseña temporal antes de continuar.
            </Text>
          </View>
        )}

        <Text style={styles.title}>
          {isFirstLogin ? 'Cambia tu contraseña' : 'Cambiar contraseña'}
        </Text>
        <Text style={styles.subtitle}>
          {isFirstLogin
            ? 'Crea una contraseña segura para tu cuenta'
            : 'Actualiza tu contraseña'}
        </Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Contraseña actual</Text>
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={styles.input}
              value={currentPassword}
              onChangeText={setCurrentPassword}
              secureTextEntry={!showCurrentPassword}
              placeholder="Ingresa tu contraseña actual"
              placeholderTextColor={COLORS.gray500}
              autoCapitalize="none"
            />
            <TouchableOpacity
              onPress={() => setShowCurrentPassword(!showCurrentPassword)}
              style={styles.eyeIcon}
            >
              <Ionicons
                name={showCurrentPassword ? 'eye-outline' : 'eye-off-outline'}
                size={20}
                color={COLORS.gray500}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nueva contraseña</Text>
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={styles.input}
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry={!showNewPassword}
              placeholder="Mínimo 8 caracteres"
              placeholderTextColor={COLORS.gray500}
              autoCapitalize="none"
            />
            <TouchableOpacity
              onPress={() => setShowNewPassword(!showNewPassword)}
              style={styles.eyeIcon}
            >
              <Ionicons
                name={showNewPassword ? 'eye-outline' : 'eye-off-outline'}
                size={20}
                color={COLORS.gray500}
              />
            </TouchableOpacity>
          </View>
          
          {newPassword.length > 0 && (
            <View style={styles.passwordRequirements}>
              <View style={styles.strengthContainer}>
                <Text style={styles.strengthLabel}>Fortaleza: </Text>
                <Text style={[styles.strengthValue, { color: getPasswordStrength(newPassword).color }]}>
                  {getPasswordStrength(newPassword).strength}
                </Text>
              </View>
              <Text style={styles.requirementsTitle}>Requisitos:</Text>
              <View style={styles.requirementsList}>
                <Text style={newPassword.length >= 8 ? styles.requirementMet : styles.requirementUnmet}>
                  {newPassword.length >= 8 ? '✓' : '○'} Mínimo 8 caracteres
                </Text>
                <Text style={/[A-Z]/.test(newPassword) ? styles.requirementMet : styles.requirementUnmet}>
                  {/[A-Z]/.test(newPassword) ? '✓' : '○'} Una letra mayúscula
                </Text>
                <Text style={/[a-z]/.test(newPassword) ? styles.requirementMet : styles.requirementUnmet}>
                  {/[a-z]/.test(newPassword) ? '✓' : '○'} Una letra minúscula
                </Text>
                <Text style={/[0-9]/.test(newPassword) ? styles.requirementMet : styles.requirementUnmet}>
                  {/[0-9]/.test(newPassword) ? '✓' : '○'} Un número
                </Text>
                <Text style={/[!@#$%^&*(),.?":{}|<>]/.test(newPassword) ? styles.requirementMet : styles.requirementUnmet}>
                  {/[!@#$%^&*(),.?":{}|<>]/.test(newPassword) ? '✓' : '○'} Un carácter especial
                </Text>
              </View>
            </View>
          )}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Confirmar nueva contraseña</Text>
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              placeholder="Repite la nueva contraseña"
              placeholderTextColor={COLORS.gray500}
              autoCapitalize="none"
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              style={styles.eyeIcon}
            >
              <Ionicons
                name={showConfirmPassword ? 'eye-outline' : 'eye-off-outline'}
                size={20}
                color={COLORS.gray500}
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleChangePassword}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Cambiar contraseña</Text>
          )}
        </TouchableOpacity>

        {!isFirstLogin && (
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray100,
  },
  content: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 15, // Reduced top padding
    justifyContent: 'flex-start', // Changed from 'center' to 'flex-start'
  },
  warningBox: {
    backgroundColor: '#fff3cd',
    borderWidth: 1,
    borderColor: COLORS.warning,
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  warningTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#856404',
    marginBottom: 8,
  },
  warningText: {
    fontSize: 14,
    color: '#856404',
  },
  title: {
    fontSize: 22,
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
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  eyeIcon: {
    position: 'absolute',
    right: 12,
    padding: 8,
  },
  button: {
    backgroundColor: COLORS.primaryDark,
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
  cancelButton: {
    marginTop: 16,
    alignItems: 'center',
    borderColor: COLORS.error,
    borderWidth: 0.5,
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
  },
  cancelButtonText: {
    color: 'red',
    fontSize: 16,
  },
  passwordRequirements: {
    marginTop: 12,
    padding: 12,
    backgroundColor: COLORS.gray50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  strengthContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  strengthLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  strengthValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  requirementsTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#555',
    marginBottom: 6,
  },
  requirementsList: {
    gap: 4,
  },
  requirementMet: {
    fontSize: 13,
    color: COLORS.success,
    marginBottom: 4,
  },
  requirementUnmet: {
    fontSize: 13,
    color: COLORS.gray500,
    marginBottom: 4,
  },
});

export default ChangePasswordScreen;
