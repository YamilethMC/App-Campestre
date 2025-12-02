import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Modal as RNModal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Button from '../../../../shared/components/Button/Button';
import ModalComponent from '../../../../shared/components/Modal/Modal';
import { COLORS } from '../../../../shared/theme/colors';
import { eventsService } from '../../service/eventsService';

interface RegisterScreenProps {
  memberId: number;
  eventId: string;
  visible: boolean;
  onClose: () => void;
  onRegistrationComplete: () => void;
  toggleParticipantSelection: (id: number) => void;
  selectedParticipants: number[];
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({
  memberId,
  eventId,
  visible,
  onClose,
  onRegistrationComplete,
  toggleParticipantSelection,
  selectedParticipants,
}) => {
  const [memberDetails, setMemberDetails] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);

  // Estado para manejar la carga de detalles del miembro
  useEffect(() => {
    if (visible) {
      loadMemberDetails();
    }
  }, [memberId, visible]);

  const loadMemberDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await eventsService.getMemberDetails(memberId);
      setMemberDetails(response);
    } catch (err: any) {
      const errorMessage = err.message || 'Error al cargar los detalles del miembro';
      setError(errorMessage);
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    // Esta función cierra la pantalla de registro sin completar el proceso
    onClose();
  };

  const handleSave = () => {
    if (selectedParticipants.length === 0) {
      Alert.alert('Error', 'Por favor selecciona al menos un miembro para registrarse.');
      return;
    }

    setShowConfirmationModal(true);
  };

  const confirmRegistration = async () => {
    setShowConfirmationModal(false);
    try {
      await eventsService.registerForEvent(eventId, memberId.toString(), selectedParticipants.length);
      Alert.alert('Éxito', 'Registro completado exitosamente');
      onRegistrationComplete();
    } catch (err: any) {
      const errorMessage = err.message || 'Error al registrar evento';
      Alert.alert('Error', errorMessage);
    }
  };

  if (!visible) return null;

  return (
    <RNModal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={handleClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {loading ? (
            <SafeAreaView style={[styles.container, styles.centerContent]}>
              <Text style={styles.loadingText}>Cargando...</Text>
            </SafeAreaView>
          ) : error ? (
            <SafeAreaView style={[styles.container, styles.centerContent, styles.errorContainer]}>
              <Text style={styles.errorText}>{error}</Text>
            </SafeAreaView>
          ) : !memberDetails ? (
            <SafeAreaView style={[styles.container, styles.centerContent, styles.errorContainer]}>
              <Text style={styles.errorText}>No se encontraron detalles del miembro</Text>
            </SafeAreaView>
          ) : (
            <View style={styles.container}>
              <View style={styles.header}>
                <Text style={styles.headerTitle}>Seleccionar Participantes</Text>
                <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
                  <Ionicons name="close" size={24} color={COLORS.gray800} />
                </TouchableOpacity>
              </View>

              <View style={styles.contentWithFixedButtons}>
                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                  {/* Crear una lista con el miembro principal y sus invitados */}
                  {[
                    {
                      id: memberDetails.id,
                      name: memberDetails.user.name,
                      lastName: memberDetails.user.lastName
                    },
                    ...memberDetails.guests.map((guest: any) => ({
                      id: guest.id,
                      name: guest.user.name,
                      lastName: guest.user.lastName
                    }))
                  ].map((participant) => (
                    <TouchableOpacity
                      key={participant.id}
                      style={[
                        styles.participantItem,
                        selectedParticipants.includes(participant.id) && styles.selectedParticipantItem
                      ]}
                      onPress={() => toggleParticipantSelection(participant.id)}
                    >
                      <View style={styles.checkboxContainer}>
                        <Ionicons
                          name={selectedParticipants.includes(participant.id) ? 'checkbox' : 'square-outline'}
                          size={24}
                          color={COLORS.primary}
                        />
                      </View>
                      <Text style={styles.participantName}>
                        {participant.name} {participant.lastName}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>

                {/* Contenedor para botones que se mantiene fijo en la parte inferior */}
                <View style={styles.buttonContainer}>
                  <View style={styles.buttonRow}>
                    <Button
                      text="Cancelar"
                      variant="outline"
                      onPress={handleClose}
                      style={styles.cancelButton}
                      titleStyle={styles.cancelButtonText}
                    />
                    <Button
                      text={`Guardar (${selectedParticipants.length})`}
                      variant="primary"
                      onPress={handleSave}
                      disabled={selectedParticipants.length === 0}
                      style={styles.saveButton}
                    />
                  </View>
                </View>
              </View>

              {/* Modal de confirmación */}
              <ModalComponent
                visible={showConfirmationModal}
                title="Confirmar registro"
                message={`¿Estás seguro de que deseas registrar ${selectedParticipants.length} participante(s) en este evento?`}
                confirmText="Aceptar"
                cancelText="Cancelar"
                onConfirm={confirmRegistration}
                onCancel={() => setShowConfirmationModal(false)}
              />
            </View>
          )}
        </View>
      </View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    width: '90%', // Ancho del 90% de la pantalla
    height: '70%', // Altura del 70% de la pantalla
    borderRadius: 20,
    overflow: 'hidden', // Asegura que el contenido no se salga de los bordes redondeados
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: COLORS.gray800,
  },
  errorContainer: {
    padding: 16,
  },
  errorText: {
    fontSize: 16,
    color: COLORS.error,
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.gray800,
  },
  closeButton: {
    padding: 8,
  },
  contentWithFixedButtons: {
    flex: 1,
    flexDirection: 'column',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  participantItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  selectedParticipantItem: {
    backgroundColor: COLORS.primary + '20',
  },
  checkboxContainer: {
    marginRight: 12,
  },
  participantName: {
    fontSize: 16,
    color: COLORS.gray800,
    flex: 1,
  },
  buttonContainer: {
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray200,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    paddingTop: 0,
    paddingBottom: 0,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  cancelButton: {
    flex: 1,
    marginRight: 8,
  },
  cancelButtonText: {
    color: COLORS.gray600,
  },
  saveButton: {
    flex: 1,
    marginLeft: 8,
  },
});

export default RegisterScreen;