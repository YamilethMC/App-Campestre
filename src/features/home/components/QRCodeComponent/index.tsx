import React from 'react';
import { View, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useProfileStore } from '../../../profile/store/useProfileStore';
import { COLORS } from '../../../../shared/theme/colors';

interface QRCodeComponentProps {
  size?: number;
  memberId?: string;
  memberCode?: number | string;
}

const QRCodeComponent: React.FC<QRCodeComponentProps> = ({
  size = 200,
  memberId,
  memberCode
}) => {
  const { profile } = useProfileStore();
  const actualMemberCode = memberCode || profile?.memberCode;
  const actualMemberId = memberId || profile?.id;

  // Data para el código QR - solo el memberCode del socio
  const qrData = actualMemberCode?.toString() || actualMemberId?.toString() || '';

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <QRCode
        value={qrData}
        size={size - 20} // Ajustar tamaño para el padding
        backgroundColor="white"
        color={COLORS.primaryExtraDark}
        ecl="H" // Error correction level alto para mejor lectura
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#dae1e7',
  },
});

export default QRCodeComponent;