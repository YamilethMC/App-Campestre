import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import Button from '../../../shared/components/Button/Button';

//Style 
import styles from './Style';

// Components
import EmergencyContact from '../components/EmergencyContact/EmergencyContact';
import FamilyMembers from '../components/FamilyMembers/FamilyMembers';
import PersonalInfo from '../components/PersonalInfo/PersonalInfo';
import ProfileHeader from '../components/ProfileHeader/ProfileHeader';
import SectionCard from '../components/SectionCard/SectionCard';
import Vehicles from '../components/Vehicles/Vehicles';

import useMessages from '../hooks/useMessages';
import useProfile from '../hooks/useProfile';


const ProfileContainer = () => {
  const { messages } = useMessages();
  
  const {
    isEditing,
    formData,
    currentUser,
    handleInputChange,
    handleSave,
    handleEdit,
    handleCancel,
    handleLogout,
    handleAddVehicle,
    handleAddFamilyMember,
  } = useProfile();

  if (!currentUser) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>
          No se encontraron datos del usuario
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Header */}
        <ProfileHeader
          name={currentUser?.name || 'Usuario'}
          memberId={currentUser?.id || 'N/A'}
          membershipType={currentUser?.membershipType || 'Premium'}
          isActive={true}
          style={styles.profileHeader}
        />

        {/* Información personal */}
        <SectionCard 
          title={messages.PERSONAL.TITLE}
          rightAction={
            isEditing ? (
              <View style={styles.editActions}>
                <Button 
                  title={messages.CONTAINER.CANCEL}
                  onPress={handleCancel}
                  variant="secondary"
                  style={[styles.actionButton, styles.cancelButton]}
                  titleStyle={styles.cancelButtonText}
                />
                <View style={styles.buttonSpacer} />
                <Button 
                  title={messages.CONTAINER.SAVE}
                  onPress={handleSave}
                  variant="primary"
                  style={[styles.actionButton, styles.saveButton]}
                />
              </View>
            ) : (
              <Button 
                title={messages.CONTAINER.EDIT}
                onPress={handleEdit}
                variant="primary"
                style={styles.editButton}
              />
            )
          }
        >
          <PersonalInfo
            name={formData.name}
            email={formData.email}
            //phone={formData.phone}
            //address={formData.address}
            memberSince={currentUser?.memberSince || new Date()}
            isEditing={isEditing}
            onNameChange={(text) => handleInputChange('name', text)}
            onEmailChange={(text) => handleInputChange('email', text)}
            onPhoneChange={(text) => handleInputChange('phone', text)}
          />
        </SectionCard>

        {/* Familiares */}
        <SectionCard title={messages.FAMILY.TITLE}>
          <FamilyMembers 
            members={currentUser?.familyMembers || []} 
            onAddMember={handleAddFamilyMember} 
          />
        </SectionCard>

        {/* Vehículos */}
        <SectionCard title={messages.VEHICLES.TITLE}>
          <Vehicles 
            vehicles={currentUser?.vehicles || []}
            onAddVehicle={handleAddVehicle}
          />
        </SectionCard>

        {/* Contacto de emergencia */}
        <SectionCard title={messages.EMERGENCY.TITLE}>
          <EmergencyContact 
            name={currentUser?.emergencyContact?.name || 'No especificado'}
            relationship={currentUser?.emergencyContact?.relationship || 'No especificado'}
            phone={currentUser?.emergencyContact?.phone || 'No especificado'}
            onEdit={() => {}}
          />
        </SectionCard>

        {/* Logout Button */}
        <View style={styles.logoutContainer}>
          <Button
            title="Cerrar sesión"
            onPress={handleLogout}
            variant="danger"
            style={styles.logoutButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileContainer;