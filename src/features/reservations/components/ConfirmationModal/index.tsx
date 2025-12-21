import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import Modal from '../../../../shared/components/Modal/Modal';
import { COLORS } from '../../../../shared/theme/colors';
import useMessages from '../../hooks/useMessages';
import { ConfirmationModalProps } from '../../interfaces/reservationInterface';
import styles from './Style';

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ visible, onClose }) => {
  const { messages } = useMessages();
  return (
    <Modal
      visible={visible}
      confirmText="Aceptar"
      onConfirm={onClose}
      onCancel={onClose}
      showCancelButton={false}
      containerStyle={styles.modalConfirmation}
      confirmButtonStyle={{
        width: '100%', // Reducir ligeramente el ancho
        paddingVertical: 14, // Reducir la altura
        backgroundColor: COLORS.primary,
        borderRadius: 3,
        alignItems: 'center',
        alignSelf: 'center', // Centrar el botón
      }}
      confirmButtonTextStyle={{
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.white,
      }}
      buttonsContainerStyle={{
        alignItems: 'center',
        paddingVertical: 5, // Reducir espaciado vertical
        marginTop: -30, // Juntar más con el contenido anterior
      }}
      contentStyle={{
        alignItems: 'center',
        padding: 20,
      }}
    >
      <View style={styles.viewContainer}>
        <View style={styles.ViewComponent}>
          <Ionicons name="checkmark-circle" size={50} color={COLORS.success} />
        </View>

        <Text style={styles.textTitle}>{messages.CONFIRMATIONMODAL.TITLE}</Text>

        <Text style={styles.textSubTitle}>{messages.CONFIRMATIONMODAL.MESSAGE}</Text>
      </View>
    </Modal>
  );
};
