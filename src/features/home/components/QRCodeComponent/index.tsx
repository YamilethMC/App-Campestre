import React from 'react';
import { StyleSheet, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { COLORS } from '../../../../shared/theme/colors';
import { useProfileStore } from '../../../profile/store/useProfileStore';

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
        backgroundColor={COLORS.white}
        color={COLORS.gray500}
        ecl="H" // Error correction level alto para mejor lectura
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.gray200,
  },
});

export default QRCodeComponent;