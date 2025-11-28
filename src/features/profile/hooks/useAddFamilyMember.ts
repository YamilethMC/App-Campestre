import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useAuthStore } from '../../../store';
import { memberService, AddFamilyMemberRequest } from '../services/memberService';

interface UseAddFamilyMemberProps {
  memberId: number; // ID del miembro logueado
  onAddSuccess?: () => void; // Callback para cuando se agregue exitosamente
}

interface FormDataState extends Omit<AddFamilyMemberRequest, 'birthDate'> {
  birthDate: string; // Mantenemos como string para manejarlo en el formato requerido por la API
}

export const useAddFamilyMember = ({ memberId, onAddSuccess }: UseAddFamilyMemberProps) => {
  const [token] = useState(() => useAuthStore.getState().token);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormDataState>({
    email: '',
    active: true,
    name: '',
    lastName: '',
    type: 'INVITADO',
    birthDate: '', // Fecha vacía inicialmente
    gender: 'MASCULINO',
    RFC: '',
    address: {
      street: '123 Main St',
      externalNumber: '123',
      internalNumber: '123',
      suburb: 'Downtown',
      city: 'Monterrey',
      zipCode: '64000',
      state: 'Nuevo León',
      country: 'Mexico'
    },
    phone: [
      {
        number: '',
        alias: 'Mobile',
        type: 'MOVIL'
      }
    ],
    invitedById: memberId,
    relationship: 'WIFE' // Valor por defecto
  });

  const updateFormData = (field: keyof FormDataState, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateAddressData = (field: keyof AddFamilyMemberRequest['address'], value: string) => {
    setFormData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value
      }
    }));
  };

  const updatePhoneData = (field: keyof AddFamilyMemberRequest['phone'][0], value: string) => {
    setFormData(prev => ({
      ...prev,
      phone: [
        {
          ...prev.phone[0],
          [field]: value
        }
      ]
    }));
  };

  const validateForm = (): boolean => {
    // Validar nombre (requerido)
    if (!formData.name.trim()) {
      Alert.alert('Error', 'El nombre es requerido.');
      return false;
    }

    // Validar apellido (requerido)
    if (!formData.lastName.trim()) {
      Alert.alert('Error', 'El apellido es requerido.');
      return false;
    }

    // Validar correo electrónico (requerido y con formato válido)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      Alert.alert('Error', 'El correo electrónico es requerido.');
      return false;
    } else if (!emailRegex.test(formData.email.trim())) {
      Alert.alert('Error', 'Por favor ingrese un correo electrónico válido.');
      return false;
    }

    // Validar relación (requerido)
    if (!formData.relationship.trim()) {
      Alert.alert('Error', 'La relación es requerida.');
      return false;
    }

    // Validar fecha de nacimiento (requerido)
    if (!formData.birthDate.trim()) {
      Alert.alert('Error', 'La fecha de nacimiento es requerida.');
      return false;
    }

    // Validar número de teléfono (requerido, solo números, 10 dígitos)
    if (!formData.phone[0].number.trim()) {
      Alert.alert('Error', 'El número de teléfono es requerido.');
      return false;
    } else {
      const cleanedPhone = formData.phone[0].number.replace(/\D/g, '');
      if (cleanedPhone.length < 10) {
        Alert.alert('Error', 'El número de teléfono debe tener al menos 10 dígitos.');
        return false;
      }

      // Verificar que solo contenga números
      if (!/^\d+$/.test(cleanedPhone)) {
        Alert.alert('Error', 'El número de teléfono solo debe contener dígitos.');
        return false;
      }
    }

    // Validar RFC (no requerido, pero si se proporciona, debe tener 12 o 13 caracteres)
    if (formData.RFC.trim()) {
      if (formData.RFC.length < 12 || formData.RFC.length > 13) {
        Alert.alert('Error', 'El RFC debe tener 12 o 13 caracteres.');
        return false;
      }
    }

    return true;
  };

  const submitForm = async () => {
    if (!validateForm()) {
      return;
    }

    if (!token) {
      Alert.alert('Error', 'No hay token de autenticación disponible.');
      return;
    }

    setLoading(true);

    try {
      const result = await memberService.addFamilyMember(formData, token);
      
      Alert.alert(
        'Éxito',
        'Miembro de la familia agregado correctamente.',
        [
          {
            text: 'Aceptar',
            onPress: () => {
              if (onAddSuccess) onAddSuccess();
            }
          }
        ],
        { cancelable: false }
      );
    } catch (error: any) {
      console.error('Error adding family member:', error);
      Alert.alert(
        'Error',
        error.message || 'Ocurrió un error al agregar el miembro de la familia.',
        [
          {
            text: 'Aceptar',
            style: 'default'
          }
        ]
      );
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      email: '',
      active: true,
      name: '',
      lastName: '',
      type: 'INVITADO',
      birthDate: new Date().toISOString().split('T')[0] + 'T00:00:00.000Z',
      gender: 'MASCULINO',
      RFC: '',
      address: {
        street: '123 Main St',
        externalNumber: '123',
        internalNumber: '123',
        suburb: 'Downtown',
        city: 'Monterrey',
        zipCode: '64000',
        state: 'Nuevo León',
        country: 'Mexico'
      },
      phone: [
        {
          number: '',
          alias: 'Mobile',
          type: 'MOVIL'
        }
      ],
      invitedById: memberId,
      relationship: 'WIFE'
    });
  };

  return {
    formData,
    loading,
    updateFormData,
    updateAddressData,
    updatePhoneData,
    submitForm,
    resetForm,
    validateForm,
  };
};