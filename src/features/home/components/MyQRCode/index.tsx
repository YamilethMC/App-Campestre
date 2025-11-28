import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../../../../shared/theme/colors';
import { Ionicons } from '@expo/vector-icons';
import QRModal from '../QRModal';
import { useProfileStore } from '../../../profile/store/useProfileStore';
import QRCodeComponent from '../QRCodeComponent';
import styles from './Style';

const MyQRCode: React.FC = () => {
  const { profile } = useProfileStore();
  const [qrModalVisible, setQrModalVisible] = useState(false);
  const memberSinceYear = profile?.memberSince
    ? new Date(profile.memberSince.toString()).getFullYear()
    : '2020';

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Ionicons name="qr-code-outline" size={24} color={COLORS.primary} />
        <Text style={styles.cardTitle}>Mi código QR</Text>
      </View>

      <View style={styles.qrContainer}>
        {/* Código QR real en la tarjeta principal */}
        <View style={styles.qrPlaceholderContainer}>
          <QRCodeComponent
            size={100}
            memberCode={profile?.memberCode}
          />
        </View>

        <Text style={styles.userName}>{(profile?.name || 'Nombre') + ' ' + (profile?.lastName || 'del Socio')}</Text>
        <Text style={styles.memberText}>Socio #{profile?.memberCode ?? profile?.id ?? 'N/A'} | Desde {memberSinceYear}</Text>

        <TouchableOpacity
          style={styles.showQrButton}
          onPress={() => setQrModalVisible(true)}
        >
          <Text style={styles.showQrButtonText}>Mostrar QR completo</Text>
        </TouchableOpacity>
      </View>

      <QRModal
        visible={qrModalVisible}
        onClose={() => setQrModalVisible(false)}
      />
    </View>
  );
};

export default MyQRCode;