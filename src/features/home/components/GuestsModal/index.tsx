import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../../../shared/theme/colors';
import { Guest } from '../../../home/services/homeService';

interface GuestsModalProps {
  visible: boolean;
  guests: Guest[];
  loading: boolean;
  onClose: () => void;
  onDeleteGuest?: (guestId: number) => Promise<boolean>;
}

const GUEST_TAB_TYPE_MAP = {
  invitado: 'INVITADO',
  dependiente: 'DEPENDIENTE',
  temporal: 'TEMPORAL',
} as const;

type GuestTab = keyof typeof GUEST_TAB_TYPE_MAP;

const GuestsModal: React.FC<GuestsModalProps> = ({
  visible,
  guests,
  loading,
  onClose,
  onDeleteGuest
}) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [guestToDelete, setGuestToDelete] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<GuestTab>('dependiente');

  const activeGuestType = GUEST_TAB_TYPE_MAP[activeTab];

  // Filter guests by type
  const filteredGuests = guests.filter(guest => guest.user?.type === activeGuestType);

  // Check if we have any guests of a specific type
  // const hasInvitados = guests.some(guest => guest.type === 'INVITADO');
  const hasDependientes = guests.some(guest => guest.user?.type === 'DEPENDIENTE');
  const hasTemporales = guests.some(guest => guest.user?.type === 'TEMPORAL');

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Lista de socios relacionados</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={COLORS.gray600} />
            </TouchableOpacity>
          </View>

          {/* Tabs for different guest types */}
          <View style={styles.tabsContainer}>
            {/* <TouchableOpacity
              style={[styles.tab, activeTab === 'invitados' && styles.activeTab]}
              onPress={() => setActiveTab('invitados')}
            >
              <Text style={[
                styles.tabText,
                activeTab === 'invitado' ? styles.activeTabText : (hasInvitados ? styles.tabText : styles.disabledTabText)
              ]}>
                Invitado 
              </Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              style={[styles.tab, activeTab === 'dependiente' && styles.activeTab]}
              onPress={() => setActiveTab('dependiente')}
            >
              <Text style={[
                styles.tabText,
                activeTab === 'dependiente' ? styles.activeTabText : (hasDependientes ? styles.tabText : styles.disabledTabText)
              ]}>
                Dependiente
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'temporal' && styles.activeTab]}
              onPress={() => setActiveTab('temporal')}
            >
              <Text style={[
                styles.tabText,
                activeTab === 'temporal' ? styles.activeTabText : (hasTemporales ? styles.tabText : styles.disabledTabText)
              ]}>
                Temporal
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.contentContainer}>
            {loading ? (
              <View style={styles.loadingContainer}>
                <Text>Cargando invitados...</Text>
              </View>
            ) : filteredGuests.length > 0 ? (
              <View style={styles.guestsContainer}>
                <ScrollView
                  style={styles.guestsList}
                  contentContainerStyle={styles.guestsListContent}
                >
                  {filteredGuests.map((guest) => (
                    <View key={guest.id} style={styles.guestCard}>
                      <View style={styles.guestInfo}>
                        <Text style={styles.guestName}>
                          {guest.user?.name} {guest.user?.lastName}
                        </Text>
                        <Text style={styles.guestEmail}>{guest.user?.email}</Text>
                        <Text style={styles.guestRelation}>
                          {guest.relationship}
                        </Text>
                      </View>
                      {onDeleteGuest && (
                        <TouchableOpacity
                          style={styles.deleteButton}
                          onPress={() => {
                            setGuestToDelete(guest.id);
                            setShowConfirmation(true);
                          }}
                        >
                          <Ionicons name="trash-outline" size={20} color={COLORS.error} />
                        </TouchableOpacity>
                      )}
                    </View>
                  ))}
                </ScrollView>
              </View>
            ) : (
              <View style={styles.noGuestsContainer}>
                <Text>
                  {activeTab === 'invitado' ? 'No hay invitados registrados' :
                   activeTab === 'dependiente' ? 'No hay socios dependientes registrados' :
                   'No hay pases temporales registrados'}
                </Text>
              </View>
            )}
          </View>

          <TouchableOpacity onPress={onClose} style={styles.closeModalButton}>
            <Text style={styles.closeModalButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Confirmation Modal for Delete */}
      <Modal
        animationType="none"
        transparent={true}
        visible={showConfirmation}
        onRequestClose={() => setShowConfirmation(false)}
      >
        <View style={styles.confirmationOverlay}>
          <View style={styles.confirmationContainer}>
            <Text style={styles.confirmationTitle}>Confirmar eliminación</Text>
            <Text style={styles.confirmationMessage}>¿Estás seguro de que deseas eliminar a este invitado?</Text>
            <View style={styles.confirmationButtonsContainer}>
              <TouchableOpacity
                style={[styles.confirmationButton, styles.cancelButton]}
                onPress={() => setShowConfirmation(false)}
              >
                <Text style={styles.confirmationButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.confirmationButton, styles.deleteButtonConfirm]}
                onPress={async () => {
                  if (guestToDelete !== null && onDeleteGuest) {
                    if (await onDeleteGuest(guestToDelete)) {
                      onClose(); // Close the modal after successful deletion
                    }
                  }
                  setShowConfirmation(false);
                }}
              >
                <Text style={[styles.confirmationButtonText, styles.confirmationButtonDeleteText]}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    width: '95%',
    maxWidth: 700,
    maxHeight: '80%',
    height: '80%',
    elevation: 10,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.gray900,
  },
  closeButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: COLORS.gray100,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
    backgroundColor: COLORS.gray50,
  },
  tab: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: COLORS.primary,
    backgroundColor: COLORS.white,
  },
  tabText: {
    fontSize: 14,
    color: COLORS.gray600,
    fontWeight: '500',
  },
  activeTabText: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  disabledTabText: {
    color: COLORS.gray400,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
  },
  guestsContainer: {
    flex: 1,
    minHeight: 100,  // Aumentar altura mínima
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  guestsList: {
    flex: 1,
  },
  guestsListContent: {
    paddingBottom: 20,
  },
  guestCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    position: 'relative',
  },
  guestInfo: {
    flex: 1,
  },
  guestName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.gray900,
    marginBottom: 6,
  },
  guestEmail: {
    fontSize: 14,
    color: COLORS.gray600,
    marginBottom: 6,
    fontStyle: 'normal',
  },
  guestRelation: {
    fontSize: 13,
    color: COLORS.primary,
    backgroundColor: 'transparent',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    textTransform: 'capitalize',
    fontWeight: '600',
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 8,
    borderRadius: 20,
    backgroundColor: COLORS.gray100,
  },
  noGuestsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeModalButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  closeModalButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  confirmationOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmationContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    width: '80%',
    maxWidth: 400,
    alignItems: 'center',
  },
  confirmationTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.gray900,
    marginBottom: 10,
    textAlign: 'center',
  },
  confirmationMessage: {
    fontSize: 16,
    color: COLORS.gray700,
    marginBottom: 20,
    textAlign: 'center',
  },
  confirmationButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 10,
  },
  confirmationButton: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    minHeight: 48,
  },
  cancelButton: {
    backgroundColor: COLORS.gray200,
  },
  deleteButtonConfirm: {
    backgroundColor: COLORS.error,
  },
  confirmationButtonText: {
    color: COLORS.gray800,
    fontSize: 16,
    fontWeight: '600',
  },
  confirmationButtonDeleteText: {
    color: COLORS.white,
  },
});

export default GuestsModal;