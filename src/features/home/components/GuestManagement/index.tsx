import React, { useState } from 'react';
import { Modal as RNModal, Text, TouchableOpacity, View } from 'react-native';
import Button from '../../../../shared/components/Button/Button';
import { MemberData } from '../../services/homeService';
import styles from './Style';

interface GuestManagementProps {
  onNewPassPress: () => void;
  onNewTempPassPress: () => void;
  onViewGuestsPress: () => void;
  memberData: MemberData | null;
}

const GuestManagement: React.FC<GuestManagementProps> = ({ onNewPassPress, onNewTempPassPress, onViewGuestsPress, memberData }) => {
  const [showGuestRestrictionModal, setShowGuestRestrictionModal] = useState(false);

  const isSocioOrDependiente = memberData?.user?.type === 'SOCIO' || memberData?.user?.type === 'DEPENDIENTE';
  const passesAvailable = memberData?.passesAvailable ? parseInt(memberData.passesAvailable) : 2;
  const hasPassesAvailable = passesAvailable > 0;

  const handleNewPassPress = () => {
    if (isSocioOrDependiente && hasPassesAvailable) {
      onNewPassPress();
    } else {
      setShowGuestRestrictionModal(true);
    }
  };

  const handleNewTempPassPress = () => {
    if (isSocioOrDependiente) {
      onNewTempPassPress();
    } else {
      setShowGuestRestrictionModal(true);
    }
  };

  const handleViewGuestsPress = () => {
    if (isSocioOrDependiente) {
      onViewGuestsPress();
    } else {
      setShowGuestRestrictionModal(true);
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>GESTIÓN DE INVITADOS</Text>

      <View style={styles.guestSection}>
        {isSocioOrDependiente ? (
          <Text style={styles.pasesAvailableText}>Cuenta con {passesAvailable} pases disponibles</Text>
        ) : (
          <Text style={styles.restrictionText}>Disponible solo para socios o socios dependientes</Text>
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.filledButton, (!isSocioOrDependiente || !hasPassesAvailable) ? styles.disabledButton : null]}
            onPress={handleNewPassPress}
            disabled={!isSocioOrDependiente || !hasPassesAvailable}
          >
            <Text style={[styles.filledButtonText, (!isSocioOrDependiente || !hasPassesAvailable) ? styles.disabledButtonText : null]}>
              + Invitado
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.outlineButtonTemp, !isSocioOrDependiente ? styles.disabledButton : null]}
            onPress={handleNewTempPassPress}
            disabled={!isSocioOrDependiente}
          >
            <Text style={[styles.outlineButtonTempText, !isSocioOrDependiente ? styles.disabledButtonText : null]}>
              + Pase temporal
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.outlineButton, !isSocioOrDependiente ? styles.disabledButton : null]}
            onPress={handleViewGuestsPress}
            disabled={!isSocioOrDependiente}
          >
            <Text style={[styles.outlineButtonText, !isSocioOrDependiente ? styles.disabledButtonText : null]}>
              Socios relacionados
            </Text>
          </TouchableOpacity>
        </View>

        {/* Restriction Modal */}
        <RNModal
          animationType="none"
          transparent={true}
          visible={showGuestRestrictionModal}
          onRequestClose={() => setShowGuestRestrictionModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Acceso Restringido</Text>
              <Text style={styles.modalMessage}>
                {isSocioOrDependiente && !hasPassesAvailable
                  ? 'No tiene pases disponibles para crear nuevos invitados.'
                  : 'Un invitado no puede generar nuevos pases. Solo los socios tienen este privilegio.'}
              </Text>
              <View style={styles.modalButtonContainer}>
                <Button
                  text="Aceptar"
                  onPress={() => setShowGuestRestrictionModal(false)}
                  variant="primary"
                  style={styles.modalButton}
                />
              </View>
            </View>
          </View>
        </RNModal>
      </View>
    </View>
  );
};

export default GuestManagement;