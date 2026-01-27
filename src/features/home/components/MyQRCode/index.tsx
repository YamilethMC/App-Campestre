import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { MemberData } from '../../services/homeService';
import QRCodeComponent from '../QRCodeComponent';
import QRModal from '../QRModal';
import styles from './Style';

interface MyQRCodeProps {
  memberData: MemberData | null;
}

const MyQRCode: React.FC<MyQRCodeProps> = ({ memberData }) => {
  const [qrModalVisible, setQrModalVisible] = useState(false);

  const handleCardPress = () => {
    setQrModalVisible(true);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handleCardPress} activeOpacity={0.7}>
      {/* Título centrado */}
      <Text style={styles.cardTitle}>MI QR DE ACCESO</Text>

      {/* QR Code enmarcado */}
      <View style={styles.qrContainer}>
        <View style={styles.qrFrame}>
          <QRCodeComponent
            size={120}
            memberCode={memberData?.memberCode}
          />
        </View>
      </View>

      {/* Información del socio */}
      <View style={styles.memberInfo}>
        <Text style={styles.memberName}>
          {(memberData?.user?.name || 'Nombre') + ' ' + (memberData?.user?.lastName || 'del Socio')}
        </Text>
        <Text style={styles.memberDetails}>
          SOCIO TITULAR · #{memberData?.memberCode ?? 'N/A'}
        </Text>
      </View>

      <QRModal
        visible={qrModalVisible}
        onClose={() => setQrModalVisible(false)}
        memberData={memberData}
      />
    </TouchableOpacity>
  );
};

export default MyQRCode;