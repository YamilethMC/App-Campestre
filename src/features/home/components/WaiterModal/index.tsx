import React from 'react';
import { View, Text } from 'react-native';
import Modal from '../../../../shared/components/Modal/Modal';
import Button from '../../../../shared/components/Button/Button';
import { COLORS } from '../../../../shared/theme/colors';

interface WaiterModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm?: () => void;
}

const WaiterModal: React.FC<WaiterModalProps> = ({ visible, onClose, onConfirm }) => {
  const handleConfirm = () => {
    // Call the parent function to handle the waiter call with toast
    onConfirm?.();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      title="Llamar Mesero"
      onCancel={onClose}
      onConfirm={handleConfirm}
      confirmText="Sí, llamar mesero"
      cancelText="Cancelar"
      buttonsContainerStyle={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
      }}
      confirmButtonStyle={{
        flex: 1,
        paddingVertical: 15, // Mayor altura
        backgroundColor: COLORS.primary, // Usar color primario de la app
        borderRadius: 8,
        marginRight: 5,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      confirmButtonTextStyle={{
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
      }}
      cancelButtonStyle={{
        flex: 1,
        paddingVertical: 15, // Mayor altura
        backgroundColor: COLORS.gray200, // Usar color gris de la app
        borderRadius: 8,
        marginLeft: 5,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      cancelButtonTextStyle={{
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.primary, // Texto en color primario
        textAlign: 'center',
      }}
    >
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 16, color: COLORS.gray700, textAlign: 'center' }}>
          ¿Deseas que un mesero se acerque a tu ubicación actual?
        </Text>
      </View>
    </Modal>
  );
};

export default WaiterModal;
