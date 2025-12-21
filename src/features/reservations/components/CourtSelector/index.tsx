import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../../../shared/theme/colors';
import useMessages from '../../hooks/useMessages';
import { CourtSelectorProps } from '../../interfaces/reservationInterface';
import styles from './Style';

export const CourtSelector: React.FC<CourtSelectorProps> = ({
  selectedCourt,
  onCourtChange,
  courts,
  unavailableMessage = 'No hay canchas disponibles',
}) => {
  const { messages } = useMessages();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="tennisball-outline" size={24} color={COLORS.primary} />
        <Text style={styles.label}>{messages.COURT.TITLE}</Text>
      </View>

      {courts.length > 0 ? (
        <View style={styles.courtsContainer}>
          {courts.map(court => (
            <TouchableOpacity
              key={court.id}
              style={[
                styles.court,
                court.available ? styles.availableCourt : styles.unavailableCourt,
                selectedCourt === court.id && styles.selectedCourt,
              ]}
              onPress={() => court.available && onCourtChange(court.id)}
              disabled={!court.available}
            >
              <Text
                style={[
                  styles.courtText,
                  selectedCourt === court.id && styles.selectedCourtText,
                  !court.available && styles.unavailableText,
                ]}
              >
                {court.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <View style={styles.noAvailabilityContainer}>
          <Text style={styles.noAvailabilityText}>{unavailableMessage}</Text>
        </View>
      )}
    </View>
  );
};
