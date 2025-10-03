import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../../shared/theme/colors';
import { Ionicons } from '@expo/vector-icons';

interface SummaryCardProps {
  serviceName: string;
  date: string;
  time: string;
  details: {
    court?: string;
    table?: string;
    partySize?: number;
    treatment?: string;
    equipment?: string;
  };
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ 
  serviceName, 
  date, 
  time, 
  details 
}) => {
  // Formatear la fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const dayName = dayNames[date.getDay()];
    const day = date.getDate();
    const monthNames = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
                        'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    const monthName = monthNames[date.getMonth()];
    const year = date.getFullYear();
    
    return `${dayName}, ${day} de ${monthName} de ${year}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resumen de reserva</Text>
      
      <View style={styles.detailRow}>
        <Ionicons name="reader-outline" size={20} color={COLORS.gray600} />
        <Text style={styles.label}>Servicio</Text>
        <Text style={styles.value}>{serviceName}</Text>
      </View>
      
      <View style={styles.detailRow}>
        <Ionicons name="calendar-outline" size={20} color={COLORS.gray600} />
        <Text style={styles.label}>Fecha</Text>
        <Text style={styles.value}>{formatDate(date)}</Text>
      </View>
      
      <View style={styles.detailRow}>
        <Ionicons name="time-outline" size={20} color={COLORS.gray600} />
        <Text style={styles.label}>Hora</Text>
        <Text style={styles.value}>{time}</Text>
      </View>
      
      {/* Detalles específicos del servicio */}
      {details.court && (
        <View style={styles.detailRow}>
          <Ionicons name="tennisball-outline" size={20} color={COLORS.gray600} />
          <Text style={styles.label}>Cancha</Text>
          <Text style={styles.value}>{details.court}</Text>
        </View>
      )}
      
      {details.table && (
        <View style={styles.detailRow}>
          <Ionicons name="restaurant-outline" size={20} color={COLORS.gray600} />
          <Text style={styles.label}>Mesa</Text>
          <Text style={styles.value}>{details.table}</Text>
        </View>
      )}
      
      {details.partySize !== undefined && (
        <View style={styles.detailRow}>
          <Ionicons name="people-outline" size={20} color={COLORS.gray600} />
          <Text style={styles.label}>Personas</Text>
          <Text style={styles.value}>{details.partySize}</Text>
        </View>
      )}
      
      {details.treatment && (
        <View style={styles.detailRow}>
          <Ionicons name="water-outline" size={20} color={COLORS.gray600} />
          <Text style={styles.label}>Tratamiento</Text>
          <Text style={styles.value}>{details.treatment}</Text>
        </View>
      )}
      
      {details.equipment && (
        <View style={styles.detailRow}>
          <Ionicons name="barbell-outline" size={20} color={COLORS.gray600} />
          <Text style={styles.label}>Equipo</Text>
          <Text style={styles.value}>{details.equipment}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.gray50,
    borderRadius: 12,
    padding: 16,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.gray800,
    marginBottom: 12,
    textAlign: 'center',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  label: {
    flex: 1,
    fontSize: 14,
    color: COLORS.gray600,
    marginLeft: 8,
  },
  value: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.gray800,
    textAlign: 'right',
  },
});