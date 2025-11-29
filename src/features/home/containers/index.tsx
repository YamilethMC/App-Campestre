import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, ScrollView, View } from 'react-native';
import styles from './Style';

// Components
import ActiveOrders from '../components/ActiveOrders';
import GuestManagement from '../components/GuestManagement';
import GuestsModal from '../components/GuestsModal';
import Header from '../components/Header';
import MyQRCode from '../components/MyQRCode';
import MyRewards from '../components/MyRewards';
import QuickActions from '../components/QuickActions';
import AddFamilyMemberForm from '../../profile/components/AddFamilyMemberForm';
import { useMemberData } from '../hooks/useMemberData';

// Modal from shared components
import Modal from '../../../shared/components/Modal/Modal';
import { useAuthStore } from '../../auth/store/useAuthStore';

const HomeScreen = () => {
  const { t } = useTranslation();
  const { userId } = useAuthStore();

  // State for guest pass form
  const [showGuestPassForm, setShowGuestPassForm] = useState(false);

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
    setShowGuestPassForm(true);
  }, []);

  const handleHideGuestPassForm = useCallback(() => {
    setShowGuestPassForm(false);
  }, []);

  const handleGuestPassSuccess = useCallback(() => {
    setShowGuestPassForm(false);
  }, []);

  // State for showing guests modal
  const [showGuestsModal, setShowGuestsModal] = useState(false);

  const { getMemberData, loading, memberData } = useMemberData();

  const handleViewGuests = useCallback(async () => {
    const { userId, token } = useAuthStore.getState();
    if (!userId || !token) {
      Alert.alert('Error', 'No hay sesión activa.');
      return;
    }

    const data = await getMemberData(parseInt(userId), token);
    if (data) {
      setShowGuestsModal(true);
    }
  }, [getMemberData]);

  const handleVehicleSelect = useCallback((vehicleId: string, vehicleName: string) => {
    showNotification("Solicitud exitosa", `Auto "${vehicleName}" solicitado correctamente. Llega en 5 min`);
  }, [showNotification]);

  const handleCallWaiter = useCallback(() => {
    showNotification("Mesero llamado", "El mesero llegará en 7 min");
  }, [showNotification]);

  if (showGuestPassForm && userId) {
    // Render the Add Family Member form instead of home content when form is active
    return (
      <AddFamilyMemberForm
        memberId={parseInt(userId || '0')}
        onCancel={handleHideGuestPassForm}
        onAddSuccess={handleGuestPassSuccess}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.cardsContainer}>
          <QuickActions
            onVehicleSelect={handleVehicleSelect}
            onWaiterCall={handleCallWaiter}
          />
          <ActiveOrders />
          <MyQRCode />
          <GuestManagement
            onNewPassPress={handleShowGuestPassForm}
            onViewGuestsPress={handleViewGuests}
          />
          <MyRewards />
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
      />
    </View>
  );
};

export default HomeScreen;
