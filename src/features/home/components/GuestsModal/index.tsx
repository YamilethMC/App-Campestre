import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../../../shared/theme/colors';

interface GuestUser {
  id: number;
  name: string;
  lastName: string;
  email: string;
}

interface Guest {
  id: number;
  relationship: string;
  user: GuestUser;
}

interface GuestsModalProps {
  visible: boolean;
  guests: Guest[];
  loading: boolean;
  onClose: () => void;
}

const GuestsModal: React.FC<GuestsModalProps> = ({ 
  visible, 
  guests, 
  loading, 
  onClose 
}) => {
  console.log('guests en modal:', guests);
  console.log('loading en modal:', loading);

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
            <Text style={styles.modalTitle}>Lista de Invitados</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={COLORS.gray600} />
            </TouchableOpacity>
          </View>

          <View style={styles.contentContainer}>
            {loading ? (
              <View style={styles.loadingContainer}>
                <Text>Cargando invitados...</Text>
              </View>
            ) : guests.length > 0 ? (
              <View style={styles.guestsContainer}>
                <ScrollView
                  style={styles.guestsList}
                  contentContainerStyle={styles.guestsListContent}
                >
                  {guests.map((guest) => (
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
                    </View>
                  ))}
                </ScrollView>
              </View>
            ) : (
              <View style={styles.noGuestsContainer}>
                <Text>No hay invitados registrados.</Text>
              </View>
            )}
          </View>

          <TouchableOpacity onPress={onClose} style={styles.closeModalButton}>
            <Text style={styles.closeModalButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
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
});

export default GuestsModal;