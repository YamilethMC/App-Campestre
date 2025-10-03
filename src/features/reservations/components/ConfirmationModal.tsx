import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import Modal from '../../../shared/components/Modal/Modal';
import { COLORS } from '../../../shared/theme/colors';

interface ConfirmationModalProps {
  visible: boolean;
  onClose: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ visible, onClose }) => {
  return (
    <Modal
      visible={visible}
      confirmText="Aceptar"
      onConfirm={onClose}
      onCancel={onClose}
      showCancelButton={false}
      containerStyle={{ justifyContent: 'center', alignItems: 'center' }}
    >
      <View style={{ alignItems: 'center', padding: 20 }}>
        <View style={{ 
          width: 80, 
          height: 80, 
          borderRadius: 40, 
          backgroundColor: COLORS.success + '20', 
          justifyContent: 'center', 
          alignItems: 'center',
          marginBottom: 16
        }}>
          <Ionicons name="checkmark-circle" size={50} color={COLORS.success} />
        </View>
        
        <Text style={{ 
          fontSize: 20, 
          fontWeight: 'bold', 
          color: COLORS.gray800, 
          textAlign: 'center',
          marginBottom: 8
        }}>
          ¡Reserva confirmada exitosamente!
        </Text>
        
        <Text style={{ 
          fontSize: 16, 
          color: COLORS.gray600, 
          textAlign: 'center',
          lineHeight: 22
        }}>
          Tu reserva ha sido registrada en el sistema.
          ¡Disfruta de tu servicio!
        </Text>
      </View>
    </Modal>
  );
};