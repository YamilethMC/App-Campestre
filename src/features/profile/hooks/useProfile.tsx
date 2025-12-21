import { useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import useLogout from '../../../hooks/useLogout';
import { useAuthStore } from '../../../store';
import useMessages from './useMessages';
import { userProfile } from '../interfaces/interfaces';
import { memberService, updateUser } from '../services/memberService';
import { useProfileStore } from '../store/useProfileStore';

export const useProfile = () => {
  const navigation = useNavigation();
  const { profile, updateProfile } = useProfileStore();
  const { handleLogout } = useLogout();
  const messages = useMessages();

  const { userId, token } = useAuthStore();

  const currentUser = profile as userProfile | null;
  console.log('.......---.-.-.-.-. currentUser: ', currentUser);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingContactEmergency, setIsEditingContactEmergency] = useState(false);

  useEffect(() => {
    const loadMember = async () => {
      if (userId && token) {
        const response = await memberService.getMemberById(userId, token);
        console.log('---------------------------------response: ', response);
        if (response.success && response.data) {
          updateProfile(response.data);
        } else {
          console.log('Error loading member:', response.error);
        }
      }
    };

    loadMember();
  }, [userId, token, updateProfile]);

  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    street: '',
    externalNumber: '',
    internalNumber: '',
    colony: '',
    zipCode: '',
    city: '',
    state: '',
    country: '',
    membershipType: 'Premium',
  });

  // Efecto para actualizar formData cuando cambie el perfil
  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || '',
        lastName: currentUser.lastName || '',
        email: currentUser.email || '',
        phone: currentUser.phone || '',
        address: currentUser.address || '',
        street: currentUser.street || '',
        externalNumber: currentUser.externalNumber || '',
        internalNumber: currentUser.internalNumber || '',
        colony: currentUser.colony || '',
        zipCode: currentUser.zipCode || '',
        city: currentUser.city || '',
        state: currentUser.state || '',
        country: currentUser.country || '',
        membershipType: currentUser.membershipType || 'Premium',
      });
    }
  }, [currentUser]);
  const [emergencyContactFormData, setEmergencyContactFormData] = useState({
    name: '',
    relationship: '',
    phone: '',
  });

  // Efecto para actualizar emergencyContactFormData cuando cambie el perfil
  useEffect(() => {
    if (currentUser && currentUser.emergencyContact) {
      setEmergencyContactFormData({
        name: currentUser.emergencyContact.name || '',
        relationship: currentUser.emergencyContact.relationship || '',
        phone: currentUser.emergencyContact.phone || '',
      });
    }
  }, [currentUser]);

  const handleInputChange = useCallback((field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const handleSave = useCallback(async () => {
    if (currentUser) {
      // Prepare update data
      const updateData = {
        name: formData.name,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone ? [{ number: formData.phone, alias: 'Mobile', type: 'MOVIL' }] : [],
        address: {
          street: formData.street || '',
          externalNumber: formData.externalNumber || '',
          internalNumber: formData.internalNumber || '',
          suburb: formData.colony || '',
          city: formData.city || '',
          zipCode: formData.zipCode || '',
          state: formData.state || '',
          country: formData.country || '',
        },
      };

      // Call the update service
      if (token && currentUser.userId) {
        const response = await updateUser(currentUser.userId, updateData, token);

        if (response.success) {
          // Reload profile data after successful update
          if (userId && token) {
            const reloadResponse = await memberService.getMemberById(userId, token);
            if (reloadResponse.success && reloadResponse.data) {
              updateProfile(reloadResponse.data);
            }
          }
          setIsEditing(false);
        } else {
          Alert.alert('Error', response.error || 'Ocurrió un error al actualizar el perfil.', [
            {
              text: 'Aceptar',
              style: 'default',
            },
          ]);
        }
      }
    }
  }, [currentUser, formData, token, userId, updateProfile]);

  const handleEmergencyContactChange = useCallback((field: string, value: string) => {
    setEmergencyContactFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const handleSaveContactEmergency = useCallback(() => {
    if (currentUser) {
      const updatedProfile = {
        ...currentUser,
        emergencyContact: {
          name: emergencyContactFormData.name,
          relationship: emergencyContactFormData.relationship,
          phone: emergencyContactFormData.phone,
        },
      };
      updateProfile(updatedProfile);
      setIsEditingContactEmergency(false);
    }
  }, [currentUser, emergencyContactFormData, updateProfile]);

  const handleEdit = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleEditContactEmergency = useCallback(() => {
    setIsEditingContactEmergency(true);
  }, []);

  const handleCancel = useCallback(() => {
    setFormData({
      name: currentUser?.name || '',
      lastName: currentUser?.lastName || '',
      email: currentUser?.email || '',
      phone: currentUser?.phone || '',
      address: currentUser?.address || '',
      street: currentUser?.street || '',
      externalNumber: currentUser?.externalNumber || '',
      internalNumber: currentUser?.internalNumber || '',
      colony: currentUser?.colony || '',
      zipCode: currentUser?.zipCode || '',
      city: currentUser?.city || '',
      state: currentUser?.state || '',
      country: currentUser?.country || '',
      membershipType: currentUser?.membershipType || 'Premium',
    });
    setIsEditing(false);
  }, [currentUser]);

  const handleCancelContactEmergency = useCallback(() => {
    setEmergencyContactFormData({
      name: currentUser?.emergencyContact?.name || '',
      relationship: currentUser?.emergencyContact?.relationship || '',
      phone: currentUser?.emergencyContact?.phone || '',
    });
    setIsEditingContactEmergency(false);
  }, [currentUser]);

  //-------------------------------------------------------
  // La lógica de logout ahora está centralizada en el hook useLogout

  const handleAddFamilyMember = useCallback(() => {
    // Esta función se llamará desde el contenedor para mostrar el formulario
    // La implementación se hará en el contenedor
  }, []);

  const handleAddVehicle = useCallback(() => {
    // Navigation to add vehicle screen will be implemented here
  }, []);

  // Función para recargar los datos del perfil
  const refreshProfile = useCallback(async () => {
    if (userId && token) {
      const response = await memberService.getMemberById(userId, token);

      if (response.success && response.data) {
        updateProfile(response.data);
      } else {
        console.error('Error reloading member:', response.error);
        Alert.alert(
          'Error',
          response.error || 'Ocurrió un error al cargar la información del perfil.',
          [
            {
              text: 'Aceptar',
              style: 'default',
            },
          ],
        );
      }
    }
  }, [userId, token, updateProfile]);

  return {
    // State
    isEditing,
    formData,
    currentUser,
    profile,
    isEditingContactEmergency,
    emergencyContactFormData,

    // Handlers
    handleInputChange,
    handleEmergencyContactChange,
    handleSave,
    handleSaveContactEmergency,
    handleEdit,
    handleEditContactEmergency,
    handleCancel,
    handleCancelContactEmergency,
    handleLogout,
    handleAddVehicle,
    handleAddFamilyMember,
    refreshProfile,
  };
};

export default useProfile;
