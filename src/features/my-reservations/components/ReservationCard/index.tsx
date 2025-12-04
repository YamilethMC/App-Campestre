import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Alert, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../../../shared/theme/colors';
import { Reservation } from '../../interfaces';

interface ReservationCardProps {
  reservation: Reservation;
  onCancel: (reservationId: number, startTime: string, endTime: string) => Promise<boolean>;
}

const ReservationCard = ({ reservation, onCancel }: ReservationCardProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCancelReservation = () => {
    setIsModalVisible(false);
    onCancel(reservation.id, reservation.startTime, reservation.endTime);
  };

  // Format the time for display - extract date and time directly from ISO string without timezone conversion
  const formatDate = (dateString: string) => {
    // Extract date part from ISO string (YYYY-MM-DD format)
    const datePart = dateString.split('T')[0];
    const [year, month, day] = datePart.split('-');
    // Format as DD/MM/YYYY
    return `${day}/${month}/${year}`;
  };

  const formatTime = (dateString: string) => {
    console.log('dateString: ', dateString);
    // Extract time part from ISO string (HH:MM:SS.sss format) and get only HH:MM
    const timePart = dateString.split('T')[1].split('.')[0]; // Get HH:MM:SS part
    const [hour, minute] = timePart.split(':');
    console.log('extracted time: ', `${hour}:${minute}`);
    return `${hour}:${minute}`;
  };

  const getDuration = (start: string, end: string) => {
    // Extract time parts to calculate duration
    const startTime = start.split('T')[1].split('.')[0]; // HH:MM:SS
    const endTime = end.split('T')[1].split('.')[0]; // HH:MM:SS

    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);

    // Calculate difference in minutes
    const startTotalMinutes = startHour * 60 + startMinute;
    const endTotalMinutes = endHour * 60 + endMinute;

    // Handle case where end time is on the next day (if needed)
    let diffInMinutes = endTotalMinutes - startTotalMinutes;
    if (diffInMinutes < 0) {
      diffInMinutes += 24 * 60; // Add 24 hours if end time is smaller
    }

    return `${diffInMinutes} min`;
  };

  // Get an appropriate icon based on the facility type
  const getFacilityIcon = (type: string) => {
    switch (type.toUpperCase()) {
      case 'TENNIS':
        return 'tennisball-outline';
      case 'PADEL':
        return 'tennisball-outline'; // Using tennis icon for padel too
      case 'GOLF':
        return 'golf-outline';
      case 'PADDLE':
        return 'boat-outline';
      case 'SQUASH':
        return 'cube-outline';
      case 'GYM':
        return 'barbell-outline';
      case 'POOL':
        return 'water-outline';
      case 'SPA':
        return 'fitness-outline';
      default:
        return 'cube-outline';
    }
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case 'CONFIRMED':
        return COLORS.success;
      case 'PENDING':
        return COLORS.warning;
      case 'CANCELLED':
        return COLORS.error;
      default:
        return COLORS.gray600;
    }
  };

  // Get status text in Spanish
  const getStatusText = (status: string) => {
    switch (status.toUpperCase()) {
      case 'CONFIRMED':
        return 'Confirmada';
      case 'PENDING':
        return 'Pendiente';
      case 'CANCELLED':
        return 'Cancelada';
      default:
        return status;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{reservation.facility.name}</Text>
          <Text style={styles.description}>{reservation.facility.description}</Text>
        </View>
        <View style={[styles.status, {
          borderColor: getStatusColor(reservation.status),
          borderWidth: 1
        }]}>
          <Text style={[styles.statusText, { color: getStatusColor(reservation.status) }]}>{getStatusText(reservation.status)}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.infoSection}>
          <View style={styles.typeRow}>
            <Ionicons name={getFacilityIcon(reservation.facility.type)} size={18} color={COLORS.primary} style={styles.typeIcon} />
            <Text style={styles.typeText}>{reservation.facility.type}</Text>
          </View>

          <View style={styles.dateRow}>
            <Ionicons name="calendar-outline" size={16} color={COLORS.primary} style={styles.dateIcon} />
            <View style={styles.dateContainer}>
              <Text style={styles.dateText}>
                {formatDate(reservation.startTime)}
              </Text>
              <Text style={styles.timeRangeText}>
                {formatTime(reservation.startTime)} - {formatTime(reservation.endTime)}
              </Text>
              <Text style={styles.durationText}>{getDuration(reservation.startTime, reservation.endTime)}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[
            styles.cancelButton,
            reservation.status.toUpperCase() === 'CANCELLED' && {
              backgroundColor: COLORS.gray400,
              opacity: 0.6,
            }
          ]}
          onPress={() => setIsModalVisible(true)}
          disabled={reservation.status.toUpperCase() === 'CANCELLED'}
        >
          <Ionicons
            name={reservation.status.toUpperCase() === 'CANCELLED' ? "checkmark-circle" : "close-circle-outline"}
            size={15}
            color={reservation.status.toUpperCase() === 'CANCELLED' ? COLORS.white : COLORS.white}
          />
          <Text style={styles.cancelButtonText}>
            {reservation.status.toUpperCase() === 'CANCELLED' ? "Cancelada" : "Cancelar"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Confirmation Modal */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Confirmar cancelación</Text>
            </View>

            <Text style={styles.modalMessage}>
              ¿Estás seguro de que deseas cancelar la reservación para <Text style={styles.facilityName}>{reservation.facility.name}</Text> el día {formatDate(reservation.startTime)} a las {formatTime(reservation.startTime)}?
            </Text>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelModalButton]}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.confirmModalButton]}
                onPress={handleCancelReservation}
              >
                <Text style={[styles.modalButtonText, styles.confirmModalButtonText]}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 0,
    marginBottom: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: `${COLORS.gray300}80`, // Light gray border with some transparency
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: `${COLORS.primary}30`, // Light primary border
  },
  titleContainer: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.gray900,
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: COLORS.gray600,
    lineHeight: 16,
    marginBottom: 8,
    fontStyle: 'normal',
  },
  status: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    minWidth: 80,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.gray400,
  },
  statusText: {
    color: COLORS.gray700,
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    padding: 16,
    paddingTop: 8,
  },
  infoSection: {
    flexDirection: 'column',
    backgroundColor: `${COLORS.primary}08`, // Very light primary background
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: `${COLORS.primary}20`, // Light primary border
  },
  typeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  typeIcon: {
    marginRight: 8,
    backgroundColor: `${COLORS.primary}20`,
    padding: 6,
    borderRadius: 12,
  },
  typeText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  dateIcon: {
    marginRight: 8,
    marginTop: 2,
    backgroundColor: `${COLORS.primary}20`,
    padding: 6,
    borderRadius: 12,
  },
  dateContainer: {
    flex: 1,
  },
  dateText: {
    fontSize: 15,
    color: COLORS.gray800,
    fontWeight: '600',
    marginBottom: 2,
  },
  timeRangeText: {
    fontSize: 14,
    color: COLORS.gray700,
    marginBottom: 2,
  },
  durationText: {
    fontSize: 12,
    color: COLORS.gray600,
    fontWeight: '500',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 12,
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: `${COLORS.primary}15`, // Light primary border
  },
  cancelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: COLORS.error,
    minWidth: 90,
    justifyContent: 'center',
    opacity: 0.9,
  },
  cancelButtonText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '500',
    marginLeft: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    width: '85%',
    maxWidth: 400,
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.gray900,
    marginTop: 8,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 15,
    color: COLORS.gray700,
    lineHeight: 22,
    marginBottom: 24,
    textAlign: 'center',
  },
  facilityName: {
    fontWeight: '700',
    color: COLORS.primary,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelModalButton: {
    backgroundColor: COLORS.gray200,
    marginRight: 8,
  },
  confirmModalButton: {
    backgroundColor: COLORS.error,
    marginLeft: 8,
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  confirmModalButtonText: {
    color: COLORS.white,
  },
});

export default ReservationCard;