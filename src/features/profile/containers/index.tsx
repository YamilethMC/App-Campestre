import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, View, Alert } from 'react-native';
import Button from '../../../shared/components/Button/Button';
import { useAuthStore } from '../../../store';

//Style
import styles from './Style';

// Components
import EmergencyContact from '../components/EmergencyContact';
import FamilyMembers from '../components/FamilyMembers';
import PersonalInfo from '../components/PersonalInfo';
import ProfileHeader from '../components/ProfileHeader';
import SectionCard from '../components/SectionCard';
import Vehicles from '../components/Vehicles';
import AddFamilyMemberForm from '../components/AddFamilyMemberForm';

import useMessages from '../hooks/useMessages';
import useProfile from '../hooks/useProfile';


const ProfileContainer = () => {
  const { messages } = useMessages();
  const { userId } = useAuthStore();

  const {
    isEditing,
    isEditingContactEmergency,
    profile,
    formData,
    currentUser,
    emergencyContactFormData,
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
  } = useProfile();

  const [showAddFamilyForm, setShowAddFamilyForm] = useState(false);

  if (!currentUser) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>
          {messages.CONTAINER.DATA_USER}
        </Text>
      </SafeAreaView>
    );
  }

  if (showAddFamilyForm && userId) {
    return (
      <AddFamilyMemberForm
        memberId={parseInt(userId.toString())}
        onCancel={() => setShowAddFamilyForm(false)}
        onAddSuccess={() => {
          setShowAddFamilyForm(false);
          // Recargar los datos del perfil para actualizar la lista de familiares
          refreshProfile();
        }}
      />
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
          name={profile?.name || messages.CONTAINER.USER}
          lastName={profile?.lastName || ''}
          id={profile?.id || 'N/A'}
          memberCode={profile?.memberCode}
          membershipType={profile?.membershipType || 'Premium'}
          isActive={true}
          style={styles.profileHeader}
        />

        {/* Información personal */}
        <SectionCard
          title={messages.PERSONAL.TITLE}
          rightAction={
            isEditing ? (
              null
            ) : (
              <Button
                text={messages.CONTAINER.EDIT}
                onPress={handleEdit}
                variant="primary"
                style={styles.editButton}
              />
            )
          }
        >
          <PersonalInfo
            id={profile?.id || ''}
            name={profile?.name || ''}
            lastName={profile?.lastName || ''}
            email={profile?.email}
            phone={profile?.phone}
            address={profile?.address}
            street={profile?.street}
            externalNumber={profile?.externalNumber}
            internalNumber={profile?.internalNumber}
            colony={profile?.colony}
            zipCode={profile?.zipCode}
            city={profile?.city}
            state={profile?.state}
            country={profile?.country}
            memberSince={profile?.memberSince || new Date()}
            isEditing={isEditing}
            onNameChange={(text) => handleInputChange('name', text)}
            onlastNameChange={(text) => handleInputChange('lastName', text)}
            onEmailChange={(text) => handleInputChange('email', text)}
            onPhoneChange={(text) => handleInputChange('phone', text)}
            onAddressChange={(text) => handleInputChange('address', text)}
            onStreetChange={(text) => handleInputChange('street', text)}
            onexternalNumberChange={(text) => handleInputChange('externalNumber', text)}
            oninternalNumberChange={(text) => handleInputChange('internalNumber', text)}
            oncolonyChange={(text) => handleInputChange('colony', text)}
            onzipCodeChange={(text) => handleInputChange('zipCode', text)}
            oncityChange={(text) => handleInputChange('city', text)}
            onstateChange={(text) => handleInputChange('state', text)}
            oncountryChange={(text) => handleInputChange('country', text)}
            />
            { isEditing && (
              <View style={styles.editActions}>
                <Button
                  text={messages.CONTAINER.CANCEL}
                  onPress={handleCancel}
                  variant="secondary"
                  style={[styles.actionButton, styles.cancelButton]}
                  titleStyle={styles.cancelButtonText}
                />
                <View style={styles.buttonSpacer} />
                <Button
                  text={messages.CONTAINER.SAVE}
                  onPress={handleSave}
                  variant="primary"
                  style={[styles.actionButton, styles.saveButton]}
                />
              </View>
            )}

        </SectionCard>

        {/* Familiares */}
        <SectionCard title={messages.FAMILY.TITLE}>
          <FamilyMembers
            members={currentUser?.familyMembers || []}
            onAddMember={() => setShowAddFamilyForm(true)}
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
        <SectionCard title={messages.EMERGENCY.TITLE}
          rightAction={
            isEditingContactEmergency ? (
              null
            ) : (
              <Button
                text={messages.CONTAINER.EDIT}
                onPress={handleEditContactEmergency}
                variant="primary"
                style={styles.editButton}
              />
            )
          }
          >
          <EmergencyContact
            name={emergencyContactFormData.name}
            relationship={emergencyContactFormData.relationship}
            phone={emergencyContactFormData.phone}

            isEditingContactEmergency={isEditingContactEmergency}
            onNameChange={(text) => handleEmergencyContactChange('name', text)}
            onRelationshipChange={(text) => handleEmergencyContactChange('relationship', text)}
            onPhoneChange={(text) => handleEmergencyContactChange('phone', text)}
          />
          { isEditingContactEmergency && (
            <View style={styles.editActions}>
              <Button
                text={messages.CONTAINER.CANCEL}
                onPress={handleCancelContactEmergency}
                variant="secondary"
                style={[styles.actionButton, styles.cancelButton]}
                titleStyle={styles.cancelButtonText}
              />
              <View style={styles.buttonSpacer} />
              <Button
                text={messages.CONTAINER.SAVE}
                onPress={handleSaveContactEmergency}
                variant="primary"
                style={[styles.actionButton, styles.saveButton]}
              />
            </View>
          )}
        </SectionCard>

        {/* Logout Button */}
        <View style={styles.logoutContainer}>
          <Button
            text={messages.CONTAINER.LOGOUT}
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