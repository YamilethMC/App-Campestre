import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, ScrollView, Text, View } from 'react-native';
import styles from './Style';

// Components
import AddFamilyMemberForm from '../../profile/components/AddFamilyMemberForm';
import GuestManagement from '../components/GuestManagement';
import GuestsModal from '../components/GuestsModal';
import MyQRCode from '../components/MyQRCode';
import { useMemberData } from '../hooks/useMemberData';

// Banner component
import BannerContainer from '../../banner';

// Modal from shared components
import Modal from '../../../shared/components/Modal/Modal';
import { useAuthStore } from '../../auth/store/useAuthStore';

const HomeScreen = () => {
  const { t } = useTranslation();
  const { userId } = useAuthStore();
  // State for guest pass form
  const [showGuestPassForm, setShowGuestPassForm] = useState(false);
  const [guestPassType, setGuestPassType] = useState<'INVITADO' | 'TEMPORAL'>('INVITADO'); // Track the type of guest pass to create

  // State for notification modal
  const [notificationModalVisible, setNotificationModalVisible] = useState(false);
  const [notificationTitle, setNotificationTitle] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');

  const showNotification = useCallback((title: string, message: string) => {
    setNotificationTitle(title);
    setNotificationMessage(message);
    setNotificationModalVisible(true);
  }, []);

  const hideNotification = useCallback(() => {
    setNotificationModalVisible(false);
  }, []);

  const handleShowGuestPassForm = useCallback(() => {
    setGuestPassType('INVITADO'); // Default to INVITADO for regular pass
    setShowGuestPassForm(true);
  }, []);

  const handleShowTempPassForm = useCallback(() => {
    setGuestPassType('TEMPORAL'); // Set type to TEMPORAL for temporary pass
    setShowGuestPassForm(true);
  }, []);

  const handleHideGuestPassForm = useCallback(() => {
    setShowGuestPassForm(false);
  }, []);

  // State for showing guests modal
  const [showGuestsModal, setShowGuestsModal] = useState(false);

  const { getMemberData, loading, memberData, deleteGuest } = useMemberData();
  const handleGuestPassSuccess = useCallback(async () => {
    // Refresh the member data to get updated passes available and guests
    if (userId) {
      await getMemberData(parseInt(userId));
    }
    setShowGuestPassForm(false);
  }, [userId, getMemberData]);

  const handleViewGuests = useCallback(async () => {
    const { token } = useAuthStore.getState();
    if (!userId || !token) {
      Alert.alert('Error', 'No hay sesión activa.');
      return;
    }

    // Abrir el modal inmediatamente (member data is already loaded)
    setShowGuestsModal(true);
  }, [userId]);

  const handleVehicleSelect = useCallback(
    (vehicleId: string, vehicleName: string) => {
      showNotification(
        'Solicitud exitosa',
        `Auto "${vehicleName}" solicitado correctamente. Llega en 5 min`,
      );
    },
    [showNotification],
  );

  const handleCallWaiter = useCallback(() => {
    showNotification('Mesero llamado', 'El mesero llegará en 7 min');
  }, [showNotification]);

  // Load member data on mount
  useEffect(() => {
    const loadData = async () => {
      if (userId) {
        await getMemberData(parseInt(userId));
      }
    };
    loadData();
  }, [userId, getMemberData]);

  if (showGuestPassForm && userId) {
    // Render the Add Family Member form instead of home content when form is active
    return (
      <AddFamilyMemberForm
        memberId={parseInt(userId || '0')}
        guestType={guestPassType} // Pass the guest type to the form
        onCancel={handleHideGuestPassForm}
        onAddSuccess={handleGuestPassSuccess}
      />
    );
  }

  // Show loading state until member data is loaded
  if (loading && !memberData) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text>Cargando datos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/*<Header memberData={memberData} />*/}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.cardsContainer}>
          <BannerContainer />
          {/*<QuickActions
            onVehicleSelect={handleVehicleSelect}
            onWaiterCall={handleCallWaiter}
          />
          <ActiveOrders />*/}
          <MyQRCode memberData={memberData} />
          <GuestManagement
            onNewPassPress={handleShowGuestPassForm}
            onNewTempPassPress={handleShowTempPassForm}
            onViewGuestsPress={handleViewGuests}
            memberData={memberData}
          />
          {/*<MyRewards />*/}
        </View>
      </ScrollView>

      {/* Notification Modal */}
      <Modal
        visible={notificationModalVisible}
        title={notificationTitle}
        message={notificationMessage}
        onConfirm={hideNotification}
        confirmText="Aceptar"
        showCancelButton={false}
        confirmButtonStyle={{
          width: '100%',
          paddingVertical: 15,
        }}
        buttonsContainerStyle={{
          paddingHorizontal: 10,
          paddingVertical: 10,
        }}
      />

      {/* Guests Modal using custom component */}
      <GuestsModal
        visible={showGuestsModal}
        guests={memberData?.guests || []}
        loading={loading}
        onClose={() => setShowGuestsModal(false)}
        onDeleteGuest={deleteGuest}
      />
    </View>
  );
};

export default HomeScreen;
