import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { authService } from '../../services/authService';

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

  const validatePassword = (password: string): boolean => {
    if (password.length < 8) {
      Alert.alert('Error', 'La contraseña debe tener al menos 8 caracteres');
      return false;
    }
    return true;
  };

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

    if (!validatePassword(newPassword)) {
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
                // Si es primer login, navegar a la pantalla principal
                if (isFirstLogin) {
                  // @ts-ignore
                  navigation.replace('Main');
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
    <View style={styles.container}>
      <View style={styles.content}>
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
              autoCapitalize="none"
            />
            <TouchableOpacity
              onPress={() => setShowCurrentPassword(!showCurrentPassword)}
              style={styles.eyeIcon}
            >
              <Text>{showCurrentPassword ? '👁️' : '👁️‍🗨️'}</Text>
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
              autoCapitalize="none"
            />
            <TouchableOpacity
              onPress={() => setShowNewPassword(!showNewPassword)}
              style={styles.eyeIcon}
            >
              <Text>{showNewPassword ? '👁️' : '👁️‍🗨️'}</Text>
            </TouchableOpacity>
          </View>
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
              autoCapitalize="none"
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              style={styles.eyeIcon}
            >
              <Text>{showConfirmPassword ? '👁️' : '👁️‍🗨️'}</Text>
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
  warningBox: {
    backgroundColor: '#fff3cd',
    borderWidth: 1,
    borderColor: '#ffc107',
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
  },
  eyeIcon: {
    position: 'absolute',
    right: 12,
    padding: 8,
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
  cancelButton: {
    marginTop: 16,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
  },
});

export default ChangePasswordScreen;
