import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import QRModal from '../QRModal';
import { COLORS } from '../../../../shared/theme/colors';
import { useAuthStore } from '../../../auth/store/useAuthStore';
import { MemberData } from '../../services/homeService';

interface HeaderProps {
  navigation?: any;
  memberData: MemberData | null;
}

const HomeHeader: React.FC<HeaderProps> = ({ navigation, memberData }) => {
  const { userId } = useAuthStore();
  const [showQRModal, setShowQRModal] = useState(false);

  const handleOpenQRModal = () => {
    setShowQRModal(true);
  };

  const handleCloseQRModal = () => {
    setShowQRModal(false);
  };

  const memberSinceYear = memberData?.dateOfAdmission
    ? new Date(memberData.dateOfAdmission).getFullYear()
    : '2020';

  return (
    <>
      <View style={styles.container}>
        <View style={styles.headerContent}>
          <View style={styles.userInfoContainer}>
            <Text style={styles.greetingText} numberOfLines={1}>
              ¡Hola, {memberData?.user?.name || 'Usuario'}!
            </Text>
            <Text style={styles.userInfoText}>
              Socio {memberData?.memberCode || userId || 'N/A'}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.qrButton}
            onPress={handleOpenQRModal}
            activeOpacity={0.8}
          >
            <Ionicons name="qr-code" size={22} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>

      <QRModal
        visible={showQRModal}
        onClose={handleCloseQRModal}
        memberData={memberData}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 24,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 6,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  userInfoContainer: {
    flex: 1,
    marginRight: 20,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.gray900,
    marginBottom: 4,
  },
  userInfoText: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: '600',
  },
  qrButton: {
    backgroundColor: COLORS.primary,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  modalContent: {
    alignItems: 'center',
    paddingVertical: 25,
  },
  qrPlaceholder: {
    width: 220,
    height: 220,
    backgroundColor: COLORS.gray100,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
    borderWidth: 1,
    borderColor: COLORS.gray300,
  },
  modalName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.gray900,
    marginBottom: 6,
    textAlign: 'center',
  },
  modalMemberId: {
    fontSize: 17,
    color: COLORS.primary,
    marginBottom: 12,
    fontWeight: '700',
  },
  modalDescription: {
    fontSize: 15,
    color: COLORS.gray600,
    textAlign: 'center',
    paddingHorizontal: 24,
  },
});

export default HomeHeader;