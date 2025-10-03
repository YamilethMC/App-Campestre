import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { COLORS } from '../../../shared/theme/colors';
import { Ionicons } from '@expo/vector-icons';

interface Court {
  id: string;
  name: string;
  available: boolean;
}

interface CourtSelectorProps {
  selectedCourt: string;
  onCourtChange: (courtId: string) => void;
  courts: Court[];
  unavailableMessage?: string;
}

export const CourtSelector: React.FC<CourtSelectorProps> = ({ 
  selectedCourt, 
  onCourtChange, 
  courts, 
  unavailableMessage = "No hay canchas disponibles" 
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="tennisball-outline" size={24} color={COLORS.primary} />
        <Text style={styles.label}>Canchas</Text>
      </View>
      
      {courts.length > 0 ? (
        <View style={styles.courtsContainer}>
          {courts.map((court) => (
            <TouchableOpacity
              key={court.id}
              style={[
                styles.court,
                court.available ? styles.availableCourt : styles.unavailableCourt,
                selectedCourt === court.id && styles.selectedCourt
              ]}
              onPress={() => court.available && onCourtChange(court.id)}
              disabled={!court.available}
            >
              <Text style={[
                styles.courtText,
                selectedCourt === court.id && styles.selectedCourtText,
                !court.available && styles.unavailableText
              ]}>
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

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.gray700,
    marginLeft: 8,
  },
  courtsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  court: {
    flex: 1,
    margin: 4,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 10, // Menos radio
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    minWidth: 80,
    maxWidth: 100,
  },
  availableCourt: {
    backgroundColor: COLORS.gray50,
    borderColor: COLORS.gray300,
  },
  unavailableCourt: {
    backgroundColor: COLORS.gray100,
    borderColor: COLORS.gray300,
  },
  selectedCourt: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  courtText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.gray700,
  },
  selectedCourtText: {
    color: COLORS.white,
  },
  unavailableText: {
    color: COLORS.gray400,
  },
  noAvailabilityContainer: {
    padding: 16,
    backgroundColor: COLORS.gray50,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.gray300,
  },
  noAvailabilityText: {
    fontSize: 16,
    color: COLORS.gray600,
    textAlign: 'center',
  },
});