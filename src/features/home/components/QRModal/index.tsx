import React from 'react';
import { Text } from 'react-native';
import Modal from '../../../../shared/components/Modal/Modal';
import { COLORS } from '../../../../shared/theme/colors';
import { MemberData } from '../../services/homeService';
import QRCodeComponent from '../QRCodeComponent';

interface QRModalProps {
  visible: boolean;
  onClose: () => void;
  memberData: MemberData | null;
}

const QRModal: React.FC<QRModalProps> = ({
  visible,
  onClose,
  memberData
}) => {
  const dateOfAdmission = memberData?.dateOfAdmission
    ? new Date(memberData.dateOfAdmission).getUTCFullYear()
    : '2020';

  return (
    <Modal
      visible={visible}
      title="MI QR DE ACCESO"
      onCancel={onClose}
      onConfirm={onClose}
      confirmText="Cerrar"
      showCancelButton={false}
      confirmButtonStyle={{
        width: '100%',
        paddingVertical: 14,
        backgroundColor: COLORS.gray400,
        borderRadius: 3,
        alignItems: 'center',
        marginHorizontal: -20,
        marginBottom: -20,
      }}
      confirmButtonTextStyle={{
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.white,
      }}
      buttonsContainerStyle={{
        paddingHorizontal: 0,
        paddingVertical: 0,
        marginHorizontal: 20,
        marginBottom: 20,
      }}
      contentStyle={{
        alignItems: 'center',
        padding: 10
      }}
    >
      {/* Componente QR real con el memberCode del socio */}
      <QRCodeComponent
        size={200}
        memberCode={memberData?.memberCode}
      />

      {/* Nombre del socio en negrita */}
      <Text style={{
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.gray800,
        marginBottom: 5,
        marginTop: 15,
      }}>
        {(memberData?.user?.name || 'Nombre') + ' ' + (memberData?.user?.lastName || 'del Socio')}
      </Text>

      {/* Tipo de socio y ID */}
      <Text style={{
        fontSize: 13,
        fontWeight: '500',
        color: COLORS.gray500,
        textAlign: 'center',
        letterSpacing: 0.5,
        marginBottom: 15,
      }}>
        SOCIO TITULAR · #{memberData?.memberCode || memberData?.id}
      </Text>

      {/* Miembro desde */}
      {/* <Text style={{
        fontSize: 14,
        color: COLORS.gray500,
        marginBottom: 15
      }}>
        Socio desde {dateOfAdmission}
      </Text>*/}

      {/* Leyenda */}
      <Text style={{
        fontSize: 14,
        color: COLORS.gray700,
        textAlign: 'center',
        fontStyle: 'italic'
      }}>
        Presenta este código en recepción o cualquier área del club
      </Text>
    </Modal>
  );
};

export default QRModal;