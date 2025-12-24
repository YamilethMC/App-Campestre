import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../../../shared/theme/colors';
import { MemberData } from '../../services/homeService';
import QRCodeComponent from '../QRCodeComponent';
import QRModal from '../QRModal';
import styles from './Style';

interface MyQRCodeProps {
  memberData: MemberData | null;
}

const MyQRCode: React.FC<MyQRCodeProps> = ({ memberData }) => {
  const [qrModalVisible, setQrModalVisible] = useState(false);
  console.log('Member data in QR component:', memberData);
  const dateOfAdmission = memberData?.dateOfAdmission
    ? new Date(memberData.dateOfAdmission).getUTCFullYear()
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
            memberCode={memberData?.memberCode}
          />
        </View>

        <Text style={styles.userName}>{(memberData?.user?.name || 'Nombre') + ' ' + (memberData?.user?.lastName || 'del Socio')}</Text>
        <Text style={styles.memberText}>Socio #{memberData?.memberCode ?? 'N/A'} | Desde {dateOfAdmission}</Text>

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
        memberData={memberData}
      />
    </View>
  );
};

export default MyQRCode;