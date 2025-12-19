import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Button from '../../../../shared/components/Button/Button';
import { COLORS } from '../../../../shared/theme/colors';
import { useAddFamilyMember } from '../../hooks/useAddFamilyMember';
import styles from './Style';

interface AddFamilyMemberFormProps {
  memberId: number;
  guestType?: 'INVITADO' | 'TEMPORAL';
  onCancel: () => void;
  onAddSuccess: () => void;
}

const AddFamilyMemberForm: React.FC<AddFamilyMemberFormProps> = ({
  memberId,
  guestType = 'INVITADO',
  onCancel,
  onAddSuccess
}) => {
  const {
    formData,
    loading,
    updateFormData,
    updatePhoneData,
    submitForm,
    resetForm,
    validateForm,
    tempPass,
    setTemporaryPass,
  } = useAddFamilyMember({
    memberId,
    guestType,
    onAddSuccess
  });
console.log('......,.--..--.--.--..Guest type:', guestType);
  const [showCancelModal, setShowCancelModal] = React.useState(false);
  const [showSubmitModal, setShowSubmitModal] = React.useState(false);
  const [showGenderPicker, setShowGenderPicker] = React.useState(false);
  const [showRelationshipPicker, setShowRelationshipPicker] = React.useState(false);

  const handleSelectGender = (value: string) => {
    updateFormData('gender', value);
    setShowGenderPicker(false);
  };

  const handleSelectRelationship = (value: string) => {
    updateFormData('relationship', value);
    setShowRelationshipPicker(false);
  };

  const handleCancel = () => {
    setShowCancelModal(true);
  };

  const handleConfirmCancel = () => {
    setShowCancelModal(false);
    resetForm();
    onCancel();
  };

  const handleSave = () => {
    // Validar antes de mostrar el modal de confirmación
    if (validateForm()) {
      setShowSubmitModal(true);
    }
  };

  const handleConfirmSubmit = async () => {
    setShowSubmitModal(false);
    await submitForm();
  };

  const GENDER_OPTIONS = [
    { label: 'Masculino', value: 'MASCULINO' },
    { label: 'Femenino', value: 'FEMENINO' },
  ];

  const RELATIONSHIP_OPTIONS = [
    { label: 'Esposa', value: 'WIFE' },
    { label: 'Esposo', value: 'HUSBAND' },
    { label: 'Hijo', value: 'SON' },
    { label: 'Hija', value: 'DAUGHTER' },
    { label: 'Padre', value: 'FATHER' },
    { label: 'Madre', value: 'MOTHER' },
    { label: 'Hermano', value: 'BROTHER' },
    { label: 'Hermana', value: 'SISTER' },
    { label: 'Amigo', value: 'FRIEND' },
    { label: 'Otro', value: 'OTHER' },
  ];

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Formulario de datos personales */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {guestType === 'TEMPORAL' ? 'Información del Pase Temporal' : 'Información del Invitado'}
          </Text>
          <Text style={styles.sectionSubtitle}>
            {guestType === 'TEMPORAL' 
              ? 'Crea un pase temporal para un invitado' 
              : 'Crea un pase de invitado (válido para 4 entradas)'}
          </Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nombre <Text style={styles.requiredIndicator}>*</Text></Text>
            <TextInput
              style={styles.input}
              value={formData.name}
              onChangeText={(text) => updateFormData('name', text)}
              placeholder="Introduce el nombre"
              placeholderTextColor="#9ca3af"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Apellido <Text style={styles.requiredIndicator}>*</Text></Text>
            <TextInput
              style={styles.input}
              value={formData.lastName}
              onChangeText={(text) => updateFormData('lastName', text)}
              placeholder="Introduce el apellido"
              placeholderTextColor="#9ca3af"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Correo Electrónico <Text style={styles.requiredIndicator}>*</Text></Text>
            <TextInput
              style={styles.input}
              value={formData.email}
              onChangeText={(text) => updateFormData('email', text)}
              placeholder="ejemplo@correo.com"
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#9ca3af"
            />
            {guestType === 'INVITADO' && (
              <Text style={styles.helperText}>
                El invitado recibirá su pase QR por email
              </Text>
            )}
          </View>

          {/* Campos adicionales solo para pases temporales */}
          {guestType === 'TEMPORAL' && (
            <>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>RFC</Text>
                <TextInput
                  style={styles.input}
                  value={formData.RFC}
                  onChangeText={(text) => updateFormData('RFC', text)}
                  placeholder="RFC (12 a 13 caracteres)"
                  maxLength={13}
                  autoCapitalize="characters"
                  placeholderTextColor="#9ca3af"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Fecha de Nacimiento <Text style={styles.requiredIndicator}>*</Text></Text>
                <TextInput
                  style={styles.input}
                  value={formData.birthDate.split('T')[0]}
                  onChangeText={(text) => {
                    // Formatear automáticamente la fecha si el usuario ingresa 8 dígitos (AAAAMMDD)
                    let formattedText = text;
                    if (/^\d{8}$/.test(text)) {
                      // Convertir AAAAMMDD a AAAA-MM-DD
                      formattedText = `${text.substring(0, 4)}-${text.substring(4, 6)}-${text.substring(6, 8)}`;
                    }

                    if (formattedText) {
                      updateFormData('birthDate', formattedText + 'T00:00:00.000Z');
                    } else {
                      updateFormData('birthDate', '');
                    }
                  }}
                  placeholder="YYYY-MM-DD"
                  keyboardType="numeric"
                  maxLength={10}
                  placeholderTextColor="#9ca3af"
                />
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Género</Text>
                <TouchableOpacity
                  style={styles.pickerContainer}
                  onPress={() => setShowGenderPicker(true)}
                >
                  <Text style={
                    formData.gender
                      ? styles.pickerText
                      : styles.pickerTextPlaceholder
                  }>
                    {GENDER_OPTIONS.find(option => option.value === formData.gender)?.label || 'Selecciona un género'}
                  </Text>
                  <Ionicons name="chevron-down" size={20} color={formData.gender ? "#6b7280" : COLORS.gray400} />
                </TouchableOpacity>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Relación <Text style={styles.requiredIndicator}>*</Text></Text>
                <TouchableOpacity
                  style={styles.pickerContainer}
                  onPress={() => setShowRelationshipPicker(true)}
                >
                  <Text style={
                    formData.relationship
                      ? styles.pickerText
                      : styles.pickerTextPlaceholder
                  }>
                    {RELATIONSHIP_OPTIONS.find(option => option.value === formData.relationship)?.label || 'Selecciona una relación'}
                  </Text>
                  <Ionicons name="chevron-down" size={20} color={formData.relationship ? "#6b7280" : COLORS.gray400} />
                </TouchableOpacity>
              </View>
            </>
          )}

          {/* 
          <View style={styles.toggleContainer}>
            <Text style={styles.label}>Pase Temporal</Text>
            <View style={styles.toggleRow}>
              <Text style={styles.toggleText}>No</Text>
              <Switch
                trackColor={{ false: '#767577', true: '#10B981' }}
                thumbColor={tempPass ? '#ffffff' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={(value) => {
                  setTemporaryPass(value);
                  if (!value) {
                    updateFormData('expireAt', ''); // Clear expireAt when switching off
                  }
                }}
                value={tempPass}
              />
              <Text style={styles.toggleText}>Sí</Text>
            </View>
          </View>

          {tempPass && (
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Fecha de Expiración <Text style={styles.requiredIndicator}>*</Text></Text>
              <TextInput
                style={styles.input}
                value={(() => {
                  if (!formData.expireAt) return '';
                  // Mostrar solo la parte de fecha (AAAA-MM-DD), sin el tiempo
                  if (formData.expireAt.length >= 10) {
                    return formData.expireAt.substring(0, 10); // Solo AAAA-MM-DD
                  }
                  return formData.expireAt;
                })()}
                onChangeText={(text) => {
                  // Limpiar texto para aceptar solo dígitos y guiones
                  const cleanText = text.replace(/[^0-9-]/g, '');

                  // Aplicar formato automático si tiene 8 dígitos (AAAAMMDD)
                  if (/^\d{8}$/.test(cleanText)) {
                    const formatted = `${cleanText.substring(0, 4)}-${cleanText.substring(4, 6)}-${cleanText.substring(6, 8)}`;
                    updateFormData('expireAt', formatted);
                  } else {
                    // Actualizar con el texto limpio
                    updateFormData('expireAt', cleanText);
                  }
                }}
                placeholder="YYYY-MM-DD"
                keyboardType="numeric"
                maxLength={10}
                placeholderTextColor="#9ca3af"
              />
            </View>
          )}
          */}

        </View>

        {/* Sección de contacto */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información de Contacto</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Teléfono <Text style={styles.requiredIndicator}>*</Text></Text>
            <TextInput
              style={styles.input}
              value={formData.phone[0].number}
              onChangeText={(text) => updatePhoneData('number', text)}
              placeholder="10 dígitos (ej. 8112345678)"
              keyboardType="phone-pad"
              maxLength={10}
              placeholderTextColor="#9ca3af"
            />
          </View>
        </View>
      </ScrollView>

      {/* Botones fijos en la parte inferior */}
      <View style={styles.buttonContainer}>
        <View style={styles.buttonRow}>
          <Button
            text="Cancelar"
            variant="secondary"
            onPress={handleCancel}
            style={styles.cancelButton}
            titleStyle={styles.cancelButtonText}
          />
          <View style={styles.buttonSpacer} />
          <Button
            text={loading ? "Guardando..." : "Guardar"}
            variant="primary"
            onPress={handleSave}
            disabled={loading}
            style={styles.saveButton}
          />
        </View>
      </View>

      {/* Modal de confirmación para cancelar */}
      <Modal
        visible={showCancelModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowCancelModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Confirmar cancelación</Text>
            <Text style={styles.modalMessage}>¿Estás seguro de que deseas cancelar? Los cambios no guardados se perderán.</Text>
            <View style={styles.modalButtonRow}>
              <Button
                text="Cancelar"
                variant="secondary"
                onPress={() => setShowCancelModal(false)}
                style={styles.modalButton}
              />
              <View style={styles.modalButtonSpacer} />
              <Button
                text="Aceptar"
                variant="danger"
                onPress={handleConfirmCancel}
                style={styles.modalButton}
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal de selector de género */}
      <Modal
        visible={showGenderPicker}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowGenderPicker(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setShowGenderPicker(false)}
        >
          <View style={styles.pickerModalContainer}>
            <Text style={styles.pickerModalTitle}>Seleccionar género</Text>
            <FlatList
              data={GENDER_OPTIONS}
              keyExtractor={(item) => item.value}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  style={[
                    styles.pickerOption,
                    index === GENDER_OPTIONS.length - 1 && styles.pickerOptionLast,
                    item.value === formData.gender && styles.pickerOptionSelected
                  ]}
                  onPress={() => handleSelectGender(item.value)}
                >
                  <Text style={[
                    styles.pickerOptionText,
                    item.value === formData.gender && styles.pickerOptionTextSelected
                  ]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Modal de selector de relación */}
      <Modal
        visible={showRelationshipPicker}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowRelationshipPicker(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setShowRelationshipPicker(false)}
        >
          <View style={styles.pickerModalContainer}>
            <Text style={styles.pickerModalTitle}>Seleccionar relación</Text>
            <FlatList
              data={RELATIONSHIP_OPTIONS}
              keyExtractor={(item) => item.value}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  style={[
                    styles.pickerOption,
                    index === RELATIONSHIP_OPTIONS.length - 1 && styles.pickerOptionLast,
                    item.value === formData.relationship && styles.pickerOptionSelected
                  ]}
                  onPress={() => handleSelectRelationship(item.value)}
                >
                  <Text style={[
                    styles.pickerOptionText,
                    item.value === formData.relationship && styles.pickerOptionTextSelected
                  ]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Modal de confirmación para guardar */}
      <Modal
        visible={showSubmitModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowSubmitModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Confirmar guardado</Text>
            <Text style={styles.modalMessage}>¿Estás seguro de que deseas guardar esta información?</Text>
            <View style={styles.modalButtonRow}>
              <Button
                text="Cancelar"
                variant="secondary"
                onPress={() => setShowSubmitModal(false)}
                style={styles.modalButton}
              />
              <View style={styles.modalButtonSpacer} />
              <Button
                text={loading ? "Guardando..." : "Guardar"}
                variant="primary"
                onPress={handleConfirmSubmit}
                disabled={loading}
                style={styles.modalButton}
              />
            </View>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

export default AddFamilyMemberForm;