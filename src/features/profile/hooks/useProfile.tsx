import { useNavigation } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { useAuthStore } from '../../../store/index';
import { updateProfileData, userProfile } from '../interfaces/interfaces';
import { useProfileStore } from '../store/useProfileStore';

export const useProfile = () => {
  const navigation = useNavigation();
  const { profile, updateProfile, clearProfile } = useProfileStore();
  const { clearAuth } = useAuthStore();
  
  const currentUser = profile as userProfile | null;
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    membershipType: currentUser?.membershipType || 'Premium',
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

  const handleEdit = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleCancel = useCallback(() => {
    setFormData({
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      membershipType: currentUser?.membershipType || 'Premium',
    });
    setIsEditing(false);
  }, [currentUser]);

  const handleLogout = useCallback(async () => {
    try {
      await clearAuth();
      clearProfile();
      // Usamos una aserción de tipo para evitar el error de TypeScript
      (navigation as any).navigate('Login');
    } catch (error) {
      Alert.alert('Error', 'No se pudo cerrar la sesión');
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
    
    // Handlers
    handleInputChange,
    handleSave,
    handleEdit,
    handleCancel,
    handleLogout,
    handleAddVehicle,
    handleAddFamilyMember,
  };
};

export default useProfile;
