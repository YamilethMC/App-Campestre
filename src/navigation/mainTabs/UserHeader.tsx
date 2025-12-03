import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import Modal from '../../shared/components/Modal/Modal';
import { COLORS } from '../../shared/theme/colors';
import { useProfile } from '../../features/profile/store/useProfileStore';
import { useAuthStore } from '../../features/auth/store/useAuthStore';

interface UserHeaderProps {
  navigation?: any;
}

const UserHeader: React.FC<UserHeaderProps> = ({ navigation }) => {
  const { profile } = useProfile();
  const { userId } = useAuthStore();
  const [showQRModal, setShowQRModal] = useState(false);

  const handleOpenQRModal = () => {
    setShowQRModal(true);
  };

  const handleCloseQRModal = () => {
    setShowQRModal(false);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.headerContent}>
          <View style={styles.leftContainer}>
            <Text style={styles.greetingText} numberOfLines={1}>
              ¡Hola, {profile?.name || 'Usuario'}!
            </Text>
            <Text style={styles.userInfoText}>
              Socio {profile?.memberCode || userId || 'N/A'}
            </Text>
          </View>
          <View style={styles.rightContainer}>
            <TouchableOpacity 
              style={styles.qrButton} 
              onPress={handleOpenQRModal}
              activeOpacity={0.7}
            >
              <Ionicons name="qr-code" size={24} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Modal
        visible={showQRModal}
        title="Mi código QR"
        onCancel={handleCloseQRModal}
        onConfirm={handleCloseQRModal}
        confirmText="Cerrar"
        showCancelButton={false}
      >
        <View style={styles.modalContent}>
          {/* Placeholder for QR code */}
          <View style={styles.qrPlaceholder}>
            <Ionicons name="qr-code" size={100} color={COLORS.primary} />
          </View>
          
          <Text style={styles.modalName}>{profile?.name || 'Nombre del Socio'}</Text>
          <Text style={styles.modalMemberId}>Socio {profile?.memberCode || userId || 'N/A'}</Text>
          <Text style={styles.modalDescription}>
            Presenta este código en recepción o cualquier área del club
          </Text>
        </View>
      </Modal>
    </>
  );
};

// Styles for the user header component
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primaryDark,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
    height: 130,
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  leftContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    marginTop: 25,
  },
  rightContainer: {
    width: 50,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginTop: 25,
  },
  greetingText: {
    fontSize: 28,
    fontWeight: '600',
    color: COLORS.white,
  },
  userInfoText: {
    fontSize: 16,
    fontWeight: '400',
    color: COLORS.white,
  },
  qrButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  qrPlaceholder: {
    width: 200,
    height: 200,
    backgroundColor: COLORS.gray100,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.gray300,
  },
  modalName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.gray900,
    marginBottom: 5,
    textAlign: 'center',
  },
  modalMemberId: {
    fontSize: 16,
    color: COLORS.gray600,
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 14,
    color: COLORS.gray500,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default UserHeader;