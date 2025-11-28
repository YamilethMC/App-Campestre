import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import Button from '../../../../shared/components/Button/Button';
import { Ionicons } from '@expo/vector-icons';
import styles from './Style';
import { useAddFamilyMember } from '../../hooks/useAddFamilyMember';

interface AddFamilyMemberFormProps {
  memberId: number;
  onCancel: () => void;
  onAddSuccess: () => void;
}

const AddFamilyMemberForm: React.FC<AddFamilyMemberFormProps> = ({
  memberId,
  onCancel,
  onAddSuccess
}) => {
  const {
    formData,
    loading,
    updateFormData,
    updateAddressData,
    updatePhoneData,
    submitForm,
    resetForm,
    validateForm,
  } = useAddFamilyMember({
    memberId,
    onAddSuccess
  });

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
          <Text style={styles.sectionTitle}>Información Personal</Text>
          
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
          </View>
          
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
              <Text style={styles.pickerText}>
                {GENDER_OPTIONS.find(option => option.value === formData.gender)?.label || 'Selecciona un género'}
              </Text>
              <Ionicons name="chevron-down" size={20} color="#6b7280" />
            </TouchableOpacity>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Relación <Text style={styles.requiredIndicator}>*</Text></Text>
            <TouchableOpacity
              style={styles.pickerContainer}
              onPress={() => setShowRelationshipPicker(true)}
            >
              <Text style={styles.pickerText}>
                {RELATIONSHIP_OPTIONS.find(option => option.value === formData.relationship)?.label || 'Selecciona una relación'}
              </Text>
              <Ionicons name="chevron-down" size={20} color="#6b7280" />
            </TouchableOpacity>
          </View>
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
            <Text style={styles.pickerModalTitle}>Seleccionar Género</Text>
            <FlatList
              data={GENDER_OPTIONS}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.pickerOption}
                  onPress={() => handleSelectGender(item.value)}
                >
                  <Text style={styles.pickerOptionText}>{item.label}</Text>
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
            <Text style={styles.pickerModalTitle}>Seleccionar Relación</Text>
            <FlatList
              data={RELATIONSHIP_OPTIONS}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.pickerOption}
                  onPress={() => handleSelectRelationship(item.value)}
                >
                  <Text style={styles.pickerOptionText}>{item.label}</Text>
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
            <Text style={styles.modalMessage}>¿Deseas guardar los cambios y agregar al familiar?</Text>
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