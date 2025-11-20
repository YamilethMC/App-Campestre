import { useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import useLogout from '../../../hooks/useLogout';
import { useAuthStore } from '../../../store';
import useMessages from '../hooks/useMessages';
import { updateProfileData, userProfile } from '../interfaces/interfaces';
import { memberService } from '../services/memberService';
import { useProfileStore } from '../store/useProfileStore';

export const useProfile = () => {
  const navigation = useNavigation();
  const { profile, updateProfile } = useProfileStore();
  const { handleLogout } = useLogout();
  const messages = useMessages();
  
  const { userId, token } = useAuthStore();

  const currentUser = profile as userProfile | null;
  
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingContactEmergency, setIsEditingContactEmergency] = useState(false);

  useEffect(() => {
    const loadMember = async () => {
      try {
        if (userId && token) {
          const data = await memberService.getMemberById(userId, token);
          if (!data) {
            console.log("Miembro no encontrado");
          } else {
            updateProfile(data);
          }
        }
      } catch (err) {
        console.log('Error loading member:', err);
      }
    };

    loadMember();
  }, [userId, token, updateProfile]);


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

  //-------------------------------------------------------
  // La lógica de logout ahora está centralizada en el hook useLogout

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
  };
};

export default useProfile;
