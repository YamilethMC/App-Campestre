import { useState } from 'react';
import { Alert } from 'react-native';
import { useAuthStore } from '../../../store';
import { AddFamilyMemberRequest, memberService } from '../services/memberService';
import { passService, CreatePassRequest } from '../../home/services/passService';

interface UseAddFamilyMemberProps {
  memberId: number;
  guestType?: 'INVITADO' | 'TEMPORAL';
  onAddSuccess?: () => void;
}

interface FormDataState extends Omit<AddFamilyMemberRequest, 'birthDate'> {
  birthDate: string;
}

export const useAddFamilyMember = ({ memberId, guestType = 'INVITADO', onAddSuccess }: UseAddFamilyMemberProps) => {
  const [token] = useState(() => useAuthStore.getState().token);
  const [loading, setLoading] = useState(false);
  const [tempPass, setTempPass] = useState(guestType === 'TEMPORAL');
  const [formData, setFormData] = useState<FormDataState>({
    email: '',
    active: true,
    name: '',
    lastName: '',
    type: guestType,
    birthDate: '',
    gender: 'MASCULINO',
    RFC: '',
    expireAt: '', // Optional field for temporary pass
    address: {
      street: 'N/A',
      externalNumber: 'N/A',
      internalNumber: 'N/A',
      suburb: 'N/A',
      city: 'N/A',
      zipCode: 'N/A',
      state: 'N/A',
      country: 'N/A'
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

  const updateFormData = (field: keyof FormDataState, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
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

    // Validaciones adicionales para pases temporales
    if (guestType === 'TEMPORAL') {
      // Validar relación (requerido para temporales)
      if (!formData.relationship.trim()) {
        Alert.alert('Error', 'La relación es requerida.');
        return false;
      }

      // Validar fecha de nacimiento (requerido para temporales)
      if (!formData.birthDate.trim()) {
        Alert.alert('Error', 'La fecha de nacimiento es requerida.');
        return false;
      }

      // Validar RFC (no requerido, pero si se proporciona, debe tener 12 o 13 caracteres)
      if (formData.RFC.trim()) {
        if (formData.RFC.length < 12 || formData.RFC.length > 13) {
          Alert.alert('Error', 'El RFC debe tener 12 o 13 caracteres.');
          return false;
        }
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
      // Usar endpoint diferente según el tipo de pase
      if (guestType === 'INVITADO') {
        // NUEVO: Usar endpoint /pass para invitados regulares
        const passData: CreatePassRequest = {
          guestName: formData.name,
          guestLastName: formData.lastName,
          guestEmail: formData.email,
          guestPhone: formData.phone[0].number,
          type: 'GUEST'
        };

        console.log('Creating guest pass with /pass endpoint:', passData);
        const result = await passService.createPass(passData);

        if (result.success && result.data) {
          Alert.alert(
            'Éxito',
            `Pase de invitado creado correctamente.\n\nEl invitado recibirá una notificación con el link para ver su pase QR.`,
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
        } else {
          Alert.alert(
            'Error',
            result.error || 'Ocurrió un error al crear el pase de invitado.',
            [
              {
                text: 'Aceptar',
                style: 'default'
              }
            ]
          );
        }
      } else {
        // ORIGINAL: Usar endpoint /club-members para pases temporales
        const submitData: AddFamilyMemberRequest = formData;
        console.log('Creating temporal pass with /club-members endpoint:', submitData);
        const result = await memberService.addFamilyMember(submitData, token);

        if (result.success && result.data) {
          Alert.alert(
            'Éxito',
            'Pase temporal creado correctamente.',
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
        } else {
          Alert.alert(
            'Error',
            result.error || 'Ocurrió un error al crear el pase temporal.',
            [
              {
                text: 'Aceptar',
                style: 'default'
              }
            ]
          );
        }
      }
    } catch (error: any) {
      Alert.alert(
        'Error',
        error.message || 'Ocurrió un error al crear el pase.',
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
    setTempPass(guestType === 'TEMPORAL');
    setFormData({
      email: '',
      active: true,
      name: '',
      lastName: '',
      type: guestType,
      birthDate: new Date().toISOString().split('T')[0] + 'T00:00:00.000Z',
      gender: 'MASCULINO',
      RFC: '',
      expireAt: '', // Optional field for temporary pass
      address: {
        street: 'N/A',
        externalNumber: 'N/A',
        internalNumber: 'N/A',
        suburb: 'N/A',
        city: 'N/A',
        zipCode: 'N/A',
        state: 'N/A',
        country: 'N/A'
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

  const setTemporaryPass = (enabled: boolean) => {
    setTempPass(enabled);
    // Update the type when temp pass is enabled/disabled
    if (enabled) {
      setFormData(prev => ({ ...prev, type: 'TEMPORAL' }));
    } else {
      setFormData(prev => ({ ...prev, type: 'INVITADO' }));
    }
  };

  return {
    formData,
    loading,
    updateFormData,
    updatePhoneData,
    submitForm,
    resetForm,
    validateForm,
    tempPass,
    setTemporaryPass,
  };
};