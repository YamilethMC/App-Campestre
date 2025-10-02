import { useNavigation } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { useAuthStore } from '../../../store/index';
import useMessages from '../hooks/useMessages';
import { updateProfileData, userProfile } from '../interfaces/interfaces';
import { useProfileStore } from '../store/useProfileStore';

export const useProfile = () => {
  const navigation = useNavigation();
  const { profile, updateProfile, clearProfile } = useProfileStore();
  const { clearAuth } = useAuthStore();
  const { messages } = useMessages();
  
  const currentUser = profile as userProfile | null;
  
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingContactEmergency, setIsEditingContactEmergency] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    address: currentUser?.address || '',
    membershipType: currentUser?.membershipType || 'Premium',
  });
  const [emergencyContactFormData, setEmergencyContactFormData] = useState({
    name: currentUser?.emergencyContact?.name || '',
    relationship: currentUser?.emergencyContact?.relationship || '',
    phone: currentUser?.emergencyContact?.phone || '',
  });

  const handleInputChange = useCallback((field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const handleSave = useCallback(() => {
    if (currentUser) {
      const updateData: updateProfileData = {
        ...formData,
        memberSince: currentUser.memberSince ? new Date(currentUser.memberSince) : new Date()
      };
      updateProfile(updateData);
      setIsEditing(false);
    }
  }, [currentUser, formData, updateProfile]);

  const handleEmergencyContactChange = useCallback((field: string, value: string) => {
    setEmergencyContactFormData(prev => ({
      ...prev,
      [field]: value
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
        }
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
      email: currentUser?.email || '',
      membershipType: currentUser?.membershipType || 'Premium',
      phone: currentUser?.phone || '',
      address: currentUser?.address || '',
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

  const handleLogout = useCallback(async () => {
    try {
      await clearAuth();
      clearProfile();
      // Usamos una aserción de tipo para evitar el error de TypeScript
      (navigation as any).navigate('Auth');
    } catch (error) {
      Alert.alert('Error', messages.CONTAINER.TEXT_LOGOUT);
      console.error('Logout error:', error);
    }
  }, [clearAuth, clearProfile, navigation]);

  const handleAddVehicle = useCallback(() => {
    // Navigation to add vehicle screen will be implemented here
  }, []);

  const handleAddFamilyMember = useCallback(() => {
    // Navigation to add family member screen will be implemented here
  }, []);

  return {
    // State
    isEditing,
    formData,
    currentUser,
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
  };
};

export default useProfile;
