import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../../../../shared/theme/colors';
import { Ionicons } from '@expo/vector-icons';
import styles from './Style';

interface GuestManagementProps {
  onNewPassPress: () => void;
  onViewGuestsPress: () => void;
}

const GuestManagement: React.FC<GuestManagementProps> = ({ onNewPassPress, onViewGuestsPress }) => {
  const activeGuests = 2;  // Número de invitados activos
  const totalPasses = 5;   // Número total de pases temporales


  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Ionicons name="people-outline" size={24} color={COLORS.primary} />
        <Text style={styles.cardTitle}>Gestión de Invitados</Text>
      </View>

      <View style={styles.guestSection}>
        {/*<Text style={styles.sectionTitle}>Invitados Activos</Text>
        <View style={styles.pasesContainer}>
          <Text style={styles.pasesText}>{totalPasses} pases temporales vigentes</Text>
          <View style={styles.activeLabel}>
            <Text style={styles.activeLabelText}>{activeGuests} activos</Text>
          </View>
        </View>*/}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.filledButton}
            onPress={onNewPassPress}
          >
            <Text style={styles.filledButtonText}>+ Nuevo Pase</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.outlineButton}
            onPress={onViewGuestsPress}
          >
            <Text style={styles.outlineButtonText}>Ver invitados</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/*<View style={styles.infoLabel}>
        <Ionicons name="bulb-outline" size={18} color="#F59E0B" style={styles.infoIcon} />
        <Text style={styles.infoText}>Los pases temporales son válidos por 24 horas</Text>
      </View>*/}
    </View>
  );
};

export default GuestManagement;